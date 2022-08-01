import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  FormControl,
  Icon,
  IconButton,
  MenuItem,
  withStyles,
  MuiThemeProvider,
  Select,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import {
  loadUserRoleData,
  changeTheme,
  myInfo,
  getPersonalInfo,
} from "../../camunda_redux/redux/action";
import { PropTypes } from "prop-types";
import { MatxMenu } from "./../../../matx";
import { isMdScreen } from "utils";
import NotificationBar from "../SharedCompoents/NotificationBar";
import {
  changingTableStatePA,
  changingTableState,
  changingTableStateInbox,
  changingTableStateOutbox,
} from "../../camunda_redux/redux/action/apiTriggers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Layout1.css";
import Cookies from "js-cookie";
import { withTranslation } from "react-i18next";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import InfoForm from "app/views/Personnel/InfoForm";
import CloseIcon from "@material-ui/icons/Close";
import Draggables from "react-draggable";

const PaperComponent = (props) => {
  return (
    <Draggables
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggables>
  );
};

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
});

const elem = document.documentElement;

class Layout1Topbar extends Component {
  state = {
    fullScreen: false,
    comboValue: "",
    comboList: [],
    lightMode: Cookies.get("theme") === "red" ? true : false,
    openInfo: false,
  };

  // componentWillMount() {
  //     const department = sessionStorage.getItem("department");
  //     this.props.loadUserRoleData(department).then(resp => {
  //         let tempArr = [];
  //         try{
  //         for (let x = 0; x < resp.data.length; x++) {
  //             tempArr.push(resp.data[x])
  //         }
  //         if (tempArr.length > 0) {
  //             this.setState({ comboList: tempArr, comboValue: tempArr[0] });
  //             sessionStorage.setItem("role", this.state.comboValue);
  //         }
  //     }
  //     catch(e){
  //         if(e.message === "Cannot read property 'roleName' of undefined"){
  //             this.props.history.push("/costa/404")
  //         }
  //     }
  //     })
  // }

  componentWillMount() {
    const department = sessionStorage.getItem("username");
    this.props.loadUserRoleData(department).then((resp) => {
      let tempArr = [];
      console.log("Topbar :", resp);
      try {
        for (let x = 0; x < resp.data.length; x++) {
          tempArr.push(resp.data[x]);
        }
        if (tempArr.length > 0) {
          this.setState({
            comboList: tempArr,
            comboValue: tempArr[0].deptRole,
          });
          sessionStorage.setItem("role", tempArr[0].deptRole);
          sessionStorage.setItem("department", tempArr[0].deptName);
          sessionStorage.setItem("pklDirectrate", tempArr[0].deptDisplayName);
          sessionStorage.setItem(
            "displayUserName",
            tempArr[0].deptDisplayUsername
          );
        }
      } catch (e) {
        if (e.message === "Cannot read property 'roleName' of undefined") {
          this.props.history.push("/eoffice/404");
        }
      }
    });
  }

  componentDidMount() {
    const username = sessionStorage.getItem("username");
    let formData = new FormData();
    formData.append("username", username);

    this.props.getPersonalInfo(formData).then((res) => {
      if (res.status === "OK") {
        this.props.myInfo(true);
      } else {
        this.props.myInfo(false);
      }
    });
  }

