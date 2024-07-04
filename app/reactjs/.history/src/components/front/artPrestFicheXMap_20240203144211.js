import React from "react";
import { greatPlaceStyleHover, greatPlaceStyle } from "./markerStyle";
export default function ArtPrestFicheXMap({ ...props }) {
    const style = props.hover ? greatPlaceStyleHover : greatPlaceStyle;
    return (
        <>
            {props.text ? (
                <div
                    className={`item-map-prestation`}
                    style={style}
                >
                    <div>{props.text}</div>
                </div>
            ) : null}
        </>
    );
}
