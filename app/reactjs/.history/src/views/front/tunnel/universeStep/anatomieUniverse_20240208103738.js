import { Col, Container, Row } from "react-bootstrap";

export default function AnatomieUniverse(  ...props ) {
    const {title, image} = props;
   
    return (
        <Container>
        <div style={{ color: '#465A61', fontSize: 48, fontFamily: 'Helvetica Neue LT Std',
        fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>{title}</div>
        <Row>
            <Col>
             
            <img width='100%' className="z3imgbottom" src={image} />
            </Col>
        </Row>
       </Container>  )
     
}
