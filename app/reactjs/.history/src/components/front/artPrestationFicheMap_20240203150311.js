import React from "react";
import { greatPlaceStyleHover, greatPlaceStyle } from "./markerStyle";
export default function ArtPrestationFicheMap({ ...props }) {
  const style = props.hover ? greatPlaceStyleHover : greatPlaceStyle;
  return (
    <>
      {props.text ? (
    
          <div>{props.text}</div>
      ) : null}
    </>
  );
}
