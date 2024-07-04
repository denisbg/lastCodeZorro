import React, { useEffect, useState } from "react";
import { RepairManlatlng } from '../../components/front/repairManPositions.js'
import ArtPrestationFiche from "../../components/front/artPrestationFiche.js";
import imgVector from "../../assets/images/icons/mapVector.svg";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { array } from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";


/**
* @param {String} HTML representing a single element.
* @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
* @return {Element | HTMLCollection | null}
*/
function fromHTML(html, trim = true) {
  // Process the HTML string.
  html = trim ? html.trim() : html;
  if (!html) return null;

  // Then set up a new template element.
  const template = document.createElement('template');
  template.innerHTML = html;
  const result = template.content.children;

  // Then return either an HTMLElement or HTMLCollection,
  // based on whether the input HTML had one or more roots.
  if (result.length === 1) return result[0];
  return result;
}
//export default function NewMap(positions, displayUniverseUsersIsReady,  ...props) {
export default function NewMap(positions, displayUniverseUsersIsReady, ...props) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 994px)", });
  const [activeBenefit, setActiveBenefit] = useState({ id: null });
  const [activeRow, setActiveRow] = useState({ id: null });
  const [localData, setlocalData] = useState( null  );
  
  let displayDiscoverArtRoute = true;


  const showData = () => {
    let data = RepairManlatlng;

    if (false && !displayUniverseUsersIsReady) {
      return <></>
    }
    else {
      let xdata = [];
      let xrow = 0;

      if (positions.position) {
        let xi = 0;
        var ent;
        let RepairManlatlng = [];
        Object.entries(positions.position).forEach(entry => {
          const [key, value] = entry;
          let position = value;
          ent = Object.entries(value);
          // if (position['lat'] && position['lng']) {
          xdata[xrow] = position;
          xrow++;
          // }

        });
      }
      data = xdata;
      setlocalData(xdata);
    }
    if (data === false)
      return (
        <p className="loading-table" style={{ textAlign: "center" }}>
          Chargement...
        </p>
      );
    if (data.length === 0)
      return (
        <h3
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "22px",
            fontWeight: "600",
            margin: "40px 0",
          }}
        >
          Aucune données
        </h3>
      );
    return (
      data.map(rowRenderArt)
    )
  };
  const rowRenderArt = (row) => (
    <ArtPrestationFiche

      activeBenefit={activeBenefit}
      setActiveBenefit={setActiveBenefit}
      activeRow={activeRow}
      key={row.email} row={row} id={row.id}
    />


  )


  useEffect(() => {
    function onChildClick(htmlElement) {
      // Then set up a new template element.
     const div = fromHTML(htmlElement);
     const result = div.localId.lastChild.data;
      var element_to_restore = document.getElementById('allrows');
      console.log("NM 5.21 element_to_restore", result);
    
      // element_to_restore?.setAttribute('class', 'content-item-fiche');
      // element_to_restore?.setAttribute('style', 'width:90%, box-shadow:0 2px 9px 0 rgba(182,172,251,0.42)');
      let a =  document.getElementById('allrows').innerHTML;
     //let a =  document.getElementById('allrows').innerHTML.replace('box-shadow: 10px 5px 5px #4D5F68', 'box-shadow:0 2px 9px 0 rgba(182,172,251,0.42)');
     //console.log("NM 5.22 getElementById('allrows')", a);
     //a.replace('"box-shadow: 10px 5px 5px #4D5F68"', '');
     //console.log("NM 5.22 getElementById('allrows')", a);
     //document.getElementById('allrows').innerHTML = a;
     // document.getElementById('allrows').innerHTML = document.getElementById('allrows').innerHTML.replace (
     //  "overflow: auto",
     //   "overflow: unset" );
      
      console.log("NM 5.23 localdata",localData);
     setActiveRow(result);
      var element_to_scroll_to = document.getElementById(result);
      if (element_to_scroll_to) {
     
   
       element_to_scroll_to.scrollIntoView();
       element_to_scroll_to.setAttribute('style', 'box-shadow: 10px 5px 5px #4D5F68');
     }
    }

    function addInfoWindow(marker, message) {
      var infoWindow = new window.google.maps.InfoWindow({
        content: message
      });
      window.google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
       onChildClick(infoWindow.getContent());
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

    // Initialize the map
    const mapOptions = {
      center: { lat: 48.9940649, lng: 2.5229373 }, // Set the initial center of the map
      zoom: 5.8, // Set the initial zoom level
      mapTypeControlOptions: {
        mapTypeIds: [ window.google.maps.MapTypeId.ROADMAP,  window.google.maps.MapTypeId.HYBRID]
      }, // here´s the array of controls
      disableDefaultUI: true, // a way to quickly hide all controls
      mapTypeControl: false,
      scaleControl: true,
      zoomControl: true,
      zoomControlOptions: {
        style:  window.google.maps.ZoomControlStyle.LARGE
      },
      mapTypeId:  window.google.maps.MapTypeId.ROADMAP

    };


  

  const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

 

  if (positions.position) {
    let xi = 0;
    var ent;
    let RepairManlatlng = [];
    Object.entries(positions.position).forEach(entry => {
      const [key, value] = entry;
      let position = value;
      ent = Object.entries(value);
      if (position['lat'] && position['lng']) {
        RepairManlatlng.push(position);
      }

    });
    //console.log("Step NM TU 0.3 watch map positions ", RepairManlatlng);
    //setIsDisplayed(true);
    const markers = RepairManlatlng.map((position, i) => {

      const marker = new window.google.maps.Marker({
        position,
        map,
        icon: repairIcon,
      });

      let renderx = "<b>" + position['label'] + "</b><br/>" + position['postalcode'] + "</b><br/>" + position['city_code'] + "<span hidden id='localId' >" + position['id'] + "</span>"
      addInfoWindow(marker, renderx);

      xi++;
      return marker;
    });
    var options = {
      maxZoom: 10,

      styles: [{
        width: 53,
        height: 53,
        textColor: '#0002',
      }]

    };
    new MarkerClusterer({ map, markers, algorithmOptions: { maxZoom: 10 } });

  }

}, [positions, displayUniverseUsersIsReady]);
return (

  <Container style={{ marginTop: 50 }} >
     {displayDiscoverArtRoute && (

<Row>
  <Col style={{
    marginBottom: '3%', marginTop: '0%', width: '100%', height: '95%', color: '#465A61', fontSize: 40,
    fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word'
  }}>
    Découvrez nos artisans en France
  </Col>
</Row>
)
}
   
    <Row className="bloc-lists-prstation-items" >
      <Col lg={5} className="content-lists-prstation-items" id="allrows" style={{ marginTop: 0, overflow: 'auto' }}>
        {isDesktopOrLaptop && (
              <Col style={{ textAlign: "left", width: "100%", height: 400, color: '#444444', fontSize: 10, fontFamily: 'Poppins', fontWeight: '500' }}>
                <p style={{
                  paddingRight: '5%', paddingLeft: '5%',
                  width: '100%', height: '90vh',
                  color: 'rgb(68, 68, 68)', fontSize: 8,
                  fontFamily: 'Poppins', fontWeight: '500',

                  fontSize: 12
                }}>
                  {showData()}
                </p>
        
          </Col>
        )}
        {isTabletOrMobile && (
          {})}
      </Col>
      <Col lg={7} className="bloc-map-list">

        <div id='map' style={{ width: '95%', height: '90vh' }}></div>


      </Col>
    </Row>
  </Container>

)


}