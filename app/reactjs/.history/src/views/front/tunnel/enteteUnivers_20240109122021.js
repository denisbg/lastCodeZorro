import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cordZ3img1 from '../../../assets/images/z3-3.png';
import cordZ3img2 from '../../../assets/images/z3-2.png';
import cordZ3img3 from '../../../assets/images/z3-1.png';
import defaultZ3img1 from '../../../assets/images/defz3-3.png';
import defaultZ3img2 from '../../../assets/images/defz3-2.png';
import defaultZ3img3 from '../../../assets/images/defz3-1.png';
import defaultZ3imgbottom from '../../../assets/images/cordZ3imgbottom.png';
import cordZ3imgbottom from '../../../assets/images/cordZ3imgbottom.png';
import ButtonDef from "../../../components/ui-elements/buttonDef";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { CordStyle } from "../../../assets/styles/frontUniverseStyles";
import ListeArtisansUnivers from "./universeStep/listeArtisansUnivers";
import Commentcamarche from "./universeStep/commentcamarche";
import AnatomieUnivers from "./universeStep/anatomieUnivers";
import DecouvrezArtisan from "./universeStep/decouvrezArtisan";
import BonusReparation from "./universeStep/bonusreparation";
import { useMediaQuery } from "react-responsive";

import anatomieCord from '../../../assets/images/zanatCord.png';

function strUcFirst(a) {
  return (a + '').charAt(0).toUpperCase() + (a + '').substr(1);
}
export default function EnteteUnivers(
) {
  const { slugIdUniverse, slugIdService } = useParams();
  const anatomies = [
    { id: 'cordonnerie-30', title: 'Cordonnerie', file: anatomieCord },

  ];


  const [service, setService] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const universe = useSelector((state) => state.universe);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const [defaultCodePostal] = useState(localStorage.getItem("codePostal"));
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const [filter, setFilter] = useState({
    deliveryModeTypes: {
      label: "Mode de délivrance",
      name: "deliveryModeTypes",
      placeholder: "Tous",
      options: [],
      value: [],
      hideOptions: true,
    },
    codePostal: {
      name: "codePostal",
      type: "text",
      label: "Où",
      placeholder: "Saisir un code postal",
      value:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultCodePostal
          : "",
      latitude:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultLatitude
          : null,
      longitude:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultLongitude
          : null,
      error: false,
      required: true,
      infoBulle: false,
    },
    price: {
      value: [-1, -1],
    },
    sortBy: {
      label: "Trier par: ",
      placeholder: `${isTabletOrMobile ? "trier par :" : ""}`,
      options: [
        { value: "distance_asc", label: "Distance" },
        { value: "rating_desc", label: "Meilleures notes" },
        { value: "price_asc", label: "Prix croissant" },
        { value: "price_desc", label: "Prix décroissant" },
      ],
      value: `${isTabletOrMobile ? null : "distance_asc"}`,
    },
  });
  let result = anatomies.find(el => el.id === slugIdUniverse);
  console.log(`-#slugIdUniverse${slugIdUniverse}`)
  if (slugIdUniverse === 'cordonnerie-30') {
    return <>
      <CordStyle>
        <div className="title-univers" >{strUcFirst(result.title)}</div>
      </CordStyle>
      <CordStyle>
        <div className="home-univers" >  Nos artisans partenaires ne manquent ni de talons, ni de talents.
          Parfaitement bien dans leurs baskets, ils redonnent forme aux escarpins,
          bottes, ballerines et sneakers qui passent entre leurs mains.
          Ils sont du genre à bichonner vos chaussures de la semelle jusqu’au dernier lacet :
          pas question de s’arrêter au premier coup de pompe !</div>

        <div style={{ marginBottom: 20 }}>
          <ButtonDef textButton="Commandez une réparation" />
        </div>
        <div class="container">
          <div class="row col-12">

            <img style={{ width: 430 }} src={cordZ3img1} />
            <img style={{ width: 430 }} src={cordZ3img2} />
            <img style={{ width: 430 }} src={cordZ3img3} />
          </div>
          <img className="z3imgbottom" src={cordZ3imgbottom} />
        </div>
      </CordStyle>
      <Commentcamarche></Commentcamarche>
      
      <ListeArtisansUnivers
        service={service}
        benefits={benefits}
        filter={filter}
        setFilter={setFilter}
        isPending={isPending}
      ></ListeArtisansUnivers>
      <DecouvrezArtisan></DecouvrezArtisan>
      <AnatomieUnivers ></AnatomieUnivers>
      <BonusReparation></BonusReparation>

    </>
  }
  else {

    return (
      <>
        <CordStyle>
          <div className="title-univers" >{strUcFirst(slugIdUniverse)}</div>
        </CordStyle>
        <CordStyle>
          <div className="home-univers" style={{ marginbottom: 20 }} > Texte manquant : Nos experts en informatique ne manquent ni de compétences, ni de créativité.
            Parfaitement à l'aise dans le monde du code, ils redonnent vie aux logiciels,
            applications, sites web et programmes qui passent entre leurs mains.
            Ils sont du genre à prendre soin de votre projet informatique du début jusqu'à la dernière ligne de code :
            pas question de s'arrêter au premier bug !</div>
          <div style={{ marginBottom: 20 }}>
            <ButtonDef textButton="Commandez une réparation" />
          </div>
          <div class="container">
            <div class="row col-12">

              <img style={{ width: 430 }} src={defaultZ3img1} />
              <img style={{ width: 430 }} src={defaultZ3img2} />
              <img style={{ width: 430 }} src={defaultZ3img3} />
            </div>
            <img className="z3imgbottom" src={defaultZ3imgbottom} />
          </div>
        </CordStyle>
        <Commentcamarche></Commentcamarche>

        <ListeArtisansUnivers
          service={service}
          benefits={benefits}
          filter={filter}
          setFilter={setFilter}
          isPending={isPending}
        ></ListeArtisansUnivers>
         <DecouvrezArtisan></DecouvrezArtisan>
        <AnatomieUnivers ></AnatomieUnivers>
        <BonusReparation></BonusReparation>

      </>
    )
  }
  return null;


}

