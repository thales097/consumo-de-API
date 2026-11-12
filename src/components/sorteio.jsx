import { useState } from 'react';

function RandomEncounter() {
const [pokemon, setPokemon] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
async function sortearPokemon() {
    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
        const id = Math.floor(Math.random() * 1025) + 1;

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao buscar pokemon');
        }

        const dados = await resposta.json();

        setPokemon(dados);

    } catch (erro) {
        setError('Não foi possível encontrar um Pokémon');

    } finally {
        setLoading(false);
    }
}
  return (
    <section>
      <h2>Random Encounter</h2>
      <p>Encontre um Pokémon aleatório!</p>

      <button onClick={sortearPokemon} disabled={loading}>
        Sortear Pokémon
      </button>
      {loading && <p>Procurando um Pokémon...</p>}
      {error && <p>{error}</p>}
      {pokemon && (
  <div>
    <h3>{pokemon.name}</h3>
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
  </div>
)}
    </section>
  );
}

export default RandomEncounter;