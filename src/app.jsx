import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { About } from './about/about';
import { Decklist } from './decklist/decklist';
import { Decks } from './decks/decks';
import { Draft } from './draft/draft';
import { Lobby } from './lobby/lobby';
import { Login } from './login/login';
import { AuthState } from './login/authState';



export default function App() {
    const [user, setUser] = React.useState(localStorage.getItem('user') || null);
    const currentAuthState = user ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    function logout() {
        fetch(`/api/auth/logout`, {
          method: 'delete',
        })
          .catch(() => {
            // Logout failed. Assuming offline
          })
          .finally(() => {
            localStorage.removeItem('user');
            setAuthState(AuthState.Unauthenticated);
          });
      }

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
                        {authState === AuthState.Authenticated && (<li className = "nav-item">
                            <NavLink className = "nav-link" to = "/lobby">Lobby</NavLink>
                        </li>)}
                        <li className = "nav-item">
                            <NavLink className = "nav-link" to = "/about">About</NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (<li className='nav-item'>
                            <NavLink className="nav-link" to="/login" onClick={logout}>Logout</NavLink>
                        </li>)}
                        
                    </menu>
                </nav>
                <hr />
            </header>
            <main className = "main">
            <Routes>
                <Route path = "/" element = {
                    <Login user={user} 
                    authState={authState}
                    onAuthChange={(user, authState) => {
                        setAuthState(authState)
                        setUser(user)
                    }}/>} exact />
                    <Route path = "/login" element = {
                    <Login user={user} 
                    authState={authState}
                    onAuthChange={(user, authState) => {
                        setAuthState(authState)
                        setUser(user)
                    }}/>} exact />
                {/* <Route path = "/login" element = {<Login setUser={setUser} setUserPass={setUserPass}/>} /> */}
                <Route path = "/lobby" element = {<Lobby user = {user}/>} />
                <Route path = "/decks" element = {<Decks />} />
                <Route path = "/about" element = {<About />} />
                <Route path="/decklist" element = {<Decklist />} />
                <Route path = "/draft" element = {<Draft/>} />


                <Route path='*' element={<NotFound />} />
            </Routes>
            </main>
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
