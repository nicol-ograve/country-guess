import { makeAutoObservable } from "mobx";
import { Country } from "../entities/country";
import { WordGuess } from "./word-guess";

export class CountryGuess {

    private country: Country;

    capitalGuess: WordGuess;

    constructor(country: Country) {
        this.country = country;

        this.capitalGuess = new WordGuess('');

        makeAutoObservable(this);
    }

}