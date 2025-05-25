import React, { useEffect, useState } from 'react'
import PdfViewer from '../Pdfview'
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const [active,setActive]  = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  useEffect(() => {
    if(active==0){
        sendMessage();
        setActive(1);
    }
      const fetchChatHistory = async () => {
          try {
              const response = await fetch("http://localhost:5000/chat/history");
              const data = await response.json();
              if (data.success) {
                  setMessages(data.history);
              } else {
                  console.error("Error fetching history:", data.error);
              }
          } catch (error) {
              console.error("Failed to load chat history:", error);
          }
      };
      fetchChatHistory();
  }, []);

  // Function to send a message
  const sendMessage = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;

      const newMessage = { role: "User", content: input };
      document.getElementsByClassName("botinput")[0].value="";
      setMessages([...messages,newMessage,{role:"Bot",content:"thinking..."}]);


      try {
          const response = await fetch("http://localhost:5000/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: input }),
          });

          const data = await response.json();
          console.log(data);
          if (data.success) {
            setMessages([...messages,newMessage,{ role: "Bot", content: data.response.response }]);
        } else {
              console.error("Error:", data.error);
          }
      } catch (error) {
          console.error("Failed to send message:", error);
      }

    setInput("");

  };
  return (
    
    <div className="mainbg w-screen h-screen bg-[#0B0A0F] flex items-center justify-center">
        <div className="maincont w-[80vw] h-[90vh] bg-[#0f0e13] border border-[#181522] gap-[20px] rounded-[20px] flex p-[10px]">
            <div className="aspect-[1/1.413] h-full bg-[hsl(254,24%,11%)] rounded-[10px] relative overflow">
                <PdfViewer pdfUrl={location.state?.query ?location.state.url: "./src/assets/main.pdf"} />
            </div>

            <div className="w-[45vw] h-full bg-[#0B0A0F] border border-[#181522] rounded-[10px]  rounded-bl-[10px] overflow-hidden relative flex flex-col">
                <div className="w-full h-[calc(100%-60px)] p-[20px]">
                {messages.map((msg, index) => {
                    return(
                    <p key={index} className='text-white'>
                        <strong>{msg.role}:</strong> {msg.content}
                    </p>
                    )
                }
                )}
                </div>
                <div className="w-full h-[60px]  flex items-center justify-center">
                     <div className="overflow relative w-[80%] bg-gradient-to-r from-[#121115c3] via-[#110f1a] to-[#121115c3] rounded-full h-[50px] border border-[#181522]">
                        <div className="absolute top-0 left-0  w-full h-full gap-[12px] backdrop-filter backdrop-blur-[80px] bg-opacity-10 flex px-3 items-center rounded-full ">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                            <input type="text" className='botinput flex-auto h-full outline-none text-white font-semibold text-[12px]' placeholder='Enter Your Query'    onChange={(e)=>{setInput(e.target.value)}} />
                            <svg  onClick={sendMessage} id="sendbtn" className='animebtn' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat;