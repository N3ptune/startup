import React, { useState, useEffect } from 'react';

function ChatClient({ webSocket }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connected, setConnected] = useState(webSocket.connected);

  // Set up observer to receive messages from WebSocket
  useEffect(() => {
    const observer = (chat) => {
      setMessages((prevMessages) => [...prevMessages, chat]);
    };
    webSocket.addObserver(observer);

    // Clean up observer on component unmount
    return () => {
      webSocket.removeObserver(observer);
    };
  }, [webSocket]);

  // Handle sending a message
  function sendMessage() {
    if (newMessage.trim()) {
      webSocket.sendMessage('me', newMessage); // Replace 'me' with the actual user name if needed
      setNewMessage('');
    }
  }

  // Handle key press for Enter to send message
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div className="chat-box">
      <h3>Chat {connected ? '(Connected)' : '(Disconnected)'}</h3>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={msg.event}>
            <strong>{msg.from}:</strong> {msg.msg}
          </p>
        ))}
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
  );
}

export { ChatClient };
