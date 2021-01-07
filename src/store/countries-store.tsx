import { makeAutoObservable } from "mobx";
import countriesData from "../data/countries-data";
import { Country } from "../entities/country";

export class CountriesStore {
    countries: Map<string, Country>;
    selectedCountry?: Country;

    constructor() {
        this.countries = Object.values(countriesData).reduce((map, item) => {
            map.set(item.code3l, item);
            return map;
        }, new Map<string, Country>());
        makeAutoObservable(this);
    }

    selectCountry = (id: string) => {
        console.log('id', id);
        this.selectedCountry = this.countries.get(id);
        console.log('COUN', this.selectedCountry);
    };

    clearSelectedCountry = () => {
        this.selectedCountry = undefined;
    };
}