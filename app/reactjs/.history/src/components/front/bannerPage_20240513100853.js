import React from "react";
import { Container } from "react-bootstrap";
import noImage from "../../assets/images/noImage.png";
import { BackStyle, PageBanner } from "../../assets/styles/frontGlobalStyle";
import { BackIcon } from "../../assets/styles/icons";
import ROUTES from "../../config/routes";
import * as vars from "../../vars";

export default function BannerPage({ universe }) {
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);
  let imagebg = getPathImage(universe.image);
  console.log("STEP BP :1:01 ", universe.image, universe.name, imagebg);



  return (
    <PageBanner className="banner-page-universe" >

      <Container>
        <div className="bloc-title-banner" style={{ backgroundImage: `url(${imagebg}` }}>
          <img src={imagebg}></img>
      
          <div class="item-slider-banner">
            
          </div>
        </div>



        <BackStyle to={ROUTES.HOME.url}>
          <BackIcon />
          <span style={{ color: '#000000' }}>Retour à la page d'accueil</span>
        </BackStyle>
      </Container>
    </PageBanner>
  
     
  );
}