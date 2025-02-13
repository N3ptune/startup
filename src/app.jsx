import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { Decklist } from './decklist/decklist';
import { Decks } from './decks/decks';
import { Draft } from './draft/draft';
import { Lobby } from './lobby/lobby';
import { Login } from './login/login';

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
                            <NavLink className = "nav-link" to = "/login">Login</NavLink>
                        </li>
                        <li className = "nav-item">
                            <NavLink className = "nav-link" to = "/lobby">Lobby</NavLink>
                        </li>
                        <li className = "nav-item">
                            <NavLink className = "nav-link" to = "/decks">Decks</NavLink>
                        </li>
                        <li className = "nav-item">
                            <NavLink className = "nav-link" to = "/about">About</NavLink>
                        </li>
                    </menu>
                </nav>
                <hr />
            </header>
            <main className = "main">
                App components go here
                <hr />
            </main>
            <Routes>
                <Route path = "/" element = {<Login />} exact />
                <Route path = "/lobby" element = {<Lobby />} />
                <Route path = "/decks" element = {<Decks />} />
                <Route path = "/about" element = {<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <footer>
                <p>Jason Brooks</p>
                <a href = "https://github.com/N3ptune/startup?tab=readme-ov-file">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }