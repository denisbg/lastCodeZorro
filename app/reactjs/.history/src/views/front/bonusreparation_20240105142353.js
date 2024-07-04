import React, { useEffect, useState } from "react";
import imgbonusreparation from '../../assets/images/bonusreparation.png';
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
    CordStyle
} from "../../assets/styles/frontUniverseStyles";


export default function BonusReparation (
) {
    const { slugIdUniverse, slugIdService, slugIdBenefit, idDeliveryMode } =
        useParams();
    console.log("-#" + slugIdUniverse);
    const anatomies = [
        { id: 'cordonnerie-30', title: 'Bonus réparation', file: imgbonusreparation },

    ];

    let result = anatomies.find(el => el.id === slugIdUniverse);
    if (result) {
        console.log(`-#result${result}`)
        return (
            result && (
                <>
                      <CordStyle>
                        <div  className="cordtitle">{result.title} </div>
                    </CordStyle>
                    <div class="container">
                        <div class="row">
                            <div class="col-3">
                                <table class="table table-image">

                                    <tbody>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                    
                                              
                                                              
                                               
                                                     <img width='480' className="z3imgbottom" alt="Lançé en Novembre 2023, ce bonus vous permet de bénéficier de réductions sur la réparation de vos chaussures et vêtements auprès des réparateurs labellisés Refashion. Cette réduction s’applique directement au moment du paiement. Pour plus d’informations sur les prestations éligibles, veuillez cliquer  ici.
                                                           Réparer c’est faire durer et c’est bon pour votre porte-monnaie !" src={imgbonusreparation} />      
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )
        )
    }
    return (
        <div></div>
    )
}
