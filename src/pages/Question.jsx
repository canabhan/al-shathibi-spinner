import React, { useEffect, useState, useContext } from 'react'
import bg from '../assets/images/bg.png'
import BoxList from '../components/Boxlist'
import { useLocation, useParams } from 'react-router-dom';
import { CANDIDATES, QRAVI, QULOOM } from '../utility/Constants';
import { collection, query, where, getDocs,doc,updateDoc } from "firebase/firestore";
import { db } from '../Firebase Folder/FirebaseConfig';
import { FaLock } from "react-icons/fa";
import Loader from '../components/loder/Loader';
import QuestionBox from '../components/QuestionBox';
import { CandidateContextProvider } from '../Context/CandidatesContext';
import AOS from 'aos';


function Question() {
    // const choices = Array.from({ length: 20 }, (_, i) => i + 1); // Example data
    const location = useLocation()
    const { ravi, raviCode } = location.state || {}
    const { code } = useParams()
    const { settings } = useContext(CandidateContextProvider)

    const [raviQuestion, setRaviQuestion] = useState()
    const [uloomQuestion, setUloomQuestion] = useState()
    const [currentQuestion, setCurrentQuestion] = useState()
    const [isQuestion, setIsQuestion] = useState(false)

    // async function fetchByRaviId() {
    //     try {
    //         console.log(raviCode,'raviCode question');
            
    //         const q = query(
    //             collection(db, QRAVI),
    //             where("rawiId","==", raviCode)
    //         );

    //         const snap = await getDocs(q);
    //         return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     } catch (err) {
    //         console.error("fetchByRaviId error:", err);
    //         return [];
    //     }
    // }
async function fetchByRaviId() {
    try {
        console.log(raviCode, "Ravi Code");

        // Get all questions
        const questionSnap = await getDocs(collection(db, QRAVI));

        const questions = questionSnap.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            .filter(question =>
                question.rawis?.some(rawi => rawi.id === raviCode)
            );

        console.log("Questions:", questions);

        return questions;
    } catch (err) {
        console.error("fetchByRaviCode error:", err);
        return [];
    }
}
// async function fetchByRaviId() {
//     try {
//         // Step 1: Get all rawis with the selected name
//         console.log(ravi,'ravi name ravi name');
        
//         const rawiSnap = await getDocs(
//             query(
//                 collection(db, 'rawis'),
//                 where("name", "==", ravi)
//             )
//         );

//         const rawiIds = rawiSnap.docs.map(doc => doc.data().rawiId);

//         console.log("Rawi IDs:", rawiIds);

//         if (rawiIds.length === 0) {
//             return [];
//         }

//         // Step 2: Get all questions
//         const questionSnap = await getDocs(collection(db, QRAVI)); // replace with your questions collection

//         const questions = questionSnap.docs
//             .map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }))
//             .filter(question => rawiIds.includes(question.rawiId));
//         console.log("Rawi questions:", questions);

//         return questions;
//     } catch (err) {
//         console.error("fetchByRaviId error:", err);
//         return [];
//     }
// }
    const fetchUloomQuestions = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, QULOOM));
            const questions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("All candidates:", questions);
            return questions;
        } catch (error) {
            console.error("Error fetching candidates:", error);
            return [];
        }
    };

    const updateRaviQuestions = async (id) => {
        try {
            const ref = doc(db, QRAVI, id); // Replace "CANDIDATES" with your collection name
            await updateDoc(ref, { locked: true }); // e.g., { score: 95 }
            fetchByRaviId()
            console.log("Field added successfully ✔️");
        } catch (error) {
            console.error("Error adding field:", error);
        }
    }

       const updateUloomQuestions = async (id) => {
        try {
            const ref = doc(db, QULOOM, id); // Replace "CANDIDATES" with your collection name
            await updateDoc(ref, { locked: true }); // e.g., { score: 95 }
            fetchUloomQuestions()

            console.log("Field added successfully ✔️");
        } catch (error) {
            console.error("Error adding field:", error);
        }
    }
    const addDataToCandidate=async(data)=>{
      try {
    // 1️⃣ build the query
    const q = query(
      collection(db, CANDIDATES),
      where("stCode", "==", code)      // or "stCode" if that’s your field
    );

    // 2️⃣ run it
    const snap = await getDocs(q);

    if (snap.empty) {
      console.warn("No candidate with that stcode");
      return;                                // nothing to update
    }

    // 3️⃣ update the first (and ideally only) match
    const ref = snap.docs[0].ref;
    await updateDoc(ref, data);         // merges, doesn’t overwrite
    console.log("Candidate updated ✔️");
  } catch (err) {
    console.error("updateCandidateByStCode error:", err);
  }
    }
    const handleRaviQuestion = (item) => {
        console.log(item,'rawi questions here......')
        updateRaviQuestions(item.id)
        addDataToCandidate({rawiQuestionId:item.id})
        setCurrentQuestion(item)
        setIsQuestion(true)
    }

    const handleUloomQuestion = (item) => {
        console.log(item,'uloom questions here......')

        updateUloomQuestions(item.id)
        addDataToCandidate({uloomQuestionId:item.id})

        setCurrentQuestion(item)
        setIsQuestion(true)
    }
    useEffect(() => {
        // flag prevents setState after unmount
        let isMounted = true;
       
        async function loadQuestions() {
            try {
                // run both requests in parallel
                const [quloom, qravi] = await Promise.all([
                    fetchUloomQuestions(),
                    fetchByRaviId()          // pass args if needed
                ]);

                if (isMounted) {
                    setUloomQuestion(quloom);
                    setRaviQuestion(qravi);
                    console.log(qravi, quloom, "all questions");
                }
            } catch (err) {
                console.error("loadQuestions failed:", err);
            }
        }

        loadQuestions();

        // clean‑up (runs on unmount)
        return () => {
            isMounted = false;
        };
    }, [isQuestion]);

    useEffect(() => {
        if (raviQuestion || uloomQuestion) {
            AOS.refresh();
        }
    }, [raviQuestion, uloomQuestion]);

    console.log(ravi, raviCode, code, 'qustion page');

    const rawiEnabled = settings?.rawiQuestionsEnabled !== undefined
        ? settings.rawiQuestionsEnabled
        : (settings?.rawiQuestionEnabled !== undefined
            ? settings.rawiQuestionEnabled
            : true);

    const uloomEnabled = settings?.uloomQuestionsEnabled !== undefined
        ? settings.uloomQuestionsEnabled
        : (settings?.uloomQuestionEnabled !== undefined
            ? settings.uloomQuestionEnabled
            : true);
       

    let rawiWidthClass = "w-1/4";
    let uloomWidthClass = "w-2/4";

    return (
        <div>
            {isQuestion && <QuestionBox setIsQuestion={setIsQuestion} data={currentQuestion} />}
            {raviQuestion && settings ?
                <div  style={{
    background:
      "radial-gradient(circle at center, #FFB14A 0%, #F67A2B 40%, #D84A20 70%, #B52D16 100%)",
  }}
  className="h-screen  !overflow-hidden relative "  >
                    {/* <img src={bg} className="absolute inset-0  z-1 opacity-50" alt="" /> */}
                    <div className="relative z-10 items-center justify-center h-full gap-8 p-20 flex">
                        
                        {!rawiEnabled && !uloomEnabled ? (
                            <div className="bg-[#fef6ea] p-12 rounded-4xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] text-center border-6 border-[#f2e3ca] max-w-md animate-[pulse_2s_infinite]">
                                <h2 className="text-[#736153] font-bold text-3xl mb-4">الأسئلة مغلقة</h2>
                                <p className="text-gray-700 text-lg">الأسئلة غير مفعلة حالياً في الإعدادات.</p>
                            </div>
                        ) : (
                            <>
                                <div className={`bg-[#fef6ea] p-8 flex flex-col items-center justify-center ${rawiWidthClass} rounded-4xl shadow-[0_5px_15px_rgba(0,0,0,0.35)]`}>
                                    <h2 className='font-bold py-2 pb-6 arabic text-3xl text-[#d75e11]'>الرواة</h2>
                                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
                                        {(rawiEnabled && settings?.isHideLockedRawiQuestion
                                            ? raviQuestion.filter((item) => !item.locked)
                                            : raviQuestion
                                        ).map((item, index) => {
                                            const isItemLocked = !rawiEnabled || item.locked;
                                            return (
                                                <React.Fragment key={item.id || index}>
                                                     {!isItemLocked ?
                                                        <div>
                                                            <div onClick={() => handleRaviQuestion(item)} className="bg-[#cc4104] w-24 h-24 text-center rounded-3xl flex items-center justify-center text-3xl shadow-4xl font-bold text-[#fef7eb] border-6 border-[#f2e3ca] hover:scale-105 transition-transform duration-300 cursor-pointer" >{index + 1}</div>
                                                        </div> :
                                                        <div>
                                                            <div className="bg-[#d6510d] w-24 h-24 text-center rounded-3xl flex items-center justify-center text-3xl shadow-4xl font-bold text-[#fef7eb] border-6 border-[#f2e3ca] hover:scale-105 transition-transform duration-300 opacity-80"><FaLock /></div>
                                                        </div>
                                                     }
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>

                                <BoxList
                                    items={(!uloomEnabled)
                                        ? uloomQuestion
                                        : (settings?.isHideLockedUloomQuestions
                                            ? (uloomQuestion || []).filter(item => !item.locked && !item.isOpen)
                                            : uloomQuestion)
                                    }
                                    handleUloomQuestion={handleUloomQuestion}
                                    widthClass={uloomWidthClass}
                                    isLocked={!uloomEnabled}
                                />
                            </>
                        )}
                    </div>
                </div> :
                <>
                    <Loader />
                </>}
        </div>
    )
}

export default Question
