import React, { useEffect } from 'react';
import { RepairManlatlng } from './repairManPositions.js'
import { ReparateurIcon } from '../../assets/styles/icons.js';
import { MarkerClusterer } from '@react-google-maps/api';
import MapVectorIcon from "../../assets/images/icons/mapVector.svg";
export default function NewMap(mapRepairMen) {
  useEffect(() => {
    // Initialize the map
    const mapOptions = {
//      center: { lat: 48.9940649, lng: 2.5229373 }, // Set the initial center of the map
  //    zoom: 8, // Set the initial zoom level
      zoom: 3,
      center: { lat: -28.024, lng: 140.887 },
  
    };
    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    // Create markers
    function addInfoWindow(marker, message) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: message,
        disableAutoPan: true,
      });
      window.google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });
      marker.addListener('mouseover', function () {
        // open your popup window

        infoWindow.open(map, marker);
      });
      marker.addListener('mouseout', function () { infoWindow.close(); });
    }
    const repairIcon = {
      url: MapVectorIcon,
      scaledSize: new window.google.maps.Size(40, 40),
    };

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const markers = RepairManlatlng.map((position, i) => {
      const render = "<b>" + position['label'] + '</b>' + " " + position['city_code'];
      const label = labels[i % labels.length];
      const marker = new window.google.maps.Marker({
        render,
        label,
        position,
        map
      });

      addInfoWindow(marker, render);
      return marker;
    });
    // Add a marker clusterer to manage the markers.
    new MarkerClusterer(markers, map);
   

  }, []);

 


  return <div id='map' style={{ width: '80%', height: '100vh' }}></div>;
};

