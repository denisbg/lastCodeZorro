import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "react-bootstrap";
import { ROLES, PREFIX_BACKEND } from "../../vars.js";
import "nouislider/distribute/nouislider.css";
import endPoints from "../../config/endPoints.js";
import connector from "../../connector.js";
import { RepairManlatlng } from '../../components/front/repairManPositions.js'
import ArtPrestationFiche from "../../components/front/artPrestationFiche.js";
import { useParams, useHistory } from "react-router-dom";
import NewMap from "../../components/front/newMap.js";


export default function MapArtisansUnivers(props) {

  const isOlder = true;
  const { slugIdUniverse, slugIdService } = useParams();
  const [isPendingShowcase, setPendingShowCase] = useState(false);

  const [isPending, setIsPending] = useState(0);
  const [tabArray, setxObjElem] = useState([]);
  const [repairManArr, setFilteredObject] = useState([]);
  const [showCasesArray, setShowCases] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const perPageDesMob = isMobile ? 10 : 20;
  const [pageIndex, setPageIndex] = useState(0);
  const [repairMans, setRepairMans] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 994px)", });
  const [click, setClick] = useState(false);
  const toggleFilter = () => setClick(!click);
  const toogleCloseFilter = () => setClick(false);
  const [taskUsersShowCaseIsPending, setTaskUserWithShowCaseIsPending] = useState(false);
  const [displayUniverseUsersIsReady, setDisplayUniverseUsersIsReady] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState({ id: null });
  const [currentIdFromMap, setCurrentIdFromMap] = useState({ id: null });

  useEffect(() => {

    const universId = slugIdUniverse.split("-").pop();
    //retrieve user who have services (showcase contains the universe and the service)
    // getUserWithShowCase();
    getMyocUniverseRepairmen(universId);
    //console.log("STEP 1  getMyocUniverseRepairmen  ", result);

  }, []);



  const getMyocUniverseRepairmen = (universeId) => {
 
    let userFieldMap = {
      '@id': "userId", id: "id",
      username: "username", firstName: "firstname", lastName: "lastname",
      email: "email", enterprise: "label", gender: "genre", postalCode: "postalcode",
      city: "city_code", latitude: "lat", longitude: "lng", picture: "picture",
      description: "description", facebook: "facebook", instagram: "instagram", bonusreparation: "bonusreparation",
      address: "address", roles: "roles",
    }
    setTaskUserWithShowCaseIsPending(true);
    connector({
      method: "post",
      url: `${endPoints.ANONYMOUS_UNIVERSE_REPAIRMEN}?universId=${universeId}`,
      data: {},
      success: (response) => {
        const universId = slugIdUniverse.split("-").pop();
        const arrayObj = response.data["hydra:member"] || [];
        //console.log("STEP MYOC 1.1 :Success getMyocUniverseRepairmen ", universId, arrayObj);

        for (let i = 0; i < arrayObj.length; i++) {
          var result = [];
          let obj = arrayObj[i];
          const found = obj["roles"].find((element) => element == ROLES.ROLE_REPAIRMAN);
          let toKeep = (found == ROLES.ROLE_REPAIRMAN);
          if (toKeep) {
            Object.entries(obj).forEach(entry => {
              const [key, value] = entry;
              let hasKey = userFieldMap.hasOwnProperty(key);
              if (hasKey) {
                result[userFieldMap[key]] = value;
              }
            });
           
              tabArray.push(result);
             
          }
        
         
        }
 
      },
      catch: (error) => {
          console.log("STEP MYOC 1.1", error);
        }
      });
  }



  const getUserWithShowCase = () => {
    if (taskUsersShowCaseIsPending) return false;
    setTaskUserWithShowCaseIsPending(true);
    connector({
      method: "get",
      url: `${endPoints.ANONYMOUS_USERS_REPAIRMAN_UNIVERSES}?order[enterprise]=asc&page=1&itemsPerPage=1000`,
      data: {},
      success: (response) => {
        const universId = slugIdUniverse.split("-").pop();
        const arrayObj = response.data["hydra:member"] || [];
        console.log("STEP 1 :Success getUserWithShowCase  (univerID would be the good one) RETRIEVE USER/UNIVERs WITH SHOWCASE", universId, arrayObj);
        var result = repairmanFilterByUniverse(universId, arrayObj);
        console.log("STEP 1.1 :filter UnniverID would be the good one) RETRIEVE USER/UNIVERs WITH SHOWCASE", universId, result);
        filterRepairMenOnly(result);
        setTaskUserWithShowCaseIsPending(false);
        return (result);
      },
      catch: (error) => {
        console.log(error);
      }
    });
  }
 
  // Push in an array the returns with repair man from the universe value to prepare display
  // 
  const repairmanFilterByUniverse = ((universId, showCasesArray) => {
    let xOneRows = [];
    let xi = 0;
    //console.log("STEP TU x08  repairmanFilterByUniverse showCasesArray ", showCasesArray)
    Object.entries(showCasesArray).forEach(entry => {
      const [key, value] = entry;
      let oneUser = value;
      let showcases = oneUser['showcases'];
      if (showcases != null) {
        Object.entries(showcases).forEach(entry => {
          const [key, value] = entry;
          let xOneCol = [];
          let showcase = value;
          xOneCol["user_id"] = oneUser['@id'].split("/").pop();
          xOneCol["api_user"] = oneUser['@id'];
          xOneCol["user_lastName"] = oneUser['lastName'];
          xOneCol["univers_name"] = showcase['name'];
          xOneCol["univers_id"] = showcase['@id'].split("/").pop();
          let isAlreadyIn = xOneRows.includes(xOneCol["user_id"]);

          if (xOneCol["univers_id"] == universId && !isAlreadyIn) {
            xOneRows[xi] = xOneCol;
            xi++;
          }
        });
      }
    });
      //setxObjElem(xOneRows);
    return xOneRows;
  });

  const userIsInThisUniverse = (api_user, showCasesArray) => {
    const universId = slugIdUniverse.split("-").pop();
    //console.log("STEP 4 1 LOOK IF SHOWCASE EMPTY: ERROR", showCasesArray);
    //console.log("STEP 4 2 CHECK PARAM userId UniversId", api_user, universId);
    let zFound = false;
    //console.log("STEP 4 3 userIsInThisUniverse : len", showCasesArray.length);
    for (let i = 0; i < showCasesArray.length; i++) {
      if (showCasesArray[i].api_user === api_user) {
        if (showCasesArray[i].univers_id === universId) {
          zFound = true;
          break;
        }
      }
    }
    return zFound;
  }



  const setImap = (idFromMap) => {
    const data = "Données importantes NAV LIST";
    //props.handleParentEvent(row, completeData);
    // render <button onClick={handleClick}>Cliquez-moi</button>
  }
  const filterRepairMenOnly = (showCasesArray) => {
    let userFieldMap = {
      '@id': "userId", id: "id",
      username: "username", firstName: "firstname", lastName: "lastname",
      email: "email", enterprise: "label", gender: "genre", postalCode: "postalcode",
      city: "city_code", latitude: "lat", longitude: "lng", picture: "picture",
      description: "description", facebook: "facebook", instagram: "instagram", bonusreparation: "bonusreparation",
      address: "address", roles: "roles",
    }
    connector({
      method: "get",
      url: `${endPoints.USERS_REPAIRMAN_PUBLIC}?order[enterprise]=asc`,
      data: {},
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        console.log("STEP 2.1  TU: CHECK WARNING Contents of showCasesArray", arrayObj);
        for (let i = 0; i < arrayObj.length; i++) {
          var result = [];
          let obj = arrayObj[i];
          const found = obj["roles"].find((element) => element == ROLES.ROLE_REPAIRMAN);
          let toKeep = (found == ROLES.ROLE_REPAIRMAN);
          if (toKeep) {
            Object.entries(obj).forEach(entry => {
              const [key, value] = entry;
              let hasKey = userFieldMap.hasOwnProperty(key);
              if (hasKey) {
                result[userFieldMap[key]] = value;
              }
            });
            //console.log("STEP 2.3 VERIFY each USER HAVE SHOWCASE", result);
            if (userIsInThisUniverse(result['userId'], showCasesArray)) {
              //console.log("STEP 2.31  user is A REPAIRMAN for this universe", obj);
              tabArray.push(result);
            }
          }
           
        };
       // setxObjElem(tabArray);
        setDisplayUniverseUsersIsReady(true);
      },
      catch: (error) => {
        console.log(error);
      }
    });
  };
 

  return (<NewMap
    tabArray={tabArray}
    position={tabArray}
    displayUniverseUsersIsReady={props.isDisplayListeProduit}
 >
  </NewMap>);
  
}
