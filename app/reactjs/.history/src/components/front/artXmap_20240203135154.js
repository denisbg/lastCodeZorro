import React from 'react';
import { Col, Row } from "react-bootstrap";
export default function ArtXmap() {
    const none = "non";
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: -28.024, lng: 140.887 },
    });
    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
    });
    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        return (
            <>
                {none}
            </>
        );
    });


    
}


