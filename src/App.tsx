import React, { useState, useEffect } from 'react';
import { MeiliSearch } from 'meilisearch';
import { FaPaw, FaSearch } from 'react-icons/fa'; // Íconos de huella y lupa
import './App.css';

const client = new MeiliSearch({
  host: 'http://18.227.13.140',
  apiKey: 'c716781c75b1115ae1bd945fd73b87d2f12a5f2e878cfc6fbe45f68d57be',
});

const App = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  // useEffect para ejecutar la búsqueda cada vez que cambie el query
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        try {
          setError(null);
          const index = client.index('movies');
          const { hits } = await index.search(query);
          setResultados(hits);
        } catch (err) {
          console.error('Error al buscar:', err);
          setError('No se pudo realizar la búsqueda');
        }
      } else {
        setResultados([]);
      }
    };

    fetchResults();
  }, [query]); // Solo se ejecuta cuando `query` cambia

  return (
    <div className="app-container">
      <header className="header">
        <FaPaw size="2rem" color="#007bff" /> {/* Huella azul */}
        <h1 className="title">Blue Dog</h1>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Escribe el título de una película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button">
          <FaSearch size="20px" />
        </button>
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
