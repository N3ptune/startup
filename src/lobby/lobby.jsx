import React from 'react';
import './lobby.css';
import { useNavigate } from 'react-router-dom';
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
      setMessages((prevMessages) => [...prevMessages, chat]);
    });
    
    setChatClient(client);
  }, []);
  
  const sendMessage = () => {
    if (newMessage.trim() && chatClient && chatClient.connected) {
      chatClient.sendMessage(username, newMessage.trim());
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
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Players</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>5</td>
            <td>
              <button onClick={joinLobby}>Join</button>
            </td>
          </tr>
          <tr>
            <td>Adam</td>
            <td>3</td>
            <td>
              <button onClick={joinLobby}>Join</button>
            </td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Mark" onChange={lobbyNameChange} /></td>
            <td>
              <div className="dropdown">
                <button className="dropbtn">{players}</button>
                <div className="dropdown-content">
                  <button onClick={choosePlayers}>2</button>
                  <button onClick={choosePlayers}>3</button>
                  <button onClick={choosePlayers}>4</button>
                  <button onClick={choosePlayers}>5</button>
                  <button onClick={choosePlayers}>6</button>
                  <button onClick={choosePlayers}>7</button>
                  <button onClick={choosePlayers}>8</button>
                </div>
              </div>
            </td>
            <td>
              <button onClick={createLobby}>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
      
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