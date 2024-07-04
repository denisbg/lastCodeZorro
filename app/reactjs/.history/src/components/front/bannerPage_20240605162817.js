import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import noImage from "../../assets/images/noImage.png";
import { BackStyle, PageBanner } from "../../assets/styles/frontGlobalStyle";
import { BackIcon } from "../../assets/styles/icons";
import ROUTES from "../../config/routes";
import * as vars from "../../vars";

export default function BannerPage({ universe }) {
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);
  let imagebg = getPathImage(universe.image);
  //console.log("STEP BP :1:01 ", universe.image, universe.name, imagebg);



  return (
   <>
   <PageBanner className="banner-page-universe" style={{ backgroundImage:  `url("${imagebg}")` }}  >

      <Container >
        <Row className="bloc-title-banner"  >
       
          <div class="item-slider-banner" style={{ fontSize:40,fontWeight:700,  color:'white' }}
         >
      {universe.name}
          </div>
        </Row>
      </Container>
    </PageBanner>
    <Container >
       <BackStyle to={ROUTES.HOME.url}>
       <BackIcon />
       <span style={{ color: '#000000' }}>Retour à la page d'accueil</span>
     </BackStyle>
     </Container>
  </>
     
  );
}
