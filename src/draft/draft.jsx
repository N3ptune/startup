import React from 'react';
import './draft.css';
import { Decklist } from '../decklist/decklist';
import { BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import useState from 'react';

export function Draft() {
    const [decklist, setDecklist] = React.useState([]);
    const initialPack = Array.from({length: 15}, (_, i) => ({id: i + 1}))
    const [pack, setPack] = React.useState(initialPack);
    const [packNum, setPackNum] = React.useState(1);
    const navigate = useNavigate();

    function pickCard(index){
        const selectedCard = pack[index];

        const updatedDecklist = [...decklist, selectedCard];
        setDecklist(updatedDecklist);
        localStorage.setItem('decklist', JSON.stringify(updatedDecklist));
        setPack(pack.filter((_, i) => i !== index));
        if (pack.length === 1){
            if (packNum < 3){
                const newPack = Array.from({length: 15}, (_, i) => ({id: i + 1}))
                setPack(newPack);
                setPackNum(packNum + 1);
            }
        }
    }
    



    return (
      <main>
            <h1>
                Pack {packNum} of 3
            </h1>
            <div className = "container">
                {pack.map((card, index) => (
                    <button key={index} onClick={() => pickCard(index)}>
                        <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                    </button>
                ))}
            </div>
            <br />
            <br />
            <button className = "Decklist" onClick={() => navigate('/decklist')}>Save</button>
        </main>
    );
  }