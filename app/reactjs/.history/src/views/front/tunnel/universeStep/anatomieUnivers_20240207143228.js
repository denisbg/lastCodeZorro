import React,  from "react";
import { Col, Container, Row } from "react-bootstrap";
import anatomieCord from '../../../../assets/images/zanatCord.png';

import { useParams } from "react-router-dom";
import {
    CordStyle
} from "../../../../assets/styles/frontUniverseStyles";


export default function AnatomieUnivers(
) {
    const { slugIdUniverse, slugIdService, slugIdBenefit, idDeliveryMode } =
        useParams();

    const anatomies = [
        { id: 'cordonnerie-30', title: 'Anatomie d\'une chaussure', file: anatomieCord },

    ];

    let result = anatomies.find(el => el.id === slugIdUniverse);
    if (result) {

        return (
            <Container style={{ marginTop: 700 }}>

           

                <div style={{ color: '#465A61', fontSize: 48, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Anatomie d’une chaussure</div>
                <div class="container">
                    <div class="row">
                        <div class="col-3">
                            <table class="table table-image">

                                <tbody>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            <div style={{ width: 1000, textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                                <img width='480' className="z3imgbottom" src={result.file} /></div>
                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

