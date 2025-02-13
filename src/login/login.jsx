import React from 'react';
import './index.css';
import { Lobby } from '../lobby/lobby';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export function Login() {
  return (
    <main>
            <h1>
                Welcome to DraftMagic
            </h1>
            <form method = "get" action = "lobby.html">
                <div>
                    <h4>
                        Username
                    </h4>
                    <input type = "text" placeholder="Email or Username" />
                </div>
                <div>
                    <h4>
                        Password
                    </h4>
                    <input type = "password" placeholder="Password" />
                </div>
                <NavLink className = "nav-link" to = "/lobby">Login</NavLink>
                <NavLink className = "nav-link" to = "/lobby">Create</NavLink>
            </form>
            <hr />
        </main>
  );
}