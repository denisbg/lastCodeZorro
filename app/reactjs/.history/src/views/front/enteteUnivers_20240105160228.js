import React, { useEffect, useState } from "react";
import cordZ3img1 from '../../assets/images/z3-3.png';
import cordZ3img2 from '../../assets/images/z3-2.png';
import cordZ3img3 from '../../assets/images/z3-1.png';
import cordZ3imgbottom from '../../assets/images/cordZ3imgbottom.png';
import ButtonDef from "../../components/ui-elements/buttonDef";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
    CordStyle
} from "../../assets/styles/frontUniverseStyles";
import anatomieCord from '../../assets/images/zanatCord.png';

export default function EnteteUnivers(
    { universName, slugIdUniverse }
   ) {
    

    if (universName) {
        console.log(`-#result${universName}`)
        console.log(`-#slugIdUniverse${slugIdUniverse}`)
        return (
            universName && (
                <>
                    <CordStyle>
                <div className="title-univers" >{universName}</div>
                </CordStyle>
              {(slugIdUniverse === 'cordonnerie-30') && (
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
