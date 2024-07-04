import Z9part1 from '../../../assets/images/z9partenaire_3_HOP.svg'
import Z9part2 from '../../../assets/images/z9partenaire_1_FFCM.svg'
import Z9part3 from '../../../assets/images/z9partenaire_2_Unacac.svg'
import image7png from '../../../assets/images/image-7.png'
import image8png from '../../../assets/images/image-8.png'
import imageremovebgpreview1png from '../../../assets/images/image-removebg-preview-1.png'
import partenaire1FFCMpng from '../../../assets/images/partenaire-1-FFCM.png'
import image6png from '../../../assets/images/image-6.png'
import partenaire2unacacpng from '../../../assets/images/partenaire-2-unacac.png'

import { Row, Col } from "react-bootstrap";
import React from "react";
import styled from "styled-components";

const StyledFrame = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 60px;
  position: relative;

  & .text-wrapper {
    align-self: stretch;
    color: var(--bleu-gris-f);
    font-family: "Helvetica Neue LT Std-75Bold", Helvetica;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 42px;
    margin-top: -1px;
    position: relative;
    text-align: center;
  }

  & .div {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    gap: 52px 52px;
    justify-content: space-between;
    position: relative;
    width: 100%;
  }

  & .image {
    height: 142px;
    position: relative;
    width: 120px;
  }

  & .img {
    height: 56px;
    object-fit: cover;
    position: relative;
    width: 192px;
  }

  & .image-removebg {
    height: 57px;
    object-fit: cover;
    position: relative;
    width: 177px;
  }

  & .partenaire-FFCM {
    height: 129px;
    object-fit: cover;
    position: relative;
    width: 129px;
  }

  & .image-2 {
    height: 48px;
    object-fit: cover;
    position: relative;
    width: 212px;
  }

  & .partenaire-unacac {
    height: 117px;
    position: relative;
    width: 164px;
  }
`;

export default function Partenaires() {

 
      return (
        <StyledFrame>
          <div className="text-wrapper">Ils nous accompagnent</div>
          <div className="div">
            <img className="image" alt="Image" src={image7png} />
            <img className="img" alt="Image" src={image8png} />
            <img className="image-removebg" alt="Image removebg" src={imageremovebgpreview1png} />
            <img className="partenaire-FFCM" alt="Partenaire FFCM" src={partenaire1FFCMpng} />
            <img className="image-2" alt="Image" src={image6png} />
            <img className="partenaire-unacac" alt="Partenaire unacac" src={partenaire2unacacpng} />
          </div>
        </StyledFrame>
      );
    };
    

 function xPartenaires() {
    return (
        <>
            <div style={{paddingTop: 50}}>
                <div style={{ paddingBottom: 50, textAlign: 'center', color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 2, wordWrap: 'break-word' }}>
                    Ils nous accompagnent</div>
 
                <Row>
                    <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'inline-flex' }}>

                        <div style={{ justifyContent: 'center', alignItems: 'center', gap: 80, display: 'inline-flex' }}>
                            <img style={{ height: 100 }} alt="one " src={Z9part1} />
                            <img style={{ height: 69 }} alt="two " src={Z9part2} />
                            <img style={{ height: 104.44 }} alt="free " src={Z9part3} />
                        </div>
                    </div> 
                </Row>

            </div>
        </>
    );
}
