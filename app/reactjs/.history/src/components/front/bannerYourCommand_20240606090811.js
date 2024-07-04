import React from "react";
import { Container } from "react-bootstrap";
import { ButtonDef } from "../../components/ui";

import { BackStyle, PageBanner } from "../../assets/styles/frontGlobalStyle";
import { BackIcon } from "../../assets/styles/icons";
import ROUTES from "../../config/routes";
import * as vars from "../../vars";

export default function BannerYourCommand(...props) {

    let labelservice = props[0].dataFromServiceClick['name'];
    let xserviceIsSelected = (labelservice !== undefined && labelservice !== null);
    let descriptionService = props[0].dataFromServiceClick['description'];
    let sneakers = props[0].dataFromServiceClick['name'];
    let maxPrice = props[0].dataFromServiceClick['maxPrice'];
    let minPrice = props[0].dataFromServiceClick['minPrice'];
    let picture = props[0].dataFromServiceClick['picture'];
    let venirDirectement = "Aucune infos";
    let typeService = "non spécifié";
    let priceQuote = "0";
    // alimentation des datas avec le complement
    Object.entries(props[0].dataComplement).forEach(entry => {
        const [key, value] = entry;


       // console.log("BYC 1.00 Props", entry['1']['typeService']);
       // console.log("BYC 1.00 Props", entry['1']['precisionQuote']);
      //  console.log("BYC 1.00 Props", entry['1']['id']);
        if (entry['1']['id'] === props[0].dataFromServiceClick['id']) {
            venirDirectement = entry['1']['precisionQuote'];
            typeService = entry['1']['typeService'];
            priceQuote = entry['1']['priceQuote'];


            return false;
        }



        console.log("BYC 1.01 Props", entry);
    });
    console.log("BYC 1.02 Props", props);
    const handleClick = (e) => {
        // Traiter les données du composant enfant

        console.log("BYC 1.01 envoyer is clicked", e);
    }
    return (

        <Container>
            {!xserviceIsSelected && (

                <div style={{ width: '100%', height: '100%', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, background: 'white', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.10)', borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 13, display: 'inline-flex' }}>
                    <div style={{ height: 137, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex' }}>
                        <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                            <div style={{ color: '#89B03D', fontSize: 24, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word' }}>Votre commande</div>
                        </div>
                        <div style={{ width: 298, color: '#A1A1A1', fontSize: 14, fontFamily: 'Poppins', fontStyle: 'italic', fontWeight: '400', wordWrap: 'break-word' }}>Aucune prestation sélectionnée</div>
                        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 78, display: 'inline-flex' }}>
                            <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, background: '#89B03D', borderRadius: 2, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
                                <div style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word' }}>Choisissez une prestation</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {xserviceIsSelected && (


                <div style={{ width: '100%', height: '100%', padding: 20, background: 'white', boxShadow: '0 4px 51px 0 rgba(182, 172, 251, 0.42)', borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>

                    <div style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 45, display: 'inline-flex' }}>
                        <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
                            <div style={{ color: '#89B03D', fontSize: 24, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', wordWrap: 'break-word' }}>Votre commande</div>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 32, display: 'inline-flex' }}>
                                <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex' }}>
                                    <div style={{ height: 90, justifyContent: 'flex-start', alignItems: 'center', gap: 9, display: 'flex' }}>
                                        <div style={{ width: 300, height: 90, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                            <div style={{ color: '#444444', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', wordWrap: 'break-word' }}>
                                                {labelservice}</div>
                                            <div style={{ width: 298, color: '#444444', fontSize: 14, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>

                                                {sneakers}</div>
                                            <div style={{ width: 298, color: '#929292', fontSize: 14, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>
                                                {descriptionService} </div>
                                        </div>
                                    </div>
                                    <div style={{ width: 129, height: 90, textAlign: 'center' }}>
                                        <span style={{ color: '#373737', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', wordWrap: 'break-word' }}>{typeService}<br /></span>
                                        <span style={{ color: '#929292', fontSize: 14, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>
                                            Fourchette estimée :<br />{maxPrice}€ - {minPrice}€*</span></div>
                                </div>
                                <div style={{ width: 300, height: 90, textAlign: 'center' }}>
                                    <span style={{ color: '#373737', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', wordWrap: 'break-word' }}>Précision de prise en charge du devis<br /></span>
                                    <span style={{ color: '#929292', fontSize: 14, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>
                                        {venirDirectement}
                                        A partir de 9€</span></div>
                                <div style={{ height: 117, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                                    <div style={{ width: 159, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
                                        <div style={{ color: '#444444', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', wordWrap: 'break-word' }}>Modes de délivrance</div>
                                        <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex' }}>
                                                <div style={{ width: 15, height: 15, position: 'relative' }}>
                                                    <div style={{ width: 15, height: 15, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 9999, border: '1px #DADADA solid' }} />
                                                    <div style={{ width: 9, height: 9, left: 3, top: 3, position: 'absolute', background: '#A2C614', borderRadius: 9999 }} />
                                                </div>
                                                <div style={{ color: '#444444', fontSize: 14, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>Déposer en boutique</div>
                                            </div>
                                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex' }}>
                                                <div style={{ width: 15, height: 15, background: 'white', borderRadius: 9999, border: '1px #DADADA solid' }} />
                                                <div style={{ color: '#444444', fontSize: 14, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', wordWrap: 'break-word' }}>Envoyer par livraison</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: 12, height: 12, background: '#5D5D5D' }}></div>
                            </div>
                        </div>
                        <div style={{ width: 198, height: 156, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                            <div style={{ height: 132, paddingBottom: 44 }} />
                            <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, background: '#89B03D', borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>

                                <ButtonDef textButton={`Demander un devis`} onClick={(e) => handleClick()}
                                />
                       
                            </div>
                        </div>
                    </div>

                </div>

            )}


            
        </Container>
    )

}
