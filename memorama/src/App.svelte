<script>
  import Card from './components/Card.svelte';

  let pokemons = [
    { id: 1, name: 'Bulbasaur', image: './assets/Bulbasaur.png' },
    { id: 2, name: 'Charmander', image: './assets/Charmander.png' },
    { id: 3, name: 'Squirtle', image: './assets/Squirtle.png' },
    { id: 4, name: 'Pikachu', image: './assets/Pikachu.png' },
    { id: 5, name: 'Jigglypuff', image: './assets/Jigglypuff.png' },
    { id: 6, name: 'Gengar', image: './assets/Gengar.png' },
    { id: 7, name: 'Mewtwo', image: './assets/Mewtwo.png' },
    { id: 8, name: 'Eevee', image: './assets/Eevee.png' },
    { id: 9, name: 'Snorlax', image: './assets/Snorlax.png' },
    { id: 10, name: 'Charizard', image: './assets/Charizard.png' }
  ];

  let pairOfPokemons = pokemons.concat(pokemons).map((pokemon, index) => ({
    ...pokemon,
    uniqueId: index,
    isFlipped: false, 
  }));

  function shuffle(array) {
    
  }

  shuffle(pairOfPokemons);

  let selectedCards = []; 
  let isGameLocked = false; 

  function checkCard(selectedPokemon) {
    if (isGameLocked || selectedPokemon.isFlipped) return;

    selectedPokemon.isFlipped = true;

    pairOfPokemons = pairOfPokemons.map(p => 
      p.uniqueId === selectedPokemon.uniqueId ? selectedPokemon : p
    );

    selectedCards = [...selectedCards, selectedPokemon];

    if (selectedCards.length === 2) {
      isGameLocked = true;

      const [firstCard, secondCard] = selectedCards;
      if (firstCard.id === secondCard.id) {
        selectedCards = [];
        isGameLocked = false;
      } else {
        setTimeout(() => {
          firstCard.isFlipped = false;
          secondCard.isFlipped = false;

          pairOfPokemons = pairOfPokemons.map(p => {
            if (p.uniqueId === firstCard.uniqueId || p.uniqueId === secondCard.uniqueId) {
              return p.uniqueId === firstCard.uniqueId ? firstCard : secondCard;
            }
            return p;
          });

          selectedCards = [];
          isGameLocked = false;
        }, 1000);
      }
    }
  }
</script>

<main>
  <div class="grid">
    {#each pairOfPokemons as pokemon (pokemon.uniqueId)}
      <Card {pokemon} handleCardClick={checkCard} />
    {/each}
  </div>
</main>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    box-sizing: border-box;
    max-width: 800px;
    margin: auto;
    gap: 15px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
</style>
