import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useMediaQuery } from "react-responsive";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import imgMaintenence from "../../assets/images/img-page-maintenace.svg";
import ArtisanNavListePrestations from "../../components/front/artisanNavListePrestations";
import { ListFichePrestation } from "../../assets/styles/frontGlobalStyle";
import BonusReparation from "./ficheUniversParts/bonusreparation";
import ListePrestationFiche from "../../components/front/listePrestationFiche";
import { ButtonDef } from "../../components/ui";
import RadioButton from "../../components/ui-elements/radioButton";
import {
  BackStyle,
  PropositionStyle,
  ContentFichePrestation,
} from "../../assets/styles/frontGlobalStyle";
import {
  BlocFilterStyle,
  ContentPageStyle,
} from "../../assets/styles/frontGlobalStyle";
import { SearchIcon } from "../../assets/styles/icons";
import SelectCat from "../../components/categories/selectCat";
import FoundPage from "../../components/foundPage";
import BannerRepairMan from "../../components/front/bannerRepairMan";
import BannerYourCommand from "../../components/front/bannerYourCommand";
import RatingBox from "../../components/ui-elements/ratingBox";
import * as vars from "../../vars";
import { Col, Row } from "react-bootstrap";
import Loader from "../../components/loader";
import Breadcrumb from "../../components/ui-elements/breadcrumb";
import InputAutoComplete from "../../components/ui-elements/inputAutoComplete";
import InputSearchKeyword from "../../components/ui-elements/inputSearchKeyword";
import Select from "../../components/ui-elements/select";
import endPoints from "../../config/endPoints";
import ROUTES from "../../config/routes";
import connector from "../../connector";
import { clearErrors } from "../../helper/form";
import Base from "../../theme/front/base";
import FicheUnivers from "./ficheUnivers";
import ArtisanPrestationItemBonus from "../../components/front/artisanPrestationItemBonus";







import Carousel, { Modal, ModalGateway } from "react-images";

import {
  getMsgError,
  getPathImage,
  getUniqueListBy,
  parentCategories,
  sortObjects,
} from "../../helper/functions";
import {
  AdresseIcon,
  BackIcon,
  FacebookColorIcon,
  InstagramColorIcon,
  LinkedinColorIcon,
  TwitterColorIcon,
  WebIcon,
  YoutubeColorIcon,
} from "../../assets/styles/icons";

import GalerieSlide from "../../components/galerieSlide";
import { max } from "moment";





