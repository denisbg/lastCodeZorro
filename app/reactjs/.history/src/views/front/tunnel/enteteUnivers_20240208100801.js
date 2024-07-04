import React, { useEffect, useState } from "react";

import connector from "../../../connector";
import endPoints from "../../../config/endPoints";
import { useMediaQuery } from "react-responsive";
import cordZ3img1 from '../../../assets/images/z3-3.png';
import cordZ3img2 from '../../../assets/images/z3-2.png';
import cordZ3img3 from '../../../assets/images/z3-1.png';
import cordZ3imgbottom from '../../../assets/images/cordZ3imgbottom.png';
import { useParams } from "react-router-dom";
import MapArtisansUnivers from "../mapArtisansUnivers";
import { Col, Container, Row } from "react-bootstrap";
import Commentcamarche from "./universeStep/commentcamarche";
import DecouvrezArtisan from "./universeStep/decouvrezArtisan";
import AnatomieUniverse from "./universeStep/anatomieUniverse";
import PrestationsFavorites from "./universeStep/prestationsFavorites";
import anatomieCord from '../../../assets/images/zanatCord.png';

function strUcFirst(a) {
  return (a + '').charAt(0).toUpperCase() + (a + '').substr(1);
}
export default function EnteteUnivers(
) {
  const { slugIdUniverse, slugIdService } = useParams();
  const [universeTitle, setuniverseTitle] = useState("");
  const getUniverse = () => {
    const id = slugIdUniverse.split("-").pop();
    if (id) {
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_UNIVERSE}${id}/categories`,
        success: (response) => {
          const arrayObj = response.data || { categories: [] };

          if (response.data?.name) {
            setuniverseTitle(response.data.name);
            console.log('Titre Univers', response.data.name);
          }
        },
        catch: (error) => {
          console.log(error);


        },
      });
    }
  };
  const [defaultCodePostal] = useState(localStorage.getItem("codePostal"));
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );
  useEffect(() => {
    getUniverse();
  }, []);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  return <Container>

    <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex' }}>
      <div style={{ width: 623, height: 95, color: '#4D5F68', fontSize: 96, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>{universeTitle}</div>
      <div style={{ width: 1000, color: '#929292', fontSize: 20, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>Nos artisans partenaires ne manquent ni de talons, ni de talents. Parfaitement bien dans leurs baskets, ils redonnent forme aux escarpins, bottes, ballerines et sneakers qui passent entre leurs mains. Ils sont du genre à bichonner vos chaussures de la semelle jusqu’au dernier lacet : pas question de s’arrêter au premier coup de pompe !</div>
    </div>

    <div style={{ alignContent: "center", marginTop: 20, marginBottom: 20, width: '50%', height: '100%', paddingLeft: 40, paddingRight: 40, paddingTop: 20, paddingBottom: 20, background: '#9ACA3C', borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
      <div style={{ color: 'white', fontSize: 24, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Commandez une réparation</div>
    </div>
    <Container>
      <Row class="row col-12">
        <Col>
          <img style={{ width: 430 }} src={cordZ3img1} />
          <img style={{ width: 430 }} src={cordZ3img2} />
          <img style={{ width: 430 }} src={cordZ3img3} />
        </Col>
      </Row>
      <img className="z3imgbottom" src={cordZ3imgbottom} />
    </Container>

    <Commentcamarche></Commentcamarche>
    <MapArtisansUnivers></MapArtisansUnivers>
    <DecouvrezArtisan></DecouvrezArtisan>
    <AnatomieUniverse></AnatomieUniverse>
    <PrestationsFavorites></PrestationsFavorites>

  </Container>
}






