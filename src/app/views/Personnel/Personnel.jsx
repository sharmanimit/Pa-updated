import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

import { withStyles } from "@material-ui/styles";
import PersonalAppTable from "./PersonalAppTable";
import PersonalFileTable from "./PersonalFileTable";
import DraftPaFileTable from "./DraftPaTable";
import { Breadcrumb } from "../../../matx";
import StartProcessPage from "../initiate/shared/startProcess/StartProcessPage";

import InfoForm from "./InfoForm";
import { getPersonalInfo } from "../../camunda_redux/redux/action";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { element, PropTypes } from "prop-types";
import PersonalApplicationForm from "./PersonalApplicationForm";
import PersonalFileForm from "./PersonalFileForm";

import { withTranslation } from "react-i18next";
import Draggables from "react-draggable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Loading } from "./therme-source/material-ui/loading";
import "../inbox/therme-source/material-ui/loading.css";
import CloseIcon from "@material-ui/icons/Close";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

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
const styles = (theme) => ({});

class Personnel extends Component {
  state = {
    // initializing state of class component
    open: false,
    openPA: false,
    openInfo: false,
    loading: false,
    blnDisableButtoms: false,
    isActive: false,
    pa: false,
    pf: true,
    updateSubject: false,
    draftSubject: "",
    draftId: "",
    container: [
      // {
      //   id: 1,
      //   name: "my_personal_application",
      //   component: (
      //     <PersonalAppTable
      //       blnEnableLoader={(val) => this.setState({ loading: val })}
      //     />
      //   ),
      //   width: 4,
      // },
      {
        id: 1,
        name: "draft_personal_file",

        component: (
          <DraftPaFileTable
            blnDisableButtoms={this.blnDisableButtoms}
            handleClick={() => this.setState({ openPA: true })}
            handleUpdateSubject={(val) =>
              this.setState({
                openPA: true,
                updateSubject: true,
                draftSubject: val.subject,
                draftId: val.id,
              })
            }
            blnEnableLoader={(val) => this.setState({ loading: val })}
          />
        ),
        width: 4,
      },
    ],

    container1: [
      // {
      //   id: 1,
      //   name: "my_personal_application",
      //   component: (
      //     <PersonalAppTable
      //       blnEnableLoader={(val) => this.setState({ loading: val })}
      //     />
      //   ),
      //   width: 4,
      // },

      {
        id: 1,
        name: "draft_personal_file",

        component: (
          <DraftPaFileTable
            blnDisableButtoms={this.blnDisableButtoms}
            handleClick={() => this.setState({ openPA: true })}
            handleUpdateSubject={(val) =>
              this.setState({
                openPA: true,
                updateSubject: true,
                draftSubject: val.subject,
                draftId: val.id,
              })
            }
            blnEnableLoader={(val) => this.setState({ loading: val })}
          />
        ),
        width: 4,
      },

      {
        id: 2,
        name: "my_personal_file",
        component: (
          <PersonalFileTable
            handleClick={() => this.setState({ open: true })}
            blnDisableButtoms={this.blnDisableButtoms}
          />
        ),
        width: 4,
      },
    ],
  };

  componentDidMount() {
    const username = sessionStorage.getItem("username");
    let formData = new FormData();
    formData.append("username", username);
    this.props.getPersonalInfo(formData).then((res) => {
      if (res.status === "OK") {
        this.setState({ blnDisableButtoms: false });
      } else {
        this.setState({ blnDisableButtoms: true });
      }
    });

    if (this.props.myInfo === false) {
      this.setState({ openInfo: true });
    } else {
      this.setState({ openInfo: false });
    }
  }

  handleCloseEvent = (e) => {
    // callback function that fires when record of Personal File has been saved
    this.setState({ open: e });
  };

  handleRemove(id) {
    const newList = this.state.container.filter((item) => item.id !== id);

    this.setState({ container: newList });
    if (id === 1) {
      this.setState({ pa: true });
    } else if (id === 2) {
      this.setState({ pf: true });
    }
  }

  handleShow(id) {
    let arr = [];

    this.state.container1.map((element) => {
      this.state.container.map((item) => {
        if (item.id === element.id) {
          arr.push(item);
        }
      });
    });

    let showItem = this.state.container1.find((item) => item.id === id);
    arr.push(showItem);

    this.setState({ container: arr });
    if (id === 2) {
      this.setState({ pf: false });
    } else if (id === 1) {
      this.setState({ pa: false });
    }
  }

  handleCloseEventPA = (e) => {
    // callback function that fires when record of Personal File has been saved
    this.setState({ openPA: e });
  };

  dragEnd = (result) => {
    const containerItems = [...this.state.container];
    console.log({ containerItems });

    const [orderedContainer] = containerItems.splice(result.source.index, 1);
    containerItems.splice(result.destination.index, 0, orderedContainer);
    console.log({ containerItems });

    this.setState({ container: containerItems });
  };

