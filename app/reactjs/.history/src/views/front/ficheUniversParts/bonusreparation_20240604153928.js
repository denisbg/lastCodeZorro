import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import imgbonusreparation from "../../../assets/images/icons/bonusreparation.png";
const StyledFrame = styled.div`
align-items: center;
background-color: #ffffff;
display: flex;
flex-direction: column;
gap: 37px;
justify-content: center;
padding: 21px 45px;
position: relative;

& .faites-des-conomies {
  align-self: stretch;
  flex: 0 0 auto;
  position: relative;
  width: 100%;
}

& .b-n-ficiez-de-r {
  align-self: stretch;
  color: #5d5d5d;
  font-family: "Poppins-Regular", Helvetica;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
}

& .text-wrapper {
  color: #5d5d5d;
  font-family: "Poppins-Regular", Helvetica;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0;
}

& .span {
  text-decoration: underline;
}

& .div-sc-kypzxb {
  background-color: #ffffff;
  border-radius: 53.97px;
  box-shadow: 0px 2.01px 33.52px #b6acfb63;
  height: 44.25px;
  position: relative;
  width: 757.65px;
}

& .div-item-filter {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 0px 20.11px;
  position: absolute;
  top: 16px;
  width: 360px;
}

& .div-react-select {
  align-items: center;
  align-self: stretch;
  background-color: #ffffff;
  display: flex;
  height: 24.14px;
  min-width: 45.59px;
  padding: 0.67px;
  position: relative;
  width: 100%;
}

& .div-react-select-wrapper {
  flex: 1;
  flex-grow: 1;
  height: 22.8px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

& .div-wrapper {
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  top: 4px;
}

& .div {
  color: #748993;
  font-family: "Helvetica Neue LT Std-55Roman", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 14.1px;
  margin-top: -0.67px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

& .img {
  flex: 0 0 auto;
  position: relative;
  z-index: 0;
}

& .label-univers {
  color: #000000;
  font-family: "Helvetica Neue LT Std-65Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  height: 14px;
  left: 20px;
  letter-spacing: 0;
  line-height: 13.1px;
  position: absolute;
  top: -11px;
  white-space: nowrap;
  width: 100px;
}

& .div-item-filter-2 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  left: 360px;
  padding: 0px 20.11px;
  position: absolute;
  top: 16px;
  width: 360px;
}

& .div-post-code {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  position: relative;
  width: 100%;
}

& .button-margin {
  flex: 0 0 auto;
  position: relative;
}

& .div-sc-ttzny {
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}

& .input {
  align-items: flex-start;
  align-self: stretch;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 24.14px;
  padding: 3px 0px 4.36px;
  position: relative;
  width: 100%;
}

& .div-placeholder {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: 0px 203.49px 0px 0px;
  position: relative;
  width: 100%;
}

& .text-wrapper-2 {
  color: #748993;
  font-family: "Helvetica Neue LT Std-55Roman", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -0.67px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

& .pseudo {
  background-color: #eaeaec;
  height: 24px;
  left: 0;
  position: absolute;
  top: -7px;
  width: 1px;
}

& .label-o {
  color: #000000;
  font-family: "Helvetica Neue LT Std-65Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  height: 14px;
  left: 20px;
  letter-spacing: 0;
  line-height: 13.1px;
  position: absolute;
  top: -13px;
  white-space: nowrap;
  width: 24px;
}

& .div-btn-filter {
  height: 32px;
  left: 719px;
  position: absolute;
  top: 7px;
  width: 38px;
}
`;

export default function BonusReparation() {


    return (
        <StyledFrame>
            <img
                className="faites-des-conomies"
                alt="Faites des conomies"
                src="faites-des-conomies-avec-le-bonus-r-paration.png"
            />
            <p className="b-n-ficiez-de-r">
                <span className="text-wrapper">
                    Bénéficiez de réductions de 6€ à 25€ pour la réparation de vos vêtements et chaussures chez les artisans
                    labellisés proposant le Bonus Réparation. Pour plus d’informations sur les prestations éligibles, cliquez{" "}
                </span>
                <span className="span">ici</span>
                <span className="text-wrapper">.</span>
            </p>
            <div className="div-sc-kypzxb">
                <div className="div-item-filter">
                    <div className="div-react-select">
                        <div className="div-react-select-wrapper">
                            <div className="div-wrapper">
                                <div className="div">Choisir dans la liste</div>
                            </div>
                        </div>
                        <img className="img" alt="Div react select" src="div-react-select-indicator.svg" />
                    </div>
                    <div className="label-univers">Univers</div>
                </div>
                <div className="div-item-filter-2">
                    <div className="div-post-code">
                        <img className="button-margin" alt="Button margin" src="button-margin.svg" />
                        <div className="div-sc-ttzny">
                            <div className="input">
                                <div className="div-placeholder">
                                    <div className="text-wrapper-2">Paris</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pseudo" />
                    <div className="label-o">Où</div>
                </div>
                <img className="div-btn-filter" alt="Div btn filter" src="div-btn-filter-banner.svg" />
            </div>
        </StyledFrame>
    );
};
        
    )

}
