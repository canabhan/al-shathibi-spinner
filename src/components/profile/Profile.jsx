import React, { useContext, useEffect, useState } from 'react'
import v1 from '../../assets/img25/v1.webp'
import typo from '../../assets/img26/typo.webp'
import prize from '../../assets/img26/prize.webp'
import first from '../../assets/img26/firstwhite.webp'
import second from '../../assets/img26/secondwhite.webp'
import third from '../../assets/img26/thirdwhite.webp'
import v3 from '../../assets/img25/v3.png'
import bg from '../../assets/images/bg.png'
import v2 from '../../assets/images/vbig.png'
// import img from '../../assets/user/ST201.jpg'
import { images } from '../../assets/Images'
import { useNavigate } from 'react-router-dom'
import { CandidateContextProvider } from '../../Context/CandidatesContext';

const Profile = ({userData}) => {

     const [img,setImg]=useState()
     const [raviQuestion,setRaviQuestions]=useState()
     const [uloomQuestions,setUloomQuestions]=useState()
     const navigate=useNavigate()
       const { settings} = useContext(CandidateContextProvider);
     
      console.log(userData,'usernew');
      useEffect(()=>{
          getImg()
      },[userData])

      useEffect(()=>{
       if(userData){
       
       }
      },[])
  
      const getImg=async()=>{
          const imagee= images.find((item)=>{
              return item.id===(userData.stCode || userData.code)
      
            })
            console.log(imagee,'f');
            setImg(imagee.img)
      }

      const handleNavigate=()=>{
        navigate(`/question/${userData.stCode || userData.code}`,{state:{ravi:userData.rawiName,raviCode:userData.rawiId,rawiEnabled:settings?.rawiQuestionsEnabled ?? settings?.rawiQuestionEnabled,uloomEnabled:settings?.uloomQuestionsEnabled ?? settings?.uloomQuestionEnabled}})
      }

  return (
//     <div className="bg-[#e9e5df] h-screen !overflow-hidden relative "  >
//     <div className="absolute inset-0  z-1 opacity-50 "  style={{ backgroundImage: `url(${bg})` }}></div>
//       <img src={v3} className='fixed w-[1200px] z-8 -bottom-[700px]  left-1/2 -translate-x-1/2 animate-[spin_35s_linear_infinite]' alt="" />
       
//       {/* <img src={bg} className='absolute h-screen object-cover top-0 bottom-0 left-0 right-0 w-full opacity-50' alt="" /> */}
//       <img src={v1} className='fixed -top-60 -left-60' alt="" />
//       <img src={v1} className='fixed -top-60 -right-60' alt="" />
//       <div className="!mt-[40px] flex flex-col  h-full relative z-10">

//         <div className="flex gap-8 -mt-8 justify-center items-center ">
//         <img src={typo} className='w-80 ' alt="" />
//         <div className="flex gap-6">
//            <img src={second} className='w-25 h-25 object-cover' alt="" />
//            <img src={first}  className='w-25 h-25 object-cover scale-115' alt="" />
//            <img src={third}  className='w-25 h-25 object-cover' alt="" />
//         </div>
//         </div>

//         <div className="flex gap-6 !mt-2">
//           <div className="w-1/2 bg-[#ab9c90] rounded-r-full arabic text-right text-white !py-3 text-2xl !px-6"> {userData.rawiName}</div>
//           <div className="w-1/2 bg-[#736153] rounded-l-full arabic text-white !py-3 text-2xl !px-6"> {userData.status==='SECOND_ROUND'? userData.secondRoundSurah:userData.thirdRoundSurah}</div>
//         </div>

//         <div className="w-2/3 mt-15 overflow-hidden relative bg-[#fef5ee] self-center flex justify-center gap-15 items-end shadow-[0_5px_15px_rgba(0,0,0,0.35)]  rounded-t-[70px] grow-1 !px-30">
//         <img src={v2} className='absolute -top-40 -left-40 w-130 z-1 opacity-65' alt="" />
//         <div className="w-1/2 flex justify-end z-10 relative">
//         <div className="w-55 h-80 bg-[#c5ae9c] rounded-t-full flex justify-center border-4 shadow-2xl border-white ">
//           <img src={userData.photoUrl} className='w-35 h-35 rounded-full  object-cover !-mt-20 border-6 shadow-4xl border-[#736153]' alt="" />
//         </div>
//         </div>
//         <div className="w-2/3 h-70 z-10 relative !mb-35">
//           <p className='text-2xl'>STB NO: <span className=' !pl-1 uppercase text-2xl font-medium'>{userData.stCode || userData.code}</span> </p>
//           <h1 className='font-bold text-3xl  uppercase  leading'>{userData.name} </h1>
//           <p className='-mt-2 text-sm'>{userData.place}</p>
//           <p className='!mt-3'>STB NO: <span className=' !pl-1 uppercase font-medium'>{userData.stCode || userData.code}</span> </p>
// <div className="flex items-start gap-1">
//   <span className="whitespace-nowrap ">INSTITUTION:</span>
//   <span className="uppercase font-medium break-words">{userData.institution}</span>
// </div>

// <div className="flex mt-4">
//   <button className='bg-[#c5ae9c] px-4 py-1 rounded-3xl arabic' onClick={handleNavigate}>الأسئلة</button>
// </div>

//         </div>
//         </div>
//       </div>
//     </div>

<div className="relative h-screen overflow-hidden bg-[#c93f11]">

  {/* Background texture */}
  <div
    className="absolute inset-0 opacity-25"
    style={{ backgroundImage: `url(${bg})` }}
  />

  {/* Rotating ornament */}
  <img
    src={v3}
    className="fixed left-1/2 -translate-x-1/2 bottom-[-720px] w-[1300px] opacity-30 animate-[spin_35s_linear_infinite]"
    alt=""
  />

  {/* Side ornaments */}
  {/* <img
    src={v1}
    className="fixed -left-[260px] top-1/2 -translate-y-1/2 w-[520px]"
    alt=""
  />

  <img
    src={v1}
    className="fixed -right-[260px] top-1/2 -translate-y-1/2 w-[520px] rotate-180"
    alt=""
  /> */}

  <div className="relative z-10 h-full flex flex-col px-10 pt-10 ">

    {/* ================= Header ================= */}

    <div className="flex justify-center items-center gap-16">

      <img
        src={typo}
        className="w-[250px]"
        alt=""
      />

     
     
   <div className="flex gap-6">

        <img
          src={third}
          className="w-28 h-28"
          alt=""
        />

        <img
          src={first}
          className="w-32 h-32 scale-110"
          alt=""
        />

        <img
          src={second}
          className="w-28 h-28"
          alt=""
        />

      </div> 

    </div>

    {/* ================= Orange Pills ================= */}

    <div className="flex gap-4 mt-6">

      <div
        className="
        w-1/2
        h-14
        rounded-full
        bg-[#9e2c0b]
        shadow-inner
        flex
        items-center
        justify-end
        px-8
        text-white
        text-xl
        arabic
        "
      >
        {userData.rawiName}
      </div>

      <div
        className="
        w-1/2
        h-14
        rounded-full
        bg-[#9e2c0b]
        justify-start
        shadow-inner
        flex
        items-center
        px-8
        text-white
        text-xl
        arabic
        "
      >
        {userData.status === "SECOND_ROUND"
          ? userData.secondRoundSurah
          : userData.thirdRoundSurah}
      </div>

    </div>

    {/* ================= Main Card ================= */}

    <div
      className="
      relative
      flex
      mt-8
      grow
      self-center
      w-[72%]
      overflow-hidden
      rounded-t-[60px]
      bg-[#fff5ed]
      shadow-[0_20px_50px_rgba(0,0,0,.28)]
      "
    >

      {/* Top left ornament */}

      {/* <img
        src={v2}
        className="
        absolute
        -left-36
        -top-36
        w-[420px]
        opacity-70
        "
        alt=""
      /> */}

      {/* Left Section */}

      <div className="relative w-[42%] flex justify-center items-end pb-0">

        {/* Floating Circle */}

        {/* <div
          className="
          absolute
          top-[150px]
          right-[95px]
          w-28
          h-28
          rounded-full
          border-[5px]
          border-[#a83913]
          bg-transparent
          z-20
          "
        /> */}

        {/* Arch */}

        <div
          className="
          relative
          w-[220px]
          h-[380px]
          rounded-t-[140px]
          bg-gradient-to-b
          from-[#ef6b28]
          to-[#cb3b10]
          border-[8px]
          border-white
          flex
          justify-center
          "
        >

          <img
            src={userData.photoUrl}
            className="
            absolute
            -top-20
            w-40
            h-40
            rounded-full
            object-cover
            border-[7px]
            border-[#a83913]
            shadow-2xl
            "
            alt=""
          />

        </div>

      </div>

      {/* Right Section */}

      <div
        className="
        flex-1
        px-7
        pt-14
        text-[#8d2d11]
        "
      >

        <p className="text-xl tracking-wide">
          STB NO :
          <span className="font-bold ml-2 text-[#cb4a18]">
            {userData.stCode || userData.code}
          </span>
        </p>

        <h1
          className="
          mt
          text-[28px]
          font-extrabold
          uppercase
          leading-tight
          "
        >
          {userData.name}
        </h1>

        <p className="text-2xl">
          {userData.place}
        </p>

        <div className="mt-4">

          <p className="text-xl">
            STB NO :
            <span className="font-semibold ml-2">
              {userData.stCode || userData.code}
            </span>
          </p>

          <div className="flex  gap-2 text-xl">

            <span>INSTITUTION:</span>

            <span className="font-semibold uppercase">
              {userData.institution}
            </span>

          </div>

        </div>

        <button
          onClick={handleNavigate}
          className="
          mt-10
          rounded-full
          bg-[#df5b21]
          px-8
          py-2
          text-white
          arabic
          text-xl
          shadow-lg
          hover:scale-105
          duration-300
          "
        >
          الأسئلة
        </button>

      </div>

    </div>

  </div>

</div>
  )
}

export default Profile
