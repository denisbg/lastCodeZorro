import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import iconPchp1 from "../../../../assets/images/z8iconos_home_page_051.svg";
import iconPchp2 from "../../../../assets/images/z8iconos_home_page_071.svg";
import iconPchp3 from "../../../../assets/images/z8plandetravail14x1.svg";
import iconPchp4 from "../../../../assets/images/z8iconos_home_page_061.svg";
import {
    ContentPageStyle,
    HomeReparateur,
    HomeBlocs,
} from "../../../../assets/styles/frontGlobalStyle";
import {
    CordStyle
} from "../../../../assets/styles/frontUniverseStyles";

export default function Pourquoichoisir() {


    return (

        <HomeBlocs>
            <div style={{ textAlign: 'center', color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 2, wordWrap: 'break-word' }}>Pourquoi choisir Fingz ?</div>
            <Container>
                <Row>
                    <Col>
                        <div className="xbox" style={{ background: '#EDEFF0', marginTop: 20  }}>
                            <div style={{ marginLeft: 0 }}>
                                <img style={{ width: 125, paddingTop: 10 }} src={iconPchp1} />
                                <div style={{ height: 125, paddingTop: 5, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                    <div style={{ width: 260, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Economique</div>
                                    <div style={{ width: 320, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>
                                        En prolongeant la durée de vie de vos objets, vous faites des économies.</div>
                                </div>
                            </div>
                        </div>
                    </Col><Col>
                        <div className="xbox" style={{ background: '#F6F9E8', marginTop: 20  }}>

                            <img style={{ width: 125 }} src={iconPchp4} />
                            <div style={{ height: 125, paddingTop: 10, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                <div style={{ width: 260, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Ecologique</div>
                                <div style={{ width: 320, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>
                                    Devenez acteur de l’économie circulaire en donnant une 2ème vie à vos objets et préservez les ressources de la planète.</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row><Col>
                    <div className="xbox" style={{ background: '#EAF9FF', marginTop: 20  }}>
                        <div style={{ marginLeft: 0 }}>
                            <img style={{ height: 125 }} src={iconPchp3} />
                            <div style={{ height: 125, paddingTop: 10, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                <div style={{ width: 260, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Fiable</div>
                                <div style={{ width: 320, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>
                                    Les artisans partenaires sont des professionnels qui s’engagent à vous fournir un service de qualité et à faire de la réparation leur priorité.</div>
                            </div>
                        </div>
                    </div>
                </Col><Col>
                        <div className="xbox" style={{ background: '#FCF2EA', marginTop: 20}}>
                            <div style={{ marginLeft: 0 }}>
                                <img style={{ height: 125 }} src={iconPchp2} />
                                <div style={{ height: 125, paddingTop: 10, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                    <div style={{ width: 260, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Local</div>
                                    <div style={{ width: 320, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>
                                        En choisissant des réparateurs près de chez vous, vous soutenez l’artisanat de proximité et limitez l’impact CO2 lié au transport.</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </HomeBlocs >

    );
}



