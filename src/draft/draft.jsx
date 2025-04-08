import './draft.css';
import { fetchCards, getRandomPack} from './draftService';
import { sendDeck } from './draftService';

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function Draft() {
    const [decklist, setDecklist] = useState([]);
    const initialPack = Array.from({ length: 15 }, (_, i) => ({ id: i + 1 }));
    const [pack, setPack] = useState(initialPack);
    const [packNum, setPackNum] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        function generatePack(count = 15) {
            const setCode = "ltr";
            fetchCards(setCode).then(cards => {
                const pack = getRandomPack(cards, count);
                setPack(pack);
            });
        }
        generatePack();
    }, [packNum]);

    function pickCard(index) {
        const selected = pack[index];
        const cardName = selected.name;
        const updatedDecklist = [...decklist, cardName];
        setDecklist(updatedDecklist);
        localStorage.setItem('decklist', JSON.stringify(updatedDecklist));
        
        const newPack = pack.filter((_, i) => i !== index);
        setPack(newPack);
        
        if (packNum < 3) {

            const picksInCurrentPack = decklist.length % 15;
            const picksRemaining = 15 - picksInCurrentPack;
            
            if (picksRemaining > 0) {
                generatePack(picksRemaining - 1);
            } else {
                setPackNum(packNum + 1);
                generatePack(15);
            }
        } else {
            setPack([]);
        }
    }

    return (
        <main>
            <h1>Pack {packNum} of 3</h1>
            <div className="container">
                {pack.map((card, index) => (
                    <button key={index} onClick={() => pickCard(index)}>
                        <img alt="Card" src={card.image_uris?.normal || "./Card back.webp"} width="275" height="400" />
                    </button>
                ))}
            </div>
            <br />
            <br />
            <button
    className="Decklist"
    onClick={async () => {
            const deck = {
                cards: decklist,
            };
            await sendDeck(deck);
            navigate('/decklist');

    }}
>
    Save
</button>
        </main>
    );
}
