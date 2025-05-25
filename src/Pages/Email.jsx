import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const Email = () => {
    const location = useLocation();
    const [subject,setSubject] = useState(location.state.response.response.subject);
    const [body,setBody] = useState(location.state.response.response.body);
    console.log(location.state.response);
    return (
    <div className="mainbg w-screen h-screen bg-[#0B0A0F] flex items-center justify-center gap">
         <form action={`mailto:your-email@example.com?subject=New%20Form%20Submission`} className='hidden' method="post" enctype="text/plain" id="mailSend">
            <input type="submit" value="" className='hidden' id="mailbtn" />
         </form>
        <div className="w-[500px] h-[500px] bg-[#0B0A0F] border border-[#181522] rounded-[30px] p-[20px] flex flex-col">
            <input type="email" name="" id="" className='w-full h-10 outline-none text-white' placeholder='to email' />
            <input type="text" name="" id="" className='w-full h-10 outline-none text-white mt-[2px]' placeholder='subject' value={subject} />
            <textarea name="" id="" className='w-full flex-auto outline-none text-white mt-[12px]' placeholder='body' value={body}></textarea>
            <div className="animebtn w-full h-[40px] flex items-center justify-center bg-[#61428C] rounded-full mt-[20px]" onClick={()=>document.getElementById("mailbtn").click()}><span className='text-[12px] text-white'>send mail</span></div>
        </div>
    </div>
  )
}

export default Email