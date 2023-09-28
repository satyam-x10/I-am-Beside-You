import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import styled from "styled-components";
import axios from "axios";
import bothi from "./bothi.gif";
const AiChat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello, How can I help you?",
      role: "bot-message",
    },
  ]);
  const [chatbotResponse, setChatbotResponse] = useState("");

  const apiKey = "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";

  // Move the useRef inside the component
  const chatMessagesRef = useRef();

  useEffect(() => {
    // Scroll the chat messages container to the bottom
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
      // Use axios library to make a POST request to the OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: message,
          model: "text-davinci-003",
          temperature: 0,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      const chatbotResponse = response.data.choices[0].text;
  
      setChatbotResponse(chatbotResponse);
      setChatMessages((prev) => [
        ...prev,
        {
          message: chatbotResponse,
          role: "bot-message",
        },
      ]);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error sending message to the AI bot:", error);
    }
  };
  

  const handleInput = (e) => {
    setMessage(e.target.value);
  };



  return (
    <ModalContent>
      <div id="chat-window" >
        
        <div className="main-title">ASK ME ANYTHING !!</div>
        <img h="50px" src={bothi}  alt="" />
        <div id="chat-messages" ref={chatMessagesRef}>
          {chatMessages.map((Message) => (
            <div className={`message ${Message.role}`}>
              {/* <img
                src={require(`../assets/${Message.role}.png`)}
                alt={`${Message.role}`}
                srcSet=""
              /> */}
              <span className="msgchat">{Message.message}</span>
            </div>
          ))}
        </div>
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="chat-input"
            autoComplete="off"
            placeholder="Type your message here"
            required
            value={message}
            onChange={handleInput}
          />
          <button type="submit">Send</button>
        </form>
      </div>
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
   
    width: 75vw;
    margin: 0 auto;
    background: #319795;
    padding: 20px;
    border: 0.31rem solid black;
    border-radius: 10px;
    margin-top: 50px;
    img {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 10%;
      right: 10%;
      
    }
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
    display: flex;
    align-items: center;
  }

  #chat-input {
    flex-grow: 1;
    padding: 10px;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  button[type="submit"] {
    padding: 10px 20px;
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
  @media only screen and (min-device-width: 320px) and (max-device-width: 400px) {
    #chat-window {
      width: 90%;
    }
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