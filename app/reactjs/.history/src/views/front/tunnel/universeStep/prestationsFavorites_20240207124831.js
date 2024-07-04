import { Col, Container, Row } from "react-bootstrap";
import imgbonusreparation from '../../../../assets/images/bonusreparation.png';
export default function PrestationsFavorites() {
    return (
        <Container>

            <Row>
                <Col >
                    <img alt="Lançé en Novembre 2023, ce bonus vous permet de bénéficier de réductions sur la réparation de vos chaussures et vêtements auprès des réparateurs labellisés Refashion. Cette réduction s’applique directement au moment du paiement. Pour plus d’informations sur les prestations éligibles, veuillez cliquer  ici.
                                                           Réparer c’est faire durer et c’est bon pour votre porte-monnaie !" src={imgbonusreparation} />
                </Col>
            </Row> </Container >
    )
};
