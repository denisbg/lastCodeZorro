import React, { useEffect, useState } from "react";
import imgbonusreparation from '../../../../assets/images/bonusreparation.png';
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Row, Col} from ""
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
    let xTitle="";
    if (result ) xTitle=result.title
    else xTitle = "Bonus Enable to be define";
   
        return (
          
                <>
                
                <Row>
                    <Col>
         
                            <div class="col-3">
                                <table class="table table-image">

                                    <tbody>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>




                                                <img width='1000' className="z3imgbottom" alt="Lançé en Novembre 2023, ce bonus vous permet de bénéficier de réductions sur la réparation de vos chaussures et vêtements auprès des réparateurs labellisés Refashion. Cette réduction s’applique directement au moment du paiement. Pour plus d’informations sur les prestations éligibles, veuillez cliquer  ici.
                                                           Réparer c’est faire durer et c’est bon pour votre porte-monnaie !" src={imgbonusreparation} />
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                       
                    </Col> 
                       </Row>
                    <CordStyle>
                        <div className="cordtitle">{xTitle} </div>
                    </CordStyle>
                    
                </>
            
        )
   
}
