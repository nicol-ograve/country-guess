import React, { useCallback, useMemo, useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';


import countryGeo from '../data/countries.geo';
import geometryMap from '../data/countries-geometry-map';
import { Map as MapboxMap } from 'mapbox-gl';
import { observer } from 'mobx-react';

//@ts-ignore
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import { CountryGuess } from '../store/models/country-guess';
import memoize from 'fast-memoize';

const Mapbox = ReactMapboxGl({
    doubleClickZoom: false,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN || ''
});
//@ts-ignore
Mapbox.workerClass = MapboxWorker;

interface MapProps {
    selectedCountryId?: string;
    guessedCountries: CountryGuess[];

    selectCountry: (id: string) => void;
    clearSelectedCountry: () => void;
}

const createGuessedPaint = memoize((guessedPercentage: number) => {
    let opacity = 1;
    if (guessedPercentage < .34) {
        opacity = .25;
    } else if (guessedPercentage < .67) {
        opacity = .50;
    }
    return {
        'fill-opacity': opacity,
        'fill-color': 'rgb(0, 200, 0)',
        'fill-outline-color': 'rgb(0, 100, 0)'
    };
});

export const WorldMap = observer((props: MapProps) => {

    const { selectedCountryId, guessedCountries, selectCountry, clearSelectedCountry } = props;
    const [hoveredCountryId, handleCountryHover] = useState<string | undefined>(undefined);


    const [zoom, setZoom] = useState(0);
    const handleZoomEnd = useCallback((e: MapboxMap) => {
        setZoom(e.getZoom());
    }, []);

    const countriesPaint = useMemo(() => ({
        'fill-opacity': 0.5,
        'fill-color': 'rgba(200, 100, 240, 0.4)',
        'fill-outline-color': 'rgba(200, 100, 240, 1)'
    }), []);
    const hoveredCountryPaint = countriesPaint;

    const selectedCountryPaint = useMemo(() => ({
        'fill-color': 'rgb(255, 204, 0)',
        'fill-outline-color': 'rgb(150, 150, 0)'
    }), []);

    console.log('COUNTRIES', guessedCountries);
    const guessedCountriesGeometry = useMemo(() => guessedCountries?.map(item => ({
        percentage: item.guessedPercentage,
        code: item.code3l,
        geometry: geometryMap[item.code3l]
    })), [guessedCountries]);

    const onCountryHover = useCallback((e: any) => {
        const features = e?.features;
        const id: string = features && features[0]?.properties?.id;

        if (id)
            handleCountryHover(id);
    }, []);

    const onCountryClick = useCallback((e: any) => {
        const features = e?.features;
        const id: string = features && features[0]?.properties?.id;

        if (id !== selectedCountryId) {
            selectCountry(id);
        } else {
            clearSelectedCountry();
        }
    }, [selectedCountryId]);

    const hoveredGeometry = useMemo(() => hoveredCountryId ? geometryMap[hoveredCountryId] : undefined, [hoveredCountryId]);
    const selectedGeometry = useMemo(() => selectedCountryId ? geometryMap[selectedCountryId] : undefined, [selectedCountryId]);

    return <Mapbox
        zoom={[zoom]}
        onZoomEnd={handleZoomEnd}
        style={'mapbox://styles/nicol-ograve/ckjam7amk400w1ape4bhjs3d3'}>
        <>
            <GeoJSONLayer
                data={countryGeo}
                fillPaint={countriesPaint}
                fillOnMouseMove={onCountryHover}
                fillOnClick={onCountryClick} />

            {selectedCountryId &&
                <GeoJSONLayer
                    data={selectedGeometry}
                    fillPaint={selectedCountryPaint} />}

            {hoveredCountryId && hoveredCountryId !== selectedCountryId &&
                <GeoJSONLayer
                    data={hoveredGeometry}
                    fillPaint={hoveredCountryPaint} />}

            {guessedCountriesGeometry?.map(item => <GeoJSONLayer key={item.code}
                data={item.geometry}
                fillPaint={createGuessedPaint(item.percentage)} />)}
        </>
    </Mapbox >;
});