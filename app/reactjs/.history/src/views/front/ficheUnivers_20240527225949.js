import React, { useEffect, useState } from "react";
import getImgUniverse from "./universeImageManager.js"
import { useDispatch, useSelector } from "react-redux";
import { BackStyle, PageBanner } from "../../assets/styles/frontGlobalStyle";
import imgbonusreparation from '../../assets/images/bonusreparationtransparent.png';

import connector from "../../connector";
import endPoints from "../../config/endPoints";
import { useMediaQuery } from "react-responsive";
import cordZ3imgbottom from '../../assets/images/cordZ3imgbottom.svg';
import { getPathImage, slugify } from "../../helper/functions";
import { useParams } from "react-router-dom";
import MapArtisansUnivers from "./mapArtisansUnivers.js";

import Commentcamarche from "./ficheUniversParts/commentcamarche";

import ButtonDef from "../../components/ui-elements/buttonDef";

import { Container, Row, Col } from "react-bootstrap";
import noImage from "../../assets/images/noImage.png";

import { BackIcon } from "../../assets/styles/icons";
import ROUTES from "../../config/routes";
import * as vars from "../../vars";
export default function FicheUnivers(props
) {
  const { isDisplayListeProduits, setDisplayListeProduits } = props;
  const { isDisplayFicheUnivers, setDisplayFicheUnivers } = props;
  const { isDisplayPrestationsArtisan, setDisplayPrestationsArtisan } = props;
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);

  const [service, setService] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const universe = useSelector((state) => state.universe);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 593px)" });
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
  const [displayBonusdetails, setdisplayBonusdetails] = useState("");

  var universeId = slugIdUniverse.split("-").pop();

  let imagebg = getPathImage(universe.image);

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
            //console.log("STEP GET ANONYMOUS_UNIVERSE", response.data);
            setUniImgVitG(response.data.filenameimage1);
            setUniImgVitD(response.data.filenameimage2);
            setUniImgVitC(response.data.filenameimage3);
            setUniImgAnal(response.data.filenameanatomie);
            setUniTxtAnal(response.data.labelanatomie);

            //console.log("BONUS univers est il eligible", response.data);
            if (response.data.bonusreparation === '1') {

              setdisplayBonusImage(response.data.bonusreparation);
              setdisplayBonusdetails(response.data.bonusdetails);

            }
            if (response.data.anatomieactivated === 1)
              setdisplayAnatomieactivated(true);



          }
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };
  const handleClick = () => {
    // 👇 "message" stores input field value
    setDisplayListeProduits(true);
  };



  const showBonusImage = () => {
    if (!displayBonusImageisReady) {

      return (
        <p className="loading-table" style={{ textAlign: "center" }}>
          Chargement...
        </p>
      );
    }

    return (
      <>
        {(displayBonusImage === '1') &&
          (<>

            <Row>
              <Col style={{
                  height: '100%', marginLeft:30  , marginRight:40,
                paddingTop: 20, paddingBottom: 20,
                background: 'transparent', boxShadow: '0 4px 51px 0 rgba(182, 172, 251, 0.42)',
                borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start',
                alignItems: 'flex-start', gap: 20, display: 'inline-flex'
              }}>

                <div style={{ alignSelf: 'stretch', textAlign: 'left', color: 'rgb(70, 90, 97)', fontSize: 20, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                  <td dangerouslySetInnerHTML={{ __html: displayBonusdetails }} />
                </div>

              </Col>

            </Row>
          </>
          )}
        {(displayBonusImage === '0') &&
          (
            <Row><Col>{/* <span style={{ paddingLeft: "05%", paddingTop: "0%" }}>
              
              <img style={{ width: 56, height: 30.73 }} src={imgBonusIconereparation} />
              Actuellement, cet univers ne bénéficie pas encore du bonus de réparation, mais il est toujours judicieux d'entretenir vos biens. 
              En effet, la réparation prolonge leur durée de vie et constitue une économie certaine pour votre porte-monnaie !
              </span>
        */}</Col></Row>
          )
        }


      </>)
  };

  const showAnatomie = () => {


    return (
      <>
        {(displayAnatomieactivated) &&
          (<>
            <Row>
              <Col
                style={{
                  marginBottom: '5%', marginTop: '7%',
                  color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word'
                }}>
                {uniTxtAnatomie}
              </Col>
            </Row>
            <Row>
        
              <Col style={{
                  width: '30%', marginLeft:'25%'  , marginRight:'25%',
                paddingTop: 20, paddingBottom: 20,
                background: 'transparent', boxShadow: '0 4px 51px 0 rgba(182, 172, 251, 0.42)',
                borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start',
                alignItems: 'flex-start', gap: 20, display: 'inline-flex'
              }}>
                     <img  style={{
                  width: '50%'}}  className="z3imgbottom" src={getPathImage(uniImgAnatomie)} />
           
                </Col>
            </Row>
          </>
          )}



      </>)

  };





  useEffect(() => {
    setdisplayBonusImageisReady(false);
    getUniverse();
  }, []);

  useEffect(() => {
    showBonusImage();


  }, [displayBonusImageisReady, displayBonusImage]);

  const handleProductListClick = () => {
    setDisplayListeProduits(!isDisplayListeProduits);
    setDisplayFicheUnivers(!isDisplayFicheUnivers);
  };

  return (
   
     

      <Container style={{ backgroundColor: '#F6F3F5' }}>

        <div style={{
          width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
          gap: 24, display: 'inline-flex'
        }}>
          <div style={{ width: '100%', height: '100%', color: '#4D5F68', fontSize: 50, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>
            {universeTitle}
          </div>
          <div style={{ width: '100%', color: '#929292', fontSize: 20, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
            {universeDescription}</div>
        </div>
        <div>
          <div style={{ width: '50%', height: '100%', marginLeft: "25%", marginTop: 20, marginBottom: 20, borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
            <div style={{ color: 'white', fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>
              <ButtonDef width="50%" background='rgb(154, 202, 60)' textButton={"Choisissez votre prestation"} onClick={handleProductListClick}></ButtonDef></div>
          </div>
        </div>


        <div style={{ marginLeft: '-25%', marginRight: '-15%' }} >
          <Row>
            <Col style={{ paddingLeft: 0, paddingRight: 0 }} >
              <img style={{width:830 ,maxHeight: "400%", maxWidth: "800%", paddingLeft: 0, paddingRight: 0 }}
                src={getImgUniverse(universeId, 1, getPathImage(uniImgVitG))} /></Col>
            <Col style={{ paddingLeft: 0, paddingRight: 0 }} >
              <img style={{ width:830 , maxHeight: "400%", maxWidth: "800%" }}
                src={getImgUniverse(universeId, 2, getPathImage(uniImgVitC))} /></Col>
            <Col style={{ paddingLeft: 0, paddingRight: 0 }} >
              <img style={{width:830 , maxHeight: "400%", maxWidth: "800%" }}
                src={getImgUniverse(universeId, 3, getPathImage(uniImgVitD))} /></Col>

          </Row>
          <Row >
            <div class="col-sm-12 col-md-12 col-lg-12" style={{ paddingLeft: 0, paddingRight: 0 }} >
              <img style={{ width: "125%", maxHeight: "450%" }} src={cordZ3imgbottom} /></div>

          </Row>
        </div>
        <Container>
          {/*<PrestationsFavorites></PrestationsFavorites>*/}
          <Row style={{ marginTop: 20, marginBottom: 30 }}>
            {showBonusImage()}
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
                isDisplayPrestationsArtisan={isDisplayPrestationsArtisan}
              </MapArtisansUnivers>
            </Col>
          </Row>

          {showAnatomie()}

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




        </Container>
      </Container>
    )
}
