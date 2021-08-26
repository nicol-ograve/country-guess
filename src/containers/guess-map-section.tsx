import React from 'react';
import { GuessInput } from '../components/guess-input/guess-input';
import { WorldMap } from '../components/map';
import { FlagGuessInput } from '../components/flag-input/flag-guess-input';

import { CountriesStore } from '../store/countries-store';
import { observer } from 'mobx-react';

import './guess-map-section.scss';
interface GuessMapSectionsProps {
    store: CountriesStore;
}

export const GuessMapSections = observer(({ store }: GuessMapSectionsProps) => {

    const { selectedCountry, guessedCountries, flagsToGuess: unguessedFlags, selectCountry, clearSelectedCountry } = store;

    return <section className='guess-map-section'>
        <WorldMap
            selectedCountryId={selectedCountry?.code3l}
            selectCountry={selectCountry}
            clearSelectedCountry={clearSelectedCountry}
            guessedCountries={guessedCountries}
        />
        {selectedCountry && <GuessInput wordGuess={selectedCountry.nameGuess} />}
        {selectedCountry && selectedCountry.capitalGuess && <GuessInput wordGuess={selectedCountry.capitalGuess} />}
        {selectedCountry && <FlagGuessInput
            key={selectedCountry?.code3l}
            countryCodes={unguessedFlags}
            flagGuess={selectedCountry.flagGuess} />}
    </section>;
});