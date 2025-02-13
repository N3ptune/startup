import React, { useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './decks.css';
import { Decklist } from '../decklist/decklist';

export function Decks() {

  useEffect(() => {
    const canvas1 = document.getElementById('Deck1');
    if (canvas1) {
      const ctx = canvas1.getContext('2d');
      ctx.beginPath();
      ctx.arc(25, 24, 6, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.strokeStyle = 'blue';
      ctx.fill();
      ctx.stroke();
    }

    const canvas2 = document.getElementById('Deck2');
    if (canvas2) {
      const ctx2 = canvas2.getContext('2d');
      ctx2.beginPath();
      ctx2.arc(25, 24, 6, 0, 2 * Math.PI);
      ctx2.fillStyle = 'red';
      ctx2.strokeStyle = 'red';
      ctx2.fill();
      ctx2.stroke();
    }
  }, []);

  return (
    <main>
      <h2>Your Decks</h2>
      <div className="container">
        <div className="deck-item">
          <canvas id="Deck1" width="50" height="50" style={{ border: "1px solid #000000" }}></canvas>
          <NavLink className = "nav-link" to = "/decklist">Deck 1: Blue</NavLink>
        </div>

        <div className="deck-item">
          <canvas id="Deck2" width="50" height="50" style={{ border: "1px solid #000000" }}></canvas>
          <NavLink className = "nav-link" to = "/decklist">Deck 2: Red</NavLink>
        </div>
      </div>
      <Routes>
        <Route path="/decklist" element={<Decklist />} />
      </Routes>
    </main>
  );
}