  render() {
    const {
      loading,
      blnDisableButtoms,
      openInfo,
      container,
      updateSubject,
      draftSubject,
      draftId,
    } = this.state;
    const { t, myInfo } = this.props;

    return (
      <div className="m-sm-30">
        {/* process.env.PUBLIC_URL + `/assets/icons/send-plane-fill.svg` */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumb
              routeSegments={[
                { name: t("personnel1"), path: "/personnel/file" },
              ]}
            />
          </Grid>
          {/* <Grid item xs={4} style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              onClick={() => this.setState({ openInfo: true })}
              style={{
                background: "#FFAF38",
                letterSpacing: "2px",
                fontWeight: "bold",
                color: "white",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              {t("my_info")}
            </Button>
          </Grid> */}
          {!myInfo && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography component="h4">
                <span style={{ color: "red" }}>
                  ***{t("please")} {t("update")} <b>{t("my_info")} </b>
                  {t("before_further_processing")}.***
                </span>
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2rem",
          }}
        >
          <Grid item>
            <DragDropContext onDragEnd={this.dragEnd}>
              <Droppable
                droppableId="itemSequence"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <Grid
                    container
                    // justifyContent="center"
                    spacing={1}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.container.map(({ component, width, id }, i) => (
                      <Draggable
                        draggableId={`draggable-${i}`}
                        key={`draggable-${i}`}
                        index={i}
                      >
                        {(provided) => (
                          <Grid
                            item
                            md={
                              container.length == 1
                                ? 12
                                : container.length == 2
                                ? 6
                                : width
                            }
                            sm={6}
                            xs={12}
                            className="personal-file"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            // style={{position: "relative"}}
                          >
                            <div style={{ position: "relative" }}>
                              <Tooltip title="Cancel">
                                <IconButton
                                  size="small"
                                  style={{ color: "lightgrey" }}
                                  className="icons-button"
                                  onClick={() => this.handleRemove(id)}
                                >
                                  <CancelOutlinedIcon fontSize="medium" />
                                </IconButton>
                              </Tooltip>

                              {component}
                            </div>
                          </Grid>
                        )}
                      </Draggable>
                    ))}

                    {loading && <Loading />}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>

          <Grid item>
            <ul
              style={{
                position: "fixed",
                right: "16px",
              }}
            >
              {this.state.pa ? (
                <li className="hide1" onClick={() => this.handleShow(1)}>
                  APPLICATION
                </li>
              ) : (
                <li
                  className="hide"
                  style={{ userSelect: "none", cursor: "default" }}
                >
                  APPLICATION
                </li>
              )}

              {this.state.pf ? (
                <li className="hide1" onClick={() => this.handleShow(2)}>
                  FILES
                </li>
              ) : (
                <li
                  className="hide"
                  style={{ userSelect: "none", cursor: "default" }}
                >
                  FILES
                </li>
              )}
            </ul>
          </Grid>
        </Grid>
        {/* <Grid container justifyContent="center" spacing={2}>
                    <Grid item md={4} sm={6} xs={12} >
                        <DraftPaFileTable blnDisableButtoms={blnDisableButtoms} handleClick={() => this.setState({ openPA: true })} blnEnableLoader={(val) => this.setState({ loading: val })} />
                    </Grid>
                    <Grid item md={5} xs={12} >
                        <PersonalAppTable blnEnableLoader={(val) => this.setState({ loading: val })} />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12} > */}
        {/* <Grid item md={3} sm={6} xs={12} className="personal-file"> */}
        {/* <PersonalFileTable handleClick={() => this.setState({ open: true })} blnDisableButtoms={blnDisableButtoms} />
                    </Grid> */}
        {/* {loading && <Loading />} */}
        {/* </Grid> */}
        <div>
          <Dialog
            open={this.state.open}
            aria-labelledby="draggable-dialog-title"
            PaperComponent={PaperComponent}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle
              id="draggable-dialog-title"
              style={{ padding: "0px 24px !important", cursor: "move" }}
            >
              {t("create_a_personal_file")}
              <IconButton
                aria-label="close"
                onClick={() => this.setState({ open: false })}
                color="primary"
                style={{ float: "right", cursor: "pointer" }}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers pt={0}>
              {/* <StartProcessPage process={'personalFile'} handleCloseEvent={this.handleCloseEvent} didMounting={this.mountData}/> */}
              <PersonalFileForm
                handleClose={() => this.setState({ open: false })}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.openPA}
            aria-labelledby="draggable-dialog-title"
            PaperComponent={PaperComponent}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle
              id="draggable-dialog-title"
              style={{ padding: "0px 24px !important", cursor: "move" }}
            >
              {t("create_a_personal_application")}
              <IconButton
                aria-label="close"
                onClick={() =>
                  this.setState({ openPA: false, updateSubject: false })
                }
                color="primary"
                style={{ float: "right", cursor: "pointer" }}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers pt={0}>
              {/* <StartProcessPage process={'personalApplication'} handleCloseEvent={this.handleCloseEventPA} didMounting={this.mountData}/> */}
              <PersonalApplicationForm
                handleClose={() =>
                  this.setState({ openPA: false, updateSubject: false })
                }
                handleClickFile={() => this.setState({ open: true })}
                updateSubject={updateSubject}
                draftSubject={draftSubject}
                draftId={draftId}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={openInfo}
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
                color="primary"
                style={{ float: "right" }}
                onClick={() => this.setState({ openInfo: false })}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers pt={0}>
              <InfoForm
                handleSubmit={(val) => this.setState({ openInfo: val })}
                disableBtn={(val) => this.setState({ blnDisableButtoms: val })}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getPersonalInfo: PropTypes.func.isRequired,
  theme: state.theme,
  myInfo: state.myInfo,
});
export default withRouter(
  connect(mapStateToProps, { getPersonalInfo })(withTranslation()(Personnel))
);
