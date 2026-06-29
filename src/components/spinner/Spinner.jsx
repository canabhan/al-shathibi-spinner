

import React, { useState, useEffect, useContext } from "react";
import { SpinWheel } from "react-spin-wheel";
import "react-spin-wheel/dist/index.css";
import { useNavigate } from "react-router-dom";
import "./spinner.css";
import Popup from "../popup/Popup";
import { CandidateContextProvider } from "../../Context/CandidatesContext";
import Loader from "../loder/Loader";
import bg from '../../assets/images/bg.png'


const Spinner = ({ spinData }) => {
  const [result, setResult] = useState("");
  const { sorted, isPopup, setIsPopup,allCandidates } = useContext(CandidateContextProvider);
console.log(spinData,'dataaa');

  const handleSpinResult = (code, id,name,institution,img,place) => {

    
    // console.log("fd", name,img);

    const data = {
      st: code,
      id: id,
      name:name,
      institution:institution,
      img:img,
      place:place
    };
    if (code !== "AL-SHATHIBI") {
      console.log("hd");

      setResult(data);
      setTimeout(() => setIsPopup(true), 1000);
    }
  };
  return (
    <><div
  className="relative min-h-screen overflow-hidden flex items-center justify-center"
  style={{
    background:
      "radial-gradient(circle at center, #FFB14A 0%, #F67A2B 40%, #D84A20 70%, #B52D16 100%)",
  }}
>
  {/* Background Texture */}
  <img
    src={bg}
    alt=""
    className="absolute inset-0 w-full h-full object-cover opacity-10"
  />

  {/* Glow Behind Wheel */}
  <div
    className="absolute rounded-full"
    style={{
      width: 760,
      height: 760,
      background:
        "radial-gradient(circle, rgba(255,230,150,.75) 0%, rgba(255,180,70,.35) 45%, transparent 75%)",
      filter: "blur(35px)",
    }}
  />

  {isPopup && (
    <Popup
      spinData={result}
      isSpinData
      setIsPopup={setIsPopup}
    />
  )}

  <div className="relative z- flex items-center justify-center">

    {/* Pointer */}
    <div
      className="absolute z-20"
      style={{
        top: -25,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {/* <div
        style={{
          width: 38,
          height: 50,
          background:
            "linear-gradient(180deg,#E14B22,#BC2F16)",
          borderRadius: "50% 50% 50% 0",
          transform: "rotate(-45deg)",
          boxShadow: "0 10px 20px rgba(0,0,0,.18)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#fff",
            top: 9,
            left: 9,
          }}
        />
      </div> */}
    </div>

    <SpinWheel
      items={[...spinData]}
      size={620}
      itemColors={[
        "#d3410a",
        "#ec8a3d",
        "#ed9950",
        "#ec8136",
        
      ]}
      resetActionName="spin"

      spinWheelStyle={{
        background: "#E96A2B",
        border: "5px solid #E96A2B",
        borderRadius: "50%",
        boxShadow: `
          0 0 80px rgba(255,190,70,.45),
          inset 0 0 18px rgba(255,255,255,.65)
        `,
      }}

      spinContainerStyle={{
        background: "transparent",
        boxShadow: "none",
      }}

      spinItemStyle={{
        color: "#E6C8A2",
        fontSize: "20px",
        fontWeight: 600,
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}

      spinButtonStyle={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background:
          "linear-gradient(180deg,#C73A17,#A92C15)",
        color: "#fff",
        fontSize: "26px",
        fontWeight: 700,
        border: "6px solid #FFF5E7",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.22), inset 0 2px 6px rgba(255,255,255,.18)",
      }}

      resetButtonStyle={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background:
          "linear-gradient(180deg,#C73A17,#A92C15)",
        color: "#fff",
        border: "6px solid #FFF5E7",
      }}

      onFinishSpin={(item) => {
        handleSpinResult(
          item.name,
          item.id,
          item.realName,
          item.institution,
          item.img,
          item.place
        );
      }}
    />
  </div>
</div>
    </>
  );
};

export default Spinner;
