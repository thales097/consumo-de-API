import { useState, useEffect } from 'react' 
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import axios from "axios"


function App() {
  const [count, setCount] = useState(0)
const [person, setPerson] = useState({}); 
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(false); 
const [personagem, setPersonagem] = useState({});
const[pokemon, setPokemon] = useState({});
const[filme, setFilme] = useState({});

useEffect(() => { 
const getData = async () => { 
try { 
const res4 = await axios.get("https://www.omdbapi.com/?s=The%20Butterfly%20Effect&apikey=135716d2")
setFilme(res4.data);
const res3 = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard")
setPokemon(res3.data);
const res2 = await axios.get("https://6a79e554674f43f4db11ebc8.mockapi.io/api/person")
setPerson(res2.data);
const res = await axios.get( "https://dragonball-api.com/api/characters/11" ); 
setPersonagem(res.data); 
console.log("Success:", res.data); 
setLoading(false); 
} 
catch (e) { 
console.error( "Erro ao carregar API", e ); 
setLoading(false); 
setError(true); 
} 
} 
getData(); 
}, []);

if(loading){return(<div>Carregando</div>)}
if(error){return(<div>Ocorreu um erro</div>)}

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>{person[1].nome}</h1>
        </div>
        <div>
          <h1>{personagem.name}</h1>
          <img 
          src={personagem.image}
          alt={personagem.name}
          width='250'
          />

          <p>Raça: {personagem.race}</p>
          <p>Ki: {personagem.ki}</p>
          <p>Ki maximo: {personagem.maxKi}</p>
          <p>Afiliação: {personagem.affiliation}</p>
          <p>Descrição: {personagem.description}</p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
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
          <h2>{filme.Search?.[0]?.Title}</h2>
          
          <img
          src={filme.Search?.[0]?.Poster}
          alt={filme.Search?.[0]?.Title}
          />
        </div>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
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
          <div>
          <h1>{pokemon.name}</h1>
          <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          width={"250"}
          />
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
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
