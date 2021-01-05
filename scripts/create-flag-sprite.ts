const fs = require('fs');
var SVGSpriter = require('svg-sprite'),
    mkdirp = require('mkdirp'),
    path = require('path');
// Create spriter instance (see below for `config` examples)
var spriter = new SVGSpriter({
    dest: 'out',        // Main output directory
    mode: {
        symbol:true 
    }
});


const createFlagSprite = () => {
    const svgDir = 'src/assets/images/flags/SVG';
    const list = fs.readdirSync(svgDir);

    list.forEach(flag => {
        if (flag !== '.DS_Store') {
            const svgPath = '/Users/Nico/My/Countries/countries-pwa/' + svgDir + '/' + flag;
            spriter.add(svgPath, null, fs.readFileSync(svgPath, { encoding: 'utf-8' }));
        }
    });

    /*
    // Add SVG source files — the manual way ...
    spriter.add('assets/svg-1.svg', null, fs.readFileSync('assets/svg-1.svg', { encoding: 'utf-8' }));
    spriter.add('assets/svg-2.svg', null, fs.readFileSync('assets/svg-2.svg', { encoding: 'utf-8' }));

    */
    // Compile the sprite
    spriter.compile(function (error, result) {
        console.log('error', error);
        console.log('result', result);
        for (var mode in result) {
            for (var resource in result[mode]) {
                console.log(result[mode][resource].path);
                mkdirp.sync(path.dirname(result[mode][resource].path));
                fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
            }
        }
    });
};

createFlagSprite();