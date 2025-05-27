import { useEffect, useState } from 'react';
import '../App.css'
import ApiManager from '../ApiManager';
import { useNavigate } from "react-router-dom";




function ChatBot() {
  const [pdfs, setPdf] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState({});
  const [view, setView] = useState(false);

  const [url, setUrl] = useState([]);
  const [stage, setStage] = useState([]);
  const [sname, setSname] = useState(["Extracting Policies", "Retreving Data", "Analyzing Situation", "Writting Email", "Response"]);
  const [api, setApi] = useState(new ApiManager());
  const navigate = useNavigate();


  const uploadingPdf = () => {
    let file = document.getElementById("fileUpload");
    setPdf([...pdfs, file.files[0]]);
    const urlt = URL.createObjectURL(file.files[0]);
    document.getElementById("showPdf").src = urlt;
    setUrl([...url, urlt]);
  }; // Correctly close the function here


  const sendPdf = async () => {
    if (url.length > 0) {
      await extractText(url[url.length - 1]);
    } else {
      // No PDF uploaded, go straight to chat with just query
      navigate("/chat", { state: { query: query, url: null } });
    }
  };



  useEffect(() => {
    if (stage.length == 1) {
      setTimeout(() => { setStage([...stage, 2]) }, 1000);
    }
    if (stage.length == 2) {
      setTimeout(() => { setStage([...stage, 3]) }, 2000);
    }
    if (stage.length == 3) {
      setTimeout(() => { setStage([...stage, 4]) }, 2000);
    }
  }, [stage])




  async function extractText(urls) {
    document.getElementById("showPdf").src = urls;
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];

    if (!file) {
      // In case somehow called without file
      navigate("/chat", { state: { query: query, url: null } });
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let extractedText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map(item => item.str);
        extractedText += textItems.join(" ") + "\n\n";
      }

      setStage([1, 2, 3, 4, 5]);
      navigate("/chat", {
        state: {
          query: query,
          url: urls,
          extractedText, // optional: you can pass the text too if needed
        },
      });
    };
  }

  return (
    <>
      <div className="mainbg w-screen h-screen bg-[#0B0A0F] flex items-center justify-center gap-[24px]">
        <div className="mainupload w-[800px] h-[450px] bg-[#0B0A0F] border border-[#181522] rounded-[50px] flex flex-col p-[20px] gap-[12px]">
          <div className="uploadbg relative w-full h-[80%] bg-[#18152246] rounded-[30px] overflow-hidden border border-[#181522]">
            <div className="w-full h-full absolute top-0 left-0 backdrop-filter backdrop-blur-[80px] bg-opacity-10">
              <embed
                id="showPdf"
                className='z-50 w-full h-full object-cover'
                src={url.length > 0 ? url[url.length - 1] : ""}
                type=""
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="w-full flex gap-[8px]">
            {
              pdfs.map((item) => {
                return (
                  <div className="w-fit h-fit px-[10px] py-[5px] flex items-center justify-center border border-[#181522] rounded-full">
                    <span className='text-[12px] font-semibold text-[#ccc]'>{item.name}</span>
                    <svg className='ml-[8px]' xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#ccc"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                  </div>
                );
              })
            }
          </div>
          <div className="w-full h-fit mt-auto rounded-full flex items-center pl-[5px] pb-[5px] gap-[8px]">
            <input type="file" id="fileUpload" className='hidden' onChange={() => { uploadingPdf() }} />
            <div className="uploadf flex items-center justify-center bg-[#61428C] px-[20px] py-[5px] rounded-full" onClick={() => document.getElementById("fileUpload").click()}><span className='text-[12px] font-semibold text-[#ccc]'>upload</span></div>
            <div className="animebtn flex items-center justify-center bg-[#d6d0d038] px-[24px] py-[5px] rounded-full"><span className='text-[12px] font-semibold text-[#ccc]'>send</span></div>
            <div className="progress h-[10px] bg-[#cccccc21] flex-auto ml-[8px] rounded-full"></div>
          </div>
        </div>
        {
          view &&
          <div className="w-[300px] h-[450px] rounded-[30px] bg-[#0B0A0F] border border-[#181522] p-[20px] flex flex-col gap-[24px]">
            <div className="w-full h-fit"><span className='text-[24px] font-semibold text-[#fff] leading-0'>Analyzing</span></div>
            <div className="w-full flex-auto flex">
              <div className="w-fit h-fit flex flex-col gap-[20px]">
                {
                  sname.map((item, index) => {
                    if (index >= stage.length) {
                      return (
                        <div key={index} className="w-fit h-fit flex gap-[16px] items-center">
                          <div className="w-[20px] aspect-[1/1] border-3 border-t-violet-600 border-[#ffffff72] rounded-full animate-spin"></div>
                          <span className="text-[12px] font-semibold text-white">{item}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="w-fit h-fit flex gap-[16px] items-center">
                          <div className="w-[20px] aspect-[1/1] bg-green-500 rounded-full"></div>
                          <span className="text-[12px] font-semibold text-white">{item}</span>
                        </div>
                      );
                    }
                  })
                }
              </div>
            </div>
            <div className="animebtn w-full h-[40px] bg-[#181522] rounded-full flex justify-center items-center" />
          </div>
        }

        <div className="overflow-hidden bg-gradient-to-r from-[#121115c3] via-[#110f1a] to-[#121115c3] absolute bottom-[30px] left-1/2 transform -translate-x-1/2 w-[750px] rounded-full h-[50px]  border border-[#181522]">
          <div className="absolute top-0 left-0  w-full h-full gap-[12px] backdrop-filter backdrop-blur-[80px] bg-opacity-10 flex px-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            <input type="text" className='flex-auto h-full outline-none text-white font-semibold text-[12px]' placeholder='Enter Your Query' onChange={(e) => { setQuery(e.target.value) }} />
            <svg onClick={() => sendPdf()} className='animebtn' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBot;
