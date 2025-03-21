import React from "react";

import Button from 'react-bootstrap/Button';
import {MessageDialogue} from './messageDialogue';

export function unauthenticated(props){
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
        const response = fetch(endpoint, {
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
}