import React, { useState, useEffect } from 'react';
import { MeiliSearch } from 'meilisearch';
import { FaPaw, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Agrego íconos de like y dislike
import './App.css';

const client = new MeiliSearch({
  host: 'http://18.227.13.140',
  apiKey: 'c716781c75b1115ae1bd945fd73b87d2f12a5f2e878cfc6fbe45f68d57be',
});

const App = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const manejarBusqueda = async () => {
    try {
      setError(null);
      const index = client.index('movies');
      const { hits } = await index.search(query);
      setResultados(hits);
    } catch (err) {
      console.error('Error al buscar:', err);
      setError('No se pudo realizar la búsqueda');
    }
  };

  useEffect(() => {
    if (query) {
      manejarBusqueda(); // Ejecuta la búsqueda cada vez que query cambia
    }
  }, [query]);

  return (
    <div className="app-container">
      <header className="header">
        <FaPaw size="2rem" />
        <h1 className="title">Blue Dog</h1>
        <div className="opinion-container">
          <span className="opinion-text">Danos tu opinión</span>
          <FaThumbsUp size="1.5rem" className="like-icon" />
          <FaThumbsDown size="1.5rem" className="dislike-icon" />
        </div>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Escribe el título de una película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul className="results-list">
        {resultados.map(({ id, title, genres, poster, overview }) => (
          <li key={id} className="result-item">
            <img src={poster} alt={title} className="poster" />
            <div>
              <strong>{title || 'Sin título'}</strong> - {genres || 'Sin género'}
              <p>{overview || 'Sin descripción'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
