import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import iconPchp1 from "../../../../assets/images/z8iconos_home_page_051.svg";
import iconPchp2 from "../../../../assets/images/z8iconos_home_page_071.svg";
import iconPchp3 from "../../../../assets/images/z8plandetravail14x1.svg";
import iconPchp4 from "../../../../assets/images/z8iconos_home_page_061.svg";
import {
    ContentPageStyle,
    HomeReparateur,
    HomeBlocs,
} from "../../../../assets/styles/frontGlobalStyle";

export default function Pourquoichoisir() {

    return (
        
            <container>
                <div class="col-2">
                    <div style={{ textAlign: 'center', color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 2, wordWrap: 'break-word' }}>Pourquoi choisir Fingz ?</div>
                    <row>
                        <div style={{ marginLeft: 0, marginRight: 8, marginBottom: 8, height: 160, paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20, background: '#EDEFF0', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                            <img style={{ width: 125, }} src={iconPchp1} />
                            <div style={{ height: 125, paddingTop: 10, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                <div style={{ width: 360, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Economique</div>
                                <div style={{ width: 420, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>En prolongeant la durée de vie de vos objets, vous faites des économies.</div>
                            </div>
                        </div>
                        <div style={{ marginRight: 8, marginBottom: 8, height: 160, paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20, background: '#F6F9E8', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                            <img style={{ width: 125.24 }} src={iconPchp4} />
                            <div style={{ height: 125, paddingTop: 10, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                <div style={{ width: 360, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Ecologique</div>
                                <div style={{ width: 420, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>Devenez acteur de l’économie circulaire en donnant une 2ème vie à vos objets et préservez les ressources de la planète.</div>
                            </div>
                        </div>
                        <div style={{ marginRight: 8, marginBottom: 8, height: 160, paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20, background: '#EAF9FF', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                            <img style={{ height: 125 }} src={iconPchp3} />
                            <div style={{ height: 125, paddingTop: 10, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                <div style={{ width: 360, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Fiable</div>
                                <div style={{ width: 420, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>Les artisans partenaires sont des professionnels qui s’engagent à vous fournir un service de qualité et à faire de la réparation leur priorité.</div>
                            </div>
                        </div>
                        <div style={{ marginRight: 8, marginBottom: 8, height: 160, paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20, background: '#FCF2EA', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                            <img style={{ height: 125 }} src={iconPchp2} />
                            <div style={{ height: 125, paddingTop: 10, paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                <div style={{ width: 360, color: '#5D5D5D', fontSize: 18, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Local</div>
                                <div style={{ width: 420, color: '#5D5D5D', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 1, wordWrap: 'break-word' }}>En choisissant des réparateurs près de chez vous, vous soutenez l’artisanat de proximité et limitez l’impact CO2 lié au transport.</div>

                            </div>
                        </div>
                    </row>


                </div>
            </container>
            
            );
}



