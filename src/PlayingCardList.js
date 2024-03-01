import React from "react";
import { useAxios } from "./hooks";
import PlayingCard from "./PlayingCard";
import { formatCardData } from "./helpers";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, addCard, clearCards] = useAxios("cards", "https://deckofcardsapi.com/api/deck/new/draw/?count=1");

  return (
    <div className="PlayingCardList"> 
      <h3>Pick a card!</h3>
      <div>
        {/* When the button is clicked, addCard will be called with formatCardData as an argument.
            formatCardData is a function that formats the card data. */}
        <button onClick={() => addCard(formatCardData)}>Add a card</button>
        {/* When this button is clicked, it will clear all the cards from the current state. */}
        <button onClick={clearCards}>Clear cards</button>
      </div>
      <div className="PlayingCardList-cards-area"> 
        {/* Maps over the cards state variable and renders a PlayingCard component for each card.
            The key prop is important for React to handle the list efficiently. */}
        {cards.map(card => (
          <PlayingCard key={card.id} front={card.image} />
        ))}
      </div>
    </div>
  );
}


export default CardTable;






