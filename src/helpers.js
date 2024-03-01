import { v4 as uuidv4 } from 'uuid';

// Selects a random card from the array of cards.
function choice(values) {
  if (!Array.isArray(values) || values.length === 0) {
    // Handle the case where values is not an array or is empty
    throw new Error('choice was given an invalid array.');
  }
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}

// Format response data from a card API, extracting the image URL and assigning a unique identifier.
function formatCardData(data) {
  if (!data || !data.cards || !data.cards[0] || !data.cards[0].image) {
    // Handle the case where the expected data structure is not present
    throw new Error('Invalid card data structure.');
  }
  return {
    image: data.cards[0].image,
    id: uuidv4() // Use uuidv4() to generate a unique ID
  };
}

// Format response data from the Pokemon API, extracting images, name, and stats of the Pokemon.
function formatPokemonData(data) {
  // Validate the overall structure
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid Pokemon data structure: data should be an object.');
  }
  // Validate the sprites property
  if (!data.sprites || typeof data.sprites !== 'object' || Array.isArray(data.sprites)) {
    throw new Error('Invalid Pokemon data structure: sprites should be an object.');
  }
  // Validate the name property
  if (typeof data.name !== 'string') {
    throw new Error('Invalid Pokemon data structure: name should be a string.');
  }
  // Validate the stats property
  if (!Array.isArray(data.stats)) {
    throw new Error('Invalid Pokemon data structure: stats should be an array.');
  }

  // Map the stats and validate each stat's structure
  const stats = data.stats.map(stat => {
    if (!stat || typeof stat !== 'object' || !stat.base_stat || !stat.stat || typeof stat.stat.name !== 'string') {
      throw new Error('Invalid stat data structure.');
    }
    return { value: stat.base_stat, name: stat.stat.name };
  });

  // If all validations pass, return the formatted data
  return {
    id: uuidv4(),
    front: data.sprites.front_default,
    back: data.sprites.back_default,
    name: data.name,
    stats: stats
  };
}

export { choice, formatCardData, formatPokemonData };
