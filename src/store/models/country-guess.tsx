import { makeAutoObservable } from "mobx";
import { Country } from "../../entities/country";
import { FlagGuess } from "./flag-guess";
import { WordGuess } from "./word-guess";

export class CountryGuess {

    private country: Country;

    nameGuess: WordGuess;
    capitalGuess?: WordGuess;
    flagGuess: FlagGuess;

    code3l: string;
    
    constructor(country: Country) {
        this.country = country;

        this.code3l = country.code3l;

        this.nameGuess = new WordGuess(country.name, 'Country name');
        this.flagGuess = new FlagGuess(country.code2l);
        if(country.capital)
            this.capitalGuess = new WordGuess(country.capital, 'Capital city');

        makeAutoObservable(this);
    }

}