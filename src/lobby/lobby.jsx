import React from 'react';
import './lobby.css'
import { BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import { Draft } from '../draft/draft';

export function Lobby({user}) {
    const [lobbyName, setLobbyName] = React.useState('');
    const [lobbySet, setLobbySet] = React.useState('Set');
    const [players, setPlayers] = React.useState('0');
    const [lobbyNum, setLobbyNum] = React.useState('');
    const navigate = useNavigate();
    const [msg, setMsg] = React.useState('...listening');

    React.useEffect(() => {
        setInterval(() => {
            const names = ['John', 'Mark', 'Paul'];
            const msgs = ['hello', 'hi', 'hey'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
            setMsg(`${randomName}: ${randomMsg}`);
        }, 10000);
    })

    function joinLobby(){
        console.log("join lobby");
        navigate('/draft')
    }

    function createLobby(){
        console.log("create lobby");
        localStorage.setItem('LName', lobbyName);
        localStorage.setItem('LSet', lobbySet);
        localStorage.setItem('NumPLayers', players);
        navigate('/draft')
    }

    function lobbyNameChange(e){
        setLobbyName(e.target.value);
    }

    function selectSet(e){
        setLobbySet(e.target.textContent);
    }

    function choosePlayers(e){
        setPlayers(e.target.textContent)
    }

    function showLobbyNum(){
        // This will show the number of lobby's, need the DB for this
    }

    return (
      <main className = "main-area">
        <table className = "custom-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Set</th>
                        <th>Players</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>John</td>
                        <td>LTR</td>
                        <td>6/7</td>
                        <td>
                            <button onClick={joinLobby}>Join</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Adam</td>
                        <td>FDN</td>
                        <td>2/7</td>
                        <td>
                            <button onClick={joinLobby}>Join</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><input type="text" placeholder="Mark" onChange={lobbyNameChange}/></td>
                        <td>
                            <div className = "dropdown">
                                <button class = "dropbtn">{lobbySet}</button>
                                <div class = "dropdown-content">
                                    <button onClick = {selectSet}>LTR</button>
                                    <button onClick = {selectSet}>IXA</button>
                                    <button onClick = {selectSet}>STX</button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className = "dropdown">
                                <button class = "dropbtn">{players}</button>
                                <div class = "dropdown-content">
                                    <button onClick = {choosePlayers}>6</button>
                                    <button onClick = {choosePlayers}>7</button>
                                    <button onClick = {choosePlayers}>8</button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <button onClick={createLobby}>Create</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="chat-box">
                <h3>Chat</h3>
                <div className="messages">
                    <p>Atreities: Hello!</p>
                    <p>{msg}</p>
                </div>
                <input type="text" placeholder="Type a message" className="message-input" />

            </div>
        </main>
    );
  }