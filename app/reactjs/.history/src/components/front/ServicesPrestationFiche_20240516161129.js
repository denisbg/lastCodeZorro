
import React, { useState, useEffect, useRef } from "react";
import { ArtisanItemStyle } from "../../assets/styles/frontGlobalStyle";
import { getPathImage, getUniqueItemsByProperties } from "../../helper/functions";
import Z7etoiles from '../../assets/images/avis5etoiles.png'
import { Link, useHistory, useParams } from "react-router-dom";
import { ItemFichePrestation } from "../../assets/styles/frontGlobalStyle";
import RatingBox from "../ui-elements/ratingBox";
import { useMediaQuery } from "react-responsive";
import bonusreparation from '../../assets/images/icons/bonusreparation.png';
import { Hidden } from "@mui/material";


export default function ServicesPrestationFiche(  { ...props }) {
  const { row } = props;
  const { slugIdUniverse, slugIdService } = useParams();
  const linkArtisanService = `/artisan/${slugIdUniverse}/${row.label}-${row.id}`;
  //const linkBenefit = `/univers/${slugIdUniverse}/${slugIdService}/${slugify(row.user.enterprise)}-${row.id}`;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const [activeBenefit, setActiveBenefit] = useState({ id: null });
  const history = useHistory();
  const [state, setState] = useState({
    map: { center: [48.8534, 2.3488], zoom: 10 },
  });
  
  useEffect(() => {
    if (activeBenefit?.user?.latitude && activeBenefit?.user?.longitude) {
      const cpState = { ...state };
      cpState.map.center = [
        activeBenefit.user.latitude,
        activeBenefit.user.longitude,
      ];
      setState(cpState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBenefit]);
  return (
    <div    id={row.id} className={props.activeRow.id === row.id ? "active activeItem" : " "} >
      

      <ItemFichePrestation 
      /* onClick={() => props.setActiveBenefit(row)}*/
      
      >
        <div className="content-item-fiche"  
        /* onClick={() => {         
          if (props.activeBenefit.id === row.id) {         history.push(linkArtisanService);
          */
        >
          {isDesktopOrLaptop ? (
            <>
        
              <div className="logo-image"    >
                {row.picture ? (
                  <Link to={linkArtisanService}>
                    <img
                     
                      src={getPathImage(row.picture)}
                      alt={row.label}
                    />
                  </Link>
                ) : null}
              </div>
            
      
    
              <div className="detail-item-fiche">
                <p className="name-societe">
                  <Link to={linkArtisanService}>
                    {row.label}
                  </Link>
                </p>
                <span className="code-postal-societe">
                  {row.postalcode}    {row.city_code}
                </span>


                <div className="lists-mode-delivrance">
                  {row.deliveryModes
                    ? row.deliveryModes.map((val) => (
                      <span className="item-mode" key={val.deliveryModeType.id}>
                        {val.deliveryModeType.name}
                      </span>
                    ))
                    : null}
                </div>
               
               
           
            
              </div>
              <Link to={row.linkArtisanService} className="show-prestation">Voir la prestation </Link>   
              <div className="type-prestation">
                {row?.user?.googleRating && (
                  <div className="service-rating-bloc">
                    <RatingBox value={row.googleRating} />
                  </div>
                )}

                {row.bonusreparation === "1" &&
                  (<span style={{ paddingLeft: "0%", paddingTop: "0%" }}>
                    <img style={{ width: 56, height: 30.73 }} src={bonusreparation} />
                  </span>)
                }
                {/*
                {row.typeService === "devis" ? (
                  <p className="devis-prestation">Sur devis</p>
                ) : (
                  <p className="price-prestation">
                    A partir de <span>{row.minPrice} €</span>
                  </p>
                )} */}
              </div>
            </>
          )
            :
            (
              <>
                <div className="head-fiche-mobile">
                  <div className="logo-image">
                    {row.picture ? (
                      <Link to={linkArtisanService}>
                        <img
                          src={getPathImage(row.picture)}
                          alt={row.label}
                        />
                      </Link>
                    ) : null}
                  </div>
                  <div className="info-fich-mobile">
                    <p className="name-societe">
                      <Link to={linkArtisanService}>
                        {row.label}
                      </Link>
                    </p>
                    <span className="code-postal-societe">
                      {row.postalcode}    {row.city_code}
                    </span>
                    {row?.user?.googleRating && (
                      <div className="service-rating-bloc">
                        <RatingBox value={row.googleRating} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="detail-item-fiche">
                  <div className="content-detail-fiche-mobile">
                    <div className="lists-mode-delivrance">
                      {row.deliveryModes
                        ? row.deliveryModes.map((val) => (
                          <span className="item-mode" key={val.deliveryModeType.id}>
                            {val.deliveryModeType.name}
                          </span>
                        ))
                        : null}
                    </div>
                    <div className="type-prestation">
                      {row.typeService === "devis" ? (
                        <p className="devis-prestation">Sur devis</p>
                      ) : (
                        <p className="price-prestation">
                          A partir de <span>{row.minPrice} €</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="go-item-fiche">
                  {isTabletOrMobile && <Link to={linkArtisanService} className="show-prestation">Voir le réparateur</Link>}
                </div>
              </>
            )
          }
        </div>
      </ItemFichePrestation>
    </div>
  );
}