export default function ArtisanListePrestations() {
  const [stateImage, setStateImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const auth = useSelector((store) => store.auth);
  const [dataGallery, setDataGallery] = useState([]);
  const isDisplayFilter = true;
  const [isDisplayListeProduits, setDisplayListeProduits] = useState(true);
  const [xserviceIsSelected, setXServiceIsSelected] = useState(true);
  const [isDisplayPrestationsArtisan, setDisplayPrestationsArtisan] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 593px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const openLightbox = (photo, index) => {
    setCurrentImage(index);
    setStateImage(true);
  };

  const [toggleFilter, setToggleFilter] = useState(false);
  const history = useHistory();
  const [defaultKeywordId] = useState(localStorage.getItem("keywordId"));
  const [defaultKeywordBy] = useState(localStorage.getItem("keywordBy"));
  const [defaultKeywordVal] = useState(localStorage.getItem("keywordVal"));
  const [defaultCategory, setDefaultCategory] = useState(
    parseInt(localStorage.getItem("defaultCategory"))
  );
  const [defaultSubCategory, setDefaultSubCategory] = useState(
    JSON.parse(localStorage.getItem("defaultSubCategory") || null)
  );
  const [defaultCodePostal] = useState(localStorage.getItem("codePostal"));
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );

  const perPageDesMob = isDesktopOrLaptop ? 20 : 8;
  const { slugIdUniverse, slugIdService, slugIdBenefit } = useParams();
  const { slugIdRepairman } = useParams();
  const [fromServiceClick, setServiceClicked] = useState([]);
  const [currentBenefit, setCurrentBenefit] = useState(false);

  const [fromServiceClickCompleteData, setCompletDataClicked] = useState([]);

  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isAlreadySet, setIsAlreadySet] = useState(false);

  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [checkAuto, setCheckAuto] = useState(false);
  const [repairmanIsPending, setRepairmanIsPending] = useState(false);
  const [repairMan, setRepairMan] = useState([]);
  const [repairManBenefits, setRepairManBenefits] = useState([]);
  const [universe, setUniverse] = useState([]);
  const [benefit, setBenefit] = useState(false);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [xServices, setXServices] = useState([]);
  const [xPrestations, setXPrestations] = useState([]);
  const [deliveryModeTypes, setDeliveryModeTypes] = useState([]);
  const [universRepairman, setUniversRepairman] = useState([]);
  const [currentRepairmanId, setCurrentRepairmanId] = useState(0);

  const closeLightbox = () => {
    setStateImage(false);
  };

  const [state, setState] = useState({
    deliveryModes: {
      label: "Modes de délivrance",
      placeholder: "Modes de délivrance",
      id: "delivrance_radio",
      options: [],
      value: "",
      name: "deliveryModes",
      typeService: null,
    },
  });
  const getDeliveryModeTypes = () => {
    connector({
      method: "get",
      url: endPoints.DELIVERY_MODE_TYPES,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        console.log("ALP 0.99x delivery", arrayObj);
        let options = [];
        for (let i = 0; i < arrayObj.length; i++) {
          options.push({ value: arrayObj[i].id, label: arrayObj[i].name });
        }
        setDeliveryModeTypes(options);

      },
      catch: (error) => {
        // console.log(error);
      },
    });
  };
  const [currentImage, setCurrentImage] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const universeSelector = useSelector((state) => state.universe);
  const [filter, setFilter] = useState({
    universe: {
      label: "Univers",
      placeholder: "Choisir dans la liste",
      options: [{ label: "Tous les univers", value: "", category: [] }],
      value: "",
      category: [],
      nameCategory: "",
      nameSubCategory: "",
      requireSearchSubCategory: false,
      isSearchable: true,
      error: false,
      infoBull: false,
      textInfoBulle:
        "Veuillez sélectionner un univers dans la liste pour lancer une recherche",
    },
    deliveryModeTypes: {
      label: "Mode de délivrance",
      name: "deliveryModeTypes",
      placeholder: "Tous",
      options: [],
      value: [],
      hideOptions: true,
    },
    category: {
      label: "Catégorie(s)",
      placeholder: "Choisir dans la liste",
      options: [],
      value: null,
      error: false,
      infoBull: false,
      textInfoBulle:
        "Veuillez sélectionner une catégorie dans la liste pour lancer une recherche",
    },
    subCategory: {
      label: "Sous-catégorie(s)",
      placeholder: "Affiner votre recherche",
      options: [],
      value: null,
      hideOptions: true,
      error: false,
      infoBull: false,
      textInfoBulle:
        "Veuillez sélectionner une sous-catégorie dans la liste pour lancer une recherche",
    },
    keyword: {
      label: "Réparer quoi",
      type: "text",
      name: "keyword",
      placeholder: "Rentrer un mot clé",
      value: defaultKeywordVal ? defaultKeywordVal : "",
      options: [],
      active:
        defaultKeywordBy && defaultKeywordId
          ? { id: defaultKeywordId, by: defaultKeywordBy }
          : {},
      error: false,
      required: false,
    },
  });
  const [filterMap, setFilterMap] = useState({
    codePostal: {
      name: "codePostal",
      type: "text",
      label: "Où",
      placeholder: "Saisir un code postal",
      value:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultCodePostal
          : "",
      latitude:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultLatitude
          : null,
      longitude:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultLongitude
          : null,
      error: false,
      required: true,
      infoBulle: false,
    },
  });

  useEffect(() => {
    if (toggleFilter) {
      document.body.classList.add("menu-is-show");
    } else {
      document.body.classList.remove("menu-is-show");
    }
  }, [toggleFilter]);

  useEffect(() => {
    console.log("DB1 01:01 Universelector use effect");
    if (universeSelector.allUniverses) {
      console.log("DB1 01:02 Universelector if universeSelector.allUniverses is true ");
      let cpFilter = { ...filter };
      cpFilter.universe.options = [];
      for (let i = 0; i < universeSelector.allUniverses.length; i++) {
        let o = universeSelector.allUniverses[i];
        cpFilter.universe.options.push({
          label: o.name,
          value: o.id,
          slug: o.slug,
        });
      }
      cpFilter.universe.value = parseInt(slugIdUniverse.split("-").pop());
      setFilter(cpFilter);
      console.log("DB1 01:03 Universelector ", cpFilter);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universeSelector, slugIdUniverse]);




  useEffect(() => {
    console.log("DB1 02:01  use effect slugiduniverse");
    if (localStorage.getItem("codePostal")) {
      console.log("DB1 02:02A   if (localStorage.getItem(codePostal) getuniverse()");
      getUniverse();
    } else {
      console.log("DB1 02:02B  getuniverse()");
      localStorage.setItem("errorcCodePostal", "codePostal non define");
      history.push(ROUTES.HOME.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugIdUniverse]);

  useEffect(() => {
    console.log("DB1 04:01  use effect []");
    document.addEventListener("Universe", function (event) {
      if (event?.detail?.url && event?.detail?.id) {
        const cpFilter = { ...filter };
        cpFilter.keyword.value = "";
        cpFilter.keyword.active = { id: "", by: "", index: 0 };
        cpFilter.keyword.options = [];
        localStorage.setItem("keywordVal", "");
        localStorage.setItem("keywordBy", "");
        localStorage.setItem("keywordId", "");
        localStorage.setItem("defaultCategory", "");
        localStorage.setItem("defaultSubCategory", "");
        setDefaultCategory(null);
        setDefaultSubCategory(null);
        setFilter(cpFilter);

      } else {
        console.log("error event params.");
      }
    });

    let serviceId = slugIdService?.split('-').pop();
    let repairmanId = slugIdRepairman?.split('-').pop();
    console.log("DB1 04:02  use effect [] ServiceId RepairmanId", serviceId, repairmanId);
    if (typeof serviceId == 'undefined') {
      setXServiceIsSelected(false);

    }
    else {
      console.log("DB1 04:02 use effect [] typeof serviceId !== 'undefined'", serviceId, repairmanId);

      if (!isAlreadySet) {
        console.log("DB1 04:02 use effect [] !isAlreadySet'", serviceId, repairmanId);
        setRepairmanIsPending(true);
        console.log("DB1 04:02 use effect [] !isAlreadySet  getUserRepairmanBenefits(repairmanId)'");
        getUserRepairmanBenefits(repairmanId);
        setIsAlreadySet(true);

      }
    }
  }, []);



  useEffect(() => {
    console.log("DB1 07:01 use effect universe  [isPendingLatLng, pageIndex, perPage]", universe, isPendingLatLng, pageIndex, perPage);
    if (universe && !isPendingLatLng) {
      console.log("DB1 07:02 use effect universe  Getservice",universe);
      getServices(true, null);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingLatLng, pageIndex, perPage]);





  useEffect(() => {
   
    const repairmanId = parseInt(slugIdRepairman.split("-").pop());
    console.log("DB1 08:01 useEffect Affiche le repairman",currentRepairmanId );
    if (currentRepairmanId !== repairmanId) {
      // affiche la banner du repairman
      console.log("DB1 08:01A getrpairman (currentRepairmanId !== repairmanId)",currentRepairmanId,repairmanId );
      getRepairMan(repairmanId);
      setCurrentRepairmanId(repairmanId);
    }
    console.log("DB1 08:02 useEffect []Affiche le slugIdService",slugIdService );
     
/*  DANS ASLP 
    if (slugIdService) {
      const serviceId = parseInt(slugIdService.split("-").pop());
      //console.log("ALP 1:022 Service Id", serviceId);
      // Traiter les données du composant enfant
      const data = [];
      data['benefit_to_display'] = serviceId;
      //setServiceClicked(data);
    }
    */
  }, []);


  useEffect(() => {
    console.log("DB1 05:01 use effect  [repairmanIsPending]", repairmanIsPending);

    if (repairmanIsPending) {
      console.log("DB1 05:02 use effect  [repairmanIsPending]", "Just wait");
      //console.log("Just wait");
    }
    else {
      console.log("DB1 05:02 use effect  [repairmanIsPending]", "IS NOT PENDING");
      let serviceId = slugIdService?.split('-').pop();
      console.log("DB1 05:02 use effect  [repairmanIsPending] service ID", serviceId);
      let zfound = false;
      console.log("DB1 05:03 use effect  [repairmanIsPending]repairManBenefits", repairManBenefits);

      // commenter cat dans Artisanserviceslisteprestation.js
      /*
            Object.entries(repairManBenefits).forEach(entry => {
              const [key, benefit] = entry;
              //console.log("looking detail SEARCH and FOUND benefit servuce", benefit?.service?.id,"===", serviceId);
              if ((benefit?.service?.id == serviceId) && (!zfound)) {
                zfound = true;
      
                //console.log("looking detail FOUND service", benefit?.service, key, serviceId);
                getBenefit(benefit.id);
                let data = [];
                data['id'] = serviceId;
                data['slug'] = "service";
                data['benefit_to_display'] = benefit.id;
                setServiceClicked(data);
                //let xSlugIdService = fromServiceClick['slug'] + "-" + fromServiceClick['id'];
                //let xSlugIdBenefit = 'prestations-' + fromServiceClick['benefit_to_display'];
              }
            });
      */
      setRepairmanIsPending(false);

    }

  }, [repairmanIsPending]);



  /* Entete du réparateur */

  const getUserRepairmanBenefits = (id) => {
    console.log("DB1 04:06 use effect [] !isAlreadySet  getUserRepairmanBenefits(id)'", id);
    connector({
      method: "get",
      url: `${endPoints.ANONYMOUS_USER_REPAIRMAN}/${id}/benefits`,
      success: (response) => {
        const arrayObj = response.data["benefits"] || [];
        console.log("DB1 04:07SUCCESS getUserRepairmanBenefits(id) ARRAY OBJ'", arrayObj);
        setRepairManBenefits(arrayObj);
        setRepairmanIsPending(false);
      },
      catch: (error) => {
        setRepairmanIsPending(false);
        console.log("ALP STEP 0.99 Error.. ", error);

      },
    });
  };

  const getRepairMan = (repairmanId) => {
    setRepairmanIsPending(true);
    console.log("DB1 09:01 getRepairMan setRepairmanIsPending",true );
    connector({
      method: "get",
      url: `${endPoints.USERS_REPAIRMAN_PUBLIC}?order[enterprise]=asc&id=` + repairmanId,
      data: {},
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        console.log("DB1 09:02 SUCESS getRepairMan arrayObj",arrayObj );
        setRepairMan(arrayObj);
        if (arrayObj[0].achievements && arrayObj[0].achievements.length) {
          let dataGallery = [];
          for (let i = 0; i < arrayObj[0].achievements.length; i++) {
            dataGallery.push({
              source: getPathImage(arrayObj[0].achievements[i]),
            });
          }
          setDataGallery(dataGallery);
        }
        console.log("DB1 09:02 getUserRepairmanBenefits repairmanId",repairmanId );
        getUserRepairmanBenefits(repairmanId);
        console.log("DB1 09:03 getUserRepairmanBenefitsUniverses repairmanId",repairmanId );
        getUserRepairmanBenefitsUniverses(repairmanId);
        

      },

      catch: (error) => {
        setRepairmanIsPending(false);
        console.log(error);
      },
    });
  };


  // Detail de la prestation
  const getBenefit = (id) => {
    //const id = slugIdBenefit.split("-").pop();
    if (id) {
      setIsPending(true);
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_BENEFIT}/${id}/details?${defaultLatitude && defaultLongitude
          ? `latitude=${defaultLatitude}&longitude=${defaultLongitude}`
          : ""
          }`,
        success: (response) => {

          const obj = response.data || {};
          setBenefit(response.data || {});
          //console.log("ALP STEP 0.3  getBenefit", response.data);
          if (obj?.user?.achievements && obj.user.achievements.length) {
            let dataGallery = [];
            for (let i = 0; i < obj.user.achievements.length; i++) {
              dataGallery.push({
                source: getPathImage(obj.user.achievements[i]),
              });
            }
            setDataGallery(dataGallery);
          }
          if (obj?.deliveryModes && obj.deliveryModes.length) {
            let cpState = { ...state };
            let options = [];
            for (let i = 0; i < obj.deliveryModes.length; i++) {
              const row = obj.deliveryModes[i];
              options.push({
                value: row.id,
                checked: false,
                label: row?.deliveryModeType?.name,
                row: obj.typeService === "forfait" ? row : false,
                id: `delivrance_checkbox_${row.id}`,
              });
            }
            cpState.deliveryModes.options = options;
            cpState.deliveryModes.typeService = obj.typeService;
            if (options.length == 1) {
              cpState.deliveryModes.value = options[0].value;
            }
            setState(cpState);
          }
          if (obj?.user?.id) {
            getUserRepairmanBenefits(obj.user.id);
          } else {
            setIsPending(false);
          }
        },
        catch: (error) => {
          setIsPending(false);
          NotificationManager.error(getMsgError(error), "");
        },
      });
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };



  const getUserRepairmanBenefitsUniverses = (id) => {
    console.log("DB1 10:03 getUserRepairmanBenefitsUniverses repairmanId",id );
    connector({
      method: "get",
      url: `${endPoints.ANONYMOUS_USER_REPAIRMAN}/${id}/benefits`,
      success: (response) => {
        if (response.data?.benefits) {
          let subCategories = [];
          console.log("DB1 10:03SUCCESS getUserRepairmanBenefitsUniverses  response.data.benefits", response.data.benefits );
          response.data.benefits.map((benefit) => {
            if (benefit?.service?.categories) {
              subCategories = [...subCategories, ...benefit.service.categories];
            }
          });
          const cpCategories = parentCategories(subCategories);
          setCategories(cpCategories);
          if (cpCategories.length > 0) {
            let cpUniversRepairman = [];
            cpCategories.map((cat) => {
              if (cat?.universe) {
                cpUniversRepairman.push({
                  id: cat.universe.id,
                  name: cat.universe.name,
                  slug: cat.universe.slug,
                  position: cat.universe.position,
                });
              }
            });
            setUniversRepairman(
              sortObjects(
                getUniqueListBy(cpUniversRepairman, "id"),
                "position",
                "asc"
              )
            );
          }
          
          console.log("DB1 10:04SUCCESS getUserRepairmanBenefitsUniverses  universRepairman", universRepairman );
        }
        setIsPending(false);
      },
      catch: (error) => {
        setIsPending(false);
        NotificationManager.error(getMsgError(error), "");
      },
    });
  };



  const checkClient = () => {

    if (!state.deliveryModes.value) {
      NotificationManager.error("Veuillez choisir un mode de délivrance.", "");
      return;
    }
    if (auth?.user && auth?.roles) {
      if (auth.roles.includes(vars.ROLES.ROLE_CLIENT)) {
        let xSlugIdService = fromServiceClick['slug'] + "-" + fromServiceClick['id'];
        let xSlugIdBenefit = 'prestations-' + fromServiceClick['benefit_to_display'];
        history.push(
          `/univers/${slugIdUniverse}/${xSlugIdService}/${xSlugIdBenefit}/demande/${state.deliveryModes.value}`
        );
      } else if (auth.roles.includes(vars.ROLES.ROLE_REPAIRMAN)) {
        NotificationManager.error(
          "Veuillez créer un compte client, vous ne pouvez pas passer une commande en tant que réparateur",
          ""
        );
      } else if (auth.roles.includes(vars.ROLES.ROLE_ADMIN)) {
        NotificationManager.error(
          "Veuillez créer un compte client, vous ne pouvez pas passer une commande en tant que admin",
          ""
        );
      }
    } else {
      setCheckAuto(true);
      document.dispatchEvent(
        new CustomEvent("eventHeader", { detail: "openModalClient" })
      );
    }
  };





  const getServices = (refresh = true, index = null) => {
    index = index != null ? index : pageIndex;
    setPageIndex(index);
    console.log("DB1 11:01  getServices index",index );
    // if (!placeIsSelected) { msgErrors({ codePostal: true, }); return; }

    if (!isPending || refresh) {
      console.log("DB1 11:02 getServices (!isPending || refresh",!isPending , refresh );
      setIsPending(true);
      setFilter(clearErrors(filter));
      setFilterMap(clearErrors(filterMap));

      if (refresh || (filterMap.codePostal.latitude && filterMap.codePostal.value)) {
        let condition = "";
        if (filter.category.value) {
          condition += `&categories.parent.id=${filter.category.value}`;
        }
        if (filter.subCategory.value && filter.subCategory.value.length) {
          for (let i = 0; i < filter.subCategory.value.length; i++) {
            condition += `&categories.id[]=${filter.subCategory.value[i].value}`;
          }
        }
        if (filterMap.codePostal.latitude && filterMap.codePostal.longitude) {
          condition += `&latitude=${filterMap.codePostal.latitude}&longitude=${filterMap.codePostal.longitude}`;
        }
        console.log("DB1 11:03 Conditions (", condition );
    
        const parent_univ_id = slugIdUniverse.split("-").pop();
        //perPage=100000;
        const cpParamsUrlService = `page=${parseInt(index) + 1}&itemsPerPage=5000&categories.parent.universe.id=${parent_univ_id}${condition}`;
        console.log("DB1 11:04 cpParamsUrlService (", cpParamsUrlService );
        const repairmanId = parseInt(slugIdRepairman.split("-").pop());
        let repairman = [];
        let repairmanBenefit = [];

        if (refresh || cpParamsUrlService !== paramsUrlService) {

          console.log("DB1 11:05 WEB SERVICES ", `${endPoints.ANONYMOUS_USER_REPAIRMAN}/${repairmanId}/benefits` );
          connector({
            method: "get",
            url: `${endPoints.ANONYMOUS_USER_REPAIRMAN}/${repairmanId}/benefits`,
            success: (response) => {
              repairmanBenefit = response.data["benefits"] || [];
              let xxi=0;
              Object.entries(repairmanBenefit).forEach(entry => {
                const [key, service] = entry;
                xxi++;
                console.log("DB1 10:99 service ",xxi,service);
              });
              console.log("DB1 11:05SUCCESS WEB SERVICES ", `${endPoints.ANONYMOUS_USER_REPAIRMAN}/${repairmanId}/benefits` );
              console.log("DB1 11:06SUCCESS WEB SERVICES DATA  ", response.data["benefits"] );

            },
            catch: (error) => {
              console.log("ALP STEP 1.02 Error.. ", error);

            },
          });
          console.log("DB1 11:07setParamsUrlService  ", cpParamsUrlService );
          setParamsUrlService(cpParamsUrlService);
          console.log("DB1 12:01  `${endPoints.ANONYMOUS_SERVICES_CATALOG}?${cpParamsUrlService}` " );
          connector({
            method: "get",
            url: `${endPoints.ANONYMOUS_SERVICES_CATALOG}?${cpParamsUrlService}`,
            success: (response) => {
              let xServices = [];
              let xPrestations = [];
              console.log("DB1 12:08SUCCESS   ", response.data["hydra:member"] );
              //setServices(response.data["hydra:member"] || []);
              setTotalServices(response.data["hydra:totalItems"] || 0);
              console.log("DB1 12:08SUCCESS extraction de ceux pour lequels une prestation de la artisan existe  ");
              let xi = 0;
              // Lecture des services et extraction de ceux pour lequels une prestation
              // de l'artisan existe OK
              let countSrv=0;
              Object.entries(response.data["hydra:member"]).forEach(entry => {
                //service 130 Talons escarpins
                const [key, service] = entry;
                countSrv++;
                console.log("DB1 12:10  parcours de la table service  ",service, countSrv); 
                // le but est de voir si l'artisan est dans la table benefit(propose ses prestations pour ce service)
                Object.entries(service).forEach(entry => {
                  const [key, prestations] = entry;
                  console.log("DB1 12:11BUGG?");
               
                  
                  if (key === 'benefits') {
                    console.log("DB1 12:11 parcours de la table prestations ",prestations);
                    Object.entries(prestations).forEach(entry => {
                      const [key, prestation] = entry;
                      console.log("DB1 12:12 traitement de la prestation ",prestation);
                      // console.log('ALP STEP 1.151.2 STEP la prestation', key, prestation);
                      //console.log('ALP STEP 1.151.3 looking for prestation repairman in his benefit id', prestation["id"]);
                      console.log("DB1 12:121 traitement de la prestation looking for prestation repairmanBenefit", prestation, repairmanBenefit );
                      Object.entries(repairmanBenefit).forEach(entry => {
                        const [key, value] = entry;
                       if (value['id'] === prestation['id']) {
                        console.log("DB1 12:122----------", xi,"trouvé",value);
                          // console.log("ALP STEP 1.151.8B looking for service benefits", prestation['id']);
                          // console.log("ALP STEP 1.151.8B +++++++++++++++++++++++++++++++++++++++++++++++++++++++++", value['id']);
                          // trouver le complement d'informations sur la prestations non trouvé par ailleurs
                          //
                          //value = prestation;
                          //console.log('ALP STEP 1.151.8 id repairman is found ***Benefit detail',benefit);
                          service['benefit_to_display'] = value['id'];
                          //setBenefit(value['id']); COORECTION BUG AFFICHAGE
                          console.log("DB1 12:122", "PUSH",service);
                          console.log("DB1 12:122", "-------");
                          xServices.push(service);
                          xPrestations.push(value);
                          xi++;
                          //getBenefit(value['id']); COORECTION BUG AFFICHAGE
                        // 2024 return false;
                        }

                      });
 

                    });
                  }
                });


              });
              //console.log("ALP STEP 1.151.9 Services a affiché", xServices, xServices.length);
              console.log("DB1 12:12  liste des xPrestations ",xPrestations);
              console.log("DB1 12:13  liste des xServices ",xServices);
              console.log("DB1 12:13  total xServices ",xi);
            setXServices(xServices);
              setXPrestations(xPrestations);
              setCompletDataClicked(xPrestations);

              setTotalServices(xi);

              setIsPending(false);
            },
            catch: (error) => {
              console.log(error);
              setIsPending(false);
            },
          });
        } else {
          setIsPending(false);
        }
      } else {
        msgErrors({
          codePostal: !(filterMap.codePostal.latitude && filterMap.codePostal.value),
        });
        setIsPending(false);
      }
    }
  };



  const getUniverse = () => {
    const id = slugIdUniverse.split("-").pop();
    console.log("DB1 03:01  getuniverse, Id", id);
    if (id) {
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_UNIVERSE}${id}/categories`,
        success: (response) => {

          const arrayObj = response.data || { categories: [] };
          console.log("DB1 03:01SUCCESS  getuniverse, Id array obj", arrayObj);
          setUniverse(arrayObj);

          let cpFilter = { ...filter };
          cpFilter.category.options = [];

          cpFilter.category.value = null;
          cpFilter.subCategory.value = null;
          cpFilter.subCategory.options = [];

          if (response.data?.nameCategory) {
            cpFilter.category.label = response.data.nameCategory;
          }

          if (response.data?.nameSubCategory) {
            cpFilter.subCategory.label = response.data.nameSubCategory;
          }

          if (response.data?.requireSearchSubCategory != undefined) {
            cpFilter.universe.requireSearchSubCategory =
              response.data.requireSearchSubCategory;
          }

          for (let i = 0; i < arrayObj.categories.length; i++) {
            let o = arrayObj.categories[i];

            if (o.id == defaultCategory) {
              cpFilter.category.value = defaultCategory;
              cpFilter.subCategory.value = defaultSubCategory;
              for (let j = 0; j < o.children.length; j++) {
                cpFilter.subCategory.options.push({
                  label: o.children[j].name,
                  value: o.children[j].id,
                });
              }
            }
            cpFilter.category.options.push({ label: o.name, value: o.id });
          }
          setFilter(cpFilter);
          console.log("DB1 03:01SUCCESS  getuniverse, setFilter(cpFilter);", cpFilter);
        },
        catch: (error) => {
          console.log(error);
          if (error.response?.data?.code !== undefined) {
            if (error.response.data.code === 401) {
              NotificationManager.error("Univers introuvable.", "");
            } else if (error.response.data.message !== undefined) {
              NotificationManager.error(error.response.data.message, "");
            }
          }
          console.log("DB1 03:02ERROR   getuniverse,  setUniverse(null)", error);
          setUniverse(null);
        },
      });
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };

  const refreshSubCategory = (cpFilter, cpCategories) => {
    const index = cpCategories.findIndex(
      (cat) => cat.id === cpFilter.category.value
    );
    cpFilter.subCategory.options = [];
    let subCat = [];
    if (index > -1) {
      subCat = cpCategories[index].children;
    } else {
      const allSubCategory = [];
      for (let i = 0; i < cpCategories.length; i++) {
        allSubCategory.push(...cpCategories[i].children);
      }
      subCat = allSubCategory;
    }
    for (let i = 0; i < subCat.length; i++) {
      cpFilter.subCategory.options.push({
        label: subCat[i].name,
        value: subCat[i].id,
      });
    }
    if (cpFilter.category.value) cpFilter.subCategory.value = [];
    return cpFilter;
  };

  const msgErrors = (e) => {
    const cpFilter = { ...filter };
    if (e.universe !== undefined) {
      cpFilter.universe.error = e.universe;
      cpFilter.universe.infoBull = e.universe;
    }
    if (e.category !== undefined) {
      cpFilter.category.error = e.category;
      cpFilter.category.infoBull = e.category;
    }
    if (e.subCategory !== undefined) {
      cpFilter.subCategory.error = e.subCategory;
      cpFilter.subCategory.infoBull = e.subCategory;
    }

    if (e.notice !== undefined) NotificationManager.error(e.notice, "");
    setFilter(cpFilter);

    const cpFilterMap = { ...filterMap };
    if (e.codePostal !== undefined) {
      cpFilterMap.codePostal.error = e.codePostal;
      cpFilterMap.codePostal.infoBulle = e.codePostal;
    }
    setFilterMap(cpFilterMap);
  };

  if (universe === false) {
    return <Loader />;
  }

  const handleParentEvent = (data, completeData) => {
    // Traiter les données du composant enfant
    setServiceClicked(data);
    if (currentBenefit === data['benefit_to_display']) {
      console.log("ALPS 1.01 a refactorer", completeData);
      console.log("ALPS 1.01 a envoyer  a la banner artisan  data", data);
    }
    else {
      setCurrentBenefit(data['benefit_to_display']);
      getServices(true, 0);
      getBenefit(data['benefit_to_display']);


    }

    setXServiceIsSelected(true);
    // anchor

    var element_to_scroll_to = document.getElementById('votre_commande');
    if (element_to_scroll_to) element_to_scroll_to.scrollIntoView();
  }
  const getDatafromServiceClick = () => {
    let data = fromServiceClick;
    return (data);

  }
  const getCompleteDatafromServiceClick = () => {
    let otherData = fromServiceClickCompleteData;
    return (otherData);

  }



  let dataFromServiceClick = getDatafromServiceClick();
  let dataComplement = getCompleteDatafromServiceClick();
  let labelservice = dataFromServiceClick['name'];


  let descriptionService = dataFromServiceClick['description'];
  let sneakers = dataFromServiceClick['name'];
  let maxPrice = dataFromServiceClick['maxPrice'];
  let minPrice = dataFromServiceClick['minPrice'];
  let benefit_to_display = dataFromServiceClick['benefit_to_display'];
  let picture = dataFromServiceClick['picture'];
  let modePriseEnCharge = "Aucune infos";
  let typeService = "non spécifié";
  let priceQuote = "0";

  // alimentation des datas avec le complement
  Object.entries(dataComplement).forEach(entry => {
    const [key, value] = entry;
    //console.log("BYC 1.00 Props", entry['1']['typeService']);
    //console.log("BYC 1.00 Props", entry['1']['precisionQuote']);
    //console.log("BYC 1.00 Props", entry['1']['id']);
    if (entry['1']['id'] === dataFromServiceClick['id']) {
      modePriseEnCharge = entry['1']['precisionQuote'];
      typeService = entry['1']['typeService'];
      priceQuote = entry['1']['priceQuote'];


      return false;

    }

  });

  return (
    <Base>
      {universe ? (

        <>
          <ContentPageStyle>
            <Container>
              <BannerRepairMan
                universe={universe}
                repairMan={repairMan}
                toggleFilter={toggleFilter}
                setToggleFilter={setToggleFilter}
              />
              {dataGallery.length ? (
                <Row style={{
                  marginLeft: 0, marginTop: 30, marginBottom: 20,
                  overFlow: 'clip',
                  textOverflow: 'ellipsis',
                  paddingBottom: 30, marginBottom: 30, width: '100%', height: '100%', background: 'white', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.10)'
                }}>

                  <Col lg={8}>
                    <ContentFichePrestation style={{
                      marginLeft: 0, marginTop: 30, marginBottom: 20
                    }}>


                      <div className="bloc-realisation" style={{ width: '150%' }}>
                        <h2 className="titre-bloc-prestation">Réalisations :</h2>
                        <GalerieSlide
                          children={dataGallery}
                          onClick={openLightbox}
                        />
                        <ModalGateway>
                          {stateImage ? (
                            <Modal onClose={closeLightbox}>
                              <Carousel
                                currentIndex={currentImage}
                                views={dataGallery}
                              />
                            </Modal>
                          ) : null}
                        </ModalGateway>
                      </div>
                    </ContentFichePrestation>
                  </Col>

                </Row>
              ) : (
                <></>
              )}





              <Container>
                <Row>

                  <Col>
                    {!xserviceIsSelected && (

                      <div style={{ width: '100%', height: '100%', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, background: 'white', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.10)', borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 13, display: 'inline-flex' }}>
                        <div style={{ height: 137, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex' }}>
                          <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                            <div classname="titre-proposition" >Votre commande</div>
                          </div>

                          <div style={{ width: 298, color: '#A1A1A1', fontSize: 14, fontFamily: 'Poppins', fontStyle: 'italic', fontWeight: '400', wordWrap: 'break-word' }}>Aucune prestation sélectionnée</div>
                          <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 78, display: 'inline-flex' }}>
                            <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, background: '#89B03D', borderRadius: 2, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
                              <div style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word' }}>Choisissez une prestation</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Col>
                  {xserviceIsSelected && false && (

                    <Col lg={4} className="proposition-bloc">

                      <PropositionStyle>
                        <div className="content-proposition">
                          <div className="bloc-titre-fiche mb-3">
                            <p className="titre-proposition">Nom du service</p>
                            <h1 className="titre-fiche-prestation">
                              {benefit?.service?.name}
                            </h1>
                          </div>
                          <p className="titre-proposition">
                            Proposition(s) du réparateur :
                          </p>
                          {isTabletOrMobile || true ? (
                            <Select
                              {...state.deliveryModes}
                              onChange={(val) => {
                                const cpState = { ...state };
                                cpState.deliveryModes.value = val.value;
                                setState(cpState);
                              }}
                            />
                          ) : (
                            <RadioButton
                              {...state.deliveryModes}
                              onChange={(val) => {
                                const cpState = { ...state };
                                cpState.deliveryModes.value = val.value;
                                setState(cpState);
                              }}
                            />
                          )}

                          {benefit.typeService === "forfait" && (
                            <ButtonDef
                              textButton="Commander"
                              onClick={() => checkClient()}
                            />
                          )}

                          {benefit.typeService === "devis" && (
                            <>
                              <div className="bloc-price-devis">

                                <span className="price-devis">
                                  {benefit.priceQuote
                                    ? `${benefit.priceQuote?.toFixed(2)} € TTC`
                                    : "GRATUIT"}
                                </span>
                              </div>
                              {benefit.precisionQuote && (
                                <div className="bloc-precision">
                                  <p className="titre-precision">
                                    Précision de prise en charge du devis:
                                  </p>
                                  <p>{benefit.precisionQuote}</p>
                                </div>
                              )}
                              <ButtonDef
                                textButton="Faire un devis"
                                onClick={() => checkClient()}
                              />
                            </>
                          )}
                        </div>
                      </PropositionStyle>
                    </Col>
                  )}
                </Row>
                <Row>
                  {xserviceIsSelected && (
                    <Col style={{ overFlow: 'hidden', textOverflow: 'ellipsis' }}  >
                      <div style={{ color: '#89B03D', fontSize: 24, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', wordWrap: 'break-word' }}></div>
                      <h1 className="titre-fiche-prestation" style={{ color: '#89B03D', fontSize: 24 }} id="votre_commande">
                        Votre commande
                      </h1>
                      <div style={{
                        width: '100%', height: '100%', padding: 20, background: 'white', boxShadow: '0 4px 51px 0 rgba(182, 172, 251, 0.42)', borderRadius: 4,
                        flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'
                      }}>
                        <div style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 45, display: 'inline-flex' }}>

                          <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex' }}>
                            <div style={{ height: 90, justifyContent: 'flex-start', alignItems: 'center', gap: 9, display: 'flex' }}>
                              <div style={{ width: 300, height: 90, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                <div className="bloc-titre-fiche mb-3">
                                  <p className="titre-proposition">Nom du service</p>
                                  <h1 className="titre-fiche-prestation " style={{ fontSize: 20 }}>
                                    {benefit?.service?.name}
                                  </h1>
                                </div>
                              </div>
                            </div>

                            <div className="bloc-titre-fiche mb-3">
                              <p className="titre-proposition">Type de service</p>
                              <h1 className="titre-fiche-prestation " style={{ fontSize: 20 }}>   {benefit?.typeService} </h1>
                              {(maxPrice > 0) &&
                                <span style={{ color: '#929292', fontSize: 14, fontWeight: '400', wordWrap: 'break-word' }}>

                                  Fourchette estimée :

                                  <br />{maxPrice}€ - {minPrice}€*</span>
                              }
                            </div>
                          </div>
                          <div className="bloc-titre-fiche" style={{ width: '30%' }}>
                            <p className="titre-proposition">  Propositions du réparateur </p>
                            <p className="titre-precision" style={{ color: '#373737', fontSize: 20, fontWeight: '400' }}>
                              {/* Précision de prise en charge du devis: */}

                              {benefit.typeService === "devis" && (
                                <>
                                  <div className="bloc-price-devis" style={{ color: '#373737', fontSize: 16, width: "90%" }}>
                                    {benefit.priceQuote
                                      ? `${benefit.priceQuote?.toFixed(2)} € TTC`
                                      : ""}

                                  </div>

                                  {benefit.precisionQuote && (
                                    <div className="bloc-precision" style={{ fontSize: 14, width: "90%" }}>
                                      <p>{benefit.precisionQuote}</p>
                                    </div>
                                  )}


                                </>

                              )}


                            </p>
                          </div>



                          {isTabletOrMobile ? (
                            <Col style={{ width: '100%' }}>
                              <Select
                                {...state.deliveryModes}
                                onChange={(val) => {
                                  const cpState = { ...state };
                                  cpState.deliveryModes.value = val.value;
                                  setState(cpState);
                                }}
                              /></Col>
                          ) : (
                            <Col style={{ width: '100%' }}>
                              <RadioButton

                                {...state.deliveryModes}
                                onChange={(val) => {
                                  const cpState = { ...state };
                                  cpState.deliveryModes.value = val.value;
                                  setState(cpState);
                                }}
                              />
                            </Col>
                          )}

                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <Container className="col-md-8 col-sm-3 col-lg-8" style={{ marginTop: 75 }}>
                      <div style={{
                        textAlign: 'center', marginBottom: 25, paddingLeft: 20, color: '#465a61', lineHeight: 2
                      }}><div style={{ color: '#4E5860', fontSize: 32, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word' }}>
                          {benefit.typeService === "forfait" && (
                            <>
                              <button

                                style={{

                                  backgroundColor: '#89B03D',
                                  boxShadow: '3px 3px 20px 0 rgba(182,172,251,0.42)',
                                  borderRadius: 20,
                                  color: '#fff',
                                  fontFamily: "Poppins,sans-serif",
                                  fontWeight: 700,
                                  border: '1px solid #89B03D',
                                  padding: '6px 20px 20px',
                                  fontSize: 14,
                                  height: '45px',
                                  transition: '0.5s ease-in-out',
                                  fontSize: 14

                                }}

                                onClick={() =>
                                  checkClient()
                                } >Commander</button>


                            </>
                          )}
                          {benefit.typeService === "devis" && (
                            <>
                              <button

                                style={{

                                  backgroundColor: '#89B03D',
                                  boxShadow: '3px 3px 20px 0 rgba(182,172,251,0.42)',
                                  borderRadius: 20,
                                  color: '#fff',
                                  fontFamily: "Poppins,sans-serif",
                                  fontWeight: 700,
                                  border: '1px solid #89B03D',
                                  padding: '6px 20px 20px',
                                  fontSize: 14,
                                  height: '45px',
                                  transition: '0.5s ease-in-out',
                                  fontSize: 14

                                }}

                                onClick={() =>
                                  checkClient()
                                } >Demander un devis</button>


                            </>
                          )}

                        </div></div>
                    </Container>



                  </Col>


                </Row>


              </Container>

              {isDesktopOrLaptop && (
                <Breadcrumb
                  crumbs={[
                    { name: "Accueil", path: "/" },
                    { name: universe.name, path: "/univers/" + slugIdUniverse },
                  ]}
                />
              )}

              <Container className="col-md-8 col-sm-3 col-lg-8" style={{ marginTop: 0 }}>
                <div style={{
                  textAlign: 'center', marginBottom: 25, paddingLeft: 20, color: '#465a61', lineHeight: 2
                }}><div style={{ color: '#4E5860', fontSize: 32, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word' }}>Découvrez mes prestations </div></div>



              </Container>

              {isTabletOrMobile && (
                <div
                  className="btn-toggle-filter toggel-filter-universe"
                  onClick={() => {
                    setToggleFilter(!toggleFilter);
                  }}
                >
                  <SearchIcon /> Rechercher une prestation
                </div>
              )}

              {isDisplayListeProduits && (
                <BlocFilterStyle className="filter-universe" open={toggleFilter} style={{ display: 'none' }}>
                  {isTabletOrMobile && (
                    <button
                      className="menu-burger is-opened"
                      onClick={() => {
                        setToggleFilter(false);
                      }}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  )}

                  <div className="item-filter">
                    <Select
                      {...filter.universe}
                      element={filter.universe}
                      setElement={(element) => {
                        const cpFilter = { ...filter };
                        cpFilter.universe = element;
                        setFilter(cpFilter);
                      }}
                      onChange={(e) => {
                        if (e.value && e.slug) {
                          document.dispatchEvent(
                            new CustomEvent("Universe", {
                              detail: {
                                url: `/univers/${e.slug}-${e.value}`,
                                id: e.value,
                              },
                            })
                          );
                          history.push(`/univers/${e.slug}-${e.value}`);

                          msgErrors({
                            universe: false,
                            category: false,
                            subCategory: false,
                            codePostal: false,
                          });
                        }
                      }}
                    />
                  </div>

                  <div className="item-filter">
                    <Select
                      {...filter.category}
                      element={filter.category}
                      setElement={(element) => {
                        const cpFilter = { ...filter };
                        cpFilter.category = element;
                        setFilter(cpFilter);
                      }}
                      onChange={(e) => {
                        if (filter.category.value !== e.value) {
                          let cpFilter = { ...filter };
                          cpFilter.category.value = e.value;
                          cpFilter.category.error = false;
                          localStorage.setItem("defaultCategory", e.value);
                          cpFilter = refreshSubCategory(
                            cpFilter,
                            universe.categories
                          );
                          if (e.value == "") {
                            cpFilter.subCategory.value = "";
                          }
                          cpFilter.subCategory.error = false;
                          cpFilter.subCategory.infoBull = false;
                          setFilter(cpFilter);
                        }
                      }}
                    />
                  </div>

                  {filter.category.value && (
                    <div className="item-filter">
                      <SelectCat
                        {...filter.subCategory}
                        element={filter.subCategory}
                        setElement={(element) => {
                          const cpFilter = { ...filter };
                          cpFilter.subCategory = element;
                          setFilter(cpFilter);
                        }}
                        onChangeCallback={(response) => {
                          const cpFilter = { ...filter };
                          cpFilter.subCategory.value = response;
                          cpFilter.subCategory.error = false;
                          localStorage.setItem(
                            "defaultSubCategory",
                            JSON.stringify(response)
                          );
                          setFilter(cpFilter);
                        }}
                      />
                    </div>
                  )}

                  {/* <div className="item-filter">
                  <InputSearchKeyword
                    filter={filter}
                    setFilter={setFilter}
                    universe={universe}
                  />
                </div> */}

                  <div className="item-filter">
                    <InputAutoComplete
                      filter={filterMap}
                      setFilter={setFilterMap}
                      placeIsSelected={placeIsSelected}
                      setPlaceIsSelected={setPlaceIsSelected}
                      isPendingLatLng={isPendingLatLng}
                      setIsPendingLatLng={setIsPendingLatLng}
                    />
                  </div>

                  <div className="item-filter btn-filter-banner">
                    <button
                      className="btn-search-filter"
                      onClick={() => {
                        if (
                          isTabletOrMobile &&
                          placeIsSelected &&
                          filterMap.codePostal.latitude &&
                          filterMap.codePostal.value
                        ) {
                          setToggleFilter(false);
                        }

                        if (
                          filter.universe.value &&
                          filter.category.value &&
                          ((Array.isArray(filter.subCategory.value) &&
                            filter.subCategory.value.length > 0) ||
                            !filter.universe.requireSearchSubCategory) &&
                          placeIsSelected
                        ) {
                          getServices(false, 0);
                        } else {
                          msgErrors({
                            universe: !filter.universe.value,
                            category:
                              filter.universe.value && !filter.category.value,
                            subCategory:
                              filter.universe.value &&
                              filter.category.value &&
                              !(
                                Array.isArray(filter.subCategory.value) &&
                                filter.subCategory.value.length > 0
                              ) &&
                              filter.universe.requireSearchSubCategory,
                            codePostal: !placeIsSelected,
                          });
                        }
                      }}
                    >
                      {isDesktopOrLaptop && (
                        <>
                          <SearchIcon />
                        </>
                      )}
                      {isTabletOrMobile && <>Recherche</>}
                    </button>
                  </div>
                </BlocFilterStyle>
              )}

              <ArtisanNavListePrestations
                data={xServices}
                completeData={fromServiceClickCompleteData}
                perPage={perPage}
                setPerPage={setPerPage}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                totalItemsLength={totalServices}
                pagination={false}
                isLoading={isPending}
                handleParentEvent={handleParentEvent}
              >
              </ArtisanNavListePrestations>
            </Container>
          </ContentPageStyle>
        </>
      ) : (
        <FoundPage
          noBase
          title="Univers en cours de développement"
          image={imgMaintenence}
        />
      )
      }
    </Base >
  );
}
