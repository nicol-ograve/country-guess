import React, { useCallback, useMemo, useState } from 'react';
import { GuessInput } from '../components/guess-input/guess-input';
import { WorldMap } from '../components/map';
import countriesData from '../data/countries-data';
import { CountryGuess } from '../store/models/country-guess';
import { FlagGuessInput } from '../components/flag-input/flag-guess-input';

import './guess-map-section.scss';
import { shuffleArray } from '../utils/utils';


export const GuessMapSections = () => {

    const [selectedCountryId, setSelectedCountryId] = useState('');
    const clearSelectedCountry = useCallback(() => setSelectedCountryId(''), [setSelectedCountryId]);

    const countryGuess = useMemo(
        () => selectedCountryId ? new CountryGuess(countriesData[selectedCountryId]) : undefined,
        [selectedCountryId]
    );

    const countries2LCodes = shuffleArray(Object.values(countriesData).map(country => country.code2l));

    return <section className='guess-map-section'>
        <WorldMap
            selectedCountryId={selectedCountryId}
            selectCountry={setSelectedCountryId}
            clearSelectedCountry={clearSelectedCountry}
        />
        {countryGuess && <GuessInput wordGuess={countryGuess.nameGuess} />}
        {countryGuess && countryGuess.capitalGuess && <GuessInput wordGuess={countryGuess.capitalGuess} />}
        {countryGuess && <FlagGuessInput
            key={selectedCountryId}
            countryCodes={countries2LCodes}
            flagGuess={countryGuess.flagGuess} />}
    </section>;
};