import { Col, Container, Row } from "react-bootstrap";
import imgbonusreparation from '../../../assets/images/bonusreparation.png';
export default function PrestationsFavorites() {
    return (
        <Container>

            <Row >
                <Col >
                    <div style={{ width: '100%', height: '100%', paddingTop: 24, paddingBottom: 16, paddingLeft: 8, paddingRight: 8, background: 'white', boxShadow: '0px 2px 4px rgba(70, 90, 97, 0.15)', borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex' }}>
                        <div style={{ width: 263, height: 360, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
                            <div style={{ height: 96, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex' }}>
                                <img style={{ width: 40.56, height: 40 }} src="https://via.placeholder.com/41x40" />
                                <div style={{ width: 220, textAlign: 'center', color: '#515151', fontSize: 21.55, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 25.90, wordWrap: 'break-word' }}>Changement de semelles</div>
                            </div>
                            <div style={{ width: 230, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                                <div style={{ width: 230, color: '#A1A1A1', fontSize: 16, fontFamily: 'Helvetica Neue LT Std', fontWeight: '400', lineHeight: 21, wordWrap: 'break-word' }}>Nos artisans redonnent à vos chaussures leur confort et leur adhérence d'origine. Grâce à leur matériel de haute qualité, ils veillent à ce que vos souliers retrouvent leur état optimal. Faites confiance à nos artisans expérimentés pour redonner à vos chaussures une nouvelle jeunesse !</div>
                                <img style={{ width: 91.77, height: 16.97 }} src="https://via.placeholder.com/92x17" />
                            </div>
                        </div>
                    </div>  </Col>
            </Row> </Container >
    )
};
