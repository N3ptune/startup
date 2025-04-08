import React, { useState, useEffect, useRef } from 'react';
import './lobby.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './lobby.css';
 import { Draft } from '../draft/draft';
 import ChatClient from './ChatClient'; // Import the ChatClient

 export function Lobby({ user }) {
  const [lobbyName, setLobbyName] = React.useState('');
  const [lobbySet, setLobbySet] = React.useState('Set');
  const [players, setPlayers] = React.useState('0');
  const [lobbyNum, setLobbyNum] = React.useState('');
  const navigate = useNavigate();

  const [messages, setMessages] = React.useState([
    { event: 'system', from: 'System', message: 'Welcome to the chat!' }
  ]);
  const [newMessage, setNewMessage] = React.useState('');
  const [chatClient, setChatClient] = React.useState(null);
  const username = user?.email || 'Guest';

  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    const client = new ChatClient();
  
    client.addObserver((chat) => {
      console.log('Received chat:', chat);  // Log received chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { event: 'received', from: chat.from, message: chat.msg }
      ]);
    });
  
    setChatClient(client);
  }, []);
  
  const sendMessage = () => {
    if (newMessage.trim() && chatClient && chatClient.connected) {
      console.log('Sending message:', newMessage);  // Log the message
      chatClient.sendMessage(username, newMessage.trim());
      setNewMessage('');
    } else {
      console.log('Message is empty or not connected.');
    }
  };
   
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  

  function joinLobby() {
    console.log("join lobby");
    navigate('/draft');
  }

  return (
    <main className="main-area">
              <button onClick={joinLobby}>Join</button>
      <div className="chat-box">
        <h3>Chat </h3>
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index} className={msg.event}>
              <strong>{msg.from}:</strong> {msg.message}
            </p>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="message-input-container">
          <input
            type="text"
            placeholder="Type a message"
            className="message-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={handleKeyPress}
            disabled={!chatClient?.connected}
          />
          <button 
            onClick={sendMessage} 
            className="send-button"
            disabled={!chatClient?.connected || !newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
