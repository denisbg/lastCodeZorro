import Z9part1 from '../../../assets/images/z9partenaire_3_HOP.svg'
import Z9part2 from '../../../assets/images/z9partenaire_1_FFCM.svg'
import Z9part3 from '../../../assets/images/z9partenaire_2_Unacac.svg'
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
export default function Partenaires() {
    return (
        <>
            <div style={{paddingTop: 50}}>
                <div style={{ paddingBottom: 50, textAlign: 'center', color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 2, wordWrap: 'break-word' }}>Nos partenaires</div>

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
