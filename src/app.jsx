import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter> 
        <div className='body'>
            <header className = "container-fluid">
                <h1>
                    DraftMagic
                </h1>
                <nav className = "navbar-dark">
                    <menu className = "navbar-nav">
                        <li className = "nav-item">
                            <a href = "index.html">Home </a>
                        </li>
                        <li className = "nav-item">
                            <a href = "lobby.html">Lobby </a>
                        </li>
                        <li className = "nav-item">
                            <a href = "decks.html">Your Decks </a>
                        </li>
                        <li className = "nav-item">
                            <a href = "about.html">About</a>
                        </li>
                    </menu>
                </nav>
                <hr />
            </header>
            <main className = "main">
                App components go here
                <hr />
            </main>
            <footer>
                <p>Jason Brooks</p>
                <a href = "https://github.com/N3ptune/startup?tab=readme-ov-file">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>
    );
}