const pokeApi = {
    // Fetch full Pokémon data by name (e.g., "pikachu")
    getPokemon: async function(name) {
        try {
            // Call the public PokeAPI endpoint for a Pokémon resource
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();

            if(!data.name) throw new Error('Pokemon was not found'); 
            
            return data;

        } catch (error) {
         // Return a simple error object to the caller
            return {
                error,
                message: `Pokemon "${name}" not found`
        }}
    },
    // Fetch only the ability names for a Pokémon
    getAbilities: async function(name) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
            const data = await response.json();
            // Ensure abilities array exists before mapping
            if(!data.abilities) throw new Error('Pokemon not found');

            // Extract and return ability names as an array of strings
            return data.abilities.map(ability => ability.ability.name);
        } catch (error) {
         // Return a simple error object to the caller
            return {
                error,
                message: `Pokemon "${name}" not found`
            };
        }
    }    
}
export {pokeApi}