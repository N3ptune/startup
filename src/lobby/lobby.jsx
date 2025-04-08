import React, { useState, useEffect, useRef } from 'react';
import './lobby.css';
import { useNavigate } from 'react-router-dom';

export function Lobby({ user }) {
  const [lobbyName, setLobbyName] = useState('');
  const [lobbySet, setLobbySet] = useState('Set');
  const [players, setPlayers] = useState('0');
  const [lobbyNum, setLobbyNum] = useState('');
  const navigate = useNavigate();
  

  const [messages, setMessages] = useState([
    { event: 'system', from: 'System', message: 'Welcome to the chat!' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const username = user?.email || 'Guest';

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
      setMessages(prev => [
        ...prev, 
        { event: 'system', from: 'System', message: 'Connected to chat' }
      ]);
    };

    socket.onmessage = (event) => {
      try {
        const chat = JSON.parse(event.data);
        setMessages(prev => [
          ...prev,
          { event: 'received', from: chat.name, message: chat.message }
        ]);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    socket.onclose = () => {
      setConnected(false);
      setMessages(prev => [
        ...prev,
        { event: 'system', from: 'System', message: 'Disconnected from chat' }
      ]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
      setMessages(prev => [
        ...prev,
        { event: 'system', from: 'System', message: 'Connection error' }
      ]);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && connected && socketRef.current) {
      const data = JSON.stringify({ name: username, message: newMessage.trim() });
      socketRef.current.send(data);
      
      setMessages(prev => [
        ...prev,
        { event: 'sent', from: username, message: newMessage.trim() }
      ]);
      
      setNewMessage('');
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

  async function createLobby() {
    const endpoint = '/api/lobby/create';
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ creatorName: lobbyName, playerNum: players, num: lobbyNum }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });
    navigate('/draft');
  }

  function lobbyNameChange(e) {
    setLobbyName(e.target.value);
  }

  function selectSet(e) {
    setLobbySet(e.target.textContent);
  }

  function choosePlayers(e) {
    setPlayers(e.target.textContent);
  }

  return (
    <main className="main-area">
              <button onClick={joinLobby}>Draft!</button>
      <div className="chat-box">
        <h3>Chat {connected ? '(Connected)' : '(Disconnected)'}</h3>
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
            onKeyDown={handleKeyPress}
            disabled={!connected}
          />
          <button 
            onClick={sendMessage} 
            className="send-button"
            disabled={!connected || !newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}