import { Col, Container, Row } from "react-bootstrap";
export default function AnatomieUniverse(props) {
    const { title, image } = props;

    return (
        <Container>
            <Row
                style={{
                    marginBottom: '2%', marginTop: '2%', width: '100%', height: '100%', color: '#465A61', fontSize: 40,
                    fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word'
                }}>
                {title}
            </Row>
            <Row>
                <Col >

                    <img style={{ width: "80%", marginLeft: "10%" }} className="z3imgbottom" src={image} />
                </Col>
            </Row>
        </Container>)

}
