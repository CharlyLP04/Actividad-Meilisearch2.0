import React, { useState } from 'react';
import { MeiliSearch } from 'meilisearch';
import './App.css';

// Configuración del cliente MeiliSearch
const client = new MeiliSearch({
  host: 'http://18.227.13.140', 
  apiKey: 'b403bf62a797c2774542c7b6bc114125c6ca9aa5124507cc38b8fbfb8387',
});

const App = () => {
  const [query, setQuery] = useState(''); // Estado para la consulta
  const [resultados, setResultados] = useState([]); // Estado para los resultados
  const [error, setError] = useState(null); // Estado para el error de búsqueda (se lo puse porque tuve muchos errores al buscar)
 
  // Manejar la búsqueda
  const manejarBusqueda = async () => {
    try {
      setError(null); // Limpiar errores previos
      const index = client.index('movies'); // Obtener el índice de 'movies'
      const { hits } = await index.search(query); // Realizar la búsqueda
      setResultados(hits); // Guardar los resultados
    } catch (err) {
      console.error('No encontrado:', err);
      setError('No se pudo realizar la búsqueda, en este momento'); // Manejar el error
    }
  };