// WILL BE GETTING RID OF THIS
// MAKE THIS INTO AN ERROR PAGE OR SOMETHING
// ONCE THEY CLOSE THE DECKLIST IT IS GONE FOREVER

import React, { useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './decks.css';
import { Decklist } from '../decklist/decklist';

export function Decks() {

  const navigate = useNavigate();

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
          <button onClick={() => navigate('/decklist')}>Deck 1: Blue</button>
        </div>

        <div className="deck-item">
          <canvas id="Deck2" width="50" height="50" style={{ border: "1px solid #000000" }}></canvas>
          <button onClick={() => navigate('/decklist')}>Deck 2: Red</button>
        </div>
      </div>
      <Routes>
        <Route path="/decklist" element={<Decklist />} />
      </Routes>
    </main>
  );
}
