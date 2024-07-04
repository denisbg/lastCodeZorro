import React from "react";
import { greatPlaceStyleHover, greatPlaceStyle } from "./markerStyle";
export default function ArtXmap({ ...props }) {
    const style = props.hover ? greatPlaceStyleHover : greatPlaceStyle;


    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </div>
    
  );
}
