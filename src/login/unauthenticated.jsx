import React from "react";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import {MessageDialogue} from './messageDialogue';

export function Unauthenticated(props){
    const navigate = useNavigate();
    const [name, setName] = React.useState(props.userName);
    const [password, setPassword] = React.useState("");
    const [displayError, setDisplayError] = React.useState(null);

    async function login(){
        loginOrCreate('/api/auth/login');
    }

    async function create(){
        loginOrCreate('api/auth/create');
    }

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({email: name, password: password}),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        });
        if (response?.status === 200){
            localStorage.setItem('userName', name);
            props.onLogin(name);
        } else {
            const body = await response.json();
            setDisplayError(body.msg);
        }
    }

    return (
        <>
        <div className = 'input-group mb-3'>
            <input className = 'form-control' type = 'text' value = {name} onChange={e => setName(e.target.value)} placeholder="your@email.here" />
        </div>
        <div className="input-group mb-3">
            <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        </div>
        <Button onClick={() => {login(); navigate('/lobby');}} disabled={!name || !password}>
            Login
        </Button>
        <Button onClick={() => {create(); navigate('/lobby');}} disabled={!name || !password}>
          Create
        </Button>

        <MessageDialogue message = {displayError} onHide= {() => setDisplayError(null)} />
        </>
    )
}