import React, { useEffect } from 'react';
import { GuessMapSections } from './containers/guess-map-section';
import { ReactComponent as Flags } from './assets/images/sprite.symbol.svg';

import { CountriesStore } from './store/countries-store';

import './App.scss';

const countriesStore = new CountriesStore();

function App() {

  useEffect(() => {
    const cleanup = () => {
      countriesStore.persist();
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  return (
    <div className="App">
      <Flags className='sprite' />
      <GuessMapSections store={countriesStore} />
    </div>
  );
}

export default App;
