import { computed, makeAutoObservable } from "mobx";
import countriesData from "../data/countries-data";
import { Country } from "../entities/country";
import { CountryGuess } from "./models/country-guess";

export class CountriesStore {
    countries: Map<string, CountryGuess>;
    selectedCountry?: CountryGuess;

    @computed get guessedCountries() {
        return Array.from(this.countries, ([, value]) => value).filter((country: CountryGuess) =>  country.guessedPercentage > 0);
    }

    constructor() {
        this.countries = Object.values(countriesData).reduce((map: Map<string, CountryGuess>, item: Country) => {

            const countryGuess = new CountryGuess(item);

            map.set(item.code3l, countryGuess);
            return map;

        }, new Map<string, CountryGuess>());
        makeAutoObservable(this);

    }

    selectCountry = (id: string) => {
        this.selectedCountry = this.countries.get(id);
    };

    clearSelectedCountry = () => {
        this.selectedCountry = undefined;
    };

}