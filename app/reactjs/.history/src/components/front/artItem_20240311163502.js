import React, { useState } from "react";
import noImage from "../../assets/images/noImage.png";
import { ArtisanItemStyle } from "../../assets/styles/frontGlobalStyle";
import { getPathImage, getUniqueItemsByProperties } from "../../helper/functions";
import Z7etoiles from '../../assets/images/avis5etoiles.png'
import { Link, useHistory, useParams } from "react-router-dom";


export default function ArtItem(props ) {
  const { row } = props;
  const { slugIdUniverse, slugIdService } = useParams();
  const linkArtisanService = `/artisan/${slugIdUniverse}/${row.label}-${row.id}`;


  const history = useHistory();

  const handleVitrineClick = () => {
    //isDisplayPrestationsArtisan = true;
    //setDisplayListeProduits(false);
    //setDisplayFicheUnivers(false);
  };
  return (
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
  );
}