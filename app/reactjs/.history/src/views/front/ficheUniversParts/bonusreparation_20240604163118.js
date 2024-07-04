import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import imgbonusreparation from "../../../assets/images/icons/bonusreparation.png";

export default function BonusReparation(
) {

    return (
        <Container className="col-md-8 col-sm-3 col-lg-8">

            <div style={{
                marginTop: 0, marginLeft: '90%', width: '100%', height: '100%',
                transform: 'rotate(27.18deg)', transformOrigin: '0 0', alignItems: 'center', display: 'inline-flex'
            }}>
                <img style={{ width: 132.51, height: 83.08 }} src={imgbonusreparation} />
            </div>

            <Row  style={{ marginBottom: 50}}>
                <Col>
                    <div style={{ width: '100%', height: '100%', paddingLeft: 40, paddingRight: 40, paddingTop: 20, paddingBottom: 20, background: 'transparent',boxShadow: '0 4px 51px 0 rgba(182, 172, 251, 0.42)', borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex' }}>

                        <div style={{ alignSelf: 'stretch', textAlign: 'center', color: '#89B03D', fontSize: 36, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>Bonus Réparation : Encourageons la durabilité et l'artisanat local !</div>
                        <div style={{ alignSelf: 'stretch', color: '#5E5E5E', fontSize: 20, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
                            
                            
                        Bénéficiez de réductions de 6€ à 25€ pour la réparation de vos vêtements et chaussures chez les artisans labellisés proposant le Bonus Réparation. Pour plus d’informations sur les prestations éligibles, cliquez ici.
                    </div>

                </Col>

            </Row>
        </Container>
    )

}