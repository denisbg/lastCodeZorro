import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import {
  BackStyle,
  BlocFilterStyle,
  ContentPageStyle,
} from "../../assets/styles/frontGlobalStyle";
import { BackIcon, SearchIcon } from "../../assets/styles/icons";
import Breadcrumb from "../../components/ui-elements/breadcrumb";
import Base from "../../theme/front/base";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { RangePrice } from "../../assets/styles/componentStyles";
import ListePrestationFiche from "../../components/front/listePrestationFiche";
import endPoints from "../../config/endPoints";
import connector from "../../connector";
import InputAutoComplete from "../../components/ui-elements/inputAutoComplete";
import { clearErrors } from "../../helper/form";
import SelectCat from "../../components/categories/selectCat";
import { sortObjects } from "../../helper/functions";

export default function Listo() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const [click, setClick] = useState(false);
  const toggleFilter = () => setClick(!click);
  const toogleCloseFilter = () => setClick(false);

  useEffect(() => {
    if (click) {
      document.body.classList.add("menu-is-show");
    } else {
      document.body.classList.remove("menu-is-show");
    }
  }, [click]);

  const [defaultCodePostal] = useState(localStorage.getItem("codePostal"));
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );

  const { slugIdUniverse, slugIdService } = useParams();
  console.log(slugIdUniverse);
  const [service, setService] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const universe = useSelector((state) => state.universe);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const [filter, setFilter] = useState({
    deliveryModeTypes: {
      label: "Mode de délivrance",
      name: "deliveryModeTypes",
      placeholder: "Tous",
      options: [],
      value: [],
      hideOptions: true,
    },
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
    price: {
      value: [-1, -1],
    },
    sortBy: {
      label: "Trier par: ",
      placeholder: `${isTabletOrMobile ? "trier par :" : ""}`,
      options: [
        { value: "distance_asc", label: "Distance" },
        { value: "rating_desc", label: "Meilleures notes" },
        { value: "price_asc", label: "Prix croissant" },
        { value: "price_desc", label: "Prix décroissant" },
      ],
      value: `${isTabletOrMobile ? null : "distance_asc"}`,
    },
  });
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: `${activeUniverse ? activeUniverse.name : "Univers"}`,
      path: `/univers/${slugIdUniverse}`,
    },
    { name: service ? service.name : "", path: "/" },
  ];

  useEffect(() => {
    if (universe.allUniverses) {
      const id = slugIdUniverse.split("-").pop();
      if (id) {
        const universeData = universe.allUniverses.find(
          (u) => parseInt(u.id) === parseInt(id)
        );
        if (universeData) {
          setActiveUniverse(universeData);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universe]);

  useEffect(() => {
    getDeliveryModeTypes();
    getService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPendingLatLng && service) {
      getBenefits(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugIdService, filter.sortBy.value, isPendingLatLng, service.id]);

  const getDeliveryModeTypes = () => {
    connector({
      method: "get",
      url: endPoints.DELIVERY_MODE_TYPES,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpFilter = { ...filter };
        let options = [];
        for (let i = 0; i < arrayObj.length; i++) {
          options.push({ value: arrayObj[i].id, label: arrayObj[i].name });
        }
        cpFilter.deliveryModeTypes.options = options;
        setFilter(cpFilter);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getService = () => {
    const idService = "/univers/cordonnerie-30/entretien-nettoyage-218".split("-").pop();
    if (idService) {
      let condition = ``;
      if (filter.codePostal.latitude && filter.codePostal.longitude) {
        condition += `?latitude=${filter.codePostal.latitude}&longitude=${filter.codePostal.longitude}`;
      }
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_SERVICE}${idService}${condition}`,
        success: (response) => {
          setService(response.data || {});
        },
        catch: (error) => {
          console.log(error);
        },
      });
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };

  const getBenefits = (refresh = false) => {
    const idService = "/univers/cordonnerie-30/entretien-nettoyage-218".split("-").pop();
    if (idService) {
      if (!placeIsSelected) {
        msgErrors({
          codePostal: true,
        });
        return;
      }

      if (isTabletOrMobile) {
        setClick(false);
      }

      if (!isPending) {
        setIsPending(true);
        setFilter(clearErrors(filter));

        const sortBy = filter.sortBy.value.split("_");

        let condition = ``;
        if (filter.codePostal.latitude && filter.codePostal.longitude) {
          condition += `&latitude=${filter.codePostal.latitude}&longitude=${filter.codePostal.longitude}`;
        }
        if (sortBy[0] === "distance") {
          condition += `&order[distance]=asc`;
        } else if (sortBy[0] === "price") {
          condition += `&order[deliveryModes.price]=${sortBy[1]}`;
        }else if (sortBy[0] === "rating") {
          condition += `&order[rating]=${sortBy[1]}`;
        }
        if (filter.deliveryModeTypes.value.length) {
          for (let i = 0; i < filter.deliveryModeTypes.value.length; i++) {
            const row = filter.deliveryModeTypes.value[i];
            condition += `&deliveryModes.deliveryModeType.id[]=${row.value}`;
          }
        }
        if (
          filter.price.value[0] > -1 &&
          filter.price.value[1] > -1 &&
          (filter.price.value[0] !== service.minPrice ||
            filter.price.value[1] !== service.maxPrice)
        ) {
          condition += `&deliveryModes.price[between]=${filter.price.value[0]}..${filter.price.value[1]}`;
        }

        const cpParamsUrlService = `${condition}`;

        //if (refresh || cpParamsUrlService !== paramsUrlService) {
        if (refresh || paramsUrlService) {
          setParamsUrlService(cpParamsUrlService);
          connector({
            method: "get",
            url: `${endPoints.ANONYMOUS_BENEFITS_SERVICE}?service.id=${idService}${cpParamsUrlService}`,
            success: (response) => {
              let results = response.data["hydra:member"] || [];
              //todo list est voir le min et max
              if (service) {
                const cpService = { ...service };
                let prices = [];
                for (var i = 0; i < results.length; i++) {
                  for (var j = 0; j < results[i].deliveryModes.length; j++) {
                    const obj = results[i].deliveryModes[j];
                    if (obj.price && parseFloat(obj.price) > 0) {
                      prices.push(parseFloat(obj.price));
                    }
                  }
                  results[i] = {...results[i], rating :  results[i].user.googleRating || 0};
                }
                if (prices.length) {
                  cpService.minPrice = Math.floor(Math.min(...prices));
                  cpService.maxPrice = Math.ceil(Math.max(...prices));
                  setService(cpService);
                }else{
                  cpService.minPrice = 0;
                  cpService.maxPrice = 0;
                  setService(cpService);
                }
              }
              if (sortBy[0] === "price") {
                results = sortObjects(results,'minPrice',sortBy[1]);
              }else if(sortBy[0] === "rating"){
                results = sortObjects(results,'rating',sortBy[1]);
              }
              setBenefits(results);
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
      }
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };

  const to = (value, index) => {
    value = Math.round(value);
    const cpFilter = { ...filter };
    if (index !== undefined && cpFilter.price.value[index] !== value) {
      cpFilter.price.value[index] = value;
      setFilter(cpFilter);
    }
    return value;
  };

  const from = (value) => {
    return Number(value);
  };

  const msgErrors = (e) => {
    const cpFilter = { ...filter };
    if (e.notice !== undefined) NotificationManager.error(e.notice, "");
    if (e.codePostal !== undefined) {
      cpFilter.codePostal.error = e.codePostal;
      cpFilter.codePostal.infoBulle = e.codePostal;
    }
    setFilter(cpFilter);
  };

  return (

        <Container>
          <div style={{width: '100%', height: '100%', paddingRight: 156, background: 'white', boxShadow: '0px 0px 12px rgba(154, 202, 60, 0.09)', justifyContent: 'flex-start', alignItems: 'center', gap: 32, display: 'inline-flex'}}>
    <img style={{width: 504, height: 344.75}} src="https://via.placeholder.com/504x345" />
    <div style={{paddingTop: 30, paddingBottom: 30, background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
            <div style={{color: '#A2C614', fontSize: 20, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word'}}>Cordonnerie</div>
        </div>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 40, display: 'inline-flex'}}>
            <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div style={{color: '#444444', fontSize: 36, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>Les petits pieds </div>
                        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                            <div style={{width: 56, height: 30.73, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                <img style={{width: 56, height: 30.73}} src="https://via.placeholder.com/56x31" />
                            </div>
                            <div style={{width: 50, height: 31.23, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                <img style={{width: 50, height: 31.23}} src="https://via.placeholder.com/50x31" />
                            </div>
                        </div>
                    </div>
                    <div style={{width: 465, height: 97, color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word'}}>Plongez dans l'univers chaleureux et artisanal de "Les Petits Pieds", une cordonnerie dévouée à chérir chaque paire de chaussures avec le plus grand soin et l'expertise la plus délicate. </div>
                </div>
                <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>4,8</div>
                    <img style={{width: 113.59, height: 21}} src="https://via.placeholder.com/114x21" />
                </div>
            </div>
            <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex'}}>
                <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 24, height: 24, position: 'relative'}}>
                        <div style={{width: 8, height: 8, left: 8, top: 6, position: 'absolute', background: '#9ACA3C'}}></div>
                        <div style={{width: 16, height: 20, left: 4, top: 2, position: 'absolute', background: '#9ACA3C'}}></div>
                    </div>
                    <div style={{color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>16 rue de Saussure, 7018 Paris</div>
                </div>
                <div style={{width: 208, position: 'relative'}}>
                    <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{width: 22, height: 22, position: 'relative'}}>
                            <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute', background: '#9ACA3C'}}></div>
                            <div style={{width: 9.06, height: 20.71, left: 6.47, top: 0.65, position: 'absolute', background: '#9ACA3C'}}></div>
                            <div style={{width: 20.71, height: 14.07, left: 0.65, top: 3.97, position: 'absolute', background: '#9ACA3C'}}></div>
                        </div>
                    </div>
                    <div style={{width: 24, height: 24, left: 184, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{width: 22, height: 22, background: '#9ACA3C'}}></div>
                    </div>
                    <div style={{width: 24, height: 24, left: 146, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute'}}></div>
                            <div style={{width: 22, height: 18, left: 2, top: 4, position: 'absolute', background: '#9ACA3C'}}></div>
                        </div>
                    </div>
                    <div style={{width: 22, height: 22, left: 74, top: 1, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{width: 22, height: 22, background: '#9ACA3C'}}></div>
                    </div>
                    <div style={{width: 22, height: 22, left: 38, top: 1, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{width: 22, height: 22, background: '#9ACA3C'}}></div>
                    </div>
                    <div style={{width: 22, height: 22, left: 110, top: 1, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{width: 22, height: 22, background: '#9ACA3C'}}></div>
                    </div>
                </div>
                <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 24, height: 24, position: 'relative'}}>
                        <div style={{width: 18, height: 18, left: 3, top: 3, position: 'absolute', border: '2.12px #9ACA3C solid'}}></div>
                        <div style={{width: 4.50, height: 6.75, left: 12, top: 6, position: 'absolute', border: '2.12px #9ACA3C solid'}}></div>
                    </div>
                    <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
                        <div style={{color: '#444444', fontSize: 16, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word'}}>Horaires</div>
                        <div style={{width: 283, height: 137, position: 'relative'}}>
                            <div style={{width: 181, height: 21, left: 0, top: 0, position: 'absolute'}}>
                                <div style={{left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Lundi</div>
                                <div style={{left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Fermé</div>
                            </div>
                            <div style={{width: 283, height: 21, left: 0, top: 29, position: 'absolute'}}>
                                <div style={{left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Mardi - jeudi</div>
                                <div style={{left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>9h-13h30 / 14h-17h30</div>
                            </div>
                            <div style={{width: 196, height: 21, left: 0, top: 58, position: 'absolute'}}>
                                <div style={{left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Vendredi</div>
                                <div style={{left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>10h - 18h</div>
                            </div>
                            <div style={{width: 189, height: 21, left: 0, top: 87, position: 'absolute'}}>
                                <div style={{left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Samedi</div>
                                <div style={{left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>10h-19h</div>
                            </div>
                            <div style={{width: 183, height: 21, left: 0, top: 116, position: 'absolute'}}>
                                <div style={{left: 0, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Dimanche</div>
                                <div style={{left: 136, top: 0, position: 'absolute', color: '#444444', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>9h-12h</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
          <BlocFilterStyle open={click}>
            {isTabletOrMobile && (
              <button
                className="menu-burger is-opened"
                onClick={toogleCloseFilter}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
            <div className="item-filter">
              <RangePrice>
                <label>Prix</label>
                {service &&
                service.minPrice &&
                service.maxPrice &&
                service.minPrice != service.maxPrice ? (
                  <Nouislider
                    range={{ min: service.minPrice, max: service.maxPrice }}
                    start={[service.minPrice, service.maxPrice]}
                    connect={true}
                    behaviour="tap"
                    step={1}
                    tooltips={true}
                    format={{ to, from }}
                  />
                ) : (
                  "Sur devis"
                )}
              </RangePrice>
            </div>
            <div className="item-filter">
              <SelectCat
                {...filter.deliveryModeTypes}
                onChangeCallback={(response) => {
                  const cpFilter = { ...filter };
                  cpFilter.deliveryModeTypes.value = response;
                  setFilter(cpFilter);
                }}
              />
            </div>
            <div className="item-filter">
              <InputAutoComplete
                filter={filter}
                setFilter={setFilter}
                placeIsSelected={placeIsSelected}
                setPlaceIsSelected={setPlaceIsSelected}
                isPendingLatLng={isPendingLatLng}
                setIsPendingLatLng={setIsPendingLatLng}
              />
            </div>
            <div className="btn-filter-banner">
              <button
                className="btn-search-filter"
                onClick={(e) => {
                  getBenefits(false);
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
          {isDesktopOrLaptop && <Breadcrumb crumbs={dataCrumbs} />}
          <BackStyle to={`/univers/${slugIdUniverse}`}>
            <BackIcon />
            <span>Retour à l'univers</span>
          </BackStyle>
          {isTabletOrMobile && (
            <div className="btn-toggle-filter" onClick={toggleFilter}>
              <SearchIcon /> Rechercher une prestation
            </div>
          )}
          <ListePrestationFiche
            service={service}
            benefits={benefits}
            filter={filter}
            setFilter={setFilter}
            isPending={isPending}
          />
        </Container>
 
  );
}
