import React, { useState, useEffect, useRef } from "react";
import Select from "../ui-elements/select";
import PrestationFiche from "./prestationFiche";
import { ListFichePrestation } from "../../assets/styles/frontGlobalStyle";
import { Col, Row } from "react-bootstrap";
import GoogleMap from "google-map-react";
import PrestationFicheMap from "./prestationFicheMap";
import { K_SIZE } from "./markerStyle";
import * as vars from "../../vars";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import NewServiceArtisansMap from "../../components/front/newServiceArtisansMap.js";
import { object } from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import { ItemFichePrestation } from "../../assets/styles/frontGlobalStyle";
import { getPathImage, slugify } from "../../helper/functions";
export default function ListePrestationFiche({
  service = {},
  benefits = [],
  filter,
  setFilter,
  greatPlaces,
  isPending,
  ...props
}) {

  let refSlider = useRef(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 593px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });

  const [state, setState] = useState({
    map: { center: [48.8534, 2.3488], zoom: 10 },
  });
  const [activeBenefit, setActiveBenefit] = useState({ id: null });
  const [positions, setPositions] = useState([]);
  const [isPositionsSet, setIsPositionsSet] = useState(false);
  const { slugIdUniverse, slugIdService, slugIdRepairman } = useParams();
  useEffect(() => {
    if (filter.codePostal.latitude && filter.codePostal.longitude) {
      const cpState = { ...state };
      cpState.map.center = [
        filter.codePostal.latitude,
        filter.codePostal.longitude,
      ];
      setState(cpState);
      // // console.log("Step1 filter.codePostal");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.codePostal.latitude, filter.codePostal.longitude]);

  useEffect(() => {
    if (activeBenefit?.user?.latitude && activeBenefit?.user?.longitude) {
      const cpState = { ...state };
      cpState.map.center = [
        activeBenefit.user.latitude,
        activeBenefit.user.longitude,
      ];
      setState(cpState);
      // // console.log("Step2 activeBenefit");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBenefit]);

  const rowRender = (row) => (
    <PrestationFiche
      activeBenefit={activeBenefit}
      setActiveBenefit={setActiveBenefit}
      key={row.id}
      row={row}
    />
  );

  const fetchData = () => {
    if (service === false || isPending)
      return (
        <div className="loading-table" style={{ textAlign: "center" }}>
          Chargement...
        </div>
      );
    else if (benefits.length === 0)
      return (
        <h3
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Aucune donnée
        </h3>
      );
    if (positions.length === 0) {
      clustererPlaces(benefits);

    }

    return (<></>);
  }

  const showData = () => {
    if (service === false || isPending)
      return (
        <div className="loading-table" style={{ textAlign: "center" }}>
          Chargement...
        </div>
      );
    else if (benefits.length === 0)
      return (
        <h3
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Aucune donnée
        </h3>
      );
    if (positions.length === 0) {

      clustererPlaces(benefits);
      //console.log("LPF TU 1.01 positions is loaded",positions);
      //console.log("LPF TU 1.01 benefits just loaded",benefits);
    }
    // // console.log("Step3  benefits.map");

    return benefits.map((row) => {
      // return(<></>);
      return rowRender(row);
    });
  };

  const _onChildClick = (key, childProps) => {
    let i = null;
    const benefit = benefits.length
      ? benefits.find((val, index) => {
        if (val.id === childProps.id) {
          i = index;
          return true;
        }
      })
      : { id: null };
    if (benefit.id) {
      setActiveBenefit(benefit);
      if (isTabletOrMobile) {
        refSlider.slickGoTo(i);
      }
    }
  };

  const getTitleService = () => {
    return `${service.name} : ${benefits.length} réparateur${benefits.length > 1 ? "(s)" : ""
      }`;
  };

  const places = benefits.length
    ? benefits.map((row) => {
      return (
        <PrestationFicheMap
          key={row.id}
          postalCode={row.user.postalCode}
          enterprise={row.user.enterprise}
          city={row.user.city}
          lat={row.user.latitude}
          lng={row.user.longitude}
          picture={row.user.picture}
          bonusreparation={row.user.bonusreparation}
          reparacteur={row.user.reparacteur}


          text={
            row.typeService === "forfait" ? `${row.minPrice} €` : "Sur devis"
          }
          id={row.id}
          // use your hover state (from store, react-controllables etc...)
          activeBenefit={activeBenefit}
        />
      );
    })
    : "";



  function clustererPlaces(benefits) {

    if (!isPositionsSet) {


      let xrows = [];
      let xi = 0;
      let row = object;
      for (xi = 0; xi < benefits.length; xi++) {
        let oneXRow = [];
        row = benefits[xi];
        //console.log("LPF TU 1.031 positions ", row);
        oneXRow['label'] = row.user.enterprise;
        oneXRow['picture'] = row.user.picture;
        oneXRow['bonusreparation'] = row.user.bonusreparation;
        oneXRow['boutiquefermee'] = row.user.boutiquefermee;
        oneXRow['isRegistrationCompleted'] = row.user.isRegistrationCompleted;
        
        oneXRow['reparacteur'] = row.user.reparacteur;
        oneXRow['postalcode'] = row.user.postalCode;
        oneXRow['city_code'] = row.user.city;
        oneXRow['lat'] = row.user.latitude;
        oneXRow['lng'] = row.user.longitude;
        oneXRow['text'] = row.typeService === "forfait" ? `${row.minPrice} €` : "Sur devis";
        oneXRow['id'] = row.id;
        oneXRow['deliveryModes'] = row.deliveryModes;

        oneXRow['linkArtisanService'] = `/artisan/${slugIdUniverse}/${slugIdService}/${slugify(row.user.enterprise)}-${row.user.id}`;
        xrows.push(oneXRow)
        console.log("LPF TU 1.032 user for posution ", row.user);
      }
      console.log("LPF TU 1.032 positions ", xrows);

      setPositions(xrows);
      setIsPositionsSet(true);

    }
  }


  const settings = {
    className: "slider variable-width",
    infinite: false,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    focusOnSelect: true,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (

    <ListFichePrestation>
      <div className="head-list-content">
        <h1 className="title-bloc-products">
          {service ? getTitleService() : ""}
        </h1>
        <Select
          {...filter.sortBy}
          onChange={(e) => {
            const cpFilter = { ...filter };
            cpFilter.codePostal.error = false;
            cpFilter.sortBy.value = e.value;
            setFilter(cpFilter);
          }}
        />
      </div>
      {true && (
        <Row className="bloc-lists-prstation-items">
          {
            //showData()
            fetchData()
          }
          <NewServiceArtisansMap
            position={positions}
          >
          </NewServiceArtisansMap>
        </Row>
      )}

      {false && (
        <Row className="bloc-lists-prstation-items">
          <Col lg={5} className="content-lists-prstation-items">
            {isDesktopOrLaptop && (
              <div className="lists-prstation-items">{showData()}</div>
            )}
            {isTabletOrMobile && (
              <Slider ref={(slider) => (refSlider = slider)} {...settings}>
                {showData()}
              </Slider>
            )}
          </Col>

          <Col lg={7} className="bloc-map-list">
            <GoogleMap
              apiKey={vars.mapsApiKey}
              center={state.map.center}
              zoom={state.map.zoom}
              hoverDistance={K_SIZE / 2}
              onChildClick={_onChildClick}
              onGoogleApiLoaded={({ map, maps }) => {
                //// // console.log("map is loaded.");
              }}
            >
              {places}
            </GoogleMap>
          </Col>
          <Col lg={7} className="bloc-map-list">

          </Col>)
        </Row>

      )}





    </ListFichePrestation>


  )
}
