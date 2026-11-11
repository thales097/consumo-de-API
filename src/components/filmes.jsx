
function Filmes({ movies, queryError }) {
  return (
    <>
      {queryError && (
        <p className="mensagem">{queryError}</p>
      )}

      <ul className="lista-filmes">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="cartao-filme">
            <h3>{movie.Title}</h3>
            <p>Ano: {movie.Year}</p>
            <p>Tipo: {movie.Type}</p>

            {movie.Poster !== 'N/A' && (
              <img
                src={movie.Poster}
                alt={`Poster de ${movie.Title}`}
                width="150"
              />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Filmes
