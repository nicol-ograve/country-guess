import countriesData from "../data/countries-data";
import { Country } from "../entities/country";

export class CountriesStore {
    private countries: Map<string, Country>;
    selectedCountry?: Country;

    constructor() {
        this.countries = Object.values(countriesData).reduce((map, item) => {
            map.set(item.code3l, item);
            return map;
        }, new Map<string, Country>());
    }
}