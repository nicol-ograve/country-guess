import { Country } from "../../entities/country";
import equalFlagsMap from "../equal-flags-map";
import { CountryGuess } from "../models/country-guess";
import { QuestionGuessStatus } from "../models/question";
import { Serializer } from "./serializer";

export class QuestionGuessStatusSerializer implements Serializer<QuestionGuessStatus> {
    serialize = (value: QuestionGuessStatus) => JSON.stringify(value);
    deserialize = (value: string) => value ? JSON.parse(value) : undefined;

}

export class CountryGuessSerializer implements Serializer<CountryGuess> {
    serialize = (value: CountryGuess) => {
        const questionSerializer = new QuestionGuessStatusSerializer();
        const result = {
            country: JSON.stringify(value.country),
            capital: value.capitalGuess ? questionSerializer.serialize(value.capitalGuess) : undefined,
            name: questionSerializer.serialize(value.nameGuess),
            flag: questionSerializer.serialize(value.flagGuess),
        };
        return JSON.stringify(result);
    };
    deserialize = (value: string) => {
        const questionSerializer = new QuestionGuessStatusSerializer();
        const result = JSON.parse(value);

        const country: Country = JSON.parse(result.country);

    
        return new CountryGuess(
            country,
            equalFlagsMap.get(country.code2l),
            questionSerializer.deserialize(result.name),
            questionSerializer.deserialize(result.capital),
            questionSerializer.deserialize(result.flag)
        );
    };

}