import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FileUpload from "./Pages/FileUpload";
import Result from "./Pages/Result";
// import { Home } from "./Pages/Home"
import SplineModel from "./Spline";
import EmailUpload from "./Pages/EmailUplaod";
import Email from "./Pages/Email";
import ChatBot from "./Pages/ChatBot";
import Chat from "./Pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SplineModel />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/email" element={<Email />} />
      <Route path="/emailupload" element={<EmailUpload />} />
      <Route path="/file" element={<FileUpload />} />
      <Route path="/vulnerability" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
