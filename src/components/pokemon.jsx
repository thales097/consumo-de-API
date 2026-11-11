
function Pokemon({ pokemon }) {
  return (
    <div>
      <h1>{pokemon.name}</h1>

      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        width="250"
      />

      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
    </div>
  )
}

export default Pokemon
