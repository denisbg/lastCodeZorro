import React from 'react';
import { Col, Row } from "react-bootstrap";
export default function ArtXmap() {
    return (
        <>
          {props.text ? (
            <div
              className={`item-map-prestation ${
                parseInt(props.activeBenefit.id) === parseInt(props.id)
                  ? "active"
                  : ""
              }`}
              style={style}
            >
              <div>{props.text}</div>
            </div>
          ) : null}
          TOTOTOTOTOT
        </>
      );
}