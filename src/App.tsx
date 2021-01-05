import React from 'react';
import { GuessMapSections } from './containers/guess-map-section';
import { ReactComponent as Flags } from './assets/images/sprite.symbol.svg';

import './App.scss';
import { CountriesStore } from './store/countries-store';

const countriesStore = new CountriesStore();

function App() {

  return (
    <div className="App">
      <Flags className='sprite'/>
      <GuessMapSections />
    </div>
  );
}

export default App;
