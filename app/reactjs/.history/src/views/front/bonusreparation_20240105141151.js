import React, { useEffect, useState } from "react";
import anatomieCord from '../../assets/images/zanatCord.png';
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
        { id: 'cordonnerie-30', title: 'Bonus réparation', file: anatomieCord },

    ];

    let result = anatomies.find(el => el.id === slugIdUniverse);
    if (result) {
        console.log(`-#result${result}`)
        return (
            result && (
                <>
                    
                    <div class="container">
                        <div class="row">
                            <div class="col-3">
                                <table class="table table-image">

                                    <tbody>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                    
                                                <div style={{width: 815, height: 108, color: '#465A61', fontSize: 36, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', wordWrap: 'break-word'}}>Bonus Réparation : <br/>Devenez acteur de l’économie circulaire !</div>
                                                
                                                    <div style={{width: 1059 , color: '#5E5E5E', fontSize: 20, fontFamily: 'Helvetica Neue LT Std', 
                                                        fontWeight: '400', wordWrap: 'break-word'}}>
                                                           Lançé en Novembre 2023, ce bonus vous permet de bénéficier de réductions sur la réparation de vos chaussures et vêtements auprès des réparateurs labellisés Refashion. Cette réduction s’applique directement au moment du paiement. Pour plus d’informations sur les prestations éligibles, veuillez cliquer  ici.

Réparer c’est faire durer et c’est bon pour votre porte-monnaie !   
                                                     </div>       
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
