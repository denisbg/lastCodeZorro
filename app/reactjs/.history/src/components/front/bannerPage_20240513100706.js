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



  return (<>
   
      <PageBanner
      className="default-banner"
      style={{ backgroundImage: `url(${imagebg}` }}
    >
      <Container>
        <div className="bloc-title-banner">
       
          <h1 className="title-banner-cat">{universe.name}</h1>
        </div>
      </Container>
    </PageBanner>
    </>
  );
}
