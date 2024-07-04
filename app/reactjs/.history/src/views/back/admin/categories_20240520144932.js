import arrayMove from "array-move";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import noImage from "../../../assets/images/noImage.png";
import {
  BlocAccordions,
  BlocAdminContent,
  BtnAccordAdd,
} from "../../../assets/styles/adminStyle/adminGlobalStyle";
import { DeleteIcon, EditIcon } from "../../../assets/styles/icons";
import ListSort from "../../../components/categories/listSort";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import { ButtonDef, Input, WysiwygEditor } from "../../../components/ui";
import {
  clearErrors,
  dataType64toFile,
  getFilesBase64,
} from "../../../helper/form";
import AdminBase from "../../../theme/back/adminBase";
import * as vars from "../../../vars";
import endPoints from "./../../../config/endPoints";
import connector from "./../../../connector";
import { AddGreenIcon } from "../../../assets/styles/icons";
import ROUTES from "../../../config/routes";
import PopinModal from "../../../components/ui-elements/popinModal";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import { getMsgError, scrollTop } from "../../../helper/functions";
import RadioButton from "../../../components/ui-elements/radioButton";
import SingleCheckbox from "../../../components/ui-elements/singleCheckBox";

export default function Categories() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  
  const [catLoaded, setCatLoaded] = useState(false);
  const [state, setState] = useState({
    id: { value: null },
    name: {
      label: "Nom",
      type: "text",
      name: "name",
      required: true,
      placeholder: "Nom",
      value: "",
      error: false,
      errorMessage: "",
    },
    nameCategory: {
      label: "Nom de la catégorie",
      type: "text",
      name: "nameCategory",
      required: true,
      placeholder: "Nom de la catégorie",
      value: "Catégorie(s)",
      error: false,
      errorMessage: "",
    },
    nameSubCategory: {
      label: "Nom de la sous-catégorie",
      type: "text",
      name: "nameSubCategory",
      required: true,
      placeholder: "Nom de la sous-catégorie",
      value: "Sous-catégories(s)",
      error: false,
      errorMessage: "",
    },
    requireSearchSubCategory: {
      name: "requireSearchSubCategory",
      label: "Champ sous-catégorie obligatoire dans la recherche",
      value: false,
      error: false,
      errorMessage: "",
      required: false,
    },
    descriptionPictures: {
      name: "descriptionPictures",
      label: "Aide pour l’ajout de photos",
      placeholder: "Tutoriel pour la prise de photos lors d’un devis",
      value: "",
      error: false,
      errorMessage: "",
      required: false,
      image: true,
    },
    description: {
      name: "description",
      label: "Description",
      placeholder: "Description",
      value: "",
      error: false,
      errorMessage: "",
      required: false,
      as: "textarea",
    },

    position: { name: "position", value: 0, required: false },
    universe: { name: "universe", value: null, required: false },
    parent: { name: "parent", value: null, required: false },
    level: { name: "level", value: 0, required: false },
    image: {
      name: "image",
      value: null,
      file: null,
      required: false,
      error: false,
      errorMessage: "",
    },
    bonusreparation: {
      name: "bonusreparation",
      label: "Bonus réparation",
      required: false,
      id: "bonusreparation",
      value: "0",
      options: [
        { value: "0", label: "Aucune prestation", id: "sansbonusrepa_radio" },
        { value: "1", label: "avec des prestations eligibles", id: "avecbonusrepa_radio" },
      ],
    },
    bonusdetails: {
      name: "bonusdetails",
      label: "Texte Bonus réparation",
      required: false,
      id: "bonusdetails",
      value: null,
      type: "text",
      required: false,
      error: false,
      errorMessage: ""
 
    },

    imageHome: {
      name: "imageHome",
      value: null,
      file: null,
      required: false,
      error: false,
      errorMessage: "",
    },


    filenameimage1: {
      label: "Image Gauche Vitrine",
      type: "text",
      name: "filenameimage1",
      required: false,
      placeholder: "filenameimage1",
      value: "",
      file: null,
      error: false,
      errorMessage: "",
    },
    filenameimage2: {
      label: "Nom Image Centre vitrine",
      name: "filenameimage2",
      value: null,
      file: null,
      type: "text",
      required: false,
      error: false,
      errorMessage: "",
    },
    filenameimage3: {
      label: "Nom Image Droit vitrine",
      name: "filenameimage3",
      value: null,
      file: null,
      type: "text",
      required: false,
      error: false,
      errorMessage: "",
    },
    anatomieactivated: {
      name: "anatomieactivated",
      label: "Anatomie visible",
      required: false,
      id: "anatomieactivated",
      value: false,
      options: [
        { value: 1, label: "Affichée", id: "actif_radio" },
        { value: 0, label: "Cachée", id: "inactif_radio" },
      ],
    },
    labelanatomie: {
      name: "labelanatomie",
      id: "labelanatomie",
      label: "Libellé rubrique anatomie",
      placeholder: "anatomie",
      value: "",
      file: null,
      error: false,
      errorMessage: "",
      required: false,
      as: "textarea",
    },
    filenameanatomie: {
      label: "Nom image anatomie",
      name: "filenameanatomie",
      id: "filenameanatomie",
      value: null,
      type: "text",
      required: false,
      error: false,
      errorMessage: "",
    },
    pictures: { name: "pictures", value: [], file: [], required: false },
    enabled: {
      name: "enabled",
      label: "Statut",
      required: false,
      id: "enabled",
      value: false,
      options: [
        { value: true, label: "Actif", id: "actif_radio" },
        { value: false, label: "Inactif", id: "inactif_radio" },
      ],
    },
  });
  const [category, setCategory] = useState(false);
  const [openSide, setOpenSide] = useState(false);
  const [bUpSelectedCat, setBUpSelectedCat] = useState(false);
  const [message, setMessage] = useState(null);
  const [universesCategories, setUniversesCategories] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    type: "",
    action: "",
  });

  useEffect(() => {
    console.log("UE useEffect[]");
    getUniversesCategories();
  }, []);

  useEffect(() => {
    console.log("UE useEffect category");
    //&& !catLoaded
    if ( category ) {
      const cpState = { ...state };
      for (let key in category) {
        if (cpState[key]) cpState[key].value = category[key];
      }
      cpState.image.file = "";
      cpState.imageHome.file = "";
      console.log("STEP CAT:08 setSTATE UE",cpState);
      //setCatLoaded(true);
      setState(cpState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const getUniversesCategories = () => {
    connector({
      method: "get",
      url: endPoints.ANONYMOUS_ALL_UNIVERSES_CATEGORIES_DETAILS,
      data: {},
      success: (response) => {
        let arrayObj = response.data["hydra:member"] || [];
        for (var i = 0; i < arrayObj.length; i++) {
          var o = arrayObj[i];
          o.children = o.categories;
          delete o.categories;
        }
        setUniversesCategories(arrayObj);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const item = universesCategories[oldIndex];
    const cpItems = arrayMove(universesCategories, oldIndex, newIndex);
    setUniversesCategories(cpItems);
    savePosition(cpItems, item, oldIndex, newIndex);
  };

  const setOrderChildren = (item, oldIndex, newIndex) => {
    let cpItems = [...universesCategories];
    let indexUni, indexCat, indexSubCat;
    [indexUni, indexCat, indexSubCat] = findIndexCats(cpItems, item);

    if (indexSubCat > -1) {
      const items = cpItems[indexUni].children[indexCat].children;
      cpItems[indexUni].children[indexCat].children = arrayMove(
        items,
        oldIndex,
        newIndex
      );
    } else if (indexCat > -1) {
      const items = cpItems[indexUni].children;
      cpItems[indexUni].children = arrayMove(items, oldIndex, newIndex);
    } else if (indexUni > -1) {
      cpItems = arrayMove(cpItems, oldIndex, newIndex);
    }
    setUniversesCategories(cpItems);
    savePosition(cpItems, item, oldIndex, newIndex);
  };

  const setActiveCategory = (item, cpItems = [], openSide = true) => {
    setMessage(null);
    setState(clearErrors(state));

    cpItems = cpItems.length ? cpItems : [...universesCategories];
    let iUniItem, iCatItem, iSubCatItem;
    let indexUni, indexCat, indexSubCat;
    if (item.id) {
      [iUniItem, iCatItem, iSubCatItem] = findIndexCats(cpItems, item);
      let cpCategory = category;
      if (!category?.id && bUpSelectedCat?.id) {
        cpCategory = bUpSelectedCat;
      }
      if (cpCategory?.id !== item.id) {
        [indexUni, indexCat, indexSubCat] = findIndexCats(cpItems, cpCategory);
        const isActivated = false;
        if (indexSubCat > -1 && indexSubCat !== iSubCatItem) {
          cpItems[indexUni].children[indexCat].children[indexSubCat] = {
            ...cpItems[indexUni].children[indexCat].children[indexSubCat],
            isActivated,
          };
        }
        if (indexCat > -1 && indexCat !== iCatItem) {
          cpItems[indexUni].children[indexCat] = {
            ...cpItems[indexUni].children[indexCat],
            isActivated,
          };
        }
        if (indexUni > -1 && indexUni !== iUniItem) {
          cpItems[indexUni] = { ...cpItems[indexUni], isActivated };
        }
      }
      const isActivated = item.isActivated ? false : true;
      if (iSubCatItem > -1) {
        cpItems[iUniItem].children[iCatItem].children[iSubCatItem] = {
          ...cpItems[iUniItem].children[iCatItem].children[iSubCatItem],
          isActivated,
        };
        item = { ...item, parent: cpItems[iUniItem].children[iCatItem]["@id"] };
      } else if (iCatItem > -1) {
        cpItems[iUniItem].children[iCatItem] = {
          ...cpItems[iUniItem].children[iCatItem],
          isActivated,
        };
        item = { ...item, universe: cpItems[iUniItem]["@id"] };
      } else if (iUniItem > -1) {
        cpItems[iUniItem] = { ...cpItems[iUniItem], isActivated };
      }
      setUniversesCategories([...cpItems]);
    } else {
      item = { ...item, name: "" };
      if (category?.id) {
        setBUpSelectedCat(category);
      }
      if (item?.adjacent) {
        [iUniItem, iCatItem, iSubCatItem] = findIndexCats(
          cpItems,
          item.adjacent
        );
        if (iSubCatItem > -1) {
          item = {
            ...item,
            parent: cpItems[iUniItem].children[iCatItem]["@id"],
          };
        } else if (iCatItem > -1) {
          item = { ...item, universe: cpItems[iUniItem]["@id"] };
        }
      }
    }
    setCategory(item);
    setOpenSide(openSide);
  };

  const findIndexCats = (cpItems, item) => {
    let indexUni = -1;
    let indexCat = -1;
    let indexSubCat = -1;
    if (item.id) {
      if (item["@type"] === "Universe") {
        indexUni = cpItems.findIndex((cat) => cat.id === item.id);
      } else if (item["@type"] === "Category" && item.level === 0) {
        cpItems.some((universe, indexI) => {
          const indexJ = universe.children.findIndex(
            (cat) => cat.id === item.id
          );
          if (indexJ > -1) {
            indexUni = indexI;
            indexCat = indexJ;
            return true;
          }
          return false;
        });
      } else if (item["@type"] === "Category" && item.level === 1) {
        cpItems.some((universe, indexI) => {
          universe.children.some((cat, indexJ) => {
            const indexK = cat.children.findIndex(
              (subCat) => subCat.id === item.id
            );
            if (indexK > -1) {
              indexUni = indexI;
              indexCat = indexJ;
              indexSubCat = indexK;
              return true;
            }
            return false;
          });
          if (indexSubCat > -1) {
            return true;
          }
          return false;
        });
      }
    }
    return [indexUni, indexCat, indexSubCat];
  };

  const savePosition = (cpItems, cat, oldIndex, newIndex) => {
    cpItems = cpItems.length ? cpItems : universesCategories;
    const startIndex = oldIndex < newIndex ? oldIndex : newIndex;
    const endIndex = oldIndex > newIndex ? oldIndex : newIndex;
    if (startIndex !== endIndex) {
      let items = [];
      let indexUni, indexCat, indexSubCat;
      [indexUni, indexCat, indexSubCat] = findIndexCats(cpItems, cat);
      if (indexSubCat > -1) {
        items = cpItems[indexUni].children[indexCat].children;
      } else if (indexCat > -1) {
        items = cpItems[indexUni].children;
      } else if (indexUni > -1) {
        items = cpItems;
      }
      items.forEach((item, index) => {
        if (startIndex <= index && index <= endIndex) {
          connector({
            method: "put",
            url: `${item["@type"] === "Universe"
              ? endPoints.UNIVERSE
              : endPoints.CATEGORY
              }/${item.id}`,
            data: { position: index },
            success: (response) => {
              //console.log(response);
            },
            catch: (error) => {
              console.log(error);
              NotificationManager.error("Quelque chose s'est mal passé.", "");
            },
          });
        }
      });
    }
  };

  const saveCategory = () => {
    if (!isPending) {
      setIsPending(true);
      setMessage(null);
      setState(clearErrors(state));
      if (state.name.value) {
        connector({
          method: `${state.id.value ? "put" : "post"}`,
          url: `${endPoints.CATEGORY}${state.id.value ? "/" + state.id.value : ""
            }`,
          data: {
            name: state.name.value,
            position: state.position.value,
            universe: state.universe.value,
            parent: state.parent.value,
            level: state.level.value,
          },
          success: (response) => {
            refreshItem(response.data, state.id.value);
            setIsPending(false);
            msgSuccess("Vos modifications ont bien été prises en compte.");
          },
          catch: (error) => {
            console.log(error);
            setIsPending(false);
            msgErrors({ msg: "Quelque chose s'est mal passé." });
          },
        });
      } else {
        const msg = "Le champ nom est obligatoire.";
        msgErrors({ msg, name: !state.name.value });
        setIsPending(false);
      }
    }
  };

  const deleteUniverse = () => {
    if (!isPending) {
      setIsPending(true);
      connector({
        method: "delete",
        url: endPoints.UNIVERSE + "/" + category.id,
        success: (response) => {
          let cpItems = [...universesCategories];
          const indexUni = cpItems.findIndex((cat) => cat.id === category.id);
          if (indexUni > -1) {
            cpItems.splice(indexUni, 1);
          }
          setUniversesCategories(cpItems);
          setCategory(false);

          setIsPending(false);
          setShowModal(false);
          NotificationManager.success("Univers supprimé avec succès.", "");
        },
        catch: (error) => {
          setIsPending(false);
          setShowModal(false);
          msgErrors({ msg: getMsgError(error) });
        },
      });
    }
  };

  const deleteCategory = () => {
    if (!isPending) {
      setIsPending(true);
      connector({
        method: "delete",
        url: endPoints.CATEGORY + "/" + category.id,
        success: (response) => {
          refreshItem(category, category.id, "delete");
          setIsPending(false);
          setShowModal(false);
          NotificationManager.success("Catégorie supprimé avec succès.", "");
        },
        catch: (error) => {
          setIsPending(false);
          setShowModal(false);
          msgErrors({ msg: getMsgError(error) });
        },
      });
    }
  };

  const submitUniverse = (cpState) => {

    console.log("STEP CAT:09 submit MAJ UNIVERSE Submit universe begonning vitriine1 ", cpState);
    connector({
      method: cpState.id.value ? "put" : "post",
      url: `${endPoints.UNIVERSE}${cpState.id.value ? "/" + cpState.id.value : ""
        }`,
      data: {
        name: cpState.name.value,
        nameCategory: cpState.nameCategory.value,
        nameSubCategory: cpState.nameSubCategory.value,
        requireSearchSubCategory: cpState.requireSearchSubCategory.value,
        position: cpState.position.value,
        description: cpState.description.value,
        descriptionPictures: cpState.descriptionPictures.value,
        image: cpState.image.value,
        imageHome: cpState.imageHome.value,
        filenameimage1: cpState.filenameimage1.value,
        filenameimage2: cpState.filenameimage2.value,
        filenameimage3: cpState.filenameimage3.value,
        labelanatomie: cpState.labelanatomie.value,
        filenameanatomie: cpState.filenameanatomie.value,
        bonusreparation: cpState.bonusreparation.value,
        pictures: cpState.pictures.value,
        enabled: cpState.enabled.value,
        anatomieactivated: cpState.anatomieactivated.value,
        bonusdetails: cpState.bonusdetails.value
      },
      success: (response) => {
        console.log("MAJ UNIVERSES trace 1, SUCESS ", response.data);
        refreshItem(response.data, cpState.id.value);
        console.log("MAJ UNIVERSES , trace 2,Check vitrine  SUCESS ", response.data);
        setIsPending(false);
        console.log("MAJ UNIVERSES, trace 3 Check vitrine again SUCESS ", response.data);
        msgSuccess("Vos modifications ont bien été prises en compte.");
      },
      catch: (error) => {
        console.log(error);
        setIsPending(false);
        msgErrors({ msg: "Quelque chose s'est mal passé." });
      },
    });
  };

  const saveUniverse = () => {
    if (!isPending) {
      console.log("Step CAT:01 saveUniverse 0SaveUniverse ", state.descriptionPictures)
      setIsPending(true);
      setMessage(null);
      setState(clearErrors(state));
      if (
        state.name.value &&
        state.nameCategory.value &&
        state.nameSubCategory.value &&
        (state.image.value || state.image.file || state.imageHome.file || state.imageHome.value || state.filenameimage1.file || state.filenameimage1.value
               
          )
      ) {
        let files = getFilesBase64(state.descriptionPictures.value);
        const cpState = { ...state };
        cpState.pictures.file = files;
        console.log("Step CAT:02 universe 1 Save image cpState ", cpState) // ok validé
        //setState(cpState);

        console.log("Step CAT:03 universe 1 Save image State ", state) // ok aussi validé
        if (cpState.image.file) {
          console.log("Step CAT:031 Image SAving  saveImage ");

          saveImage(cpState);
        };
        if (state.imageHome.file) {

          console.log("Step CAT:032 Image SAving  saveImageHome state ", state.imageHome.file);
          console.log("Step CAT:033 Image SAving  saveImageHome cpstate", cpState.imageHome.file);


          saveImageHome(cpState);
        }
        if (    state.filenameimage1.file) {

          console.log("Step CAT:042 Image SAving  filenameimage1 ", state.filenameimage1.file);
          console.log("Step CAT:043 Image SAving  filenameimage1 ", cpState.filenameimage1.file);
          saveFilenameimage1(cpState);

        }
        if (  state.filenameimage2.file) {

          console.log("Step CAT:0422 Image SAving  filenameimage2 ", state.filenameimage2.file);
          console.log("Step CAT:0432 Image SAving  filenameimage2 ", cpState.filenameimage2.file);
           saveFilenameimage2(cpState);

        }
        if (   state.filenameimage3.file) {

          console.log("Step CAT:0422 Image SAving  filenameimage3 ", state.filenameimage3.file);
          console.log("Step CAT:0433 Image SAving  filenameimage3 ", cpState.filenameimage3.file);
           saveFilenameimage3(cpState);

        }
        if (   state.filenameanatomie.file) {

          console.log("Step CAT:0522 Image SAving  filenameanatomie ", state.filenameanatomie.file);
          console.log("Step CAT:0533 Image SAving  filenameanatomie ", cpState.filenameanatomie.file);
            saveFilenameAnatomie(cpState);

        }
        
        

        else if (files.length) {
          savePictures(cpState);
        }
        else {
          submitUniverse(cpState);
        }
      } else {
        const msg = "Vérifier si les champs obligatoires sont remplis.";
        msgErrors({
          name: !state.name.value,
          nameCategory: !state.nameCategory.value,
          nameSubCategory: !state.nameSubCategory.value,
          image: !state.image.value,
          msg,
        });
        setIsPending(false);
      }
    }
  };

  const saveImage = (cpState) => {
    const data = new FormData();
    data.append("file", cpState.image.file);
    console.log("STEP CAT:06-1   IMAGE saveIMAGE KM Begin  process  ", cpState.image);
    connector({
      method: "post",
      url: endPoints.ANONYMOUS_MEDIA_OBJECT,
      data,
      success: (response) => {
        cpState.image.file = null;
        cpState.image.value = response.data.contentUrl;
        console.log("STEP CAT:05 IMAGE saveImage Success ", cpState.image.value);
        setState(cpState);


      },
      catch: (error) => {
        const msg = error?.response?.data["hydra:description"];
        msgErrors({ msg });
        setIsPending(false);
        scrollTop("side-content-dashboard");
      },
    });
  };

  const saveImageHome = (cpState) => {

    const data = new FormData();
    console.log("STEP CAT:06-1   IMAGE saveImageHome Begin  process  ", cpState.imageHome);
    data.append("file", cpState.imageHome.file);
    console.log("STEP CAT:06-2   IMAGE saveImageHome Begin  process  ", cpState.imageHome);
    connector({
      method: "post",
      url: endPoints.ANONYMOUS_MEDIA_OBJECT,
      data,
      success: (response) => {
        console.log("STEP CAT:06-21 IMAGE saveImageHome Success ", cpState.imageHome.value);
        cpState.imageHome.file = null;
        cpState.imageHome.value = response.data.contentUrl;
        console.log("STEP CAT:06-22 IMAGE saveImageHome Success ", cpState.imageHome.value);
        setState(cpState);    
        console.log("STEP CAT:06-23 IMAGE saveImageHome Success ", cpState.imageHome.value);
        setIsPending(false);
        console.log("STEP CAT:06-24 IMAGE saveImageHome Success ", cpState.imageHome.value);

      },
      catch: (error) => {

        const msg = error?.response?.data["hydra:description"];
        console.log("STEP CAT:06-23 ERROR IMAGE saveImageHome Success ", msg);
        msgErrors({ msg });
        setIsPending(false);
        scrollTop("side-content-dashboard");
      },
    });

  };

  const saveFilenameimage1 = (cpState) => {
    if (cpState.filenameimage1.file) {
      const data = new FormData();
      data.append("file", cpState.filenameimage1.file);
      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          cpState.filenameimage1.file = null;
          cpState.filenameimage1.value = response.data.contentUrl;
          setState(cpState);
          setIsPending(false);

        },
        catch: (error) => {
          const msg = error?.response?.data["hydra:description"];
          msgErrors({ msg });
          setIsPending(false);
          scrollTop("side-content-dashboard");
        },
      });
    } else {
      savePictures(cpState);
    }
  };

  const saveFilenameimage2 = (cpState) => {
    if (cpState.filenameimage2.file) {
      const data = new FormData();
      data.append("file", cpState.filenameimage2.file);
      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          cpState.filenameimage2.file = null;
          cpState.filenameimage2.value = response.data.contentUrl;
          setState(cpState);
          setIsPending(false);

        },
        catch: (error) => {
          const msg = error?.response?.data["hydra:description"];
          msgErrors({ msg });
          setIsPending(false);
          scrollTop("side-content-dashboard");
        },
      });
    } else {
      savePictures(cpState);
    }
  };
  const saveFilenameimage3 = (cpState) => {
    if (cpState.filenameimage3.file) {
      const data = new FormData();
      data.append("file", cpState.filenameimage3.file);
      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          cpState.filenameimage3.file = null;
          cpState.filenameimage3.value = response.data.contentUrl;
          setState(cpState);
          setIsPending(false);

        },
        catch: (error) => {
          const msg = error?.response?.data["hydra:description"];
          msgErrors({ msg });
          setIsPending(false);
          scrollTop("side-content-dashboard");
        },
      });
    } else {
      savePictures(cpState);
    }
  };

  const saveFilenameAnatomie = (cpState) => {
    if (cpState.filenameanatomie.file) {
      const data = new FormData();
      data.append("file", cpState.filenameanatomie.file);
      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          cpState.filenameanatomie.file = null;
          cpState.filenameanatomie.value = response.data.contentUrl;
          setState(cpState);
          setIsPending(false);

        },
        catch: (error) => {
          const msg = error?.response?.data["hydra:description"];
          msgErrors({ msg });
          setIsPending(false);
          scrollTop("side-content-dashboard");
        },
      });
    } else {
      savePictures(cpState);
    }
  };



  const savePictures = (cpState) => {
    console.log("STEP CAT:10 save picture ", cpState);
    if (cpState.pictures.file.length) {
      const file = cpState.pictures.file[0];
      const data = new FormData();
      data.append("file", dataType64toFile(file));

      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          cpState.pictures.file = cpState.pictures.file.slice(1);
          const urlImage = `${process.env.REACT_APP_API_URI}${response.data.contentUrl}`;
          cpState.descriptionPictures.value =
            cpState.descriptionPictures.value.replace(file, urlImage);
          cpState.pictures.value.push(response.data.contentUrl);
          setState(cpState);
          savePictures(cpState);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    } else {
      submitUniverse(cpState);
    }
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    const cpState = { ...state };
    if (e.name !== undefined) cpState.name.error = e.name;
    if (e.nameCategory !== undefined)
      cpState.nameCategory.error = e.nameCategory;
    if (e.nameSubCategory !== undefined)
      cpState.nameSubCategory.error = e.nameSubCategory;
    if (e.image !== undefined) cpState.image.error = e.image;
    setState(cpState);
    scrollTop("side-content-dashboard");
  };

  const msgSuccess = (text) => {
    if (text !== undefined) setMessage({ type: "success", text });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    scrollTop("side-content-dashboard");
  };

  const getPathImage = (image) =>
    image.file
      ? URL.createObjectURL(image.file)
      : image.value
        ? vars.pathImage + image.value
        : noImage;

  const refreshItem = (item, id, action = null) => {
    if (item["@type"] === "Universe") {
      item.children = item.categories;
      delete item.categories;
    }
    const cpItems = [...universesCategories];

    if (id) {
      let indexUni, indexCat, indexSubCat;
      [indexUni, indexCat, indexSubCat] = findIndexCats(cpItems, item);
      if (action === "delete") {
        if (indexSubCat > -1) {
          cpItems[indexUni].children[indexCat].children = cpItems[
            indexUni
          ].children[indexCat].children.filter(
            (value, index, arr) => index !== indexSubCat
          );
        } else if (indexCat > -1) {
          cpItems[indexUni].children = cpItems[indexUni].children.filter(
            (value, index, arr) => index !== indexCat
          );
        } else if (indexUni > -1) {
          cpItems = cpItems.filter((value, index, arr) => index !== indexUni);
        }
      } else {
        if (indexSubCat > -1) {
          cpItems[indexUni].children[indexCat].children[indexSubCat] = item;
        } else if (indexCat > -1) {
          cpItems[indexUni].children[indexCat] = item;
        } else if (indexUni > -1) {
          cpItems[indexUni] = { ...item, children: cpItems[indexUni].children };
        }
      }
    } else {
      if (item["@type"] === "Universe") {
        cpItems.push(item);
      } else if (item["@type"] === "Category") {
        if (item.level === 0) {
          const indexUni = cpItems.findIndex(
            (cat) => cat["@id"] === item.universe
          );
          cpItems[indexUni].children.push(item);
        } else if (item.level === 1) {
          let indexUni, indexCat;
          cpItems.some((universe, indexI) => {
            const indexJ = universe.children.findIndex(
              (cat) => cat["@id"] === item.parent
            );
            if (indexJ > -1) {
              indexUni = indexI;
              indexCat = indexJ;
              return true;
            }
            return false;
          });
          cpItems[indexUni].children[indexCat].children.push(item);
        }
      }
    }
    setUniversesCategories(cpItems);

    if (action === "delete") {
      setCategory(false);
    } else {
      setActiveCategory(item, cpItems);
    }
  };

  const newItem = (item, items) => {
    if (item) {
      if (item["@type"] === "Universe") {
        item = {
          "@type": "Category",
          position: item.children.length,
          level: 0,
          universe: item["@id"],
          parent: null,
        };
      } else if (item["@type"] === "Category" && item.level === 0) {
        item = {
          "@type": "Category",
          position: item.children.length,
          level: 1,
          universe: null,
          parent: item["@id"],
        };
      }
    } else {
      item = {
        "@type": "Universe",
        position: items.length,
        level: null,
        universe: null,
        parent: null,
        nameCategory: "Catégorie(s)",
        nameSubCategory: "Sous-catégories(s)",
        requireSearchSubCategory: false
      };
    }

    setActiveCategory(
      {
        ...item,
        id: null,
        name: null,
        adjacent: item?.children?.length
          ? item.children[item.children.length - 1]
          : {},
        image: null,
        imageHome: null,
        filenameimage1: null,
        filenameimage2: null,
        filenameimage3: null,
        filenameanatomie: null,
        pictures: [],
        nameCategory: item?.nameCategory || "",
        nameSubCategory: item?.nameSubCategory || "",
        requireSearchSubCategory: item?.requireSearchSubCategory || false,
        description: "",
        descriptionPictures: "",
        enabled: false,
        anatomieactivated:0,
      },
      items
    );
  };

  const getxPathImage = (image) =>
    image.file
      ? URL.createObjectURL(image.file)
      : image.value
        ? vars.pathImage + image.value
        : noImage;
  const getUrlServices = (cat) => {
    let params = "";
    if (cat.level === 0) {
      params = `?category=${cat.id}`;
    } else if (cat.parent) {
      params = `?category=${cat.parent.replace(
        "/api/anonymous/category/",
        ""
      )}&subCategory=${cat.id}`;
    }
    return `${ROUTES.SERVICES.url}${params}`;
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent titlePage="Catégories">
          <BlocAccordions>
            <ListSort
              data={universesCategories}
              onSortEnd={onSortEnd}
              setOrderChildren={setOrderChildren}
              useDragHandle
              setActiveCategory={setActiveCategory}
              newItem={newItem}
              savePosition={savePosition}
            />
            <BtnAccordAdd
              className={`default-btn-add level-btn`}
              onClick={() => newItem(false, universesCategories)}
            >
              <AddGreenIcon /> Ajouter un univers
            </BtnAccordAdd>
          </BlocAccordions>
        </DashboardContent>
        {category && openSide ? (
          <DashboardSide>
            <div className="content-side-categorie">
              {isMobile && (
                <>
                  <CloseButton
                    onClick={(e) => {
                      setOpenSide(false);
                    }}
                  />
                </>
              )}
              <h2 className="title-side-dashboard">
                {category.name
                  ? category.name
                  : category["@type"] === "Universe"
                    ? "Ajouter un univers"
                    : category.level === 0
                      ? "Ajouter une catégorie"
                      : "Ajouter une sous-catégorie"}
              </h2>
              <Form
                className={
                  category["@type"] === "Universe"
                    ? "form-parent-cat"
                    : "form-cat-itemƒ"
                }
              >
                {message && message.type && message.text ? (
                  <span
                    className={
                      message.type === "error" ? "text-danger" : "text-success"
                    }
                  >
                    {message.text}
                  </span>
                ) : (
                  ""
                )}
                <Input
                  {...state.name}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.name.value = e.target.value;
                    setState(cpState);
                    setMessage(null);
                  }}
                />

                {category["@type"] === "Universe" ? (
                  <>
                    <Input
                      {...state.nameCategory}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.nameCategory.value = e.target.value;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />

                    <Input
                      {...state.nameSubCategory}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.nameSubCategory.value = e.target.value;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />

                    <SingleCheckbox
                      {...state.requireSearchSubCategory}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.requireSearchSubCategory.value = e.target.checked;
                        cpState.requireSearchSubCategory.error = false;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />

                    <Input
                      {...state.description}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.description.value = e.target.value;
                        setState(cpState);
                      }}
                    />
                    <p className="form-label-title">Image d'accueil</p>
                    <div
                      className={`image-service ${state.imageHome.error ? "form-error" : ""
                        }`}
                    >
                      <img src={getPathImage(state.imageHome)} alt="" />
                      <input
                        type="file"
                        name="file"
                        id="uploadImageHome"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.imageHome.file = e.target.files[0];
                          e.target.value = "";
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <div className="btns-file">
                        <label htmlFor="uploadImageHome" className="edit-image">
                          <EditIcon />
                        </label>
                        {state.imageHome.value || state.imageHome.file ? (
                          <button
                            className="delete-image"
                            onClick={(e) => {
                              e.preventDefault();
                              const cpState = { ...state };
                              cpState.imageHome.value = "";
                              cpState.imageHome.file = null;
                              setState(cpState);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p className="form-label-title">Image *</p>
                    <div
                      className={`image-service ${state.image.error ? "form-error" : ""
                        }`}
                    >
                      <img src={getPathImage(state.image)} alt="" />
                      <input
                        type="file"
                        name="file"
                        id="uploadImage"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const cpState = { ...state };

                          cpState.image.file = e.target.files[0];
                          e.target.value = "";
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <div className="btns-file">
                        <label htmlFor="uploadImage" className="edit-image">
                          <EditIcon />
                        </label>
                        {state.image.value || state.image.file ? (
                          <button
                            className="delete-image"
                            onClick={(e) => {
                              e.preventDefault();
                              const cpState = { ...state };
                              cpState.image.value = "";
                              cpState.image.file = null;
                              setState(cpState);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>



                    <Input
                      {...state.filenameimage1}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.filenameimage1.value = e.target.value;

                        setState(cpState);
                      }}
                    />
                    <p className="form-label-title">Image Gauche vitrine *</p>
                    <div
                      className={`image-service ${state.filenameimage1.error ? "form-error" : ""
                        }`}
                    >
                      <img src={getxPathImage(state.filenameimage1)} alt="" />
                      <input
                        type="file"
                        name="file"
                        id="uploadImage1"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.filenameimage1.file = e.target.files[0];
                          e.target.value = "";
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <div className="btns-file">
                        <label htmlFor="uploadImage1" className="edit-image">
                          <EditIcon />
                        </label>
                        {state.filenameimage1.value || state.filenameimage1.file ? (
                          <button
                            className="delete-image"
                            onClick={(e) => {
                              e.preventDefault();
                              const cpState = { ...state };
                              cpState.filenameimage1.value = "";
                              cpState.filenameimage1.file = null;
                              setState(cpState);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <Input
                      {...state.filenameimage2}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.filenameimage2.value = e.target.value;
                        setState(cpState);
                      }}
                    />
                    <p className="form-label-title">Image Centre vitrine *</p>
                    <div
                      className={`image-service ${state.filenameimage2.error ? "form-error" : ""
                        }`}
                    >
                      <img src={getxPathImage(state.filenameimage2)} alt="" />
                      <input
                        type="file"
                        name="file"
                        id="uploadImage2"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.filenameimage2.file = e.target.files[0];
                          e.target.value = "";
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <div className="btns-file">
                        <label htmlFor="uploadImage2" className="edit-image">
                          <EditIcon />
                        </label>
                        {state.filenameimage2.value || state.filenameimage2.file ? (
                          <button
                            className="delete-image"
                            onClick={(e) => {
                              e.preventDefault();
                              const cpState = { ...state };
                              cpState.filenameimage2.value = "";
                              cpState.filenameimage2.file = null;
                              setState(cpState);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>


                    <Input
                      {...state.filenameimage3}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.filenameimage3.value = e.target.value;
                        setState(cpState);
                      }}
                    />
                      <p className="form-label-title">Image Droite vitrine *</p>
                    <div
                      className={`image-service ${state.filenameimage3.error ? "form-error" : ""
                        }`}
                    >
                      <img src={getxPathImage(state.filenameimage3)} alt="" />
                      <input
                        type="file"
                        name="file"
                        id="uploadImage3"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.filenameimage3.file = e.target.files[0];
                          e.target.value = "";
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <div className="btns-file">
                        <label htmlFor="uploadImage3" className="edit-image">
                          <EditIcon />
                        </label>
                        {state.filenameimage3.value || state.filenameimage3.file ? (
                          <button
                            className="delete-image"
                            onClick={(e) => {
                              e.preventDefault();
                              const cpState = { ...state };
                              cpState.filenameimage3.value = "";
                              cpState.filenameimage3.file = null;
                              setState(cpState);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>


                    <Input
                      {...state.filenameanatomie}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.filenameanatomie.value = e.target.value;
                        setState(cpState);
                      }}
                    />

<p className="form-label-title">Image Anatomie *</p>
                    <div
                      className={`image-service ${state.filenameanatomie.error ? "form-error" : ""
                        }`}
                    >
                      <img src={getxPathImage(state.filenameanatomie)} alt="" />
                      <input
                        type="file"
                        name="file"
                        id="uploadImage4"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.filenameanatomie.file = e.target.files[0];
                          e.target.value = "";
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                      <div className="btns-file">
                        <label htmlFor="uploadImage4" className="edit-image">
                          <EditIcon />
                        </label>
                        {state.filenameanatomie.value || state.filenameanatomie.file ? (
                          <button
                            className="delete-image"
                            onClick={(e) => {
                              e.preventDefault();
                              const cpState = { ...state };
                              cpState.filenameanatomie.value = "";
                              cpState.filenameanatomie.file = null;
                              setState(cpState);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>






                    <Input
                      {...state.labelanatomie}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.labelanatomie.value = e.target.value;
                        setState(cpState);
                      }}
                    />



                    <RadioButton
                      {...state.bonusreparation}
                      onChange={(val) => {
                        const cpState = { ...state };
                        cpState.bonusreparation.value = val.value;
                        cpState.bonusreparation.error = false;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />

                    <RadioButton
                      {...state.enabled}
                      onChange={(val) => {
                        const cpState = { ...state };
                        cpState.enabled.value = val.value;
                        setState(cpState);
                      }}
                    />


<RadioButton
                      {...state.anatomieactivated}
                      onChange={(val) => {
                        const cpState = { ...state };
                        cpState.anatomieactivated.value = val.value;
                        setState(cpState);
                      }}
                    />






                    <WysiwygEditor
                      {...state.descriptionPictures}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.descriptionPictures.value = e || "";
                        if (cpState.pictures.value.length) {
                          cpState.pictures.value =
                            cpState.pictures.value.filter(
                              (picture) =>
                                cpState.descriptionPictures.value.indexOf(
                                  picture
                                ) !== -1
                            );
                        }
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                    <div className="btns-alings">
                      {category.name && (
                        <ButtonDef
                          className="btn-delete"
                          textButton="Supprimer"
                          spinner={isPending}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            setDataModal({
                              type: "modal-save",
                              title: "Confirmer la suppression",
                              action: "deleteUniverse",
                            });
                          }}
                        />
                      )}
                      <ButtonDef
                        textButton="Enregistrer"
                        spinner={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          saveUniverse();
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="btns-alings">
                      {category.name ? (
                        <ButtonDef
                          className="btn-delete"
                          textButton="Supprimer"
                          spinner={isPending}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            setDataModal({
                              type: "modal-save",
                              title: "Confirmer la suppression",
                              action: "deleteCategory",
                            });
                          }}
                        />
                      ) : (
                        ""
                      )}
                      <ButtonDef
                        textButton="Enregistrer"
                        spinner={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          saveCategory();
                        }}
                      />
                    </div>

                    {!state.id.value ? (
                      ""
                    ) : category.totalServices ? (
                      <div className="link-voir">
                        <Link to={getUrlServices(category)}>
                          {" "}
                          {category.totalServices} service(s) lié(s){" "}
                        </Link>
                      </div>
                    ) : (
                      <div className="link-voir-0">
                        <Link to={"#"}> 0 service(s) lié(s) </Link>
                      </div>
                    )}
                  </>
                )}

                <PopinModal
                  show={showModal}
                  handleClose={() => {
                    setShowModal(false);
                  }}
                  title={dataModal.title}
                >
                  <div className="btns-confirm">
                    <ButtonDef
                      className="btn-light"
                      textButton="Non"
                      spinner={isPending}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(false);
                      }}
                    />
                    <ButtonDef
                      textButton="Oui"
                      spinner={isPending}
                      onClick={(e) => {
                        e.preventDefault();
                        if (dataModal.action === "deleteUniverse") {
                          deleteUniverse();
                        } else if (dataModal.action === "deleteCategory") {
                          deleteCategory();
                        }
                      }}
                    />
                  </div>
                </PopinModal>
              </Form>
            </div>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
}
