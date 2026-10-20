import { useState, useEffect } from 'react' 
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import axios from "axios"
import DragonBall from './components/DragonBall.jsx';


function App() {
  const [text, setText] = useState(()=> {
    return localStorage.getItem('easy-input') || '';
  });
  const [tema, setTema] = useState(() => {
  return localStorage.getItem('tema-site') || 'claro';
});
  const [count, setCount] = useState(0);
const [person, setPerson] = useState({}); 
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(false); 
const [personagem, setPersonagem] = useState({});
const[pokemon, setPokemon] = useState({});
const[filme, setFilme] = useState({});
const [query, setQuery] = useState ('');
const [movies, setMovies] = useState([]);
const [queryLoading, setQueryLoading] = useState(false);
const [queryError, setQueryError] = useState('');
useEffect(()=>{
localStorage.setItem('easy-input', text)
},[text])

useEffect(() => {
  document.documentElement.dataset.theme = tema;
  localStorage.setItem('tema-site', tema);
}, [tema]);

const buscarFilmes = async() =>{
  if (!query.trim()){
    setMovies([]);
    setQueryError('Digite o nome de um filme.');
    return
  }
  try{
    setQueryLoading(true);
    setQueryError('');
    const res = await axios.get(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=135716d2`);
    if(res.data.Response === 'True'){
      setMovies(res.data.Search);
    }else{
      setMovies([]);
      setQueryError('Nenhum filme encontrado.');
    }
  }catch (error){
    setMovies([]);
    setQueryError('Error ao buscar filmes, tente novamente');
    console.error(error);
  }finally{
    setQueryLoading(false);
  }
};

useEffect(() => { 
const getData = async () => { 
try { 
const res4 = await axios.get(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=135716d2`)
setFilme(res4.data);
const res3 = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard")
setPokemon(res3.data);
const res2 = await axios.get("https://6a79e554674f43f4db11ebc8.mockapi.io/api/person")
setPerson(res2.data);
const res = await axios.get( "https://dragonball-api.com/api/characters/31" ); 
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
  const valor = e.target.value;
  setQuery(valor);

  if (!valor.trim()) {
    setMovies([]);
    setQueryError('');
  }
}}

      onKeyDown={(e) => {
        if (e.key === 'Enter') buscarFilmes();
      }}
      placeholder="Pesquise um filme..."
    />

    <button
      type="button"
      className="btn-pesquisar"
      onClick={buscarFilmes}
    >
      Pesquisar
    </button>
  </div>

  <div className="tema-opcoes">
    <button
      className="botao-tema"
      onClick={() =>
        setTema(tema === 'claro' ? 'escuro' : 'claro')
      }
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {tema === 'claro' ? '🌙' : '☀️'}
    </button>
  </div>
</header>

    
    {queryError && <p>{queryError}</p>}
    
    <ul>
      {movies.map((movies) => (
      <li key={movies.imdbID}>
        <h3>{movies.Title}</h3>
        <p>Ano:{movies.Year}</p>
        <p>Tipo: {movies.Type}</p>

        {movies.Poster !=='N/A' && (
          <img
          src={movies.Poster}
          alt={`Poster de ${movies.Title}`}
          width='150'
          />
        )}
         
         </li>
        ))}
    </ul>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>{person[1]?.nome}</h1>
        </div>

        <DragonBall personagem={personagem}/>

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
              <a href="https://github.com/thales097" target="_blank">
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
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
