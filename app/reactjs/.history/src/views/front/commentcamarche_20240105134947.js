import React, { useEffect, useState } from "react";
import iconosccm1 from '../../assets/images/iconos-ccm1.svg';
import iconosccm2 from '../../assets/images/iconos-ccm2.svg';
import iconosccm3 from '../../assets/images/iconos-ccm3.svg';


import {
    CordStyle
} from "../../assets/styles/frontUniverseStyles";
import ButtonDef from "../../components/ui-elements/buttonDef";
export default function Commentcamarche() {

    return (
        <>
            <CordStyle>
                <div className="cordtitle"> Comment ça marche ?</div>
            </CordStyle>

            <container>
                <div class="col-12">
                    <row>
                    <div style={{ width: 324, height: 394, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12,background: '#FCF2EA', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                    <img className="z3imgbottom" src={iconosccm1} /> <div style={{ width: 280, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                    <div style={{ textAlign: 'center', color: '#E57C2E', fontSize: 15, fontFamily: 'Poppins', fontWeight: '600', lineHeight: 1 }}>
                                        Choisissez votre prestation  et laissez-vous guider</div>
                                            <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                                <div style={{ textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                            Réservez votre prestation chez votre artisan sélectionné en quelques clics. Planifiez votre rendez-vous où que vous soyez, 24h/7j.</div>
                                            </div>
                                        </div>
                                    </div>
                    </row>
                    <row>
                    <div style={{ width: 324, height: 394, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12, background: '#F6FAED', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                    <img className="z3imgbottom" src={iconosccm2} />   <div style={{ width: 280, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                    <div style={{ textAlign: 'center', color: '#A2C617', fontSize: 15, fontFamily: 'Poppins', 
                                        fontWeight: '600', lineHeight: 1, wordWrap: 'break-word' }}>
                                        Echangez avec votre artisan en toute simplicité</div>
                                            <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                                <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                                <div style={{ textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                            Une fois le devis validé, payez en toute sécurité. Déposez votre objet chez votre artisan sur le créneau horaire de votre choix.</div>
                                </div>
                                            </div>
                                        </div>
                                    </div>
                    </row>
                    <row>
                    <div style={{ width: 324, height: 394, paddingTop: 12, paddingBottom: 20, paddingLeft: 12, paddingRight: 12, background: '#EBF0F2', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 12.88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16.20, display: 'inline-flex' }}>
                    <img className="z3imgbottom" src={iconosccm3} />
                                        <div style={{ width: 280, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                                        <div style={{ textAlign: 'center', color: '#4C5F68', fontSize: 15, fontFamily: 'Poppins', 
                                        fontWeight: '600', lineHeight: 1, wordWrap: 'break-word' }}>
                                        Récupérez vos objets en toute sérénité</div>
                                            <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                                <div style={{ width: 280, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
                                                    <div style={{ height: 17, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 7.18, display: 'flex' }}>
                                                    <div style={{ textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                            Votre artisan vous préviendra une fois le travail réalisé pour récupérer votre objet à l’atelier.</div></div>
                                                  </div>
                                                <div style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 10.77, display: 'flex' }}>
                                                    
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                    </row>
                   
                </div>
                </container>

                <div class="container">

                    <div class="col-6">
                    </div>
                    <div>
                        <table >
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '33%', textAlign: 'center', background: '#FCF2EA' }}>
                                        <img className="z3imgbottom" src={iconosccm1} />

                                    </th>
                                    <th scope="col" style={{ width: '33%', textAlign: 'center', background: '#F6FAED' }}>
                                        <img className="z3imgbottom" src={iconosccm2} />
                                    </th>
                                    <th scope="col" style={{ width: '33%', textAlign: 'center', background: '#EBF0F2' }}>

                                        <img className="z3imgbottom" src={iconosccm3} />
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col"><div style={{ textAlign: 'center', color: '#E57C2E', fontSize: 15, fontFamily: 'Poppins', fontWeight: '600', lineHeight: 1 }}>
                                        Choisissez votre prestation  et laissez-vous guider</div>
                                    </th>
                                    <th scope="col">
                                        <div style={{ textAlign: 'center', color: '#A2C617', fontSize: 15, fontFamily: 'Poppins', 
                                        fontWeight: '600', lineHeight: 1, wordWrap: 'break-word' }}>
                                        Echangez avec votre artisan en toute simplicité</div>
                                    </th>
                                    <th scope="col">
                                        <div style={{ textAlign: 'center', color: '#4C5F68', fontSize: 15, fontFamily: 'Poppins', 
                                        fontWeight: '600', lineHeight: 1, wordWrap: 'break-word' }}>
                                        Récupérez vos objets en toute sérénité</div>
                                    </th>

                                </tr>
                                <tr >
                                    <td>
                                        <div style={{ textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                            Réservez votre prestation chez votre artisan sélectionné en quelques clics. Planifiez votre rendez-vous où que vous soyez, 24h/7j.</div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                            Une fois le devis validé, payez en toute sécurité. Déposez votre objet chez votre artisan sur le créneau horaire de votre choix.</div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                            Votre artisan vous préviendra une fois le travail réalisé pour récupérer votre objet à l’atelier.</div>
                                    </td>
                                </tr>
                                <tr><td></td></tr>
                                <tr><td></td></tr>
                                <tr>
                                    <td>
                                        <ButtonDef textButton="Choisissez votre prestation" />
                                    </td>
                                </tr>
                                <tr><td>-</td></tr>
                            </tbody>

                        </table>

                    </div>
                </div>

            </>
            );
}
