// I DON'T THINK I NEED THIS
// LOGIN WILL GO TO LOBBY
// LOGOUT BUTTON WILL BE ONHIBDE IN HEADER

import { useNavigate } from 'react-router-dom';

import './authenticated.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout(){
        fetch('/api/auth/logout', {
            method: 'DELETE',
        })
        .catch(() => {
            // Logout failed
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        });
    }
}