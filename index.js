//imports the api file
import { pokeApi } from './API/index.js';

class State {
    constructor(defaultState) {
        this.pokemon = defaultState || [];
    }

    set(newState) {
        this.pokemon = newState;
    }

    get() {
        return this.pokemon;
    }
}

// Tres important elements
const searchBar = document.getElementById('search');
const infoDiv = document.getElementById('card');
const name = document.getElementById('name');
const image = document.getElementById('image');

infoDiv.style.display = 'none';

const pokemon = new State();

const display = async () => {
    displayPokemon();
    displayStats();
    displayMoves();
    displayAbilities();
}

const displayPokemon = async () => {
    infoDiv.style.display = 'block';

    name.innerHTML = `${pokemon.get().name} (${pokemon.get().id})`;
    image.src = pokemon.get().sprites.front_default;
}
// show stats list on the page 
const displayStats = async () => {
    const stats = pokemon.get().stats;
    stats.push({
        stat: {
            name: "base-XP"
        },
        base_stat: pokemon.get().base_experience
    });
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = '';

    // create and append a list item for each stat
    stats.forEach(stat => {
        const statItems = document.createElement('li');
        statItems.className = 'stat';
        statItems.innerHTML = `${stat.stat.name}: ${stat.base_stat}`;
        statsDiv.appendChild(statItems);
    })
}

// show moves list on the page
const displayMoves = async () => {
    const moves = pokemon.get().moves;
    const movesDiv = document.getElementById('moves');
    movesDiv.innerHTML = '';

    // create a list item for each move and add it to the list
    moves.forEach(move => {
        const moveItems = document.createElement('li');
        moveItems.className = 'move';
        moveItems.innerHTML = move.move.name;
        movesDiv.appendChild(moveItems);
    })
}

// show abilities list on the page
const displayAbilities = async () => {
    const abilities = pokemon.get().abilities;
    const abilitiesDiv = document.getElementById('abilities');
    // clear previous content
    abilitiesDiv.innerHTML = '';

    // create a list item for each ability and add it to pile
    abilities.forEach(ability => {
        const abilityItems = document.createElement('li');
        abilityItems.className = 'ability';
        abilityItems.innerHTML = ability.ability.name; 
        abilitiesDiv.appendChild(abilityItems);
    })
}
//Eventlisner for the submit 
searchBar.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const input = e.target[0].value

    pokemon.set(await pokeApi.getPokemon(input.toLowerCase()));

    if (pokemon.get()) {
        if(!pokemon.get().error) {
            display();
        } else {
            alert(pokemon.get().message);
        }
    }
    //empty the searchbar after use
    const inputElement = e.target[0];
    inputElement.value = "";
});