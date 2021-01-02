//@ts-ignore
const fs = require('fs');
const mainDataParser = () => {
    const countries = JSON.parse(fs.readFileSync('src/data/countries.json', 'utf8'));
    const capitals = JSON.parse(fs.readFileSync('src/data/capitals.json', 'utf8'));

    const capitalsMap = capitals.reduce((acc, capitalPair) => ({
        ...acc,
        [capitalPair.country]: capitalPair.city
    }), {});

    const countriesMap = countries.reduce((acc, country) => ({
        ...acc,
        [country.code3l]: {
            "code3l": country.code3l,
            "code2l": country.code2l,
            "name": country.name,
            "officialName": country.name_official,
            "latitude": parseFloat(country.latitude),
            "longitude": parseFloat(country.longitude)
        }
    }), {});
    // console.log('c', countriesMap);

    const capitalles = ["Antarctica", "Bouvet Island", "British Indian Ocean Territory",
        "Heard Island and McDonald Islands", "United States Minor Outlying Islands"];
    Object.keys(countriesMap).forEach(countryKey => {
        const countryName = countriesMap[countryKey].name;
        const capital = capitalsMap[countryName];
        if (capital) {
            countriesMap[countryKey].capital = capital;
        } else if (capitalles.indexOf(countryName) === -1) {
            console.log('Country: ', countryName);
        }

    });


    fs.writeFileSync('scripts/countries-data.json', JSON.stringify(countriesMap));
    fs.writeFileSync('scripts/countries-data.ts', `const countries: any = ${JSON.stringify(countriesMap)}`);



}

mainDataParser();