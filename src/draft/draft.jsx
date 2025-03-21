import React from 'react';
import './draft.css';
import {useNavigate} from 'react-router-dom';
import useState from 'react';
import {fetchCards, getRandomPack} from "./draftService.js";

export function Draft(setCode) {
    const [decklist, setDecklist] = React.useState([]);
    // const initialPack = Array.from({length: 15}, (_, i) => ({id: i + 1}))
    const [pack, setPack] = React.useState(initialPack);
    const [packNum, setPackNum] = React.useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function generatePack() {
            const cards = await fetchCards(setCode)
            const pack = getRandomPack(cards);
            setPack(pack)
        }
        generatePack();
        });

    function pickCard(index){
        const selected = pack[index];
        const updatedDecklist = [...decklist, selected];
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
            <button className="Decklist" onClick={() => navigate('/decklist')}>Save</button>
        </main>
    );
}