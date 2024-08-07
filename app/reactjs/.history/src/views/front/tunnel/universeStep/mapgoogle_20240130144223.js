/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as vars from "../../vars.js";
import GoogleMap from "google-map-react";
export default function fx() {
    return (
    <GoogleMap
    apiKey={vars.mapsApiKey}
    center={state.map.center}
    zoom={state.map.zoom}
    hoverDistance={K_SIZE / 2}
    onChildClick={_onChildClick}
    onGoogleApiLoaded={({ map, maps }) => {
      //console.log("map is loaded.");
    }}
  >
    {places}
  </GoogleMap>
    )
}
