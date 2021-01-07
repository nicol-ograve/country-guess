import React, { useMemo } from 'react';
import { GuessInput } from '../components/guess-input/guess-input';
import { WorldMap } from '../components/map';
import countriesData from '../data/countries-data';
import { CountryGuess } from '../store/models/country-guess';
import { FlagGuessInput } from '../components/flag-input/flag-guess-input';

import './guess-map-section.scss';
import { shuffleArray } from '../utils/utils';
import { CountriesStore } from '../store/countries-store';
import { observer } from 'mobx-react';

interface GuessMapSectionsProps {
    store: CountriesStore;
}

export const GuessMapSections = observer(({ store }: GuessMapSectionsProps) => {

    const {selectedCountry, selectCountry, clearSelectedCountry} = store;

    const countryGuess = useMemo(
        () => selectedCountry ? new CountryGuess(selectedCountry) : undefined,
        [selectedCountry]
    );

    const countries2LCodes = shuffleArray(Object.values(countriesData).map(country => country.code2l));



    return <section className='guess-map-section'>
        <WorldMap
            selectedCountryId={selectedCountry?.code3l}
            selectCountry={selectCountry}
            clearSelectedCountry={clearSelectedCountry}
        />
        {countryGuess && <GuessInput wordGuess={countryGuess.nameGuess} />}
        {countryGuess && countryGuess.capitalGuess && <GuessInput wordGuess={countryGuess.capitalGuess} />}
        {countryGuess && <FlagGuessInput
            key={selectedCountry?.code3l}
            countryCodes={countries2LCodes}
            flagGuess={countryGuess.flagGuess} />}
    </section>;
});