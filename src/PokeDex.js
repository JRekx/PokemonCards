import React from "react";
import { useAxios } from "./hooks"; 
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard"; 
import "./PokeDex.css"; 

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon.
 */

function PokeDex() {
  // useAxios custom hook is used to fetch and manage Pokémon data
  // It returns the current list of pokemon, a function to add a new pokemon, and a function to clear all pokemon
  const [pokemon, addPokemon, clearPokemon] = useAxios("pokemon", "https://pokeapi.co/api/v2/pokemon/");

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Select Your Pokemon!</h3>
        {/* PokemonSelect component allows users to select and add a Pokémon */}
        <PokemonSelect add={addPokemon} />
        {/* Button to clear all Pokémon from the current view */}
        <button onClick={clearPokemon}>Remove Pokemon</button>
      </div>
      <div className="PokeDex-cards-area">
        {/* Maps over the array of pokemon and renders a PokemonCard for each item */}
        {pokemon.map(card => (
          <PokemonCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
