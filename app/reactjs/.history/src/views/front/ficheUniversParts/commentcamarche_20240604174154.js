import React, { useEffect, useState } from "react";
import iconosccm1 from '../../../assets/images/iconos-ccm1.svg';
import iconosccm2 from '../../../assets/images/iconos-ccm2.svg';
import iconosccm3 from '../../../assets/images/iconos-ccm3.svg';

import { Col, Row } from "react-bootstrap";
import {
    CordStyle
} from "../../../assets/styles/frontUniverseStyles";
import ButtonDef from "../../../components/ui-elements/buttonDef";
export default function Commentcamarche() {

    return (
        <div style={{
            marginBottom: '2%',}}>
            <Row>
                <Col style={{
                    marginBottom: '2%', marginTop: '5%', width: '100%', height: '100%', color: '#465A61', fontSize: 40,
                    fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word'
                }}>
                    Comment ça marche ?
                </Col>
            </Row>
            <Row>
                <Col class="col-4">
                    <div style={{
                        width: '100%',
                        marginTop: 20,
                        marginRight: 20, height: 300, paddingTop: 12,
                        paddingBottom: 20,
                        background: '#FCF2EA',
                        boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)',
                        borderRadius: 12.88, flexDirection: 'column',
                        justifyContent: 'flex-start', alignItems: 'center',
                        gap: 16.20, display: 'inline-flex'
                    }}>
                        <img className="z3imgbottom" src={iconosccm1} />
                        <div style={{ width: 280, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                            <div style={{ textAlign: 'center', color: '#E57C2E', fontSize: 24, fontFamily: 'Poppins', fontWeight: '600', lineHeight: "25.479px" }}>
                                Laissez-vous guider</div>
                            <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                <div style={{ textAlign: 'center', color: ' rgb(70, 90, 97)', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>
                                Sélectionnez votre prestation chez l’artisan de votre choix en quelques clics.</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col class="col-4">


                    <div style={{ width: '100%', marginRight: 30, marginTop: 20, height: 300, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12, background: '#F6FAED', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                        <img className="z3imgbottom" src={iconosccm2} />
                        <div style={{ width: 280, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                            <div style={{
                                textAlign: 'center',fontSize: 24, color: '#A2C617', fontFamily: 'Poppins', fontWeight: '600', lineHeight: 1, wordWrap: 'break-word'
                            }}>
                                Echangez avec votre artisan</div>
                            <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                    <div style={{ textAlign: 'center',  color: ' rgb(70, 90, 97)', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>
                                    Payez en toute sécurité et déposez votre objet chez votre artisan.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col class="col-4">
                    <div style={{ width: '100%', marginRight: 20, marginTop: 20, height: 300, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12, background: '#EBF0F2', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                        <img className="z3imgbottom" src={iconosccm3} />
                        <div style={{ width: 280, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                            <div style={{
                                textAlign: 'center', color: '#4C5F68', fontSize: 24, fontFamily: 'Poppins',
                                fontWeight: '600', lineHeight: 1, wordWrap: 'break-word'
                            }}>                                Récupérez votre objet en toute sérénité</div>
                            <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                    <div style={{ height: 17, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 7.18, display: 'flex' }}>
                                        <div style={{ textAlign: 'center', color: ' rgb(70, 90, 97)', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>
                                        Votre recevrez une notification une fois le travail réalisé.</div></div>
                                </div>
                                <div style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 10.77, display: 'flex' }}>

                                </div>
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>
          
        </div>
    );
}