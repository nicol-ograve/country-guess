import { computed, makeAutoObservable } from "mobx";
import countriesData from "../data/countries-data";
import { Country } from "../entities/country";
import { shuffleArray } from "../utils/utils";
import equalFlagsMap from "./equal-flags-map";
import { CountryGuess } from "./models/country-guess";
import { CountryGuessSerializer } from "./serializers/country-guess-serializer";

export class CountriesStore {

    private serializer = new CountryGuessSerializer();

    countries: Map<string, CountryGuess> = Object.values(countriesData).reduce((map: Map<string, CountryGuess>, item: Country) => {

        const countryGuess = new CountryGuess(item);

        map.set(item.code3l, countryGuess);
        return map;

    }, new Map<string, CountryGuess>());
    selectedCountry?: CountryGuess;

    @computed get guessedCountries() {
        return Array.from(this.countries, ([, value]) => value).filter((country: CountryGuess) => country.guessedPercentage > 0);
    }

    @computed get flagsToGuess() {
        const repeatedFlagsMap: { [key: string]: boolean } = {};
        equalFlagsMap.forEach(value => {
            repeatedFlagsMap[value] = false;
        });

        return shuffleArray(Array.from(this.countries, ([, value]) => value)
            .filter((guess: CountryGuess) => !guess.flagGuess.isGuessed)
            .map(guess => guess.flagGuess.codeToGuess))
            .filter(codeToGuess => {
                if (repeatedFlagsMap[codeToGuess] !== undefined) {
                    if (!repeatedFlagsMap[codeToGuess]) {
                        repeatedFlagsMap[codeToGuess] = true;
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            });
    }

    constructor() {
        const storedCountriesString = localStorage.getItem('countries');
        const storedCountries = storedCountriesString ? JSON.parse(storedCountriesString) : null;

        this.countries = this.initialCountriesList();
        this.countries = storedCountries !== null
            ? this.parseStoredCountries(storedCountries)
            : this.initialCountriesList();

        makeAutoObservable(this);

        setInterval(() => this.persist, 1000 * 60 * 10);

    }


    private initialCountriesList = () => Object.values(countriesData).reduce((map: Map<string, CountryGuess>, item: Country) => {

        const countryGuess = new CountryGuess(item, equalFlagsMap.get(item.code2l));

        map.set(item.code3l, countryGuess);
        return map;

    }, new Map<string, CountryGuess>());

    selectCountry = (id: string) => {
        this.selectedCountry = this.countries.get(id);
    };

    clearSelectedCountry = () => {
        this.selectedCountry = undefined;
    };

    persist = () => {
        const items: string[] = [];
        this.countries.forEach((country: CountryGuess) => {
            items.push(this.serializer.serialize(country));
        });
        localStorage.setItem('countries', JSON.stringify(items));
    };

    private parseStoredCountries = (countries: string[]): Map<string, CountryGuess> => countries.reduce((map: Map<string, CountryGuess>, item: string) => {

        const guess = this.serializer.deserialize(item);
        map.set(guess.code3l, guess);
        return map;

    }, new Map<string, CountryGuess>());

}

