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
        loginOrCreate('/api/auth/create');
    }

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: name, password: password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
          if (response?.status === 200) {
            localStorage.setItem('userName', name);
            props.onLogin(name);
            navigate('/lobby')
          } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
          }
        }

    return (
        <>
        <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>@</span>
          <input className='form-control' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
            <Button onClick={() => {login()}} disabled={!name || !password}>
                Login
            </Button>
            <Button onClick={() => {create()}} disabled={!name || !password}>
            Create
            </Button>
        </div>
        

        <MessageDialogue message = {displayError} onHide= {() => setDisplayError(null)} />
        </>
    )
}