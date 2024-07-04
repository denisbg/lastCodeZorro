import { Col, Container, Row } from "react-bootstrap";
import anatomieCord from '../../assets/images/zanatCord.png';
export default function AnatomieUniverse( ) {
    return (
        <Container>
        <div style={{ color: '#465A61', fontSize: 48, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Anatomie d’une chaussure</div>
        <Row>
            <Col>
             
            <img width='100%' className="z3imgbottom" src={{anatomieCord}} />
            </Col>
        </Row>
       </Container>  )
     
}
