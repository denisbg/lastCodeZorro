import React, { useState } from "react";
import { Link } from "react-router-dom";
import noImage from "../../assets/images/noImage.png";
import { ProduititemStyle } from "../../assets/styles/frontGlobalStyle";
import { parentCategories } from "../../helper/functions";
import * as vars from "../../vars";
import ButtonDef from "../ui-elements/buttonDef";
import imgBonusreparation from "../../assets/images/icons/bonusreparation.png";
import { getPathImage, slugify } from "../../helper/functions";
import { useParams } from "react-router-dom";
export default function ArtisanPrestationItemBonus( row, slugIdUniverse, slugIdService, ...props ) {
  const [showMore, setShowMore] = useState(false);
  //const linkBenefit = `/univers/${slugIdUniverse}/${slugIdService}/${slugify(row.user.enterprise)}-${row.id}`;
  const linkBenefit = `/univers/${slugIdUniverse}/${slugIdService}`;
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);
  const getUrl = () => {
    return row.totalBenefits
      ? `/univers/${slugIdUniverse}/${row.slug}-${row.id}`
      : "#";
  };

 
   const selectCommandRow = (row, e) =>
  {
    e.preventDefault();
    alert("Voici le service" +row.name);
    console.log("PIB STEP Voir le service ", row);
  }

  console.log("Step ArtisanPrestationItemBonus X", row);
  
  return (

    <ProduititemStyle xl={3} lg={4} sm={6}>
      <div className="content-item-produit">

        <div className="img-produit">
          {(row.bonusreparation === '1') &&
            (<span style={{ paddingLeft: "75%", paddingTop: "0%" }}>
              <img style={{ width: 56, height: 30.73 }} src={imgBonusreparation} />
            </span>)
          }
          <Link to={getUrl()} className={row.totalBenefits ? '' : 'disabled-link'}>
            <img
              className="img-fluid"
              src={getPathImage(row.picture)}
              alt={row.name}
            />
          </Link>
        </div>
        <div className="detail-produit">
          <p className="name-produit">
            <Link to={getUrl()} className={row.totalBenefits ? '' : 'disabled-link'}>{row.name}</Link>
          </p>
  
          <ButtonDef textButton={`Voir le service` }   onClick= {(e)=>selectCommandRow (row,e)}
              />
              
    
          <div className="cats-prestation">
            <span>Catégories :</span>
            <div className="item-cats-prestation">
              {row.categories
                ? parentCategories(row.categories).map((cat) => (
                  <p key={cat.id}>
                    <span>{cat.name}</span>
                  </p>
                ))
                : null}
            </div>
          </div>

         
          <Link to={getUrl()} className="url-btn-produit">
            {row.totalBenefits  ? (
              <ButtonDef
                textButton={`Voir les ${row.totalBenefits} réparateur(s)`}
              />

            ) : (
              <ButtonDef textButton={`Pas de prestataire` }   onClick={() => {
                alert("Cette Prestation n'a pas de réparateur associé");
              }}  />
            )}
          </Link>
        </div>
      </div>
    </ProduititemStyle>
  );
}
