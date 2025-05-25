import React, { useEffect, useState } from 'react'
import PdfViewer from '../Pdfview'
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const [response,setResponse]  = useState(location.state.response.response);
  const [active,setActive]  = useState(0);
  console.log(response);
  return (
    
    <div className="mainbg w-screen h-screen bg-[#0B0A0F] flex items-center justify-center">
        <div className="maincont w-[90vw] h-[90vh] bg-[#0f0e13] border border-[#181522] rounded-[20px] flex p-[10px]">
            <div className="aspect-[1/1.413] h-full bg-[#181522] rounded-[10px] relative overflow-hidden">
                <PdfViewer pdfUrl={location.state?.response ?location.state.url: "./src/assets/test.pdf"} />
            </div>
            <div className=" w-[300px] h-[50%] flex flex-col ml-[20px]">
                <span className='text-[28px] text-white font-semibold ml-[4px]'>Vulnerabilities Found</span>
                <div className="w-full h-full border border-[#181522] border-r-0 bg-[#0B0A0F] rounded-l-[20px] flex flex-col gap-[8px]  overflow-hidden relative">
                    <div className="absolute w-full h-full top-0 left-0 backdrop-filter backdrop-blur-[80px] bg-opacity-10  p-[10px] flex flex-col gap-[8px] ">
                        {response.sections.map((item,index)=>{
                            return(
                            <div className="animebtn w-full h-[40px] bg-[#181522] border border-[#181522] rounded-full flex gap-2 px-[5px] py-[5px] items-center" onClick={()=>{setActive(index)}}>
                                <div className="h-full aspect-square bg-[#fff] rounded-full flex items-center justify-center"><span className='text-[12px]'>{index + 1}</span></div>
                                <span className='text-[10px] font-normal text-white'>{item.title}</span>
                            </div>
                            );
                        })}

                    </div>
                </div>
            </div>
            <div className="flex-auto h-full bg-[#0B0A0F] border border-[#181522] rounded-[10px]  rounded-bl-[10px] overflow-hidden relative">
                    <div className="absolute w-full h-full top-0 left-0 backdrop-filter backdrop-blur-[80px] bg-opacity-10 px-[20px] py-[10px] flex flex-col gap-[8px]">
                        <span className='text-[28px] text-white font-semibold'>{response.document_name}</span>
                        <div className="flex flex-col gap-[2px]">
                            <span className='text-[12px] font-semibold text-[#ffffff75]'>summary</span>
                            <span className='text-[12px] text-white font-semibold'>{response.summary}</span>
                        </div>
                        {response.sections.map((item,index)=>{if(index == active){
                            return(
                            <>
                                <div className="flex flex-col gap-[2px]">
                                    <span className='text-[12px] font-semibold text-[#ffffff75]'>title</span>
                                    <span className='text-[12px] text-white font-semibold'>{item.title}</span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                    <span className='text-[12px] font-semibold text-[#ffffff75]'>Discription</span>
                                    <span className='text-[12px] text-white font-semibold'>{item.description}</span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                    <span className='text-[12px] font-semibold text-[#ffffff75]'>vulnerability</span>
                                    {item.vulnerabilities.map((it,index)=>{
                                        return(
                                            <span className='text-[12px] text-white font-semibold'>{it.issue}</span>
                                        );
                                    })}
                                </div>
                                
                            </>
                            );
                        }})}
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Result