export async function fetchCards(setCode){
    const response = await fetch(`https://api.scryfall.com/sets/${setCode}`, {

        headers:{
            "User-Agent": "MTGDraftApp/1.0",
            "Accept": "application/json, charset=UTF-8"
        }
    });

    if (response.status === 200){
        const data = await response.json();
        return data.data;
    }
}

export function getRandomPack(cards){
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0,15);
}
