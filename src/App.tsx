import React, { useState } from 'react';
import { MeiliSearch } from 'meilisearch';
import { FaPaw } from 'react-icons/fa'; // Icono de huella
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
    if (!query.trim()) {
      setError('Por favor ingresa un título.');
      return;
    }
    try {
      setError(null);
      const index = client.index('movies');
      const { hits } = await index.search(query);
      setResultados(hits);
    } catch (err) {
      console.error('Error al buscar:', err);
      setError('No se pudo realizar la búsqueda.');
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <FaPaw size="2rem" style={{ color: '#007bff' }} /> {/* Ícono de huella en azul */}
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
        <button onClick={manejarBusqueda} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul className="results-list">
        {resultados.map(({ id, title, genres, poster, overview }) => (
          <li key={id} className="result-item">
            <img
              src={poster || 'https://via.placeholder.com/80x120?text=Sin+imagen'}
              alt={title || 'Sin título'}
              className="poster"
            />
            <div>
              <strong>{title || 'Sin título'}</strong>
              <p>{genres ? genres.join(', ') : 'Sin género'}</p> {/* Mostrar géneros */}
              <p>{overview || 'Sin descripción'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
