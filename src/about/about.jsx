import React from 'react';
import './about.css';

export function About() {
    return (
      <main>
            <div className = "chat-box">
                <div className = "text">
                    <p>DraftMagic is a online platform to draft Magic The Gathering in pods, and then be able to export the resulting decklist.</p>
                    <p>Scryfall API is used to provide images of the cards, and to get the card information.</p>
                </div>
            </div>
        </main>
    );
  }