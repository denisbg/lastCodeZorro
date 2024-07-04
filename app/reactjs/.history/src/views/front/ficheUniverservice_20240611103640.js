import React, { useEffect, useState } from "react";
import getImgUniverse from "./universeImageManager.js"
import { useDispatch, useSelector } from "react-redux";
//
import imgbonusreparation from '../../assets/images/bonusreparationtransparent.png';

import connector from "../../connector";
import endPoints from "../../config/endPoints";
import { useMediaQuery } from "react-responsive";
import cordZ3imgbottom from '../../assets/images/cordZ3imgbottom.svg';
import { getPathImage, slugify } from "../../helper/functions";
import { useParams } from "react-router-dom";
import MapArtisansUnivers from "./mapArtisansUnivers";
import { Col, Container, Row } from "react-bootstrap";
import Commentcamarche from "./ficheUniversParts/commentcamarche";

import ButtonDef from "../../components/ui-elements/buttonDef";

export default function FicheUniverservice(props
) {
  const { isDisplayListeProduits, setDisplayListeProduits } = props;
  const { isDisplayFicheUnivers, setDisplayFicheUnivers } = props;
  const { isDisplayPrestationsArtisan, setDisplayPrestationsArtisan } = props;

  const [service, setService] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const universe = useSelector((state) => state.universe);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 013px)" });
  const { slugIdUniverse, slugIdService } = useParams();
  const [universeTitle, setuniverseTitle] = useState("");
  const [universeDescription, setuniverseDescription] = useState('');
  const [uniImgVitG, setUniImgVitG] = useState('');
  const [uniImgVitD, setUniImgVitD] = useState('');
  const [uniImgVitC, setUniImgVitC] = useState('');
  const [uniImgAnatomie, setUniImgAnal] = useState('');
  const [uniTxtAnatomie, setUniTxtAnal] = useState('');

  const [displayAnatomieactivated, setdisplayAnatomieactivated] = useState(false);
  const [displayBonusImageisReady, setdisplayBonusImageisReady] = useState(false);
  const [displayBonusImage, setdisplayBonusImage] = useState("0");


  var universeId = slugIdUniverse.split("-").pop();



  const getUniverse = () => {

    const universeId = slugIdUniverse.split("-").pop();
    if (universeId) {
      setdisplayBonusImage('0');
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_UNIVERSE}${universeId}/categories`,

        success: (response) => {
          const arrayObj = response.data || { categories: [] };
          setdisplayBonusImageisReady(true);
          if (response.data?.name) {
            setuniverseTitle(response.data.name);
            setuniverseDescription(response.data.description);
       
   
 
          }
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };


  useEffect(() => {
    setDisplayListeProduits(true);
 
    getUniverse();
   
  }, []);

  

 
  return <></>
}
