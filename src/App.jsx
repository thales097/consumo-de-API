
import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import axios from 'axios'

import DragonBall from './components/DragonBall.jsx'
import Header from './components/header.jsx'
import Filmes from './components/filmes.jsx'
import Pokemon from './components/pokemon.jsx'
import Person from './components/person.jsx'
import Destaque from './components/destaque.jsx'
import RandomEncounter from './components/sorteio.jsx'

function App() {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('tema-site') || 'claro'
  })

  const [count, setCount] = useState(0)

  const [person, setPerson] = useState({})
  const [personagem, setPersonagem] = useState({})
  const [pokemon, setPokemon] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [queryLoading, setQueryLoading] = useState(false)
  const [queryError, setQueryError] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    localStorage.setItem('tema-site', tema)
  }, [tema])

  const buscarFilmes = async () => {
    if (!query.trim()) {
      setMovies([])
      setQueryError('Digite o nome de um filme.')
      return
    }

    try {
      setQueryLoading(true)
      setQueryError('')

      const res = await axios.get('/api/filmes', {
        params: { busca: query.trim() },
      })

      if (res.data.Response === 'True') {
        setMovies(res.data.Search)
      } else {
        setMovies([])
        setQueryError(res.data.Error || 'Nenhum filme encontrado.')
      }
    } catch (err) {
      setMovies([])
      setQueryError('Erro ao buscar filmes, tente novamente.')
      console.error(err.response?.status, err.response?.data || err.message)
    } finally {
      setQueryLoading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const [pokemonRes, personRes, dragonRes] =
        await Promise.allSettled([
          axios.get('https://pokeapi.co/api/v2/pokemon/charizard'),
          axios.get('https://6a79e554674f43f4db11ebc8.mockapi.io/api/person'),
          axios.get('https://dragonball-api.com/api/characters/31'),
        ])

      if (pokemonRes.status === 'fulfilled') {
        setPokemon(pokemonRes.value.data)
      }

      if (personRes.status === 'fulfilled') {
        setPerson(personRes.value.data)
      }

      if (dragonRes.status === 'fulfilled') {
        setPersonagem(dragonRes.value.data)
      }

      if ([pokemonRes, personRes, dragonRes].some(r => r.status === 'rejected')) {
        setError(true)
      }

      setLoading(false)
    }

    getData()
  }, [])

  const destaque = movies[0]

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        setMovies={setMovies}
        setQueryError={setQueryError}
        buscarFilmes={buscarFilmes}
        queryLoading={queryLoading}
        tema={tema}
        setTema={setTema}
      />

      <Filmes movies={movies} queryError={queryError} />

      {loading && <p className="mensagem">Carregando...</p>}

      {!loading && error && (
        <p className="mensagem">
          Alguns dados não puderam ser carregados.
        </p>
      )}

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <Person person={person} />

        <DragonBall personagem={personagem} />

        <button
          type="button"
          className="counter"
          onClick={() => setCount(c => c + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>

          <div>
            <h1>O Goat dos filmes.</h1>
            <Destaque destaque={destaque} />
          </div>

          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>

            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>

          <h2>Meu Pet</h2>

          <Pokemon pokemon={pokemon} />
          <RandomEncounter/>
          <ul>
            <li>
              <a href="https://github.com/thales097" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
