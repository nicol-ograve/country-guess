import { computed, makeAutoObservable } from "mobx";
import { Country } from "../../entities/country";
import { FlagGuess } from "./flag-guess";
import { WordGuess } from "./word-guess";

export class CountryGuess {

    private country: Country;

    nameGuess: WordGuess;
    capitalGuess?: WordGuess;
    flagGuess: FlagGuess;

    code3l: string;

    guessedAmount = 0;

    constructor(country: Country) {
        this.country = country;

        this.code3l = country.code3l;

        this.nameGuess = new WordGuess(country.name, 'Country name');
        this.flagGuess = new FlagGuess(country.code2l);
        if (country.capital) {
            this.capitalGuess = new WordGuess(country.capital, 'Capital city');
        }

        makeAutoObservable(this);
    }

    @computed get guessedPercentage() {
        const guessedCount = [this.nameGuess.isGuessed, this.capitalGuess?.isGuessed, this.flagGuess.isGuessed]
            .reduce((acc, value) => value ? acc + 1.0 : acc, 0.0);
        return guessedCount / (this.capitalGuess ? 3 : 2);
    }

}