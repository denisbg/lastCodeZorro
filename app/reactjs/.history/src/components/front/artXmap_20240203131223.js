import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

export default function ArtXmap({ ...props }) {

    const map = new google.maps.Map(
        document.getElementById("xmap") ,
        {
          zoom: 3,
          center: { lat: -28.024, lng: 140.887 },
        }
      );
    


    return (
        <div>
            <xmap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
            >
                <Marker position={center} />
            </xmap>
        </div>
    
  );
}
