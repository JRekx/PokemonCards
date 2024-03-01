import React from "react";
import { useFlip } from "./hooks";
import "./PokemonCard.css";

/* Renders a single pokemon card. */
function PokemonCard({ front, back, name, stats }) {
  // Custom hook to handle the flip state of the card
  const [isFacingUp, flip] = useFlip();

  return (
    <div onClick={flip} className="PokemonCard">
      {isFacingUp ? (
        <div className="PokemonCard-front">
          {/* Front of the card showing pokemon image, name, and stats */}
          <img src={front} alt={`${name} front`} />
          <div>
            <p className="PokemonCard-name">{name}</p>
            <ul className="PokemonCard-stats">
              {/* Map through stats to display each one */}
              {stats.map(stat => (
                <li key={stat.name}>
                  <em>{stat.name}</em>: {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="PokemonCard-back">
          {/* Back of the card showing pokemon back image */}
          <img src={back} alt={`${name} back`} />
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
