import { makeAutoObservable } from "mobx";
import { Country } from "../../entities/country";
import { WordGuess } from "./word-guess";

export class CountryGuess {

    private country: Country;

    nameGuess: WordGuess;
    capitalGuess?: WordGuess;
    country2LCode: string;
    


    constructor(country: Country) {
        this.country = country;

        this.nameGuess = new WordGuess(country.name, 'Country name');
        this.country2LCode = country.code2l;
        if(country.capital)
            this.capitalGuess = new WordGuess(country.capital, 'Capital city');

        makeAutoObservable(this);
    }

}