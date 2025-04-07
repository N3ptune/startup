import React from 'react';
import './decklist.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';

export function Decklist() {
    const navigate = useNavigate();
    const decklist = localStorage.getItem('decklist');
    const decklistArray = JSON.parse(decklist);
    const [copied, setCopied] = React.useState(false);


    function copyToClipboard() {
        navigator.clipboard.writeText(decklist);
        setCopied(true);
        setTimeout(() => { setCopied(false);}, 5000);
    }
    


    return (
      <main>
            <h3>
                Export
            </h3>
            <p> {copied && <div className='copied-message'>Copied to Clipboard!</div>}</p>
            <div className = "export-buttons">
                <button type = "button" onClick={copyToClipboard}>MTGO</button>
                <button type = "button" onClick={copyToClipboard}>MTGA</button>
            </div>
            <div className = "deck-list">
                <h1>
                    Cards
                </h1>
                <div className = "cards">
                    {decklistArray.map((card, index) => (
                        <div key = {index}>
                            <p>{card}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
  }