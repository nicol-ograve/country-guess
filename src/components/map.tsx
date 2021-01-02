import React, { useCallback, useMemo, useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';

import countryGeo from '../data/countries.geo';
import geometryMap from '../data/countries-geometry-map';
import { Map } from 'mapbox-gl';

const Mapbox = ReactMapboxGl({
    doubleClickZoom: false,
    accessToken: 'pk.eyJ1Ijoibmljb2wtb2dyYXZlIiwiYSI6ImNrNHB3N29vMjA5dmgzZXFxNXltbmV4cTMifQ.XZsepxjFzRn2JXkw4pp8mQ'
});

interface MapProps {
    selectedCountryId?: string;
    selectCountry: (id: string) => void;
    clearSelectedCountry: () => void;
}

export const WorldMap = (props: MapProps) => {

    const { selectedCountryId, selectCountry, clearSelectedCountry } = props;
    const [hoveredCountryId, handleCountryHover] = useState<string | undefined>(undefined);

    const [zoom, setZoom] = useState(0);
    const handleZoomEnd = useCallback((e: Map) => {
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


    </Mapbox >;
};