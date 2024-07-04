import React, { useEffect } from 'react';
import {RepairManlatlng} from './repairManPositions.js'
import { ReparateurIcon } from '../../assets/styles/icons.js';
import imgVector   from "../../assets/images/icons/mapVector.svg";

import { Marker } from '@react-google-maps/api';
import { MarkerClusterer } from "@googlemaps/markerclusterer";


export default function NewMap() {
  useEffect(() => {
    // Initialize the map
    const mapOptions = {
      center: { lat: 48.9940649, lng: 2.5229373 }, // Set the initial center of the map
      zoom:8, // Set the initial zoom level
    };
    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    // Create markers

    function addInfoWindow(marker, message) {
      var infoWindow = new window.google.maps.InfoWindow({
        content: message
      });
      window.google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });
      marker.addListener('mouseover', function () {
        // open your popup window
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', function () {
        // close your popup window
        infoWindow.close();
      });
    }
    const repairIcon = {
      url: imgVector,
      scaledSize: new window.google.maps.Size(40, 40),
    };


  
    const markers = RepairManlatlng.map((position,i) => {
      const marker = new window.google.maps.Marker({
        position,
        map,
        icon: repairIcon,
      });
      addInfoWindow(marker, "<b>"+position['label'] +"</b><br/>"+position['postalcode']+"</b><br/>"+ position['city_code']);
      //addInfoWindow(marker, map, position['label']+"</b><br/>"+position['postalcode']+" "+position['city_code']`);
      return marker;
      
    });
    new MarkerClusterer({ map, markers });
 }, []);

  return <div id='map' style={{ width: '100%', height: '100vh' }}></div>;
}


