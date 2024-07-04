import React, { useEffect, useState } from "react";
import ListProduits from "../../components/front/listProduits.js";
import getImgUniverse  from  "./universeImageManager.js"
import { useDispatch, useSelector } from "react-redux";
import imgbonusreparation from '../../assets/images/bonusreparation.png';
import connector from "../../connector.js";
import endPoints from "../../config/endPoints.js";
import { useMediaQuery } from "react-responsive";
import cordZ3img1 from '../../assets/images/z3-3.png';
import cordZ3img2 from '../../assets/images/z3-2.png';
import cordZ3img3 from '../../assets/images/z3-1.png';
import cordZ3imgbottom from '../../assets/images/cordZ3imgbottom.png';

import { useParams } from "react-router-dom";
import MapArtisansUnivers from "./mapArtisansUnivers.js";
import { Col, Container, Row } from "react-bootstrap";
import Commentcamarche from "./ficheUniversParts/commentcamarche.js";
import DecouvrezArtisan from "./ficheUniversParts/decouvrezArtisan.js";
import AnatomieUniverse from "./ficheUniversParts/anatomieUniverse.js";
import PrestationsFavorites from "./ficheUniversParts/prestationsFavorites.js";
import anatomieCord from '../../assets/images/zanatCord.png';
import ButtonDef from "../../components/ui-elements/buttonDef.js";


function strUcFirst(a) {
  return (a + '').charAt(0).toUpperCase() + (a + '').substr(1);
}
export default function Listo( )
{
  
  const { slugIdUniverse , repairManId} = useParams();
  console.log("listo",slugIdUniverse ,repairManId)

  return <>OK MAN {slugIdUniverse} {repairManId}}</>


} 