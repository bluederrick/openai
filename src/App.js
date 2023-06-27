// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react'

// import * as AppLogo from './Assets/openAI.jpeg'
import LogoPic from './Images/openAI.jpeg';
import axios from 'axios';


function App() {
  const [prompt, SetPrompt] = useState("");
  const [response, SetResponse] = useState("");
  const [loading, SetLoading] = useState(false);

  // useEffect(() => {
  const HandleSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true)



    const response = await axios.post("http://localhost:4000/chats", { prompt }
    )
    SetResponse(response.data)
    // console.log(response.data)
    SetLoading(false)

  }


  return (
    <div className="Wrapper">
      <img src={LogoPic} alt="react Logo" className={loading ? 'cg-loading' : 'cg'} />
      <form onSubmit={HandleSubmit}>
        <input type="text" name="" id="" placeholder='ask anything ? ..........' value={prompt} onChange={(e) => {
          SetPrompt(e.target.value)
        }} />
        <button type="submit">ask</button>
      </form>
      <p className="response-area">
        {loading ? "loading........" : response}

      </p>
    </div>
  );
}
export default App; 
