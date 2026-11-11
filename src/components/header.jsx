
function Header({
  query,
  setQuery,
  setMovies,
  setQueryError,
  buscarFilmes,
  queryLoading,
  tema,
  setTema
}) {
  return (
    <header className="cabecalho">
      <div className="marca">
        <span className="marca-icone">🎬</span>
        <div>
          <h1>CineBusca</h1>
          <p>Encontre seu próximo filme</p>
        </div>
      </div>

      <div className="pesquisa-filmes">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const valor = e.target.value
            setQuery(valor)

            if (!valor.trim()) {
              setMovies([])
              setQueryError('')
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') buscarFilmes()
          }}
          placeholder="Pesquise um filme..."
        />

        <button
          type="button"
          className="btn-pesquisar"
          onClick={buscarFilmes}
          disabled={queryLoading}
        >
          {queryLoading ? 'Buscando...' : 'Pesquisar'}
        </button>
      </div>

      <div className="tema-opcoes">
        <button
          className="botao-tema"
          onClick={() => setTema(tema === 'claro' ? 'escuro' : 'claro')}
          aria-label="Alternar tema"
          title="Alternar tema"
        >
          {tema === 'claro' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

export default Header
