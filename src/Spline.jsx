import React from "react";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";
import "./index.css"

const SplineModel = () => {
  const nav = useNavigate();
  return (
    <div className="mainbg bg-[#0B0A0F] w-screen h-screen p-[20px] flex overflow-hidden relative items-center justify-between ">
      <div className="flex flex-col h-[800px]  justify-center w-[600px] items-center ">
        <span className="maintxt text-[64px] text-white font-bold tracking-wide leading-[60px]">Specter</span>
        <span className="maintxt text-[16px] tracking-wider text-[#fff7] font-semibold">Justice, Just Smarter</span>
        <div onClick={()=>nav("/file")} className="animebtn maintxt w-[300px] h-[50px] border rounded-full mt-[20px] bg-[#181522] flex items-center justify-center border-[rgba(204,204,204,0.3)] text-white">Evaluate Vulnerability</div>
        <div onClick={()=>nav("/emailupload")} className="animebtn maintxt w-[300px] h-[50px] border rounded-full mt-[20px] bg-[#181522] flex items-center justify-center border-[#cccccc4d] text-white">Draft a Mail</div>
        <div onClick={()=>nav("/chatbot")}  className="animebtn maintxt w-[300px] h-[50px] border rounded-full mt-[20px] bg-[#181522] flex items-center justify-center border-[#cccccc4d] text-white">Get Legal Assistance</div>
      </div>
      <div className="w-[600px] h-[600px] flex items-center justify-center flex-col z-50 rounded-full border border-[#181522]">
          <Spline scene="https://prod.spline.design/KyQ4Ywf5-BiQZeBG/scene.splinecode" className="bg-[#0B0A0F] rounded-[300px]" />
      </div>
    </div>
  );
};

export default SplineModel;
