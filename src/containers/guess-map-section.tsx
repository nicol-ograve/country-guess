import React, { useCallback, useState } from 'react';
import { GuessInput } from '../components/guess-input/guess-input';
import { WorldMap } from '../components/map';
import { WordGuess } from '../model/word-guess';


const romeGuess = new WordGuess('Rome');

export const GuessMapSections = () => {
    
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const clearSelectedCountry = useCallback(() => setSelectedCountryId(''), [setSelectedCountryId]);
  
    return <div>
        <WorldMap
            selectedCountryId={selectedCountryId}
            selectCountry={setSelectedCountryId}
            clearSelectedCountry={clearSelectedCountry}
        />
        <GuessInput wordGuess={romeGuess} />
    </div>;
};