import React from 'react';
import './lobby.css'
import { BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import { Draft } from '../draft/draft';

export function Lobby({user}) {
    const [lobbyName, setLobbyName] = React.useState('');
    const [lobbySet, setLobbySet] = React.useState('Set');
    const [players, setPlayers] = React.useState('');
    const [lobbyNum, setLobbyNum] = React.useState('');
    const navigate = useNavigate();

    function joinLobby(){
        console.log("join lobby");
        navigate('/draft')
    }

    function createLobby(){
        console.log("create lobby");
        localStorage.setItem('LName', lobbyName);
        localStorage.setItem('LSet', lobbySet);
        navigate('/draft')
    }

    function lobbyNameChange(e){
        setLobbyName(e.target.value);
    }

    function selectSet(e){
        setLobbySet(e.target.textContent);
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
                        <td><input type="text" placeholder="0" /></td>
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
                        <td><input type="text" placeholder="?/?" /></td>
                        <td>
                            <button onClick={createLobby}>Create</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="chat-box">
                <h3>Chat</h3>
                <div className="messages">
                    <p>Test</p>
                    <p>Hello</p>
                </div>
                <input type="text" placeholder="Type a message" className="message-input" />
            </div>
        </main>
    );
  }