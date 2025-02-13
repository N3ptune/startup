import React from 'react';
import './decklist.css';

export function Decklist() {
    return (
      <main>
            <h3>
                Export
            </h3>
            <div className = "export-buttons">
                <button type = "button">MTGO</button>
                <button type = "button">MTGA</button>
            </div>
            <div class = "deck-list">
                <h1>
                    Cards
                </h1>
                <div className = "cards">
                    <p>1x Doubling Season</p>
                    <p>1x Elesh Norn, Mother of Machines</p>
                    <p>1x Rhystic Study</p>
                    <p>1x Sadistic Hynoptist</p>
                    <p>1x The Scarab God</p>
                    <p>1x Soul Seizer</p>
                </div>
            </div>
        </main>
    );
  }