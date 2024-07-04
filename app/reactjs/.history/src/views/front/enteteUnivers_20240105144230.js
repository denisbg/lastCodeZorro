import React, { useEffect, useState } from "react";
import anatomieCord from '../../assets/images/zanatCord.png';
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
    CordStyle
} from "../../assets/styles/frontUniverseStyles";


export default function EnteteUnivers(
) {
    const { universe, slugIdUniverse, slugIdService, slugIdBenefit, idDeliveryMode } =
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
                <div className="title-univers" >{universe.slug}</div>
                </CordStyle>
              {(universe.slug === 'cordonnerie') && (
                <CordStyle>
                  <div className="home-univers" >  Nos artisans partenaires ne manquent ni de talons, ni de talents.
                    Parfaitement bien dans leurs baskets, ils redonnent forme aux escarpins,
                    bottes, ballerines et sneakers qui passent entre leurs mains.
                    Ils sont du genre à bichonner vos chaussures de la semelle jusqu’au dernier lacet :
                    pas question de s’arrêter au premier coup de pompe !</div>
                  <ButtonDef textButton="Commandez une réparation" />

                  <div class="container">
                    <div class="row col-12">

                      <img style={{ width: 430 }} src={cordZ3img1} />
                      <img style={{ width: 430 }} src={cordZ3img2} />
                      <img style={{ width: 430 }} src={cordZ3img3} />
                    </div>
                    <img className="z3imgbottom" src={cordZ3imgbottom} />
                  </div>
                </CordStyle>
              )}

                </>
            )
        )
    }
    return (
        <div></div>
    )
}
