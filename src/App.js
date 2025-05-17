import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'You', text: input };
    setMessages(prev => [...prev, userMessage]);

    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const botMessage = { sender: 'Bot', text: data.response };
    setMessages(prev => [...prev, botMessage]);
    setInput('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <h1>Flask Chatbot</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'You' ? 'user' : 'bot'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
