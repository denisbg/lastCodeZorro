import { Col, Container, Row } from "react-bootstrap";
import anatomieCord from '../../../../assets/images/zanatCord.png';
export default function AnatomieUniverse( descriptif ) {
   
    return (
        <Container>
        <div style={{ color: '#465A61', fontSize: 48, fontFamily: 'Helvetica Neue LT Std',
        fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>{descriptif}</div>
        <Row>
            <Col>
             
            <img width='100%' className="z3imgbottom" src={anatomieCord} />
            </Col>
        </Row>
       </Container>  )
     
}
