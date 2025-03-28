import React from 'react';
import './index.css';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';

export function Login({name, authState, onAuthChange}) {
  return (
    <main>
        <div>
            {authState !== AuthState.Unknown && <h1>Welcome to DraftMagic</h1>}
            {authState === AuthState.Authenticated && 
            (< Authenticated name = {name} onLogout = {()=>onAuthChange(name, AuthState.Unauthenticated)} />
        )}
            {authState === AuthState.Unauthenticated && 
            ( <Unauthenticated 
              name = {name} 
              onLogin = {(loginName) => {
                onAuthChange(loginName, AuthState.Authenticated);
              }}
              />
        )}
        </div>
    </main>
  );
}