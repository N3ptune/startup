import React from 'react';
import './index.css';
import { Lobby } from '../lobby/lobby';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

export function Login({setUser, setUserPass}) {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();


    function loginUser(){
        localStorage.setItem('user', name);
        localStorage.setItem('password', password)
        setUser(name);
        setUserPass(password);
        navigate('/lobby');
    }

    function nameChange(e){
        setName(e.target.value);
        console.log(e.target.value);
    }

    function passwordChange(e){
        setPassword(e.target.value);
        console.log(e.target.value);
    }

  return (
    <main>
            <h1>
                Welcome to DraftMagic
            </h1>
            <form onSubmit = {loginUser}>
                <div>
                    <h4>
                        Username
                    </h4>
                    <input type = "text" placeholder="Email or Username" onChange={nameChange}/>
                </div>
                <div>
                    <h4>
                        Password
                    </h4>
                    <input type = "password" placeholder="Password" onChange={passwordChange} />
                </div>
                <button type="submit">Login</button>
                <button type="submit">Create</button>
                
            </form>
            <hr />
        </main>
  );
}