import React, { useState, useEffect, useRef } from 'react';
import AnimatedBackground from '../../component/AnimatedBackground/AnimatedBackground';
import './chatbot.css';
import SparkleOverlay from '../../component/Sparkle/SparkleOverlay';
import botImage from '../../assets/bot-image.png'; 
import Header from "../../component/header/Header";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMusicTherapy, setIsMusicTherapy] = useState(false);
  const [musicLink, setMusicLink] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    setMessages([{ sender: 'bot', text: "Hello! I'm your HealthBot. How can I assist you today?" }]);
  }, []);

  useEffect(() => {
    if (isMusicTherapy && musicLink && audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.error("Audio playback was blocked:", err);
        }
      };
      playAudio();
    }
  }, [musicLink]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://127.0.0.1:5000/process', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }), 
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      if (!data.response) throw new Error("Invalid response format from API");

      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMessage]);

      // Check if chatbot detects sadness
      if (data.isSad && data.music) {
        setIsMusicTherapy(true);
        setMusicLink(data.music);
      } else {
        setIsMusicTherapy(false);
      }

    } catch (error) {
      console.error('Chatbot API Error:', error.message);
      setMessages((prev) => [...prev, { sender: 'bot', text: `Error: ${error.message}` }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <AnimatedBackground>
      <Header />
      <div className="chatbot-container">
        <div className="chat-window">
          <SparkleOverlay />
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.sender === 'bot' && <img src={botImage} alt="Bot" className="bot-image" />}
                <div className="message-content" dangerouslySetInnerHTML={{ __html: message.text }} />
              </div>
            ))}
          </div>
          
          {isMusicTherapy && musicLink && (
            <div className="music-therapy">
              <h3>Feeling low? Try some music therapy! 🎶</h3>
              <audio ref={audioRef} controls autoPlay muted>
                <source src={musicLink} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

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


