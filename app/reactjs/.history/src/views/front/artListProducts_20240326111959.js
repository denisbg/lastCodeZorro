import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useMediaQuery } from "react-responsive";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import imgMaintenence from "../../assets/images/img-page-maintenace.svg";

import { ListFichePrestation } from "../../assets/styles/frontGlobalStyle";
import BonusReparation from "./ficheUniversParts/bonusreparation";
import ListePrestationFiche from "../../components/front/listePrestationFiche";
import {
  BlocFilterStyle,
  ContentPageStyle,
} from "../../assets/styles/frontGlobalStyle";
import { SearchIcon } from "../../assets/styles/icons";
import SelectCat from "../../components/categories/selectCat";
import FoundPage from "../../components/foundPage";
import BannerRepairMan from "../../components/front/bannerRepairMan";
import BannerYourCommand from "../../components/front/bannerYourCommand";


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
import ListProduitsBonus from "../../components/front/listProduitsBonus";

export default function ArtisanListProducts() {
  const isDisplayFilter = true;
  const [isDisplayListeProduits, setDisplayListeProduits] = useState(true);
  const [isDisplayPrestationsArtisan, setDisplayPrestationsArtisan] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
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
  const { slugIdUniverse } = useParams();
  const { slugIdRepairman } = useParams();
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);

  const [repairMan, setRepairMan] = useState([]);
  const [universe, setUniverse] = useState([]);

  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [services, setServices] = useState([]);
 
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
    if (universeSelector.allUniverses) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universeSelector, slugIdUniverse]);

  useEffect(() => {
    if (localStorage.getItem("codePostal")) {
      //getUniverse();
    } else {
      localStorage.setItem("errorcCodePostal", "codePostal non define");
      history.push(ROUTES.HOME.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugIdUniverse]);

  useEffect(() => {

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


  }, []);

  useEffect(() => {
    let repairmanId = parseInt(slugIdRepairman.split("-").pop());
    getRepairMan(repairmanId);
    getUserRepairmanBenefits(repairmanId);
  }, []);

  const getUserRepairmanBenefits = (id) => {
    connector({
      method: "get",
      url: `${endPoints.ANONYMOUS_USER_REPAIRMAN}/${id}/benefits`,
      success: (response) => {
        
        console.log("STEP artlistproducts getUserRepairmanBenefits ANONYMOUS_USER_REPAIRMAN  ",response)
        setIsPending(false);
      },
      catch: (error) => {
        setIsPending(false);
      
      },
    });
  };



useEffect(() => {
  if (universe && !isPendingLatLng) {
    getServices(false, 0);
  }
}, [universe]);

useEffect(() => {
  if (universe && !isPendingLatLng) {
    getServices(false, null);
   
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isPendingLatLng, pageIndex, perPage]);



const getRepairMan = (repairmanId) => {
  connector({
    method: "get",
    url: `${endPoints.USERS_REPAIRMAN_PUBLIC}?order[enterprise]=asc&id=` + repairmanId,
    data: {},
    success: (response) => {
      const arrayObj = response.data["hydra:member"] || [];
      setRepairMan(arrayObj)
      console.log("STEP artlistproduct", arrayObj);
    },

    catch: (error) => {
      console.log(error);
    },
  });
};







const getServices = (refresh = true, index = null) => {
  index = index != null ? index : pageIndex;
  setPageIndex(index);

  if (!placeIsSelected) {
    msgErrors({
      codePostal: true,
    });
    return;
  }

  if (!isPending) {
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
      const parent_univ_id = slugIdUniverse.split("-").pop();
       const cpParamsUrlService = `page=${parseInt(index) + 1
        }&itemsPerPage=${perPage}&categories.parent.universe.id=${parent_univ_id
        }${condition}`;
      //console.log("STEP ANONYMOUS_SERVICES_CATALOG pParamsUrlService",cpParamsUrlService);
      if (refresh || cpParamsUrlService !== paramsUrlService) {
        setParamsUrlService(cpParamsUrlService);

        connector({
          method: "get",
          url: `${endPoints.ANONYMOUS_SERVICES_CATALOG}?${cpParamsUrlService}`,
          success: (response) => {

            setServices(response.data["hydra:member"] || []);
            setTotalServices(response.data["hydra:totalItems"] || 0);
            console.log("STEP ANONYMOUS_SERVICES_CATALOG BA", response);
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
            <BannerYourCommand>
            </BannerYourCommand>



            {isDesktopOrLaptop && (
              <Breadcrumb
                crumbs={[
                  { name: "Accueil", path: "/" },
                  { name: universe.name, path: "/univers/" + slugIdUniverse },
                ]}
              />
            )}

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
              <BlocFilterStyle className="filter-universe" open={toggleFilter}>
               


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

            {isDisplayListeProduits && (
              <ListProduitsBonus
                data={services}
                perPage={perPage}
                setPerPage={setPerPage}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                totalItemsLength={totalServices}
                pagination={true}
                isLoading={isPending}
              > </ListProduitsBonus>
            )}
      {isDisplayListeProduits && (
              <ListProduitsBonus
                data={services}
                perPage={perPage}
                setPerPage={setPerPage}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                totalItemsLength={totalServices}
                pagination={true}
                isLoading={isPending}
              > </ListProduitsBonus>
            )}





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
