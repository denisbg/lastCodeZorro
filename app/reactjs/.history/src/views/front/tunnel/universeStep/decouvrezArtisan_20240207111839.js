import React, { useEffect, useState } from "react";

import Z7coord1 from '../../../../assets/images/Z7coord1.png'
import Z7coord4 from '../../../../assets/images/Z7coord4.png'
import Z7coord3 from '../../../../assets/images/Z7coord3.png'
import Z7coord2 from '../../../../assets/images/Z7coord2.png'
import Z7etoiles from '../../../../assets/images/avis5etoiles.png'
import { Col, Container, Row } from "react-bootstrap";
import {
    CordStyle
} from "../../../../assets/styles/frontUniverseStyles";
import ButtonDef from "../../../../components/ui-elements/buttonDef";
export default function DecouvrezArtisan() {

    return (
        <>

            <CordStyle>
                <div className="cordtitle" > Découvrez nos artisans en France</div>
            </CordStyle>


            <div >
               
                    <Row>
                        <Col class="col-lg-4">
                            <div style={{  height: 394, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12, background: 'white', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                                <img style={{  height: 200, borderRadius: 8 }} src={Z7coord1} />
                                <div style={{ width: 200, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                                    <div style={{ textAlign: 'center', color: '#4D5F68', fontSize: 21.55, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Les petits pieds</div>
                                    <div style={{ width: 200, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                        <div style={{ width: 200, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                            <div style={{ width: 200, color: '#A1A1A1', fontSize: 14.36, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>12 chemin de la Chouette, 72100 Le Mans</div>
                                            <img style={{ width: 91.77, height: 16.97 }} src={Z7etoiles} />
                                        </div>
                                        <div style={{ color: '#89B03D', fontSize: 14.36, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', textDecoration: 'underline', wordWrap: 'break-word' }}>Voir la boutique</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col >
                            <div style={{  height: 394, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12, background: 'white', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                                <img style={{  height: 200, borderRadius: 8 }} src={Z7coord2} />
                                <div style={{ width: 200, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                                    <div style={{ textAlign: 'center', color: '#4D5F68', fontSize: 21.55, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Atelier Nico</div>
                                    <div style={{ width: 200, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                        <div style={{ width: 200, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                            <div style={{ width: 200, color: '#A1A1A1', fontSize: 14.36, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>44 Avenue de Reims, 92040 Issy-les-Moulineaux</div>
                                            <img style={{ width: 91.25, height: 16.87 }} src={Z7etoiles} />
                                        </div>
                                        <div style={{ color: '#89B03D', fontSize: 14.36, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', textDecoration: 'underline', wordWrap: 'break-word' }}>Voir la boutique</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div style={{  height: 394, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12, background: 'white', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                                <img style={{ height: 200, borderRadius: 8 }} src={Z7coord3} />
                                <div style={{ width: 200, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                                    <div style={{ textAlign: 'center', color: '#4D5F68', fontSize: 21.55, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Chaussez-vous</div>
                                    <div style={{ width: 200, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                        <div style={{ width: 200, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                            <div style={{ height: 17, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 7.18, display: 'flex' }}>
                                                <div style={{ width: 243, color: '#A1A1A1', fontSize: 14.36, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>28 Rue Saussure, 75018 Paris</div>
                                            </div>
                                            <img style={{ width: 91.25, height: 16.87 }} src={Z7etoiles} />
                                        </div>
                                        <div style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 10.77, display: 'flex' }}>
                                            <div style={{ color: '#89B03D', fontSize: 14.36, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', textDecoration: 'underline', wordWrap: 'break-word' }}>Voir la boutique</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
              
                </Row>
            </div>




        </>
    );
}
