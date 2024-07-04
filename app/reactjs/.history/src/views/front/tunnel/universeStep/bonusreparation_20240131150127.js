import React, { useEffect, useState } from "react";
import imgbonusreparation from '../../../../assets/images/bonusreparation.png';
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import {
    CordStyle
} from "../../../../assets/styles/frontUniverseStyles";


export default function BonusReparation(
) {
    const { slugIdUniverse, slugIdService, slugIdBenefit, idDeliveryMode } =
        useParams();
    console.log("-#" + slugIdUniverse);
    const anatomies = [
        { id: 'cordonnerie-30', title: 'Bonus réparation', file: imgbonusreparation },

    ];

    let result = anatomies.find(el => el.id === slugIdUniverse);
    let xTitle = "";
    if (result) xTitle = result.title
    else xTitle = "";

    return (
        <>
            <Row>
                <Col style={{ marginLeft:100 }}>
                    <img width='1000' className="z3imgbottom" alt="Lançé en Novembre 2023, ce bonus vous permet de bénéficier de réductions sur la réparation de vos chaussures et vêtements auprès des réparateurs labellisés Refashion. Cette réduction s’applique directement au moment du paiement. Pour plus d’informations sur les prestations éligibles, veuillez cliquer  ici.
                                                           Réparer c’est faire durer et c’est bon pour votre porte-monnaie !" src={imgbonusreparation} />
                </Col>
            </Row>
        

        </>

    )

}
