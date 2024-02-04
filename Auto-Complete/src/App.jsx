import React, { useState, useEffect } from 'react';
import './App.css';
import Data from './resources/countryData.json';

import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [escape, setEscape] = useState(false);

  const findsearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const suggestion = Data.filter(({ name }) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setResults(suggestion);
  };

  const resultList = () => (

    results.map((suggestion, index) => (
      <div key={index} className="suggestions">
        {suggestion.name}
      </div>
    ))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearch('');
        setResults([]);
        setEscape(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (escape) {
      setEscape(false);
    }
  }, [escape]);

  return (
    <div className="Container">
      <input
        type="text"
        id="text"
        onChange={findsearch}
        searchholder="Enter Country ame"
        className="search-input"
      />
      <button id="btn" className="search-button">
        S E A R C H
      </button>
      <div className="results">{resultList()}</div>
    </div>
  );
}

export default App;