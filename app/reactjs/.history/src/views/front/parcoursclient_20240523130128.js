import React, { useEffect, useState } from "react";
import iconotoparrow from '../../assets/images/toparrow.png';
import iconobottomarrow from '../../assets/images/bottomarrow.png';
import icon2 from '../../assets/images/iconos_home_page_031.svg';
import icon4 from '../../assets/images/iconos_home_page_042.svg';
import icon3 from '../../assets/images/iconos_home_page_021.svg';
import icon1 from '../../assets/images/iconos_home_page_mesadetrabajo11.svg';

import { useMediaQuery } from "react-responsive";
import { Row, Col, Container } from "react-bootstrap";


export default function ParcoursClient() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 793px)" });
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 994px)",
    });
    return (

        <Container   className="col-md-8 col-sm-3 col-lg-8" style={{ marginBottom: 20 }}>
            <div style={{
                textAlign: 'center', marginBottom: 15, paddingLeft: 20, color: '#465a61',
                fontSize: 40,
                fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 2, wordWrap: 'break-word'
            }}>   Il n'a jamais été aussi facile de trouver un réparateur</div>
            <Row>

                <Col class="item-cat-univers col-lg-3 col-sm-6">

                    {isDesktopOrLaptop &&
                        <div style={{

                            width: 250, height: 150,
                            paddingRight: 0, paddingLeft: 100, paddingTop: 20, paddingBottom: 30,
                            flexDirection: 'column',
                            justifyContent: 'flex-start', alignItems: 'left', gap: 16,
                            display: 'inline-flex'
                        }}>
                            <img className="z3imgbottom" src={iconotoparrow} />
                        </div>}
                    <div style={{
                        width: 255, height: 200,
                        paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20,
                        background: '#FCF2EA', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)',
                        borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start',
                        alignItems: 'center', gap: 16, display: 'inline-flex'
                    }}>
                        <div style={{
                            width: 90, height: 90, flexDirection: 'column',
                            justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'
                        }}>
                            <img className="z3imgbottom" src={icon1} />
                            <div style={{ width: 220, color: '#5D5D5D', wordWrap: 'break-word' }}>
                                <div style={{
                                    paddingBottom: 5, paddingLeft: 18, textAlign: 'left',
                                    fontSize: 15, fontFamily: 'Poppins', fontWeight: '400', lineHeight: 1
                                }}>
                                    Dites-nous ce que vous <br />souhaitez faire réparer</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col class="item-cat-univers col-lg-3 col-sm-6">
                    <div style={{
                        width: 250, height: 200, paddingLeft: 8, paddingRight: 8,
                        paddingTop: 20, paddingBottom: 20,
                        background: '#EDEFF0', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)',
                        borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start',
                        alignItems: 'center', gap: 16, display: 'inline-flex'
                    }}>
                        <img className="z3imgbottom" src={icon2} />
                        <div style={{ width: 220, textAlign: 'center', color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                            Affinez votre recherche en choisissant votre prestation</div>
                    </div>
                    {isDesktopOrLaptop &&
                        <div style={{
                            width: 250, height: 200,
                            paddingRight: 0,
                            paddingLeft: 100,
                            paddingTop: 40, paddingBottom: 30, flexDirection: 'column',
                            justifyContent: 'flex-start', alignItems: 'left', gap: 16,
                            display: 'inline-flex'
                        }}>

                            <img className="z3imgbottom" src={iconobottomarrow} />
                        </div>
                    }
                </Col>
                <Col class="item-cat-univers col-lg-3 col-sm-6">
                    {isDesktopOrLaptop &&
                        <div style={{
                            width: 250, height: 150, paddingRight: 0,
                            paddingLeft: 100,
                            paddingTop: 20, paddingBottom: 30, flexDirection: 'column',
                            justifyContent: 'flex-start', alignItems: 'left', gap: 16,
                            display: 'inline-flex'
                        }}>
                            <img className="z3imgbottom" src={iconotoparrow} />
                        </div>
                    }
                    <div style={{ width: 255, height: 200, paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20, background: '#EAF9FF', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                        <img style={{ width: 90, height: 90 }} src={icon3} />
                        <div style={{ width: 220, textAlign: 'center', color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                            Sélectionnez un artisan<br />réparateur recommandé</div>
                    </div>
                </Col>
                <Col class="item-cat-univers col-lg-3 col-sm-6">
                    <div style={{ width: 255, height: 200, paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20, background: '#F6F9E8', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                        <img style={{ width: 90, height: 90 }} src={icon4} />
                        <div style={{ width: 220, textAlign: 'center', color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                            Prenez rendez-vous avec votre artisan et payez en toute sécurité</div>
                    </div>
          
                </Col>


            </Row>
        </Container>
    );
}
