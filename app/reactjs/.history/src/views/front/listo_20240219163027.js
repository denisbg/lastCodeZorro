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
export default function Listo(id
) {


  const [service, setService] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const universe = useSelector((state) => state.universe);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const { slugIdUniverse, slugIdService } = useParams();
  const [universeTitle, setuniverseTitle] = useState("");
  const [universeDescription, setuniverseDescription] = useState('');
  var universeId = slugIdUniverse.split("-").pop();
  const getUniverse = () => {

    const universeId = slugIdUniverse.split("-").pop();
    if (universeId) {
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_UNIVERSE}${universeId}/categories`,
        success: (response) => {
          const arrayObj = response.data || { categories: [] };

          if (response.data?.name) {
            setuniverseTitle(response.data.name);
            setuniverseDescription(response.data.description);
            //
            //if (response.data.name === 'Cordonnerie') {
            //  setuniverseDescription("Nos artisans partenaires ne manquent ni de talons, ni de talents. Parfaitement bien dans leurs baskets, ils redonnent forme aux escarpins, bottes, ballerines et sneakers qui passent entre leurs mains. Ils sont du genre à bichonner vos chaussures de la semelle jusqu’au dernier lacet : pas question de s’arrêter au premier coup de pompe !");
            //}
            //console.log('details Univers', response.data);
          }
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };
  
  useEffect(() => {
    getUniverse();
  }, []);

  const handleProductListClick = () => {
    setDisplayListeProduits(!isDisplayListeProduits);
    setDisplayFicheUnivers(!isDisplayFicheUnivers);
  };

  return <Container style={{ backgroundColor: '#FEFDFA' }}>
    <div style={{
      width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
      gap: 24, display: 'inline-flex'
    }}>
      <div style={{ width: '100%', height: '100%', color: '#4D5F68', fontSize: 50, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>
        {universeTitle}
      </div>
      <div style={{ width: 1000, color: '#929292', fontSize: 20, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
        {universeDescription}</div>
    </div>
    <div>
      <div style={{ width: '50%', height: '100%', marginLeft: "25%", marginTop: 20, marginBottom: 20, borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
        <div style={{ color: 'white', fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>
          <ButtonDef width="50%" background='rgb(154, 202, 60)' textButton={"Choisissez votre prestation"} onClick={handleProductListClick}></ButtonDef></div>
      </div>
    </div>

    <Row >
      <div class="col-sm-1 col-md-4 col-lg-4" style={{ width: '30%' }} >
        <img style={{ maxHeight:346 }} src={getImgUniverse(universeId,1)} /></div>
      <div class="col-sm-1 col-md-4 col-lg-4" style={{ width: '30%' }}>
        <img  style={{ maxHeight:346 }} src={getImgUniverse(universeId,2)} /></div>
      <div class="col-sm-1 col-md-4 col-lg-4" style={{ width: '30%' }}>
        <img style={{ maxHeight:346}} src={getImgUniverse(universeId,3)} /></div>
    </Row>
    <Row >
      <div class="col-sm-1 col-md-4 col-lg-4" style={{ width: '30%' }} >
        <img style={{ maxHeight:346 }} src={cordZ3imgbottom} /></div>
      <div class="col-sm-1 col-md-4 col-lg-4" style={{ width: '30%' }}>
        <img  style={{ maxHeight:346 }} src={cordZ3imgbottom}  /></div>
      <div class="col-sm-1 col-md-4 col-lg-4" style={{ width: '30%' }}>
        <img style={{ maxHeight:346}} src={cordZ3imgbottom}  /></div>
    </Row>

    <Row>
      <Col>
        <Commentcamarche></Commentcamarche>
      </Col>
    </Row>
    <Row style={{ marginbottom: 50 }}>
      <Col>
        <MapArtisansUnivers>
                  isDisplayListeProduits={isDisplayListeProduits}
                  setDisplayListeProduits={setDisplayListeProduits}
                  setDisplayFicheUnivers={setDisplayFicheUnivers}
                  isDisplayFicheUnivers={isDisplayFicheUnivers}
                  setDisplayPrestationsArtisan={setDisplayPrestationsArtisan}
                  isDisplayPrestationsArtisan={ isDisplayPrestationsArtisan}
        </MapArtisansUnivers>
      </Col>
    </Row>
    <Row>
      <Col>
        <AnatomieUniverse
          title={universeTitle}
          image={anatomieCord}
        ></AnatomieUniverse>
      </Col>
    </Row>
    <Row>
      <Col>
        <div>
          <div style={{ width: '50%', height: '100%', marginLeft: "25%", marginTop: 20, marginBottom: 20, borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
            <div style={{ color: 'white', fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>
              <ButtonDef width="50%" background='rgb(154, 202, 60)' textButton={"Choisissez votre prestation"} onClick={handleProductListClick}></ButtonDef></div>
          </div>
        </div>
      </Col>
    </Row>
    <PrestationsFavorites></PrestationsFavorites>
    <Row >
      <Col >
        <img style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }} alt="Lançé en Novembre 2023, ce bonus vous permet de bénéficier de réductions sur la réparation de vos chaussures et vêtements auprès des réparateurs labellisés Refashion. Cette réduction s’applique directement au moment du paiement. Pour plus d’informations sur les prestations éligibles, veuillez cliquer  ici.
                                                 Réparer c’est faire durer et c’est bon pour votre porte-monnaie !" src={imgbonusreparation} />
      </Col>
    </Row>

  </Container>

}
