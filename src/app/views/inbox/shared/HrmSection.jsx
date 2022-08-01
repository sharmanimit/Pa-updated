import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Breadcrumb } from "../../../../matx";
import history from "../../../../history";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect, useDispatch } from "react-redux";
import {
  sendFilesInternalServiceNumber,
  getInternalServiceNumber,
  getGroupList,
  getSection,
  getServiceNumber,
  sendFilesSection,
  sendFilesServiceNumber,
  PCFileClosuer,
  addToFavourite,
  fetchFavouriteList,
  deleteFavourite,
} from "../../../camunda_redux/redux/action";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Draggable from "react-draggable";
import CloseIcon from "@material-ui/icons/Close";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Loading } from "../therme-source/material-ui/loading";

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "80%",
    maxWidth: "80%",
    paddingBottom: "1rem",
  },
  marginTop: {
    marginTop: "2%",
  },
  title: {
    fontSize: "1.2rem",
    display: "block",
    textAlign: "center",
  },
  mainDiv: {
    width: "100%",
    height: "70vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "1rem",
  },
  centerDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: "2.5rem",
    border: "1px solid #b6b6b66b",
    marginTop: "1rem",
    borderRadius: ".5rem",
  },
  innerDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const HrmSection = (props) => {
  const { t } = useTranslation();

  let title = Cookies.get("inboxFile");
  let priority = Cookies.get("priority");
  let referenceNumber = Cookies.get("referenceNumber");
  let hasCoverNote = Cookies.get("hasCoverNote");


  const classes = useStyles();
  const dispatch = useDispatch();
  const [section, setSection] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [service, setService] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [serviceObj, setServiceObj] = useState([]);
  const [intService, setIntService] = useState("");
  const [intServiceList, setIntServiceList] = useState([]);
  const [intServiceObj, setIntServiceObj] = useState([]);
  const [blnDisable, setBlnDisable] = useState(true);
  const [addFavBlnDisable, setAddFavBlnDisable] = useState(true);
  const [deleteFavBlnDisable, setDeleteFavBlnDisable] = useState(true);
  const [role, setRole] = useState("");
  const [load, setLoad] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [favSection, setFavSection] = useState("");
  const [sectionFavouriteList, setSectionFavouriteList] = useState([]);
  const [favService, setFavService] = useState("");
  const [serviceFavouriteList, setServiceFavouriteList] = useState([]);
  const [favIntService, setFavIntService] = useState("");
  const [intServiceFavouriteList, setIntServiceFavouriteList] = useState([]);
  const [favIntServiceDepName, setFavIntServiceDepName] = useState("");
  const [favServiceDepName, setFavServiceDepName] = useState("");
  const hrmRole = Cookies.get("HrmRole");
  const sessionRole = sessionStorage.getItem("role");
  const displayUsername = sessionStorage.getItem("displayUserName")

  const callMessageSuccess = () => {
    dispatch(
     setSnackbar(true, "success", "File has been send successfully!")
   )
 };

  const approveRejectMessage = (msg) => {
    dispatch(
      setSnackbar(true, "success", msg)
    )
  }

  const handleOnChange = (newValue) => {
    let roleData = !isNullOrUndefined(newValue) && newValue.split(" | ")[1];
    setRole(roleData);
    let strSection =
      !isNullOrUndefined(newValue) &&
      newValue.substr(0, newValue.indexOf(" |"));
    setSection(strSection);
    newValue && newValue.length > 0 && handleClearList("section");
  };

  const handleInputValueChange = async (newValue) => {
    console.log("handleInputValueChange", newValue);
    await props.getSection(newValue).then((resp) => {
      console.log(resp);
      let tmpArray = [];
      for (var i = 0; i < resp.data.length; i++) {
        tmpArray.push(
          `${resp.data[i].deptName} | ${resp.data[i].deptCoordRole}`
        );
      }
      setSectionList(tmpArray);
    });
    setServiceList([]);
    setIntServiceList([]);
  };

  const handleOnChangeService = (newValue) => {
    let roleData = !isNullOrUndefined(newValue) && newValue.split(" | ")[1];
    setRole(roleData);
    let data =
      !isNullOrUndefined(newValue) &&
      newValue.substr(0, newValue.indexOf(" |"));
    setService(data);
    newValue && newValue.length > 0 && handleClearList("service");
  };

  const handleInputValueChangeService = async (newValue) => {
    await props.getServiceNumber(newValue).then((resp) => {
      console.log({ resp });
      let tmpArray = [];
      const response = resp.data;
      setServiceObj(response);
      for (var i = 0; i < resp.data.length; i++) {
        tmpArray.push(
          `${resp.data[i].deptUsername} | ${resp.data[i].deptRole}`
        );
      }
      setServiceList(tmpArray);
    });
    setSectionList([]);
    setIntServiceList([]);
  };

  const handleOnChangeInternalService = async (newValue) => {
    let roleData = !isNullOrUndefined(newValue) && newValue.split(" | ")[1];
    setRole(roleData);
    let data =
      !isNullOrUndefined(newValue) &&
      newValue.substr(0, newValue.indexOf(" |"));
    setIntService(data);
    newValue && newValue.length > 0 && handleClearList("internal_service");
  };

  const handleInputValueChangeInternalService = async (newValue) => {
    const dept = sessionStorage.getItem("department");
    await props.getInternalServiceNumber(newValue, dept).then((resp) => {
      let tmpArray = [];
      setIntServiceObj(resp.data);
      for (var i = 0; i < resp.data.length; i++) {
        tmpArray.push(
          `${resp.data[i].deptUsername} | ${resp.data[i].deptRole}`
        );
      }
      setIntServiceList(tmpArray);
    });
    setSectionList([]);
    setServiceList([]);
  };

  const handleClearList = (type) => {
    switch (type) {
      case "service":
        return (
          setSection(""),
          setIntService(""),
          setFavService(""),
          setFavSection(""),
          setFavIntService("")
        );
      case "section":
        return (
          setService(""),
          setIntService(""),
          setFavService(""),
          setFavSection(""),
          setFavIntService("")
        );
      case "internal_service":
        return (
          setSection(""),
          setService(""),
          setFavService(""),
          setFavSection(""),
          setFavIntService("")
        );
      case "fav_service":
        return (
          setSection(""),
          setIntService(""),
          setService(""),
          setFavSection(""),
          setFavIntService("")
        );
      case "fav_section":
        return (
          setSection(""),
          setIntService(""),
          setFavService(""),
          setService(""),
          setFavIntService("")
        );
      case "fav_internal_service":
        return (
          setSection(""),
          setIntService(""),
          setFavService(""),
          setFavSection(""),
          setService("")
        );
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      service ||
      section ||
      intService ||
      favSection ||
      favService ||
      favIntService
    ) {
      setBlnDisable(false);
    } else {
      setBlnDisable(true);
    }

    if (service || section || intService) {
      setAddFavBlnDisable(false);
    } else {
      setAddFavBlnDisable(true);
    }

    if (favSection || favService || favIntService) {
      setDeleteFavBlnDisable(false);
    } else {
      setDeleteFavBlnDisable(true);
    }
  }, [section, service, intService, favIntService, favSection, favService]);

  const handleSend = (value) => {
    let group = serviceObj.filter((data) => data.deptRole === role);
    let intGroup = intServiceObj.filter((data) => data.deptRole === role);
    const partcaseID = sessionStorage.getItem("partcaseID");
    const inboxId = sessionStorage.getItem("InboxID");
    const fromRole = sessionStorage.getItem("role");
    const sectionData = {
      groupName: section,
      roleName: role,
      fromRole: fromRole,
      displayDeptName: section,
    };
    if (section.length > 0) {
      props
        .sendFilesSection(inboxId, sectionData, value)
        .then((resp) => {
          callMessageSuccess();
          history.push({ pathname: "/eoffice/inbox/file" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (service.length > 0) {
      const serviceNumberData = {
        groupName: group[0].deptName,
        roleName: role,
        userName: service,
        fromRole: fromRole,
        displayDeptName: group[0].deptName,
      };
      props
        .sendFilesServiceNumber(inboxId, serviceNumberData, value)
        .then((resp) => {
          callMessageSuccess();
          history.push({ pathname: "/eoffice/inbox/file" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (intService.length > 0) {
      const intServiceNumberData = {
        groupName: intGroup[0].deptName,
        roleName: role,
        userName: intService,
        fromRole: fromRole,
        displayDeptName: intGroup[0].deptName,
      };
      props
        .sendFilesInternalServiceNumber(inboxId, intServiceNumberData, value)
        .then((resp) => {
          callMessageSuccess();
          history.push({ pathname: "/eoffice/inbox/file" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (favSection.length > 0) {
      const favData = {
        groupName: favSection,
        roleName: role,
        fromRole: fromRole,
        displayDeptName: favSection
      };
      props.sendFilesSection(inboxId, favData, value).then(resp => {
        console.log(resp)
        setRole("")
        callMessageSuccess();
        history.push({ pathname: "/eoffice/inbox/file" });
      }).catch(err => {
        console.log(err)
      })
    } else if (favService.length > 0) {
      const favData = {
        groupName: favServiceDepName,
        roleName: role,
        userName: favService,
        fromRole: fromRole,
        displayDeptName: favServiceDepName
      };
      props
        .sendFilesServiceNumber(inboxId, favData, value)
        .then((resp) => {
          setRole("")
          callMessageSuccess();
          history.push({ pathname: "/eoffice/inbox/file" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (favIntService.length > 0) {
      const intServiceNumberData = {
        groupName: favIntServiceDepName,
        roleName: role,
        userName: favIntService,
        fromRole: fromRole,
        displayDeptName: favIntServiceDepName,
      };
      props
        .sendFilesInternalServiceNumber(inboxId, intServiceNumberData, value)
        .then((resp) => {
          setRole("")
          callMessageSuccess();
          history.push({ pathname: "/eoffice/inbox/file" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSendConfirmation = (value) => {
    console.log("Confirmation Value: ", value);
    setOpenConfirmation(false);
    setLoad(true);
    const inboxId = sessionStorage.getItem("InboxID");
    if (value != null) {
      props.PCFileClosuer(inboxId, value).then((resp) => {
        console.log({resp})
        if(value === "Approved"){
          approveRejectMessage("File has been approved successfully")
        }else if(value === "Rejected"){
          approveRejectMessage("File has been rejected ")
        }
        
        if (resp) {
          setLoad(false);
          
        }
        history.push({ pathname: "/eoffice/inbox/file" });
      });
    }
  };

  const handleAddToFavourite = async () => {
    let data = section
      ? section
      : service
        ? service
        : intService
          ? intService
          : "";
    let type = section
      ? "section"
      : service
        ? "service"
        : intService
          ? "internalService"
          : "";
    await props
      .addToFavourite(data, sessionRole, type)
      .then((resp) => {
        console.log(resp);
        fetchFavourite();
        dispatch(
          setSnackbar(true, "success", "Add to favourate list successfully")
        )
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFavourite = async () => {
    await props
      .fetchFavouriteList(sessionRole)
      .then((resp) => {
        console.log(resp);
        const { internalServiceFavourite, sectionFavourite, serviceFavourite } =
          resp.favourite;
        setSectionFavouriteList(sectionFavourite);
        setServiceFavouriteList(serviceFavourite);
        setIntServiceFavouriteList(internalServiceFavourite);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFavourite();
  }, []);

  const handleDeleteFavourite = () => {
    let data = favSection
      ? favSection
      : favService
        ? favService
        : favIntService
          ? favIntService
          : "";
    let type = favSection
      ? "section"
      : favService
        ? "service"
        : favIntService
          ? "internalService"
          : "";
    props
      .deleteFavourite(data, sessionRole, type)
      .then((resp) => {
        console.log(resp);
        fetchFavourite();
        setFavSection("");
        setFavService("");
        setFavIntService("");
        dispatch(
          setSnackbar(true, "success", "Delete to favourate list successfully")
        )
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChangeFavInternalService = async (value) => {
    setFavIntService(value);
    handleClearList("fav_internal_service");
    const dept = sessionStorage.getItem("department");
    await props
      .getInternalServiceNumber(value, dept)
      .then((resp) => {
        console.log(resp);
        const data =
          resp.data && resp.data.find((ele) => ele.deptUsername === value);
        setFavIntServiceDepName(data.deptName);
        setRole(data.deptCoordRole)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChangeFavSection = async (value) => {
    setFavSection(value);
    handleClearList("fav_section");
    await props
      .getSection(value)
      .then((resp) => {
        console.log(resp);
        let data =
          resp.data && resp.data.find((ele) => ele.deptName === value);
        setRole(data.deptCoordRole)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChangeFavService = async (value) => {
    setFavService(value);
    handleClearList("fav_service");
    await props
      .getServiceNumber(value)
      .then((resp) => {
        let data =
          resp.data && resp.data.find((ele) => ele.deptUsername === value);
        setFavServiceDepName(data.deptName);
        setRole(data.deptCoordRole)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(intServiceFavouriteList, favIntService)

  return (
    <>
      {load && <Loading />}
      <div className="m-sm-30">
        <div style={{ marginTop: "1rem" }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid xs={12}>
              <Breadcrumb
                routeSegments={[
                  { name: t("file"), path: "/eoffice/splitView/file" },
                  { name: t("HRM_section"), path: "/eoffice/hrmSection/file" },
                ]}
                otherData={[
                  { key: "Title", value: title },
                  { key: "Ref no", value: referenceNumber },
                  { key: "Priority", value: priority },
                ]}
              />
            </Grid>
          </Grid>
        </div>
        <Grid className={classes.mainDiv} container spacing={2}>
          <Grid className={classes.centerDiv}>
            <Typography
              className={classes.title}
              variant="button"
              color={"primary"}
              style={{
                marginTop: "1rem",
                fontSize: "1rem",
              }}
            >
              {t("select_to_send_internally_within_section")}
            </Typography>
            <Grid
              container
              justify="center"
              className={classes.marginTop}
              style={{ height: "0px", position: "relative" }}
            >
              <FormControl className={classes.formControl}>
                <Autocomplete
                  options={intServiceList.map((option) => option)}
                  id="tags-outlined"
                  value={intService}
                  onChange={(event, newValue) => {
                    handleOnChangeInternalService(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    if (newInputValue.length >= 3) {
                      handleInputValueChangeInternalService(newInputValue);
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t("search_by_internal_service_number")}
                      placeholder={t("enter_internal_service_number")}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid className={classes.centerDiv}>
            <Typography
              className={classes.title}
              variant="button"
              color={"primary"}
              style={{
                paddingTop: "1rem",
                fontSize: "1rem",
              }}
            >
              {t("select_to_send_to_external_section")}
            </Typography>
            <Grid
              container
              justify="center"
              spacing={2}
              className={classes.marginTop}
            >
              <div className={classes.innerDiv}>
                <Typography
                  variant="button"
                  color={"primary"}
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: ".9rem",
                  }}
                >
                  {t("section")}
                </Typography>
                <FormControl className={classes.formControl}>
                  <Autocomplete
                    options={sectionList.map((option) => option)}
                    value={section}
                    id="tags-outlined"
                    onChange={(event, newValue) => {
                      handleOnChange(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      if (newInputValue.length >= 3) {
                        handleInputValueChange(newInputValue);
                      }
                    }}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={t("search_by_section")}
                        placeholder={t("enter_section")}
                      />
                    )}
                  />
                </FormControl>
              </div>
              <Typography
                variant="button"
                color={"primary"}
                gutterBottom
                style={{
                  fontSize: "2rem",
                }}
              >
                {t("or")}
              </Typography>
              <div className={classes.innerDiv}>
                <Typography
                  variant="button"
                  color={"primary"}
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: ".9rem",
                    textAlign: "center",
                  }}
                >
                  {t("eyes_only_mode")}
                </Typography>
                <FormControl className={classes.formControl}>
                  <Autocomplete
                    options={serviceList.map((option) => option)}
                    id="tags-outlined"
                    value={service}
                    onChange={(event, newValue) => {
                      handleOnChangeService(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      if (newInputValue.length >= 3) {
                        handleInputValueChangeService(newInputValue);
                      }
                    }}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={t("search_by_service_number")}
                        placeholder={t("enter_service_number")}
                      />
                    )}
                  />
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Grid className={classes.centerDiv}>
            <Typography
              className={classes.title}
              variant="button"
              color={"primary"}
              style={{
                marginTop: "1rem",
                fontSize: "1rem",
              }}
            >
              {t("SELECT FROM FAVOURITE LIST")}
            </Typography>
            <div className={classes.innerDiv}>
              <Typography
                variant="button"
                color={"primary"}
                display="block"
                gutterBottom
                style={{
                  fontSize: ".9rem",
                  textAlign: "center",
                }}
              >
                {t("INTERNAL SERVICE")}
              </Typography>
              <FormControl className={classes.formControl}>
                <Autocomplete
                  options={intServiceFavouriteList.map((option) => option)}
                  id="tags-outlined"
                  value={favIntService}
                  onChange={(event, newValue) => {
                    // setFavIntService(newValue)
                    handleOnChangeFavInternalService(newValue);
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t("search_by_internal_service_number")}
                      placeholder={t("enter_internal_service_number")}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className={classes.innerDiv}>
              <Typography
                variant="button"
                color={"primary"}
                display="block"
                gutterBottom
                style={{
                  fontSize: ".9rem",
                  textAlign: "center",
                }}
              >
                {t("section")}
              </Typography>
              <FormControl className={classes.formControl}>
                <Autocomplete
                  options={sectionFavouriteList.map((option) => option)}
                  id="tags-outlined"
                  value={favSection}
                  onChange={(event, newValue) => {
                    handleOnChangeFavSection(newValue);
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t("search_by_section")}
                      placeholder={t("enter_section")}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className={classes.innerDiv}>
              <Typography
                variant="button"
                color={"primary"}
                display="block"
                gutterBottom
                style={{
                  fontSize: ".9rem",
                  textAlign: "center",
                }}
              >
                {t("eyes_only_mode")}
              </Typography>
              <FormControl className={classes.formControl}>
                <Autocomplete
                  options={serviceFavouriteList.map((option) => option)}
                  id="tags-outlined"
                  value={favService}
                  onChange={(event, newValue) => {
                    handleOnChangeFavService(newValue);
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t("search_by_service_number")}
                      placeholder={t("enter_service_number")}
                    />
                  )}
                />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={openConfirmation}
          onClose={() => setOpenConfirmation(false)}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ minWidth: "300px" }}
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            {t("confirmation")}?
            <IconButton
              aria-label="close"
              onClick={() => setOpenConfirmation(false)}
              color="primary"
              style={{ float: "right", padding: "5px !important" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: props.theme ? "#fff" : "black" }}
            >
              {t("confirmation_text")} <br />
              <p></p> {t("confirmation_text_2")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FormControl component="fieldset">
              <RadioGroup row >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label={t("rejectConfirmation")}
                  value="Rejected"
                  onClick={() => handleSendConfirmation("Rejected")}
                  
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label={t("approveConfirmation")}
                  value="Approved"
                  onClick={() => handleSendConfirmation("Approved")}
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label={t("SEND TO")}
                  disabled={blnDisable}
                  value="Send"
                  onClick={()=>handleSend(false)}
                />
              </RadioGroup>
            </FormControl>

          </DialogActions>
        </Dialog>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <div className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  float: "right",
                  marginTop: "2rem",
                }}
                onClick={handleSend}
                disabled={blnDisable}
                endIcon={<SendIcon />}
              >
                {t("send")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  float: "right",
                  marginTop: "2rem",
                  display: `${sessionRole === hrmRole ? "" : "none"}`,
                }}
                onClick={() => setOpenConfirmation(true)}
                endIcon={<MailOutlineIcon />}
              >
                {t("End Task")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  float: "right",
                  marginTop: "2rem",
                  display: `${hasCoverNote === "true" ? "" : "none"}`,
                }}
                disabled={blnDisable}
                onClick={() => handleSend(true)}
                endIcon={<MailOutlineIcon />}
              >
                {t("Send to Next Level")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  float: "right",
                  marginTop: "2rem",
                }}
                disabled={deleteFavBlnDisable}
                onClick={handleDeleteFavourite}
                endIcon={<DeleteOutlineIcon />}
              >
                {t("DELETE FAVOURITE")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  float: "right",
                  marginTop: "2rem",
                }}
                disabled={addFavBlnDisable}
                onClick={handleAddToFavourite}
                endIcon={<ThumbUpIcon />}
              >
                {t("ADD TO FAVOURITE")}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return { props: state.props, theme: state.theme };
}

export default connect(mapStateToProps, {
  sendFilesInternalServiceNumber,
  getInternalServiceNumber,
  getGroupList,
  getSection,
  getServiceNumber,
  sendFilesSection,
  sendFilesServiceNumber,
  PCFileClosuer,
  addToFavourite,
  fetchFavouriteList,
  deleteFavourite,
})(HrmSection);
