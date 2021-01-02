//@ts-ignore
const fs = require('fs');
const main = () => {
    const content = JSON.parse(fs.readFileSync('src/data/countries.geojson', 'utf8'));

    const result = content.features.reduce((acc, f) => ({
        ...acc,
        [f.properties.id]: f.geometry
    }), {});

    fs.writeFileSync('scripts/countries-geometry.ts', `const countries: any = {${JSON.stringify(result)}}`);

    /*
    const geojsonResult = {
        "type": "FeatureCollection", "features": content.features.map((f) => ({
            ...f,
            properties: {
                ...f.properties,
                id: f.id
            }
        }), {})
    };
    fs.writeFileSync('scripts/countries.geojson', JSON.stringify(geojsonResult))*/


}

main();