import React, { useState } from "react";
import pokemonList from "./pokemonList";
import { choice, formatPokemonData } from "./helpers";

// This component allows users to select a Pokémon from a dropdown list
// and add it to their collection using the provided `add` function.

function PokemonSelect({ add, pokemon = pokemonList }) {
  // State to keep track of the currently selected Pokémon index
  const [pokeIdx, setPokeIdx] = useState(0);

  // Event handler for when the select dropdown value changes
  const handleChange = evt => {
    setPokeIdx(evt.target.value);
  };

  return (
    <div>
      {/* Dropdown select for choosing a Pokémon */}
      <select onChange={handleChange}>
        {pokemon.map((poke, idx) => (
          // Map each Pokémon to an option element in the select
          <option key={idx} value={idx}>
            {poke}
          </option>
        ))}
      </select>
      <button onClick={() => add(formatPokemonData(pokemon[pokeIdx]))}>I CHOOSE YOU!</button>
      <button onClick={() => add(formatPokemonData(choice(pokemon)))}>WONDER TRADE!</button>
    </div>
  );
}

export default PokemonSelect;
