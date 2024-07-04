
import { Col, Row } from "react-bootstrap";
import ArtPrestFicheXMap from "./artPrestationFicheMap";
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import * as vars from "../../vars";
import { K_SIZE } from "./markerStyle";
export default function ArtXmap({ ...props }) {
    const locations = [
        { lat: -31.56391, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 },
        { lat: -33.727111, lng: 150.371124 },
        { lat: -33.848588, lng: 151.209834 },
        { lat: -33.851702, lng: 151.216968 },
        { lat: -34.671264, lng: 150.863657 },
        { lat: -35.304724, lng: 148.662905 },
        { lat: -36.817685, lng: 175.699196 },
        { lat: -36.828611, lng: 175.790222 },
        { lat: -37.75, lng: 145.116667 },
        { lat: -37.759859, lng: 145.128708 },
        { lat: -37.765015, lng: 145.133858 },
        { lat: -37.770104, lng: 145.143299 },
        { lat: -37.7737, lng: 145.145187 },
        { lat: -37.774785, lng: 145.137978 },
        { lat: -37.819616, lng: 144.968119 },
        { lat: -38.330766, lng: 144.695692 },
        { lat: -39.927193, lng: 175.053218 },
        { lat: -41.330162, lng: 174.865694 },
        { lat: -42.734358, lng: 147.439506 },
        { lat: -42.734358, lng: 147.501315 },
        { lat: -42.735258, lng: 147.438 },
        { lat: -43.999792, lng: 170.463352 },
    ];

    const [state, setState] = useState({
        map: { center: [48.8534, 2.3488], zoom: 10 },
    });
   

    const xplaces = locations.length
        ? locations.map((row) => {
            return (
                <ArtPrestFicheXMap
                    key={row.lat}
                    lat={row.lng}
                    text={'dedde'}
                    id={row.id}
                    activeBenefit = {row.id}
                    // use your hover state (from store, react-controllables etc...)
                    //activeBenefit={activeBenefit}
                />
            );
        })
        : "";
    const none = "Regroupement de repères";
    const _onXChildClick = (key, childProps) => {
        let i = null;
        return true;
    
      };
    

    return (
        <>

            <GoogleMap
                apiKey={vars.mapsApiKey}
                center={state.map.center}
                zoom={state.map.zoom}
                hoverDistance={K_SIZE / 2}
                onChildClick={_onXChildClick}
                onGoogleApiLoaded={({ map, maps }) => {
                    //console.log("map is loaded.");
                }}
            >
                {xplaces}
            </GoogleMap>
            
            {Object.entries(locations).map(([key, location], i) => (
                <li className="travelcompany-input" key={i}>
                    <span className="input-label">key: {i} Name: {location.lat}</span>
                </li>
            ))}
        </>

    )
}
