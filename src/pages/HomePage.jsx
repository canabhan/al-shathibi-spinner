import React, { useContext,useEffect,useState } from 'react'
import Spinner from '../components/spinner/Spinner'
import {db} from '../Firebase Folder/FirebaseConfig'
import Loader from '../components/loder/Loader'
import bg from '../assets/images/bg.png'
import typo from '../assets/img25/typo.webp'
import { FaLock } from 'react-icons/fa'

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { CandidateContextProvider } from '../Context/CandidatesContext';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [result, setResult] = useState("");
  const [isdata, seIstData] = useState(false);
  const [sorted,setSorted]=useState([])

  const [spinData, setSpinData] = useState([]);
  // const [isPopup,setIsPopup]=useState(false)
  // const navigate = useNavigate();
  const {  isPopup, setIsPopup,allCandidates ,loader,setLoader, settings} = useContext(CandidateContextProvider);
  // const location=useLocation()

  // const data=location.state
  // if(data){
  //   window.location.reload();

  // }
  //  console.log("sorted", sorted);
  useEffect(() => {
    if (allCandidates && settings) {
      const isSecondRound = settings?.spinnerType === "SECOND_ROUND";
      const newSorted = [];
      allCandidates.forEach((item) => {
        // In SECOND_ROUND, status must be exactly "SECOND_ROUND"
        if (isSecondRound && item.status !== "SECOND_ROUND") {
          return;
        }
        
        // In THIRD_ROUND, status must be "THIRD_ROUND" (or fallback to any if status field is missing)
        if (!isSecondRound && item.status && item.status !== "THIRD_ROUND") {
          return;
        }

        const isCompleted = isSecondRound 
          ? item.isCompletedSecondRound 
          : item.isCompletedThirdRound;
        const shouldFilter = isCompleted !== undefined ? isCompleted : item.isRecited;
        if (!shouldFilter) {
          newSorted.push(item);
        }
      });
      setSorted(newSorted);
    }
  }, [allCandidates, settings]);

  useEffect(() => {
    addSpinData();
  }, [sorted]);

const shuffleArray = (array) => {
  const shuffled = [...array]; // Create a copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

  const addSpinData = () => {
    
    const data = sorted.map((candidate, index) => ({
      name: candidate.stCode || candidate.code,
      realName: candidate.name,
      institution: candidate.institution,
      id: candidate.id,
      key: `${index}`,
      img: candidate.photoUrl,
      place:candidate.place 
    }));
setSpinData(shuffleArray(data));
    seIstData(data.length > 0);
  };

   
  
  
  // const {allCandidates,setAllCandidates,isPopup}=useContext(CandidateContextProvider)







console.log('sd',allCandidates);



  // const addCandidate=async()=>{
    
  //   try {
  //     const docRef = await addDoc(usersCollectionRef, {
  //   //  ...candidates[30]
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  
  // }

  return (
    <div>
      {loader && settings ? (
        settings.spinnerEnabled ? (
          <Spinner spinData={spinData} isdata={isdata} />
        ) : (
          <div className="bg-[#e9e5df] h-screen w-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 z-1 opacity-50" style={{ backgroundImage: `url(${bg})` }}></div>
            <div className="relative z-10 bg-[#fef6ea] p-12 rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-center max-w-md border-6 border-[#f2e3ca] flex flex-col items-center mx-4" data-aos="zoom-in">
              <img src={typo} className='w-48 mb-6' alt="Al-Shathibi" />
              <div className="w-20 h-20 bg-[#736153] rounded-full flex items-center justify-center text-[#fef7eb] text-3xl mb-6 shadow-lg">
                <FaLock />
              </div>
              <h2 className="text-[#736153] font-bold text-2xl mb-3 uppercase tracking-wide">Spinner Deactivated</h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                The selection spinner is currently disabled. Please contact the administrator or enable it in settings.
              </p>
              <div className="w-16 h-1 bg-[#736153] rounded-full opacity-30"></div>
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default HomePage