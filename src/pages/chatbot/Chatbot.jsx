import React, { useState, useEffect } from 'react';
import AnimatedBackground from '../../component/AnimatedBackground/AnimatedBackground';
import './chatbot.css';
import SparkleOverlay from '../../component/Sparkle/SparkleOverlay';
import botImage from '../../assets/bot-image.png'; // Import bot image
import Header from "../../component/header/Header";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(false); // Navbar visibility state

  // Pre-generated greeting message
  useEffect(() => {
    const greetingMessage = {
      sender: 'bot',
      text: "Hello! I'm your HealthBot. How can I assist you today?",
    };
    setMessages([greetingMessage]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message immediately
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://127.0.0.1:5000/process', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }), 
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error("Invalid response format from API");
      }

      // Beautify and format the chatbot's response
      const beautifyResponse = (text) => {
        // Convert markdown headers to HTML headers
        text = text.replace(/^### (.*)$/gm, "<h3>$1</h3>");
        text = text.replace(/^## (.*)$/gm, "<h2>$1</h2>");
        text = text.replace(/^# (.*)$/gm, "<h1>$1</h1>");

        // Convert bold (**text**) and italic (*text*) markup
        text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

        // Process unordered lists (lines starting with "- " or "* ")
        const lines = text.split("\n");
        let output = "";
        let inList = false;
        lines.forEach((line) => {
          if (/^[-*] /.test(line)) {
            if (!inList) {
              output += "<ul>";
              inList = true;
            }
            line = line.replace(/^[-*] /, "");
            output += "<li>" + line + "</li>";
          } else {
            if (inList) {
              output += "</ul>";
              inList = false;
            }
            output += line + "<br>";
          }
        });
        if (inList) output += "</ul>";
        return output;
      };

      const formattedResponse = beautifyResponse(data.response);
      const botMessage = { sender: 'bot', text: formattedResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot API Error:', error.message);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `Error: ${error.message}` }
      ]);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Start a new chat (clear history)
  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <AnimatedBackground>
    <Header />

      <div className="chatbot-container">
        <div className="chat-window">
          <SparkleOverlay />
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender}`}
              >
                {message.sender === 'bot' && (
                  <img src={botImage} alt="Bot" className="bot-image" />
                )}
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                ></div>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Chatbot;