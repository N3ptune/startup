export async function fetchCards(setCode){

    const response = await fetch(`https://api.scryfall.com/cards/search?q=e%3Altr`, {
        method: 'GET',

        headers:{
        //     // "User-Agent": "MTGDraftApp/1.0",
        "Accept": "application/json;q=0.9,*/*;q=0.8",
        "Origin": window.location.origin
        }
    });

    if (response.status === 200){
        const data = await response.json();
        return data.data;
    }
}

export async function sendDeck(deck) {
    const response = await fetch('/api/deck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deck)
    });

    if (!response.ok) {
        throw new Error('Failed to save deck');
    }
}

export function getRandomPack(cards) {
    const commons = cards.filter(card => card.rarity === "common" && !card.type_line.toLowerCase().includes("land"));
    const uncommons = cards.filter(card => card.rarity === "uncommon");
    const rares = cards.filter(card => card.rarity === "rare");
    const mythics = cards.filter(card => card.rarity === "mythic");
    const lands = cards.filter(card => card.type_line.toLowerCase().includes("land"));
    
    
    const getRandomCards = (cardArray, count) => {
        const shuffled = [...cardArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    
    const packCommons = getRandomCards(commons, 10);
    
    const packUncommons = getRandomCards(uncommons, 3);
    
    let packRare;
    if (Math.random() < 0.125 && mythics.length > 0) {
        packRare = getRandomCards(mythics, 1);
    } else {
        packRare = getRandomCards(rares, 1);
    }
    
    const packLand = getRandomCards(lands, 1);
    
    return [...packCommons, ...packUncommons, ...packRare, ...packLand];
}
