import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Paper,
  Slide,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import {
  loadPADraftTableData,
  loadSfdt,
  rollbackPADocument,
  getHistory,
} from "../../camunda_redux/redux/action";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import { connect as reduxConnect, useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./therme-source/material-ui/loading.css";
import Annexure from "./Annexure";
import InputForm from "./quickSignFrom";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import HeadersAndFootersView from "../FileApproval/documentEditor/editor";
import { changeTableStateDraft } from "../../camunda_redux/redux/action/apiTriggers";
import Tooltip from "@material-ui/core/Tooltip";
import SendFileForm from "./SendFileForm";
import SplitViewPdfViewer from "../inbox/shared/pdfViewer/pdfViewer";
import CreateIcon from "@material-ui/icons/Create";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import SendIcon from "@material-ui/icons/Send";
import RestorePageIcon from "@material-ui/icons/RestorePage";
import { DataGrid } from "@material-ui/data-grid";
import HistoryIcon from "@material-ui/icons/History";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { OPEN_PA_DRAFT } from "app/camunda_redux/redux/constants/ActionTypes";
import ShowAndHide from "../utilities/ShowAndHide";
// import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
// import Icon from '@material-ui/core/Icon';
// import Icon from '@material-ui/core/Icon';
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
// import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
// import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
// import AddRoundedIcon from '@mui/icons-material/AddRounded';

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
const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  width: "5rem",
  height: "5rem",
};
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  divZIndex: {
    zIndex: "0",
    "& .MuiDialogContent-dividers": {
      padding: "0px 0px !important",
    },
    "& #pdfV": {
      height: "calc(100vh - 47px) !important",
    },
    "& .e-de-ctn": {
      height: "calc(100vh - 48px) !important",
    },
  },
  sign_btn: {
    position: "fixed",
    right: "30px !important",
    bottom: "20px !important",
    zIndex: 10,
  },
  sign_btn1: {
    position: "fixed",
    right: "30px !important",
    bottom: "100px !important",
    zIndex: 10,
  },
  headerText: {
    display: "inline-flex",
    width: "60%",
    justifyContent: "center",
    marginBottom: "0px",
    fontSize: "1.1rem",
  },
  historyTimeLine: {
    justifyContent: "flex-start",
    "& .MuiTimelineOppositeContent-root": {
      flex: "none",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DraftPaFileTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const columns = [
    {
      field: "serialNo",
      headerName: t("SL NO"),
      width: 10,
      // editable: true,
    },
    {
      field: "subject",
      headerName: t("subject"),
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <p onClick={(event) => event.stopPropagation()}>
          <ShowAndHide data={params.row.subject} />
        </p>
      ),
    },
    {
      field: "status",
      headerName: t("status"),
      width: 180,
      // editable: true,
      renderCell: (params) => (
        <span style={cellStyles[params.row.status]}>{params.row.status}</span>
      ),
    },
    {
      field: "displayPfileName",
      headerName: t("pa_number"),
      width: 160,
      // editable: true,
    },
    {
      field: "createdOn",
      headerName: t("date"),
      width: 200,
      // editable: true,
      renderCell: (params) => (
        <div>
          <Typography>
            {params.row.createdOn}&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{ display: "inline" }}>
              <IconButton
                aria-label="editSubject"
                size="small"
                onClick={(e) => {
                  e.stopPropagation(), props.handleUpdateSubject(params.row);
                }}
              >
                <Tooltip title={t("Edit Subject")} aria-label="Edit Subject">
                  <EditIcon color="primary" />
                </Tooltip>
              </IconButton>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {params.row.status !== "Draft" && (
                <IconButton
                  aria-label="userHistory"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(),
                      handleOnClickOpenHistory(e, params.row.id, true);
                  }}
                >
                  <Tooltip
                    title={t("show_user_history")}
                    aria-label="Show User History"
                  >
                    <HistoryIcon color="primary" />
                  </Tooltip>
                </IconButton>
              )}
            </div>
          </Typography>
        </div>
      ),
    },
  ];

  const cellStyles = {
    "In Progress": {
      color: "rgb(21, 101, 192)",
    },
    Approved: {
      color: "rgb(76, 175, 80)",
    },
    Rejected: {
      color: "rgb(198, 40, 40)",
    },
  };

  const [rowData, setRowData] = useState([]);
  const [openQuickSign, setOpenQuickSign] = useState(false);
  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(false);
  const [blnOpenQuickSign, setblnOpenQuickSign] = useState(true);
  const [blnOpenEditor, setblnOpenEditor] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [rowID, setRowID] = useState("");
  const [fileURL, setFileURL] = useState("");
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const dept = sessionStorage.getItem("department");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [openSign, setOpenSign] = useState(false);
  const [pdfLoads, setPdfLoads] = useState(false);
  const [headerLable, setHeaderLable] = useState({});
  const [pageSizes] = useState([5, 10, 15]);
  const [handleClickId, setHandleClickId] = useState("");
  const [blnOpenHistory, setblnOpenHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [openPaDialog, setOpenPaDialog] = useState(false);
  const { theme } = useSelector((state) => state);

  console.log(props.blnDisableButtoms);

  // const TableRow = ({ row, ...restProps }) => (
  //   <Table.Row
  //     {...restProps}
  //     {...{ hover: true }}
  //     onClick={(e) => handleClick(e, row)}
  //     style={{
  //       cursor: "pointer",
  //       "&:hover": {
  //         backgroundColor: "lightgray",
  //       },
  //     }}
  //   />
  // );

  const { draftTableData } = useSelector((state) => state.DraftTableReducer);
  const { mount } = useSelector((state) => state.refreshings);

  useEffect(() => {
    let tmpArr = [];
    tmpArr =
      draftTableData &&
      draftTableData.map((item, index) => {
        return { ...item, serialNo: pageSize * currentPage + (index + 1) };
      });
    setRowData(tmpArr);
    setTotalCount(draftTableData.length);
  }, [draftTableData]);

  useEffect(() => {
    dispatch(loadPADraftTableData(username, role, pageSize, currentPage));
    // props.changeTableStateDraft(false, "CHANGE_PA_DRAFT")
  }, [blnValueDraft, currentPage, blnOpenQuickSign, pageSize, mount]);

  const { blnValueDraft } = props.subscribeApi;

  useEffect(() => {
    if (props.openDraftPa) {
      let row = props.openDraftPa;
      // setHandleClickId(row.id);
      const url = row.fileURL;
      sessionStorage.setItem("FileURL", url);
      setFileURL(url);
      loadSFDT(url, row.id, row.status);
      setblnOpenQuickSign(row.signed);
      setHeaderLable({ subject: row.subject, pfileName: row.pfileName });
    }
    dispatch({
      type: OPEN_PA_DRAFT,
      payload: null,
    });
  }, [props.openDraftPa]);

  // useEffect(
  //   () => pADraftTableData(),
  //   [blnValueDraft, currentPage, blnOpenQuickSign, pageSize]
  // );

  // const pADraftTableData = () => {
  //   setRowData([]);
  //   props
  //     .loadPADraftTableData(username, role, pageSize, currentPage)
  //     .then((resp) => {
  //       let tmpArr = [];
  //       try {
  //         if (resp.response) {
  //           // condition to check if then perform further
  //           setTotalCount(
  //             resp.response.length != null ? resp.response.length : 0
  //           );
  //           if (resp.response.data !== undefined) {
  //             tmpArr = resp.response.data.map((item, index) => {
  //               return {
  //                 ...item,
  //                 serialNo: pageSize * currentPage + (index + 1),
  //               };
  //             });
  //             setRowData(tmpArr);
  //           } else {
  //             const errorMessage =
  //               resp.response.status +
  //               " : " +
  //               resp.response.error +
  //               " AT " +
  //               resp.response.path;
  //             callMessageOut(errorMessage);
  //           }

  //           props.changeTableStateDraft(false, "CHANGE_PA_DRAFT");
  //         }
  //       } catch (e) {
  //         callMessageOut(e.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
    // };
    // if (this.id === undefined) {
    //   return dispatch(setSnackbar(true, "error", message));
    // }
  };

  const loadSFDT = (url, id, status) => {
    props.blnEnableLoader(true);
    props
      .loadSfdt(url, username, id, role, dept) // API call to load sfdt which will be visible on sincfusion
      .then((response) => {
        try {
          // http://localhost:3000/util_service/api/sfdt
          // const URL = 'http://11.0.0.109:9099/api/url?urls=' + response.url;
          // const URL = 'http://11.0.0.118:9090/util_service/api/url?urls=' + response.url;
          const URL = response.url;
          setRowID(id);
          setFileURL(URL);
          if (URL) {
            props.blnEnableLoader(false);
            setblnOpenEditor(true);
            setTabIndex(0);
            setOpenQuickSign(true);
            if (status === "Draft") {
              setOpenPaDialog(false);
            } else {
              setOpenPaDialog(true);
            }
          }
        } catch (e) {
          callMessageOut(e.message);
        }
      });
  };

  const handleClick = ({ row }) => {
    // Mtd to perform operation while row clicks
    setHandleClickId(row.id);
    const url = row.fileURL;
    sessionStorage.setItem("FileURL", url);
    setFileURL(url);
    loadSFDT(url, row.id, row.status);
    setblnOpenQuickSign(row.signed);
    setHeaderLable({ subject: row.subject, pfileName: row.pfileName });
  };

  const handleClickQuickSignClose = () => {
    // Mtd that triggers while clicking on close icon of quick sign dialog
    setOpenQuickSign(false);
    setblnOpenEditor(true);
    // setblnOpenQuickSign(false);
  };

  const handleDocumentRollback = () => {
    rowID &&
      props.rollbackPADocument(rowID).then((resp) => {
        try {
          console.log("Roll back", resp);
          setblnOpenQuickSign(resp.response.personalApplication.signed);
          setFileURL(resp.response.personalApplication.fileURL);
          sessionStorage.setItem(
            "FileURL",
            resp.response.personalApplication.fileURL
          );
          // pADraftTableData();
        } catch (e) {
          callMessageOut(e.message);
        }
      });
  };

  const CustomToolbarMarkup = () => (
    <div
      style={{
        height: "4rem",
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${props.theme ? "#505050" : "#d9d9d9"}`,
      }}
    >
      <Typography
        variant="button"
        align="center"
        color="primary"
        style={{
          fontSize: "medium",
          fontFamily: "inherit !important",
          marginLeft: "15px",
        }}
      >
        {t("my_personal_application")}
      </Typography>
      <Tooltip title={t("personal_application")}>
        <Fab
          disabled={!props.myInfo}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "2.2rem",
            height: ".1rem",
            backgroundColor: "rgb(230, 81, 71)",
          }}
          onClick={() => props.handleClick()}
        >
          <AddIcon style={{ fontSize: "19", color: "#fff" }} />
        </Fab>
      </Tooltip>
    </div>
  );

  const handleOnClickOpenHistory = (e, id, forDialog) => {
    // e.stopPropagation();
    if (id) {
      props.getHistory("PA", id).then((resp) => {
        if (resp) {
          !isNullOrUndefined(resp.data)
            ? setHistoryData(resp.data)
            : setHistoryData([]);
        }
        forDialog && setblnOpenHistory(true);
      });
    }
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          position: "relative",
          borderRadius: "18px",
          // border: `1px solid ${props.theme ? "#505050" : "#d9d9d9"}`,
        }}
      >
        <CustomToolbarMarkup />
        <div
          style={{
            height: "calc(100vh - 180px)",
          }}
          className="mui-table-customize"
        >
          <DataGrid
            rows={rowData}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={pageSizes}
            paginationMode="server"
            rowCount={totalCount}
            onRowClick={handleClick}
            rowHeight={36}
            disableSelectionOnClick
            onPageChange={(value) => setCurrentPage(value)}
            onPageSizeChange={(value) => setPageSize(value)}
            getRowClassName={(params) => `super-app-theme-${params.row.status}`}
          />
        </div>
      </Paper>

      <Dialog
        open={openQuickSign}
        onClose={handleClickQuickSignClose}
        fullScreen
        aria-labelledby="quickSignDialog"
        TransitionComponent={Transition}
        className={classes.divZIndex}
        id="draggable-dialog-title"
      >
        <DialogContent
          dividers
          style={{
            overflow: "hidden",
            backgroundColor: theme ? "rgb(46 46 46)" : "rgb(241 241 241)",
          }}
        >
          {openPaDialog ? (
            <Tabs
              forceRenderTabPanel
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab style={{ borderRadius: "5px 5px 0 0" }}>
                  {t("personal_application").toUpperCase()}
                </Tab>
                <IconButton
                  aria-label="close"
                  onClick={handleClickQuickSignClose}
                  style={{
                    borderRadius: "10px",
                    float: "right",
                    height: "35px",
                    width: "35px",
                    color: "blue",
                    borderColor: "blue",
                    borderWidth: "1px",
                    borderStyle: "revert",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </TabList>

              <TabPanel>
                <div hidden={!blnOpenEditor}>
                  <Annexure
                    fileId={rowID}
                    showUploader={false}
                    // sampleData={sampleData}
                  />
                </div>
              </TabPanel>
            </Tabs>
          ) : (
            <Tabs
              forceRenderTabPanel
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab style={{ borderRadius: "5px 5px 0 0" }}>
                  {t("personal_application").toUpperCase()}
                </Tab>
                <Tab style={{ borderRadius: "5px 5px 0 0" }}>
                  {t("annexure")}
                </Tab>
                <p className={classes.headerText}>
                  <b>Subject:&nbsp;</b>{" "}
                  {headerLable.subject && headerLable.subject.toUpperCase()}{" "}
                  <b>&nbsp;| File No:&nbsp;</b>
                  {headerLable.pfileName}
                </p>
                <IconButton
                  aria-label="close"
                  onClick={handleClickQuickSignClose}
                  style={{
                    borderRadius: "40%",
                    float: "right",
                    height: "35px",
                    width: "35px",
                    backgroundColor: "rgb(81 115 184)",
                    color: "#fff",
                    borderWidth: "1px",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </TabList>
              <TabPanel>
                {blnOpenQuickSign ? (
                  <>
                    <Tooltip title={t("send")}>
                      <Fab
                        aria-label="close"
                        color="secondary"
                        className={`button-glow ${classes.sign_btn}`}
                        onClick={(e) => setSend(true)}
                        style={{ padding: "1px" }}
                      >
                        <SendIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title={t("undo")} className="dialog_sendButton">
                      <Fab
                        aria-label="close"
                        color="primary"
                        className={classes.sign_btn1}
                        onClick={handleDocumentRollback}
                        style={{ padding: "1px" }}
                      >
                        <RestorePageIcon />
                      </Fab>
                    </Tooltip>
                    <SplitViewPdfViewer
                      fileUrl={fileURL}
                      pdfLoads={(val) => {
                        setPdfLoads(val);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Tooltip title={t("sign")}>
                      <Fab
                        aria-label="close"
                        color="primary"
                        className={`button-glow ${classes.sign_btn}`}
                        onClick={(e) => setOpenSign(true)}
                      >
                        <CreateIcon />
                      </Fab>
                    </Tooltip>
                    <div className="customDiv">
                      <HeadersAndFootersView
                        sendToogle={(e) => {
                          setTabIndex(3);
                        }}
                        fileId={rowID}
                        blnIsPartCase={false}
                        fileUrl1={fileURL}
                        blnOpenQuickSign={(e) => {
                          setblnOpenEditor(false);
                        }}
                        blnShowQuickSign={true}
                      />
                    </div>
                  </>
                )}
              </TabPanel>
              <TabPanel>
                <>
                  {blnOpenQuickSign && (
                    <Tooltip title={t("send")}>
                      <Fab
                        aria-label="close"
                        color="secondary"
                        className={`button-glow ${classes.sign_btn}`}
                        onClick={(e) => setSend(true)}
                      >
                        <SendIcon style={{ fontSize: "1rem" }} />
                      </Fab>
                    </Tooltip>
                  )}
                  <Annexure
                    fileId={rowID}
                    sendToogle={(e) => {
                      setTabIndex(3);
                    }}
                    showUploader={true}
                  />
                </>
              </TabPanel>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openSign}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="md"
      >
        <Paper>
          <DialogTitle
            id="draggable-dialog-title"
            style={{ padding: "0px 24px !important", cursor: "move" }}
          >
            {t("sign")}
            <IconButton
              aria-label="close"
              onClick={() => setOpenSign(false)}
              color="primary"
              style={{ float: "right" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers pt={0}>
            <InputForm
              fileId={rowID}
              callBack={(e) => {
                // pADraftTableData();
                setFileURL(e);
              }}
              toggleViewer={(e) => {
                setOpenSign(e);
                setblnOpenQuickSign(!e);
              }}
              returnToEditor={(e) => {
                setblnOpenEditor(true);
              }}
              pfileName={headerLable.pfileName}
            />
          </DialogContent>
        </Paper>
      </Dialog>
      <Dialog
        open={send}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <Paper className="dialog_sendButton">
          <DialogTitle
            id="draggable-dialog-title"
            style={{ padding: "0px 24px !important", cursor: "move" }}
          >
            {t("forward_file_for_review_approval")}

            <IconButton
              aria-label="close"
              onClick={() => setSend(false)}
              color="primary"
              style={{ float: "right" }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              aria-label="userHistory"
              color="primary"
              style={{ float: "right" }}
              onClick={(e) => {
                handleOnClickOpenHistory(e, handleClickId, true);
              }}
            >
              <Tooltip
                title={t("show_user_history")}
                aria-label="Show User History"
              >
                <HistoryIcon color="primary" />
              </Tooltip>
            </IconButton>
          </DialogTitle>
          <DialogContent dividers pt={0}>
            <SendFileForm
              fileId={rowID}
              handleCloseEvent={(e) => {
                setOpen(false);
                setOpenQuickSign(false);
              }}
              setSend={setSend}
              pfileName={headerLable.pfileName}
            />
          </DialogContent>
        </Paper>
      </Dialog>

      <Dialog
        open={blnOpenHistory}
        onClose={(e) => setblnOpenHistory(false)}
        aria-labelledby="draggable-dialog-title"
        PaperComponent={PaperComponent}
        aria-describedby="alert-dialog-description"
        style={{ minWidth: "300px" }}
        fullWidth
        maxWidth="sm"
        className="personal-application-history"
      >
        <DialogTitle id="draggable-dialog-title" style={{ cursor: "move" }}>
          {t("user_history")}
        </DialogTitle>

        <DialogContent dividers style={{ maxHeight: "600px" }}>
          <Timeline align="left">
            {historyData.map((item, index) => (
              <TimelineItem
                key={item.id}
                className={classes.historyTimeLine}
                style={{ display: "flex" }}
              >
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {item.typo}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot color={item.color} variant={item.variant}>
                    <item.icon />
                  </TimelineDot>
                  {historyData.length === index + 1 ? (
                    ""
                  ) : (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>

                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={classes.paper}
                    style={{ backgroundColor: "#eaeaea", display: "flex" }}
                  >
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", color: "#000" }}
                    >
                      {item.title}
                      {item.title === "Created Personal Application" ? "" : ":"}
                      &nbsp;
                    </Typography>
                    <Typography style={{ color: "#000" }}>
                      {item.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    props: state.props,
    subscribeApi: state.subscribeApi,
    openDraftPa: state.openDraftPa,
    myInfo: state.myInfo,
    theme: state.theme,
  };
}

export default reduxConnect(mapStateToProps, {
  loadPADraftTableData,
  loadSfdt,
  changeTableStateDraft,
  rollbackPADocument,
  getHistory,
})(DraftPaFileTable);
