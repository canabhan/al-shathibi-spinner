import React, { useContext, useEffect, useState } from 'react'
import './popup.css'
import { useNavigate } from 'react-router-dom';
import { CandidateContextProvider } from '../../Context/CandidatesContext';
import { IoClose } from "react-icons/io5";
import { images } from '../../assets/Images';
import typo from '../../assets/img26/logocolor.webp'
import v3 from '../../assets/img25/v3.png'
import Cookies from "js-cookie";

const Popup = ({spinData,tossData,isSpinData,isToss ,setIsPopup,isPopup}) => {

  const [img,setImg]=useState()
  const [user,setUser]=useState()
    const navigate=useNavigate()
  var userCokie= Cookies.get("user");
 
 console.log(user,'usercookie',tossData);
 

    const {updateSub,updateCandidate, settings}=useContext(CandidateContextProvider)

    useEffect(()=>{
      if(spinData){

        getImg()

      }
    },[spinData])

useEffect(() => {
  const raw = Cookies.get('user');
  if (raw) setUser(JSON.parse(raw));
}, []);

  const getImg=async()=>{
      const imagee= images.find((item)=>{
          return item.id===spinData.st
  
        })
        console.log(imagee,'f');
        setImg(imagee.img)
  }

    const handleSub=()=>{
    updateSub(tossData)
    navigate(`/img/${tossData.candidateCode}`)
    }

    const handleFianlRound=()=>{
   updateCandidate(spinData.id)
   navigate(`/toss/${spinData.st}`)
   setIsPopup(false)
    }

    const handleToss=()=>{
    const spinType = settings?.spinnerType || "THIRD_ROUND";
    if (spinType === 'THIRD_ROUND') {
      handleFianlRound()
    } else if (spinType === 'SECOND_ROUND') {
      handleSecondRound()
    } else {
      if (user && user.email === 'secondspin@gmail.com') {
        handleSecondRound()
      } else {
        handleFianlRound()
      }
    }
    }

    const handleSecondRound = () => {
    updateCandidate(spinData.id)

    navigate(`/img/${spinData.st}`)
    // setSorted([])

    setIsPopup(false)

  }
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
  <div
    data-aos="zoom-in-up"
    className="relative w-[760px] rounded-[36px] overflow-hidden bg-[#FFFBF4] shadow-[0_25px_60px_rgba(0,0,0,.28)]"
  >
    {/* Background Pattern */}
    <img
      src={v3}
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] opacity-[0.08]"
      alt=""
    />

    {/* Close */}
    <button
      onClick={() => setIsPopup(false)}
      className="absolute top-6 right-6 z-20 h-11 w-11 rounded-full bg-[#D94B20] text-white flex items-center justify-center text-xl hover:scale-105 transition"
    >
      <IoClose />
    </button>

    {/* Logo */}
    <div className="relative z-10 flex justify-center pt-8">
      <img
        src={typo}
        className="w-60"
        alt=""
      />
    </div>

    {spinData ? (
      <div className="relative z-10 px-12 pb-10 pt-4">

        <div className="flex gap-10 items-center ">

          {/* Profile */}

          <div className="flex-shrink-0 mb-15">
            <div className="w-48 h-48 rounded-full border-[5px] border-[#D44A1E] p-1 shadow-[0_10px_30px_rgba(255,140,0,.25)]">
              <img
                src={spinData.img}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>
          </div>

          {/* Details */}

          <div className="flex-1">

            <h1 className="text-[30px] font-bold text-[#D44A1E] leading-none">
              {spinData.st}
            </h1>

            <h2 className="mt-2 text-[25px] uppercase font-medium text-[#5A2D1A]">
              {spinData.name}
            </h2>

            <div className="mt-4 space-y-2">

              <div className="flex">
                <span className="font-bold text-[#D44A1E] w-28">
                  PLACE:
                </span>

                <span className="uppercase text-[#50352A] font-medium">
                  {spinData.place}
                </span>
              </div>

              <div className="flex  ">
                <p className="font-bold text-[#D44A1E] w-30">
                  INSTITUTION:
                </p>

                <p className="uppercase text-[#50352A] font-medium ">
                  {spinData.institution}
                </p>

              </div>

            </div>

            <div className="flex justify-end mt-5">

              <button
                onClick={handleToss}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#E44C1D] to-[#C53717] text-white text-1xl font-semibold shadow-lg hover:scale-105 transition"
              >
                Next →
              </button>

            </div>

          </div>

        </div>

      </div>
    ) : (
      <div className="relative z-10 px-12 pb-10 pt-10">

        <div className="flex justify-center">

          <p className="arabic text-4xl text-[#D44A1E] text-center">
            {tossData.sub}
          </p>

        </div>

        <div className="flex justify-end mt-12">

          <button
            onClick={handleSub}
            className="px-10 py-3 rounded-full bg-gradient-to-r from-[#E44C1D] to-[#C53717] text-white text-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Next →
          </button>

        </div>

      </div>
    )}
  </div>
</div>
  )
}

export default Popup