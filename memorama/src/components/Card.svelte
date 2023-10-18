<script>
  export let pokemon;
  export let handleCardClick;
</script>

<div class="card" on:click="{() => handleCardClick(pokemon)}">
  <div class={`inner ${pokemon.isFlipped ? 'flipped' : ''}`}>
    <div class="front">
    </div>
    <div class="back">
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  </div>
</div>

<style>
  .card {
    perspective: 1000px;
    width: 100px;
    height: 140px;
    border-radius: 10px;
    overflow: hidden;
  }

  .inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .flipped {
    transform: rotateY(180deg);
  }

  .front, .back {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    background-color: white;
  }

  .front {
    background-color: #ffffff;
  }

  .back {
    transform: rotateY(180deg);
  }

  .back img {
    width: 80%;
    height: auto;
  }
</style>
