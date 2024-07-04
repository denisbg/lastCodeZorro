import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import BannerHome from "../components/front/bannerHome";
//import BannerHomeNc from "../components/front/bannerHomeNc";
import Base from "../theme/front/base";
import Pourquoichoisir from "./front/ficheUniversParts/pourquoiChoisir.js";
import {
  ContentPageStyle,
  HomeReparateur,
  HomeBlocs,
} from "../assets/styles/frontGlobalStyle";
import BonusReparation from "./front/ficheUniversParts/bonusreparation.js";

import { Link } from "react-router-dom";
//import slideImage1 from "../assets/images/slider-image/home-slider-1.png";
//import slideImage2 from "../assets/images/slider-image/home-slider-2.png";
//import slideImage3 from "../assets/images/slider-image/home-slider-3.png";
//import slideImage4 from "../assets/images/slider-image/home-slider-4.png";
//import slideImage5 from "../assets/images/slider-image/home-slider-5.png";
//import slideImage6 from "../assets/images/slider-image/home-slider-6.png";
import slideImage1 from "../assets/images/slider-image/home-slider-1.png";
import slideImage2 from "../assets/images/slider-image/home-slider-2.png";
import slideImage3 from "../assets/images/slider-image/home-slider-3.png";
import slideImage4 from "../assets/images/slider-image/home-slider-4.png";
import slideImage5 from "../assets/images/slider-image/home-slider-5.png";
import slideImage6 from "../assets/images/slider-image/home-slider-6.png";
import slideImage7 from "../assets/images/slider-image/home-slider-7.png";
import noImage from "../assets/images/noImage.png";
import * as vars from "../vars";
import ParcoursClient from "./front/parcoursclient";
import Partenaires from "./front/ficheUniversParts/Partenaires.js";

export default function Home() {
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);
  const universe = useSelector((state) => state.universe);
  const isDisplayedBottom = false;
  const sliderImages = [
    {
      id: 1,
      url: slideImage1,
    },
    {
      id: 2,
      url: slideImage2,
    },
    {
      id: 3,
      url: slideImage3,
    },
    {
      id: 4,
      url: slideImage4,
    },
    {
      id: 5,
      url: slideImage5,
    },
    {
      id: 6,
      url: slideImage6,
    },
    {
      id: 7,
      url: slideImage7,
    },
  ];
  return (
    <Base style={{ backgroundColor: '#F6F3F5', paddingTop: 50 }} >
      <BannerHome
        sliderBanner={sliderImages}
        title="Faites réparer les objets qui vous sont chers"
        isDisplayedBottom={false}
      />
       
      <ContentPageStyle style={{ backgroundColor: '#F6F3F5'}}>
        <Container className="col-md-8 col-sm-3 col-lg-8"> 
      


          <ParcoursClient ></ParcoursClient>
          <HomeBlocs  >
            <div id="nousreparons" style={{ marginTop:100, marginBottom:40,  paddingBottom: 35, textAlign: 'center', color: '#465a61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std-75Bold,Helvetica', 
            fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Découvrez nos services de réparation</div>
            <Row>
              {universe.allUniverses &&
                universe.allUniverses.map((row) => (
                  <Col lg={4} sm={6} className="item-cat-univers" key={row.id}  >
                    <Link

                      to={`/univers/${row.slug}-${row.id}`}
                      className="content-item-univers"
                      style={{marginTop:15, paddingBottom:15}}
                    >
                      <img className="box" src={getPathImage(row.imageHome)} alt={row.name}  />
                      <p className="name-cat-univers">{row.name}</p>
                    </Link>
                  </Col>
                ))}
            </Row>
          </HomeBlocs>
          <Pourquoichoisir></Pourquoichoisir>
          <BonusReparation> </BonusReparation>
          <BannerHome
            isDisplayedBottom={true}
          />
          
          <Partenaires>   </Partenaires>
        </Container>
      </ContentPageStyle>

    </Base>
  );
}
