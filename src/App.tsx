import React, { useEffect } from 'react';
import { GuessMapSections } from './containers/guess-map-section';
import { ReactComponent as Flags } from './assets/images/sprite.symbol.svg';

import './App.scss';
import { CountriesStore } from './store/countries-store';

// const storedCountries = localStorage.getItem('countries');
// const countriesStore = storedCountries ? JSON.parse(storedCountries) : new CountriesStore();
const countriesStore = new CountriesStore();

function App() {

  useEffect(() => {

    return () => {
      console.log('STORE');
      localStorage.setItem('countries', JSON.stringify(countriesStore));
    };
  });

  return (
    <div className="App">
      <Flags className='sprite' />
      <GuessMapSections store={countriesStore} />
    </div>
  );
}

export default App;
