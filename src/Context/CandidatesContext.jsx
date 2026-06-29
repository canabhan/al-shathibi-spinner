import React, { createContext, useState, useEffect } from 'react'
import { db } from '../Firebase Folder/FirebaseConfig'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
import { CANDIDATES } from '../utility/Constants';
export const CandidateContextProvider = createContext('')

const CandidatesContext = ({ children }) => {
  const [allCandidates, setAllCandidates] = useState([])
  const [subs, setSubs] = useState([])
  const [isBox, setIsBox] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isPopup, setIsPopup] = useState(false)
  const [settings, setSettings] = useState({
    spinnerEnabled: true,
    spinnerType: "THIRD_ROUND",
    uloomQuestionsEnabled: true,
    rawiQuestionsEnabled: true,
    isHideLockedRawiQuestion: false,
    isHideLockedUloomQuestions: false,
  });

  const usersCollectionRef = collection(db, CANDIDATES);
  const subjectsRef = collection(db, "thirdRoundSurahs");
  
  useEffect(() => {
    getCandidates()
    getSubjects()
    // getAllRavi()
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "settings"), (snapshot) => {
      if (!snapshot.empty) {
        const docObj = snapshot.docs.find(d => d.id === 'config') || snapshot.docs[0];
        const data = docObj.data();
        
        const spinnerEnabled = data.spinnerEnabled !== undefined ? data.spinnerEnabled : true;
        const spinnerType = data.spinnerType || "THIRD_ROUND";
        
        const uloomQuestionsEnabled = data.uloomQuestionsEnabled !== undefined 
          ? data.uloomQuestionsEnabled 
          : (data.uloomQuestionEnabled !== undefined 
             ? data.uloomQuestionEnabled 
             : (data.uloomQuestionandEnabled !== undefined 
                ? data.uloomQuestionandEnabled 
                : true));
             
        const rawiQuestionsEnabled = data.rawiQuestionsEnabled !== undefined 
          ? data.rawiQuestionsEnabled 
          : (data.rawiQuestionEnabled !== undefined 
             ? data.rawiQuestionEnabled 
             : (data.rawiQuestions !== undefined 
                ? data.rawiQuestions 
                : true));

        const isHideLockedRawiQuestion = data.isHideLockedRawiQuestion !== undefined
          ? data.isHideLockedRawiQuestion
          : false;

        const isHideLockedUloomQuestions = data.isHideLockedUloomQuestions !== undefined
          ? data.isHideLockedUloomQuestions
          : false;

        setSettings({
          spinnerEnabled,
          spinnerType,
          uloomQuestionsEnabled,
          uloomQuestionEnabled: uloomQuestionsEnabled,
          rawiQuestionsEnabled,
          rawiQuestionEnabled: rawiQuestionsEnabled,
          isHideLockedRawiQuestion,
          isHideLockedUloomQuestions
        });
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
    });
    return () => unsub();
  }, []);
  
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);


  useEffect(() => {
    if (isPopup) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';

    }

  }, [isPopup])




  const getCandidates = async () => {
    setLoader(false)
    const candidatesSnapshot = await getDocs(usersCollectionRef);
    setAllCandidates(candidatesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log(candidatesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })), 'allcandidates');
    setLoader(true)
  }

  const getSubjects = async () => {
    const subjectsSnapshot = await getDocs(subjectsRef);
    setSubs(subjectsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

  }

  //  const getAllRavi = async () => {
  //   const raviSnapshot = await getDocs(raviRef);
  //   const data= raviSnapshot.docs.map((doc) => ({ ...doc.data()}))
  //   console.log(data,'data ravi');
  //   return data
  // } 
  const updateCandidate = async (candId, sub, subId) => {
    try {
          console.log(sub,'updating third tound')
      const docRef = doc(db, CANDIDATES, candId);
      const isSecondRound = settings?.spinnerType === "SECOND_ROUND";

      const updateData = {};
      if (isSecondRound) {
        updateData.isCompletedSecondRound = true;
        updateData.secondRoundCompletedAt = new Date();
      } else {
        updateData.isCompletedThirdRound = true;
        updateData.thirdRoundCompletedAt = new Date();
        updateData.status = "COMPLETED"; // Mark candidate status completed
        if (sub) {
          console.log(sub,'updating third tound')
          updateData.thirdRoundSurah = sub;
          // updateData.finalroundsurah = sub; // legacy fallback
        }
        if (subId) {
          updateData.thirdRoundSurahId = subId;
        }
      }

      // Legacy fallback
      // updateData.isRecited = true;

      await updateDoc(docRef, updateData);
      await Promise.all([getSubjects(), getCandidates()]);
    } catch (err) {
      console.error("Failed to update candidate:", err);
    }
  };

  const updateSub = async (surahData) => {
    console.log(surahData, 'q query');

    const HeroRef = doc(db, 'thirdRoundSurahs', surahData.id);

    await updateDoc(HeroRef, {
      locked: true
    });
    
    updateCandidate(surahData.candidateId, surahData.sub, surahData.id)

  }

  return (
    <CandidateContextProvider.Provider value={{ loader, setLoader, isBox, setIsBox, allCandidates, setAllCandidates, subs, updateSub, updateCandidate,isPopup, setIsPopup, settings }}>
      {children}
    </CandidateContextProvider.Provider>
  )
}

export default CandidatesContext