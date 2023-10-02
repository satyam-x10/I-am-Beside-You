import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import bothi from "./bothi.gif";
// import { dot } from "node:test/reporters";

const AiChat = ({ setOnOpen }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello, How can I help you?",
      role: "bot-message",
    },
  ]);
  const [, setChatbotResponse] = useState("");
  const [chatVisible] = useState(true); // Track chat visibility

  const apiKey = process.env.REACT_APP_apikey;

  const chatMessagesRef = useRef();

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);
  const url = 'https://robomatic-ai.p.rapidapi.com/api';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
    },
    body: new URLSearchParams({
      in: message,
      op: 'in',
      cbot: '1',
      SessionID: 'RapidAPI1',
      cbid: '1',
      key: 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP',
      ChatSource: 'RapidAPI',
      duration: '1'
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatMessages((prev) => [
      ...prev,
      {
        message: message,
        role: "user-message",
      },
    ]);
    setMessage("");

    try {
      const response = await fetch(url, options);

    const responseData = await response.json(); // Assuming the response is in JSON format

  const chatbotResponse = responseData.out;
      ;
      console.log(chatbotResponse);
      setChatbotResponse(chatbotResponse);
      setChatMessages((prev) => [
        ...prev,
        {
          message: chatbotResponse,
          role: "bot-message",
        },
      ]);
    } catch (error) {
      console.error("Error sending message to the AI bot:", error);
      alert("Error sending message : SERVER IS BUSY");
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  // Function to handle "Go back" button click
  const handleGoBack = () => {
    setOnOpen(false) // Hide the chat modal
  };

  return (
    <ModalContent>
      {chatVisible && (
        <div id="chat-window">
          <div><button id="goback" onClick={handleGoBack}>Go back</button>
            <div className="main-title">ASK ME ANYTHING !!</div>
            <img src={bothi} alt="" />
          </div>

          <div id="chat-messages" ref={chatMessagesRef}>
            {chatMessages.map((Message) => (
              <div className={`message ${Message.role}`} key={Math.random()}>
                <span className="msgchat">{Message.message}</span>
              </div>
            ))}
          </div>
          <form id="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="chat-input"
              autoComplete="off"
              placeholder="Type your message "
              required
              value={message}
              onChange={handleInput}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </ModalContent>
  );
};
// The rest of your styled components...

const ModalContent = styled.div`
  font-family: "Open Sans", sans-serif;
  z-index: 1;
  position: fixed; /* Use fixed positioning to keep the modal in place */
  top: 45%; /* Center vertically */
  left: 40%; /* Center horizontally */
  transform: translate(
    -50%,
    -50%
  ); /* Center both vertically and horizontally */
  z-index: 1000; /* Set a high z-index value to make the modal appear on top */
  background-color: transparent;

  #chat-window {
    width: 100vw;
    height: 100vh;
    margin: auto 0 0 10%;
    background: #319795;
    padding: 40px 0px;
    border: 0.31rem solid black;
    border-radius: 10px;
    margin-top: 50px;
    img {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 10%;
      right: 0%;
      
    }
  }
  #goback{
  margin :0 20px;
    padding: 10px 20px;
    background-color: #182126;
    color: white;
    border-radius: 10px;
  }
  .msgchat {
    margin: auto 10px;
  }
  #chat-messages {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    height: calc(100vh - 200px);
    max-height: calc(100vh - 200px);
    overflow: auto; /* Use "auto" to enable scrolling */
  }

  /* Style the custom scrollbar for Webkit browsers (Chrome, Safari, etc.) */
  #chat-messages::-webkit-scrollbar {
    width: 0; /* Set the width to 0 to hide the scrollbar */
  }

  /* Style the custom scrollbar for Firefox */
  #chat-messages {
    scrollbar-width: none; /* Use "none" to hide the scrollbar in Firefox */
  }

  #chat-form {
    padding: 0 10%;
    display: flex;
    align-items: center;
  }

  #chat-input {
    
    flex-grow: 1;
    padding: 10px 10px;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  button[type="submit"] {
    padding: 10px ;
    border-radius: 10px;
    background-color: #f7efe5;
    color: #674188;
    border: none;
    font-size: 1rem;
    font-weight: bold;
  }

  .bot-message {
    font-family: "Roboto", sans-serif;
    background-color: #fffbf5; /* different light color */
    text-align: justify; /* keep it right-aligned */
    padding: 1px; /* added padding */
    margin-top: 10px; /* added margin-top to create a gap */
    margin-bottom: 10px;
    display: inline;
    align-items: center;
    // font-style: italic;
    border-radius: 40px;
    background-color: orange;
    float: left;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    clear: both;
  }

  .user-message {
    font-family: "Roboto", sans-serif;
    background-color: #182126;
    text-align: justify; /* keep it right-aligned */
    padding: 1px; /* added padding */
    margin-top: 0px; /* added margin-top to create a gap */
    // margin-bottom: 5px;
    display: inline;
    align-items: center;
    // font-style: italic;
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    clear: both;
    border-radius: 40px;
    color: white;
    padding : 10px 0px;
  }
  .user-message img,
  .bot-message img {
    width: 30px; /* adjust the width of the icon */
    height: 30px; /* adjust the height of the icon */
    // margin-right: 20px; /* add some margin to separate the icon from the message */
    margin: 10px 10px 5px 5px; /* add some margin to separate the icon from the message */
    border: 0.2rem solid rgb(50, 114, 77);;
    border-radius: 50%;
    margin: 5px;
  }
  
  .main-title {
    font-size: 1.5rem;
    text-align: center;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    margin-bottom: 0.5rem;
    color: white;
    // font-style: italic;
  }
`;

export default AiChat;