  openFullScreen = () => {
    this.setState({ fullScreen: true });
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  closeFullScreen = () => {
    this.setState({ fullScreen: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;
    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    sessionStorage.clear();
    window.location = process.env.REACT_APP_LOGOUT_URL;
  };

  handleThemeChangeBlue = (e) => {
    let { settings } = this.props;
    let { layout1Settings } = settings;
    console.log(layout1Settings);
    this.setState({ lightMode: false });
    let sideBarTheme, tobBarTheme, buttonTheme;
    sideBarTheme = layout1Settings.leftSidebar.theme = "blue";
    tobBarTheme = layout1Settings.topbar.theme = "blue";
    tobBarTheme = layout1Settings.footer.theme = "#001049";
    buttonTheme = layout1Settings.activeButton.theme = "blue";
    this.updateSidebarMode({ sideBarTheme, tobBarTheme, buttonTheme });
    Cookies.set("theme", "blue");
    this.props.changeTheme(false);
  };

  handleThemeChangeRed = (e) => {
    let { settings } = this.props;
    let { layout1Settings } = settings;
    this.setState({ lightMode: true });
    let sideBarTheme, tobBarTheme, buttonTheme;
    sideBarTheme = layout1Settings.leftSidebar.theme = "darkTheme";
    tobBarTheme = layout1Settings.topbar.theme = "darkTheme";
    tobBarTheme = layout1Settings.footer.theme = "#001049";
    buttonTheme = layout1Settings.activeButton.theme = "darkTheme";
    this.updateSidebarMode({ sideBarTheme, tobBarTheme, buttonTheme });
    Cookies.set("theme", "darkTheme");
    this.props.changeTheme(true);
  };

  handleChange = (event) => {
    let data = this.state.comboList.filter(
      (val) => val.deptRole === event.target.value
    );
    this.setState({ comboValue: event.target.value });
    if (this.state.comboValue !== null) {
      const roleName = data[0].deptRole;
      const dept = data[0].deptName;
      sessionStorage.setItem("role", roleName);
      sessionStorage.setItem("department", dept);
      this.refreshTables();
    }
  };

  refreshTables = () => {
    let trigger = false;
    setTimeout(() => {
      trigger = true;
      this.props.changingTableStatePA(trigger, "CHANGE_PA_APPLICATION");
      this.props.changingTableState(trigger, "CHANGE_PA_FILE");
      this.props.changingTableStateInbox(trigger, "CHANGE_INBOX");
      this.props.changingTableStateOutbox(trigger, "CHANGE_OUTBOX");
    }, 1000);
  };

  render() {
    const { fullScreen, comboList, lightMode } = this.state;
    let { theme, settings, className, style, darkState, t } = this.props;
    const topbarTheme =
      settings.themes[settings.layout1Settings.topbar.theme] || theme;
    let { layout1Settings } = settings;
    const serviceNumber = sessionStorage.getItem("username");
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <div className="topbar">
          <div
            className={`topbar-hold ${className}`}
            style={Object.assign(
              {},
              { background: topbarTheme.palette.primary.main },
              style
            )}
          >
            <div className="flex flex-space-between flex-middle h-100">
              <div className="flex">
                <IconButton
                  onClick={this.handleSidebarToggle}
                  className="hide-on-lg"
                >
                  <Icon>menu</Icon>
                </IconButton>
                {layout1Settings.leftSidebar.mode === "compact" ? (
                  <div className="hide-on-mobile">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/logo-paperless.png"
                      }
                      alt={"EOffice"}
                      style={{
                        imageRendering: "-webkit-optimize-contrast",
                        maxWidth: "75%",
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-middle top-bar-icon-wrapper">
                <h2
                  className="welcome-text"
                  style={{
                    fontFamily: "Sans-Serif",
                    textShadow:
                      "0 2px 0 #004466, 0 3px 0 #004466,0 2px 0 #004466, 0 3px 0 #004466,0 2px 0 #004466, 0 3px 0 #004466,0 2px 0 #004466, 0 3px 0 #004466,0 2px 0 #004466, 0 3px 0 #004466,0 2px 0 #004466, 0 3px 0 #004466,0 20px 30px #000080",
                  }}
                >
                  WELCOME&nbsp;
                  {comboList.length === 0 ? "" : comboList[0].rankName}&nbsp;
                  {serviceNumber.toUpperCase()}&nbsp;
                  {comboList.length === 0 ? "" : comboList[0].branch}&nbsp;
                  {comboList.length === 0 ? "" : comboList[0].apptDisplay}&nbsp;
                </h2>
                {/* {fullScreen ? (
                                    <IconButton onClick={this.closeFullScreen}>
                                        <Tooltip title={t("exit_fullScreen")} aria-label="Exit FullScreen">dsfds</Tooltip>
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={this.openFullScreen}>
                                        <Tooltip title={t("fullScreen")} aria-label="FullScreen"><FullscreenIcon fontSize="large" style={{color: "#fff"}} /></Tooltip>
                                    </IconButton>
                                )} */}
                {fullScreen ? (
                  <IconButton onClick={this.closeFullScreen}>
                    <Tooltip
                      title={t("exit_fullScreen")}
                      aria-label="Exit FullScreen"
                    >
                      <FullscreenExitIcon
                        style={{ color: "#fff", fontSize: "1.4rem" }}
                      />
                    </Tooltip>
                  </IconButton>
                ) : (
                  <IconButton onClick={this.openFullScreen}>
                    <Tooltip title={t("fullScreen")} aria-label="FullScreen">
                      <FullscreenIcon
                        style={{ color: "#fff", fontSize: "1.4rem" }}
                      />
                    </Tooltip>
                  </IconButton>
                )}
                <IconButton>
                  <NotificationBar />
                </IconButton>
                <FormControl
                  className="topbarSelect"
                  style={{
                    minWidth: 300,
                    background: "white",
                    borderRadius: "50px",
                    textAlignLast: "center",
                  }}
                >
                  <Select
                    native
                    value={this.state.comboValue}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                    style={{ fontSize: "12px", color: "black" }}
                  >
                    {comboList.map((x) => (
                      <option key={x.deptId}> {x.apptDisplay}</option>
                    ))}
                  </Select>
                </FormControl>
                {/* <Tooltip title={t("my_info")} aria-label="myInfo">
                  <IconButton onClick={()=>this.props.myInfo(true)}>
                    <PersonOutlineOutlinedIcon style={{ fontSize: "1.1rem" }} color="secondary" />
                  </IconButton>
                </Tooltip> */}
                <Tooltip title={t("my_info")} aria-label="myInfo">
                  <IconButton
                    disabled={!this.props.paInfo}
                    onClick={() => this.setState({ openInfo: true })}
                    color="secondary"
                  >
                    <PersonOutlineOutlinedIcon style={{ fontSize: "1.1rem" }} />
                  </IconButton>
                </Tooltip>
                {this.props.appTheme ? (
                  <Tooltip title={t("dark_mode")} aria-label="DarkMode">
                    <IconButton onClick={this.handleThemeChangeBlue}>
                      <Brightness7Icon style={{ fontSize: "1.1rem" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title={t("light_mode")} aria-label="LightMode">
                    <IconButton onClick={this.handleThemeChangeRed}>
                      <Brightness4Icon
                        style={{ fontSize: "1.1rem", color: "#fff" }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title={t("logout")} aria-label="Logout">
                  <IconButton onClick={this.handleSignOut}>
                    <ExitToAppIcon
                      color="secondary"
                      style={{ fontSize: "1.4rem" }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={this.state.openInfo}
          aria-labelledby="draggable-dialog-title"
          PaperComponent={PaperComponent}
          maxWidth="sm"
        >
          <DialogTitle
            id="draggable-dialog-title"
            style={{ padding: "0px 24px !important", cursor: "move" }}
          >
            {t("personal_information")}
            <IconButton
              aria-label="close"
              onClick={() => this.setState({ openInfo: false })}
              color="primary"
              style={{ float: "right" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers pt={0}>
            <InfoForm
              handleSubmit={(val) => this.setState({ openInfo: val })}
              // disableBtn={(val) => this.setState({ blnDisableButtoms: val })}
            />
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loadUserRoleData: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  changeTheme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loadUserRoleData: PropTypes.func.isRequired,
  settings: state.layout.settings,
  appTheme: state.theme,
  paInfo: state.myInfo,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
      setLayoutSettings,
      logoutUser,
      loadUserRoleData,
      changingTableStatePA,
      changingTableState,
      changingTableStateInbox,
      changingTableStateOutbox,
      changeTheme,
      myInfo,
      getPersonalInfo,
    })(withTranslation()(Layout1Topbar))
  )
);
