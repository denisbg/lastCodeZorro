import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import {  OverlayTrigger , Tooltip } from "react-bootstrap";
import { GroupInput } from "../assets/styles/adminStyle/adminGlobalStyle";
import { QuestionIcon } from "../assets/styles/icons";
import { scrollTop } from "../helper/functions";
import iconcbcb from '../assets/images/iconcbcb.png'
import iconvisacb from '../assets/images/iconvisacb.png'
import iconamcb from '../assets/images/iconamcb.png'
import iconmccb from '../assets/images/iconmccb.png'
function Checkout({
  checkCardPayment = false,
  command = false,
  setMessage = () => { },
  state,
  setState = () => { },
  savePaiement = () => { },
  setIsPending = () => { },
}) {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (checkCardPayment) {
      if (state.payment.paymentIntent.value) {
        savePaiement(command);
      } else {
        confirmPaymentIntents();
      }
    }
  }, [checkCardPayment]);

  const confirmPaymentIntents = async () => {
    try {
      setIsPending(true);
      const token = await localStorage.getItem("token");

      const confirmPayment = await stripe.confirmCardPayment(
        state.payment.clientSecret.value,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              address: {
                city: command.city,
                country: "FR",
                line1: command.address,
                line2: command.additionalAddress,
                postal_code: command.postalCode,
              },
              name: command.firstName + " " + command.lastName,
              email: jwtDecode(token).username,
            },
            metadata: {
              commandId: command.id,
              commandType: command.type,
              commandTitle: command.title,
              urlBenefit: command.urlBenefit,
            },
          },
        }
      );
      const { paymentIntent, error } = confirmPayment;
      if (paymentIntent?.status === "succeeded") {
        const cpState = { ...state };
        cpState.payment.paymentIntent.value = paymentIntent.id;
        setState(cpState);
        savePaiement(command);
      } else {
        let msg = error?.message ? error.message : "Paiement échoué.";
        msgErrors({ msg });
      }
    } catch (err) {
      console.log(err);
      msgErrors({ msg: "Il y a eu une erreur de paiement" });
    }
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    scrollTop();
    setIsPending(false);
  };

  const checkCardError = (name, event) => {
    const cpState = { ...state };
    cpState.payment[name].error = event.error ? true : false;
    cpState.payment[name].errorMessage = event.error ? event.error.message : "";
    cpState.payment[name].value = event.complete ? true : "";
    if (event.error) {
      msgErrors({ msg: event.error.message });
    } else {
      let msg = null;
      if (cpState.payment.cardNumber.error) {
        msg = cpState.payment.cardNumber.errorMessage;
      } else if (cpState.payment.cardExpiry.error) {
        msg = cpState.payment.cardExpiry.errorMessage;
      } else if (cpState.payment.cardCvc.error) {
        msg = cpState.payment.cardCvc.errorMessage;
      }
      if (msg) {
        msgErrors({ msg });
      } else {
        setMessage(null);
      }
    }
    setState(cpState);
  };

  const cardLabel = (e) => {
    return e.label ? (
      <label>
        {e.label}
        {e.required ? <i>*</i> : null}
      </label>
    ) : (
      ""
    );
  };

  const cardClassName = (e) => {
    return e.error ? `form-error ${e.className}` : `${e.className}`;
  };

  return (
    <div className="payment-bloc" style={{ width: "100%" }}>
      <GroupInput className={cardClassName(state.payment.cardNumber)}>

<Container>

<Row>
<div  >
 &nbsp; &nbsp;
  </div>
<div style={{
    height:30,
    alignSelf:'center',
            paddingLeft: 3, paddingRight: 3, flexShrink: 0, borderRadius: '5px', background: '#FFF',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)'
          }}>
  <img src={iconcbcb} ></img>
  </div>
  <div style={{
    height:30,
    alignSelf:'center',
            paddingLeft: 3, paddingRight: 3, flexShrink: 0, borderRadius: '5px', background: '#FFF',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)'
          }}>
  <img src={iconvisacb} ></img>
  </div>
  <div style={{
    height:30,
    alignSelf:'center',
            paddingLeft: 3, paddingRight: 3, flexShrink: 0, borderRadius: '5px', background: '#FFF',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)'
          }}>
  <img src={iconmccb} />
  </div>
  <div style={{
    height:30,
    alignSelf:'center',
            paddingLeft: 3, paddingRight: 3, flexShrink: 0, borderRadius: '5px', background: '#FFF',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)'
          }}>
  <img src={iconamcb} />
  </div>
</Row>
 
</Container>
{cardLabel(state.payment.cardNumber)}
        <CardNumberElement
          className={`${state.payment.cardNumber.classInput} form-control`}
          onChange={(event) => {
            checkCardError("cardNumber", event);
          }}>

        </CardNumberElement>

      </GroupInput>

      <div className="experation-bloc">
        <GroupInput className={cardClassName(state.payment.cardExpiry)}>
          {cardLabel(state.payment.cardExpiry)}
          <CardExpiryElement
            className={`${state.payment.cardExpiry.classInput} form-control`}
            onChange={(event) => {
              checkCardError("cardExpiry", event);
            }}
          />
        </GroupInput>

        <div className="bloc-cvc-cart">
          <OverlayTrigger
            placement={"bottom"}
            overlay={
              <Tooltip>
                Numéro de vérification au dos de votre carte bancaire à 3 ou 4
                chiffres
              </Tooltip>
            }
          >
            <p className="info-cvc">
              <QuestionIcon />
            </p>
          </OverlayTrigger>

          <GroupInput className={cardClassName(state.payment.cardCvc)}>
            {cardLabel(state.payment.cardCvc)}
            <CardCvcElement
              className={`${state.payment.cardCvc.classInput} form-control`}
              onChange={(event) => {
                checkCardError("cardCvc", event);
              }}
            />
          </GroupInput>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
