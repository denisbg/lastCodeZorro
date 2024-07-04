import React, { useState } from "react";
import noImage from "../../assets/images/noImage.png";
import { ArtisanItemStyle } from "../../assets/styles/frontGlobalStyle";
import { getPathImage, getUniqueItemsByProperties } from "../../helper/functions";
import Z7etoiles from '../../assets/images/avis5etoiles.png'
import { Link, useHistory, useParams } from "react-router-dom";
import { ItemFichePrestation } from "../../assets/styles/frontGlobalStyle";
import RatingBox from "../ui-elements/ratingBox";
import { useMediaQuery } from "react-responsive";

export default function ArtItem(props ) {
  const { row } = props;
  const { slugIdUniverse, slugIdService } = useParams();
  const linkArtisanService = `/artisan/${slugIdUniverse}/${row.label}-${row.id}`;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });

  const history = useHistory();

  const handleVitrineClick = () => {
    //isDisplayPrestationsArtisan = true;
    //setDisplayListeProduits(false);
    //setDisplayFicheUnivers(false);
  };
  return (
    <>
    <ArtisanItemStyle xl={12} lg={12} sm={1} style={{ background: "#F6f3f5" }}>
     
     
      <div className="content-item-produit">
        <img style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%', objectFit:"cover", height: 200, borderRadius: 8 }}
          src={getPathImage(row.picture)}
          alt={row.name}
        />

        <div style={{
          marginLeft: '15%',  marginBottom: '5%', flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start', display: 'flex'
        }}>
          <div style={{
            textAlign: 'center', color: '#4D5F68',
            fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700',
            lineHeight: 1, wordWrap: 'break-word'
          }}>
            {row.label}</div>
          <div style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            display: 'flex'
          }}>
            <div style={{ height: "60%", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
              <div style={{
                justifyContent: 'space-between', color: '#A1A1A1', fontSize: 14, fontFamily: 'Helvetica Neue LT Std',
                fontWeight: '400', wordWrap: 'break-word'
              }}>
                <div>{row.address} </div>
                <div>{row.id}</div>
                <div>{row.postalcode}    {row.city_code}</div>
              </div>
              <div> <img style={{ width: 90, height: 16 }} src={Z7etoiles} /></div>
              <Link to={linkArtisanService}>
            Voir ses services
                      </Link>
    
   
              


            </div>
          </div>
        </div>
      </div>
      </ArtisanItemStyle>
 

      <ItemFichePrestation
     /* onClick={() => props.setActiveBenefit(row)}
      className={props.activeBenefit.id === row.id ? "active activeItem" : null} */
    >
      <div className="content-item-fiche" onClick={() => {
        if (props.activeBenefit.id === row.id) {
          history.push(linkArtisanService);
        }
      }}>
        {isDesktopOrLaptop ? (
        <>
          <div className="logo-image">
            {row.user.picture ? (
              <Link to={linkArtisanService}>
                <img
                  src={getPathImage(row.user.picture)}
                  alt={row.user.enterprise}
                />
              </Link>
            ) : null}
          </div>
          <div className="detail-item-fiche">
            <p className="name-societe">
              <Link to={linkArtisanService}>
                {row.user.enterprise}
              </Link>
            </p>
            <span className="code-postal-societe">
              {row.user.postalCode} {row.user.city}
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
            <Link to={linkArtisanService} className="show-prestation">Voir la prestation</Link>
          </div>
          <div className="type-prestation">
            {row?.user?.googleRating && (
              <div className="service-rating-bloc">
                <RatingBox value={row.user.googleRating} />
              </div>
            )}
            {row.typeService === "devis" ? (
              <p className="devis-prestation">Sur devis</p>
            ) : (
              <p className="price-prestation">
                A partir de <span>{row.minPrice} €</span>
              </p>
            )}
          </div>
        </>
        )
        :
        (
        <>
          <div className="head-fiche-mobile">
            <div className="logo-image">
              {row.user.picture ? (
                <Link to={linkArtisanService}>
                  <img
                    src={getPathImage(row.user.picture)}
                    alt={row.user.enterprise}
                  />
                </Link>
              ) : null}
            </div>
            <div className="info-fich-mobile">
              <p className="name-societe">
                <Link to={linkArtisanService}>
                  {row.user.enterprise}
                </Link>
              </p>
              <span className="code-postal-societe">
                {row.user.postalCode} {row.user.city}
              </span>
              {row?.user?.googleRating && (
                <div className="service-rating-bloc">
                  <RatingBox value={row.user.googleRating} />
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
            {isTabletOrMobile && <Link to={linkArtisanService} className="show-prestation">Voir la prestation</Link>}
          </div>
        </>
        )
        }
      </div>
    </ItemFichePrestation>
    </>
     );
}