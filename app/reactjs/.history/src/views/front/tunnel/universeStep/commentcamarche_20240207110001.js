import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  height: 453px;
  width: 1140px;

  & .group {
    height: 453px;
    left: 0;
    position: fixed;
    top: 0;
    width: 1140px;
  }

  & .overlap-group {
    height: 418px;
    position: relative;
    width: 1142px;
  }

  & .vector {
    height: 215px;
    left: 401px;
    position: absolute;
    top: 132px;
    width: 251px;
  }

  & .img {
    height: 235px;
    left: 843px;
    position: absolute;
    top: 153px;
    width: 234px;
  }

  & .vector-2 {
    height: 306px;
    left: 42px;
    position: absolute;
    top: 112px;
    width: 241px;
  }

  & .div {
    height: 391px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1142px;
  }

  & .text-wrapper {
    color: #4c5f68;
    font-family: "Helvetica Neue LT Std-75Bold", Helvetica;
    font-size: 48px;
    font-weight: 700;
    height: 58px;
    left: 0;
    letter-spacing: 0;
    line-height: 25.5px;
    position: absolute;
    top: 0;
    width: 633px;
  }

  & .frame {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    left: 0;
    position: absolute;
    top: 97px;
  }

  & .frame-2 {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  & .iconos-home-page {
    height: 125px;
    position: relative;
    width: 125px;
  }

  & .choisissez-votre {
    color: #e57c2e;
    font-family: "Poppins-SemiBold", Helvetica;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 25.5px;
    position: relative;
    text-align: center;
    width: 340px;
  }

  & .p {
    color: var(--gris-texte);
    font-family: "Helvetica Neue LT Std-65Medium", Helvetica;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 25.5px;
    position: relative;
    text-align: center;
    width: 320px;
  }

  & .frame-3 {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    left: 400px;
    position: absolute;
    top: 97px;
  }

  & .text-wrapper-2 {
    color: #a2c617;
    font-family: "Poppins-Bold", Helvetica;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 25.5px;
    position: relative;
    text-align: center;
    width: 340px;
  }

  & .frame-4 {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    left: 800px;
    position: absolute;
    top: 98px;
  }

  & .text-wrapper-3 {
    color: #4c5f68;
    font-family: "Poppins-Bold", Helvetica;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 25.5px;
    position: relative;
    text-align: center;
    width: 340px;
  }
`;

export const Box = () => {
  return (
    <StyledBox>
      <div className="group">
        <div className="overlap-group">
          <img className="vector" alt="Vector" src="vector-14.svg" />
          <img className="img" alt="Vector" src="vector-11.svg" />
          <img className="vector-2" alt="Vector" src="vector-3.svg" />
          <div className="div">
            <div className="text-wrapper">Comment ça marche ?</div>
            <div className="frame">
              <div className="frame-2">
                <img
                  className="iconos-home-page"
                  alt="Iconos home page"
                  src="iconos-home-page-mesa-de-trabajo-1-1.svg"
                />
                <p className="choisissez-votre">Choisissez votre prestation&nbsp;&nbsp;et laissez-vous guider</p>
              </div>
              <p className="p">
                Réservez votre prestation chez votre artisan sélectionné en quelques clics.
                <br />
                Planifiez votre rendez-vous où que vous soyez, 24h/7j.
              </p>
            </div>
            <div className="frame-3">
              <div className="frame-2">
                <img className="iconos-home-page" alt="Iconos home page" src="iconos-home-page-04-1.svg" />
                <p className="text-wrapper-2">Echangez avec votre artisan en toute simplicité</p>
              </div>
              <p className="p">
                Une fois le devis validé, payez <br />
                en toute sécurité.
                <br />
                Déposez votre objet chez votre artisan sur le créneau horaire de votre choix.
              </p>
            </div>
            <div className="frame-4">
              <div className="frame-2">
                <img className="iconos-home-page" alt="Iconos home page" src="iconos-home-page-08-1.svg" />
                <p className="text-wrapper-3">Récupérez vos objets en toute sérénité</p>
              </div>
              <p className="p">
                Votre artisan vous préviendra une fois le travail réalisé pour récupérer votre objet à l’atelier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StyledBox>
  );
};
