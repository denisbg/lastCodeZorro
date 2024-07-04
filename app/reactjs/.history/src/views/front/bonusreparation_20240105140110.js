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
        { id: 'cordonnerie-30', title: 'Anatomie d\'une chaussure', file: anatomieCord },

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
                                                <div style={{ width: 320, textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                                    <img className="z3imgbottom" src={result.file} /></div>
                                                    <div style={{width: 1139, height: 288, paddingLeft: 40, paddingRight: 40, paddingTop: 20, paddingBottom: 20, background: 'white', boxShadow: '0px 0px 30px rgba(199.95, 201.88, 146.36, 0.80)', borderRadius: 4, border: '3px solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>

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
