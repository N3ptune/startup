import React from 'react';
import './lobby.css'

export function Lobby() {
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
                            <form method = "get" action = "draft.html" />
                            <button className = "join-button">Join</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Adam</td>
                        <td>FDN</td>
                        <td>2/7</td>
                        <td>
                            <form method = "get" action = "draft.html" />
                            <button className = "join-button">Join</button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="0" /></td>
                        <td><input type="text" placeholder="Mark" /></td>
                        <td><input type="text" placeholder="SET" /></td>
                        <td><input type="text" placeholder="?/?" /></td>
                        <td>
                            <form method = "get" action = "draft.html">
                                <button className = "create-button">Create</button>
                            </form>
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