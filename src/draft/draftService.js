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

export function getRandomPack(cards, totalCount = 15) {
    const commons = cards.filter(card => card.rarity === "common" && !card.type_line.toLowerCase().includes("land"));
    const uncommons = cards.filter(card => card.rarity === "uncommon");
    const rares = cards.filter(card => card.rarity === "rare");
    const mythics = cards.filter(card => card.rarity === "mythic");
    const lands = cards.filter(card => card.type_line.toLowerCase().includes("land"));

    let commonCount = 0, uncommonCount = 0, rareCount = 0, landCount = 0;

    if (totalCount >= 15) {
        commonCount = 10;
        uncommonCount = 3;
        rareCount = 1;
        landCount = 1;
    } else {
        const ratios = {
            common: 10,
            uncommon: 3,
            rare: 1,
            land: 1
        };
        const totalRatio = Object.values(ratios).reduce((a, b) => a + b, 0);

        const allocate = (key) => Math.floor((ratios[key] / totalRatio) * totalCount);
        commonCount = allocate("common");
        uncommonCount = allocate("uncommon");
        rareCount = allocate("rare");
        landCount = allocate("land");

        let used = commonCount + uncommonCount + rareCount + landCount;
        while (used < totalCount) {
            commonCount++;
            used++;
        }
    }

    const getRandomCards = (cardArray, count) => {
        const shuffled = [...cardArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const packCommons = getRandomCards(commons, commonCount);
    const packUncommons = getRandomCards(uncommons, uncommonCount);

    let packRare;
    if (Math.random() < 0.125 && mythics.length > 0) {
        packRare = getRandomCards(mythics, rareCount);
    } else {
        packRare = getRandomCards(rares, rareCount);
    }

    const packLand = getRandomCards(lands, landCount);

    return [...packCommons, ...packUncommons, ...packRare, ...packLand];
}