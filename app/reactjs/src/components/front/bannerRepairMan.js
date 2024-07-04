import React from "react";
import { Container } from "react-bootstrap";
import noImage from "../../assets/images/noImage.png";
import { BackStyle, PageBanner } from "../../assets/styles/frontGlobalStyle";
import { BackIcon } from "../../assets/styles/icons";
import ROUTES from "../../config/routes";
import * as vars from "../../vars";
import reparacteur from '../../assets/images/icons/reparacteur.png';
import bonusreparation from '../../assets/images/icons/bonusreparation.png';
import iconeetoile from '../../assets/images/icons/iconeetoile.png';
import bx_map from '../../assets/images/icons/bx_map.svg';
import { Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ionTimeOutline from '../../assets/images/icons/ion_time-outline.svg';
import mdi_linkedin from '../../assets/images/icons/mdi_linkedin.svg';
import mingcuteYoutubeLine from '../../assets/images/icons/mingcute_youtube-line.svg';
import riTwitterXFill from '../../assets/images/icons/ri_twitter-x-fill.svg';
import uilFacebook from '../../assets/images/icons/uil_facebook.svg';
import biInstagram from '../../assets/images/icons/bi_instagram.svg';
import pepiconsPencilInternet from '../../assets/images/icons/pepicons-pencil_internet.svg';
import { Link } from "react-router-dom";


export default function BannerRepairMan(artData) {
    const getPathImage = (image) => (image ? vars.pathImage + image : noImage);
    const { slugIdUniverse } = useParams();
    let xi = 0;
    let xUniverse = [];
    Object.entries(artData.universe).forEach(entry => {
        const [key, value] = entry;
        xi++;
        xUniverse[key] = value;
    });

    let xOneRow = [];
    xi = 0;
    Object.entries(artData.repairMan).forEach(entry => {
        const [key, value] = entry;
        xi++;
        xOneRow = value;

    });
    let rsLeftDecalewebsite=0;
let rsLeftDecaletwitter=24;
let rsLeftDecaleyouTube=48;
let rsLeftDecalelinkedIn=72;
let rsLeftDecalefacebook=96;
let rsLeftDecaleinstagram=120;
let rsDecale = 0;
let rsDecalePas = 26;
    if ( xOneRow["website"] ) {
        rsLeftDecalewebsite=rsDecale;
        rsDecale += rsDecalePas;
    }
    if ( xOneRow["twitter"] ) {
        rsLeftDecaletwitter=rsDecale;
        rsDecale += rsDecalePas;
    }
    if ( xOneRow["youTube"] ) {
        rsLeftDecaleyouTube=rsDecale;
        rsDecale += rsDecalePas;
    }
    if ( xOneRow["linkedIn"] ) {
        rsLeftDecalelinkedIn=rsDecale;
        rsDecale += rsDecalePas;
    }
    if ( xOneRow["facebook"] ) {
        rsLeftDecalefacebook=rsDecale;
        rsDecale += rsDecalePas;
    
    }
    if ( xOneRow["instagram"] ) {
        rsLeftDecaleinstagram=rsDecale;
        rsDecale += rsDecalePas;
    }


    let entreprisePicture = getPathImage(xOneRow['picture']);
    return (<>


        <BackStyle style={{ paddingLeft: 0, marginLeft: '0%' }} to={ROUTES.HOME.url}>
            <BackIcon />
            <span>Retour à la page d'accueil</span>
        </BackStyle>


        <Container style={{ paddingLeft: 0, marginLeft: 0 }} >
            <div style={{ width: '40%' }}>
                <div style={{ textAlign: 'left', marginLeft: "0", color: '#89B03D', fontSize: 20, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word' }}>

                    <Link
                        to={'/univers/' + slugIdUniverse}
                        style={{ color: "rgb(137, 176, 61)" }}
                    >
                        {xUniverse["name"]}

                    </Link>


                </div>
                <div style={{ textAlign: 'left', marginLeft: "0", color: '#444444', fontSize: 30, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>    {xOneRow["enterprise"]} </div>
                <div style={{ marginLeft: "0", width: '100%', height: '100%', display: 'inline-flex' }}>

                    {(xOneRow["bonusreparation"] === '1') &&
                        (<span style={{ paddingLeft: "0%", paddingTop: "0%" }}>
                            <img style={{ width: 70, height: 44 }} src={bonusreparation} />

                        </span>)
                    }
                    &nbsp;&nbsp;
                    {(xOneRow["reparacteur"] === '1') &&
                        (<span style={{ paddingLeft: "0%", paddingTop: "0%" }}>
                            <img style={{ width: 70, height: 44 }} src={reparacteur} />
                        </span>)
                    }
                </div>

            </div>
       



            <Row style={{
                marginLeft: 0, marginTop: 30,
                overFlow: 'clip',
                textOverflow: 'ellipsis',

                paddingBottom: 30, marginBottom: 30, width: '100%', height: '100%', background: 'white', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.10)'
            }}>

                <Col classname='col-lg-3' style={{ maxWidth: '30%', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, }}>
                    <img style={{ maxWidth: '90%' }} src={entreprisePicture} />
                </Col>

                <Col classname='col-lg-6' style={{
                    height: 300, width: '50%',
                    paddingLeft: 30, paddingTop: 10, paddingBottom: 10, overflow: "clip"
                }}>


                    {xOneRow["description"]?.substring(0, 700)} {xOneRow["description"]?.length >= 700 && '...'}


                </Col>
                <Col classname='col-lg-3' style={{
                    width: '20%', paddingLeft: 10, paddingTop: 10,
                    paddingBottom: 10, paddingRight: 30, overflow: "clip"
                }}>
                    <div style={{
                        flexDirection: 'column', justifyContent: 'flex-start',
                        alignItems: 'flex-start', gap: 24, display: 'inline-flex'
                    }}>

                        <div style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start', gap: 4, display: 'inline-flex'
                        }}>
                            <div style={{ width: 22, height: 22, position: 'relative' }}>
                                <img src={bx_map}></img></div>
                            <div style={{
                                color: '#444444', fontSize: 16, fontFamily: 'Poppins',
                                fontWeight: '400', wordWrap: 'break-word'
                            }}>
                                {xOneRow["address"]}  {" "} {xOneRow["postalCode"]}   {" "}
                                {xOneRow["city"]}</div>
                        </div>
                        <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                            <div style={{ width: 22, height: 22, position: 'relative' }}>
                                <img src={ionTimeOutline} />
                            </div>
                            <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                <div style={{ color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word' }}>Horaires</div>
                                <div style={{ width: 250, height: 137, position: 'relative' }}>
                                    <div style={{ width: 300, height: 19, left: 0, top: 0, position: 'absolute' }}>
                                        <div style={{ left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            Lundi</div>
                                        <div style={{ left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            {xOneRow["lundiapm"]}</div>
                                    </div>
                                    <div style={{ width: 300, height: 19, left: 0, top: 20, position: 'absolute' }}>
                                        <div style={{ left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            Mardi</div>
                                        <div style={{ left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            {xOneRow["mardiapm"]}</div>
                                    </div>
                                    <div style={{ width: 300, height: 19, left: 0, top: 40, position: 'absolute' }}>
                                        <div style={{ left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            Mercredi</div>
                                        <div style={{ left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            {xOneRow["mercrediapm"]}</div>
                                    </div>
                                    <div style={{ width: 300, height: 19, left: 0, top: 60, position: 'absolute' }}>
                                        <div style={{ left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            Jeudi</div>
                                        <div style={{ left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            {xOneRow["jeudiapm"]}</div>
                                    </div>
                                    <div style={{ width: 300, height: 19, left: 0, top: 80, position: 'absolute' }}>
                                        <div style={{ left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>Vendredi</div>
                                        <div style={{ left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            {xOneRow["vendrediapm"]}</div>
                                    </div>
                                    <div style={{ width: 300, height: 19, left: 0, top: 100, position: 'absolute' }}>
                                        <div style={{ left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>Samedi</div>
                                        <div style={{ left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            {xOneRow["samediapm"]}</div>
                                    </div>
                                    <div style={{ width: 300, height: 19, left: 0, top: 120, position: 'absolute' }}>
                                        <div style={{ left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>Dimanche</div>
                                        <div style={{ left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                                            {xOneRow["dimancheapm"]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div style={{ width: 208, position: 'relative' }}>
                            {xOneRow["website"] &&
                                <div style={{ width: 24, height: 24, left:rsLeftDecalewebsite, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                    
                                    <div style={{ width: 22, height: 22, position: 'relative' }}>
                                        <a href={xOneRow["website"]}> <img src={pepiconsPencilInternet}></img> </a>
                                    </div>
                                </div>
                            }
                            {xOneRow["twitter"] &&
                                <div style={{ width: 22, height: 22, left:rsLeftDecaletwitter, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                     
                                    <a href={xOneRow["twitter"]}>   <img src={riTwitterXFill}></img>   </a>
                                </div>
                            }
                            {xOneRow["youTube"] &&
                                <div style={{ width: 22, height: 22, left:rsLeftDecaleyouTube, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                    
                                    <a href={xOneRow["youTube"]}> <img src={mingcuteYoutubeLine}></img> </a>
                                </div>}

                            {xOneRow["linkedIn"] &&
                                <div style={{ width: 22, height: 22, left:rsLeftDecalelinkedIn ,top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                      
                                    <a href={xOneRow["linkedIn"]}> <img src={mdi_linkedin}></img> </a>

                                </div>
                            }
                            {xOneRow["facebook"] &&
                                <div style={{ width: 19, height: 19, left:rsLeftDecalefacebook, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                    <div style={{ width: 22, height: 22, position: 'relative' }}>
                                     
                                        <a href={xOneRow["facebook"]}> <img src={uilFacebook}></img> </a>
                                    </div>
                                </div>
                            }
                            {xOneRow["instagram"] &&
                                <div style={{ width: 22, height: 22, left:rsLeftDecaleinstagram, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                    
                                    <a href={xOneRow["instagram"]}> <img src={biInstagram}></img> </a>

                                </div>
                            }
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>

    </>
    );
}
