import React, { useEffect, useRef, useState } from "react";
import Base from "../theme/front/base";
import ROUTES from "../config/routes";
import { NotificationManager } from "react-notifications";
import { Link, useLocation } from "react-router-dom";
import PopinModal from "../components/ui-elements/popinModal";
import ButtonDef from "../components/ui-elements/buttonDef";
import { useHistory } from "react-router-dom";
import { FormLogin } from "../assets/styles/componentStyles";
import InscriptionForm from "../components/inscriptionForm";
import Forgotpassword from "../views/back/auth/forgotpassword";
import * as vars from "../vars";
import * as actionTypes from "../store/functions/actionTypes";
import { clearErrors } from "../helper/form";
import { validateEmail, validatePassword } from "../helper/form";
import Input from "../components/ui-elements/input";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { useSelector, useDispatch } from "react-redux";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Container, Row } from "react-bootstrap";

import {
  ContentPageStyle,
  HomeReparateur,
  HomeBlocs,
} from "../assets/styles/frontGlobalStyle";
import { stepButtonClasses } from "@mui/material";


export default function Connexions() {
  const [substitutedUser, setSubUser] = useState([]);
  const [substitutedMode, setSubstituteMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const history = useHistory();
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: "CONNEXION",
      path: ROUTES.CHARTE_COOKIES.url,
    },
  ];

  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [state, setState] = useState({
    email: {
      label: "Email",
      name: "email",
      placeholder: "Email",
      value: "",
      type: "email",
      error: false,
      errorMessage: "",
      autocomplete: "username",
      required: true,
    },
    password: {
      label: "Mot de passe",
      name: "password",
      placeholder: "Mot de passe",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autocomplete: "new-password",
      required: true,
      setType: (e) => {
        const cpState = { ...state };
        cpState.password.type = e;
        setState(cpState);
      },
    },
  });

  const msgErrors = (e) => {
    if (e.notice !== undefined) NotificationManager.error("Erreur", e.notice);
    if (e.msg !== undefined) setMessage(e.msg);
    const cpState = { ...state };
    if (e.email !== undefined) cpState.email.error = e.email;
    if (e.password !== undefined) cpState.password.error = e.password;
    if (e.submit !== undefined) setSubmitting(e.submit);
    setState(cpState);
  };
  const urlSearchParams = new URLSearchParams(useLocation().search);
  const [forgotPasswordRepairman] = useState(
    urlSearchParams.get("forgotPasswordRepairman") ? true : false
  );
  const [modalInscription] = useState(urlSearchParams.get("modal_inscription"));

  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    typeModal: "",
  });

  // console.log(dataModal)
  const [linkInscrir, setLinkInscrir] = useState("reparateur");


  





  const submitLogin = (e) => {
    e.preventDefault();
    if (!submitting) {
      setState(clearErrors(state));

      const email = state.email.value;
      const backEmail = state.email.value;
      const password = state.password.value;
      let msg = "Erreur";
      msgErrors({ email: false, password: false, msg: null, submit: true });

      if (email && password) {
        if (!validateEmail(email)) {
          msg = "Votre email n’est pas correctement renseigné.";
          msgErrors({ email: true, msg, submit: false, notice: msg });
        } else if (!validatePassword(password)) {
          msg =
            "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.";
          msgErrors({ password: true, msg, submit: false, notice: msg });
        } else {


          connector({
            method: "post",
            url: endPoints.LOGIN,
            data: { username: email, password },
            success: (response) => {
              msgErrors({ submit: false });
              dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                token: response.data.token,
                refresh_token: response.data.refresh_token,
              });
              setIsConnected(true);
              setShowModal(false);
            },
            catch: (error) => {
              console.log(error);
              msg = "Vos identifiants sont incorrects";
              if (error.response?.data?.code !== undefined) {
                if (error.response.data.message !== undefined) {
                  msg = error.response.data.message;
                }
              }
              msgErrors({ msg, submit: false });
            },
          });

        }
      } else {
        msgErrors({
          email: !email,
          password: !password,
          msg: "Veuillez renseigner les champs obligatoires",
          submit: false,
        });
      }
    }
  };


  useEffect(() => {
    document.addEventListener("eventHeader", function (event) {
      if (event.detail === "openModalClient") {
        setShowModal(false);
        setDataModal({ typeModal: "client", title: "Espace client" });
      }
    });

    if (forgotPasswordRepairman) {
      setLinkInscrir("forgotPass");
      setShowModal(true);
      setDataModal({
        typeModal: "reparateur",
        title: "Espace réparateur",
      });
    }

    if (
      modalInscription &&
      ["reparateur", "client"].includes(modalInscription)
    ) {
      setLinkInscrir(modalInscription);
      setShowModal(true);
      setDataModal({
        typeModal: modalInscription,
        title:
          modalInscription == "reparateur"
            ? "Espace réparateur"
            : "Espace client",
      });
    }
  }, []);

  useEffect(() => {
    // history.push(ROUTES.REPA_VITRINE.url);
    //alert("Anonymous "+ vars.ROLES.ROLE_REPAIRMAN+ substitutedUser['email'] );
    if (substitutedMode) {
      let roles = [];
      let user = [];
      //console.log("auth ROLE reguLATION", auth);
      //console.log("auth ROLE reguLATION USER", substitutedUser);
      user['email'] = substitutedUser['email'];
     
      roles.push(vars.ROLES.ROLE_REPAIRMAN);

      auth.user = user;
      auth.roles = roles;
      //console.log("auth ROLE Changed", auth);
      history.push(ROUTES.REPA_VITRINE.url);
    }

  }, [substitutedMode]);

  useEffect(() => {

    if (auth.roles.length && isConnected) {
      if (auth.roles.includes(vars.ROLES.ROLE_ADMIN)) {
        history.push(ROUTES.CATEGORIES.url);
      } else if (auth.roles.includes(vars.ROLES.ROLE_REPAIRMAN)) {
        history.push(ROUTES.REPA_VITRINE.url);
      }
      history.push(ROUTES.HOME.url);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.roles, isConnected]);
  return (
    <Base >
      <HomeBlocs style={{ background: '#F6F3F5' }}>

        <Container style={{ height: 800 }}
        >
          <PopinModal
            show={showModal}
            handleClose={() => {
              setShowModal(false);
              setLinkInscrir();
            }}
            title={dataModal.title}
            className={dataModal.typeModal}
          >
            <div className="content-modal">
              {linkInscrir === "reparateur" ? (
                <>
                  <InscriptionForm
                    retour={() => {
                      setLinkInscrir(null);
                      setShowModal(true);
                    }}
                    formType={linkInscrir}
                  />
                  <div className="footer-modal">
                    Déjà sur Fingz?{" "}
                    <Link
                      to={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        setLinkInscrir();
                      }}
                    >
                      Connectez-vous
                    </Link>
                  </div>
                </>
              ) : linkInscrir === "client" ? (
                <>
                  <InscriptionForm
                    retour={() => {
                      setShowModal(true);
                    }}
                    formType={linkInscrir}
                  />
                  <div className="footer-modal">
                    Déjà sur Fingz?{" "}
                    <Link
                      to={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        setLinkInscrir(null);
                      }}
                    >
                      Connectez-vous
                    </Link>
                  </div>
                </>
              ) : linkInscrir === "forgotPass" ? (
                <Forgotpassword
                  retour={(e) => {
                  
                    e.preventDefault();
                    setLinkInscrir();
                  }}
                />
              ) : (
                <>
                  <div className="header-modal">
                    Première fois sur Fingz?{" "}
                    {linkInscrir === "reparateur" ||
                      dataModal.typeModal === "reparateur" ? (
                      <Link
                        to={{ pathname: vars.LINK_EXTERNAL_LandingPage }}
                        target="_blank"
                      >
                        Inscrivez-vous
                      </Link>
                    ) : (
                      <Link
                        to={"#"}
                        onClick={(e) => {
                          e.preventDefault();
                          setLinkInscrir(dataModal.typeModal);
                        }}
                      >
                        Inscrivez-vous
                      </Link>
                    )}
                  </div>
                  <FormLogin onSubmit={submitLogin}>
                    {message ? (
                      <span className="error-form">{message}</span>
                    ) : null}
                    <Input
                      {...state.email}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.email.value = e.target.value;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                    <Input
                      className="password-input"
                      {...state.password}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.password.value = e.target.value;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                    <Link
                      to={"#"}
                      className="pass-oublier"
                      onClick={(e) => {
                        e.preventDefault();
                          setLinkInscrir("forgotPass");
                      }}
                    >
                      Mot de passe oublié ?
                    </Link>
                    <ButtonDef
                      textButton="Connexion"
                      className="btn-form-def"
                      spinner={submitting}
                    />
                  </FormLogin>
                </>
              )}
            </div>
          </PopinModal>

          <div style={{ textAlign: 'center', color: '#465A61', fontSize: 42.91, fontFamily: 'Poppins', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>
            Bienvenue chez Fingz !</div>
          <div style={{ textAlign: 'center', color: '#5E5E5E', fontSize: 20, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>
            Que vous soyez un particulier ou un réparateur, utilisez cet espace pour créer un compte ou vous connecter à votre compte. C’est le premier pas pour utiliser Fingz !</div>
          <Row style={{ alignContent: "center" }}>

            <div style={{ width: "100%", height: "100%" }} >
              <Tabs
                defaultActiveKey="clienttab"
                justify
                variant="pills"

                style={{

                  left: '25%',
                  borderTopLeftRadius: 10, borderTopRightRadius: 10, background: '#F3F3F9',
                  width: '50%', height: 46, top: 483, position: 'absolute', fontWeight: '600',
                  fontSize: 20,
                  aColor: "#000000"

                }}

              >
                <tab eventKey="clienttab" title="Clients"

                  style={{
                    alignContent: "center",
                    left: '25%',
                    paddingLeft: 20, paddingRight: 20,
                    width: '50%',
                    paddingTop: 50, top: 528, paddingBottom: 20,
                    borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                    backgroundColor: '#ffffff',
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    position: 'absolute',
                    fontFamily: 'Poppins', fontWeight: '600',


                  }}
                >
                  Première fois sur Fingz?{" "}
                  <Link
                    to={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setDataModal({ typeModal: "client", title: "Espace client" });
                      setLinkInscrir("client");
                      setShowModal(true);
                    }}
                    style={{ color: "#89B03D" }}
                  >
                    Inscrivez-vous
                  </Link>

                  <FormLogin onSubmit={submitLogin}>
                    {message ? (
                      <span className="error-form">{message}</span>
                    ) : null}
                    <Input
                      {...state.email}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.email.value = e.target.value;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                    <Input
                      className="password-input"
                      {...state.password}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.password.value = e.target.value;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                    <Link
                      to={"#"}
                      className="pass-oublier"
                      onClick={(e) => {
                        //alert(464);
                        setLinkInscrir("forgotPass");
                        setShowModal(true);
                      }}
                    >
                      Mot de passe oublié ?
                    </Link>

                    <ButtonDef
                      style="background: '#89B03D'"
                      textButton="Connexion"
                      className="btn-form-def"
                      spinner={submitting}
                    />

                  </FormLogin>
                </tab>
                <Tab eventKey="reparateur-tab" title="Réparateurs"
                  style={{
                    alignContent: "center",
                    left: '25%',
                    paddingLeft: 20, paddingRight: 20, paddingBottom: 20,
                    width: '50%',
                    paddingTop: 50, top: 528,
                    borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                    backgroundColor: '#ffffff',
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    position: 'absolute',
                    fontFamily: 'Poppins', fontWeight: '600',

                  }}
                >
                  <div className="header-modal">
                    Première fois sur Fingz?{" "}
                    <Link
                      to={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        setDataModal({ typeModal: "reparateur", title: "Espace Réparateur" });
                        setLinkInscrir("reparateur");
                        setShowModal(true);
                      }}
                      style={{ color: "#89B03D" }}
                    >
                      Inscrivez-vous
                    </Link>

                    <FormLogin onSubmit={submitLogin}>
                      {message ? (
                        <span className="error-form">{message}</span>
                      ) : null}

                      <Input
                        {...state.email}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.email.value = e.target.value;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <Input
                        className="password-input"
                        {...state.password}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.password.value = e.target.value;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <Link
                        to={"#"}
                        className="pass-oublier"
                        onClick={(e) => {
                          
                          setLinkInscrir("forgotPass");
                          setShowModal(true);
                        }}
                      >
                        Mot de passe oublié ?
                      </Link>
                      <ButtonDef
                        style="background: '#89B03D'"
                        textButton="Connexion"
                        className="btn-form-def"
                        spinner={submitting}
                      />

                    </FormLogin>
                  </div>

                </Tab>
              </Tabs>
            </div>
          </Row>
        </Container>
      </HomeBlocs >
    </Base>
  );
}