import React, { useCallback, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {
  Card,
  CardContent,
  Fab,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import "react-tabs/style/react-tabs.css";
import HeadersAndFootersView from "../FileApproval/documentEditor/editor";
import DeleteIcon from "@material-ui/icons/Delete";
import AnnexureUploader from "./AnnexureUploader";
import {
  loadAnnexureTableData,
  getPAWithAnnexureList,
  deleteAnnexureData,
  rollbackAnnexureDocument,
} from "../../camunda_redux/redux/action";
import { changingTableStateAnnexure } from "../../camunda_redux/redux/action/apiTriggers";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
// import { setPassData } from "../../camunda_redux/redux/ducks/passData";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab";
import SignForm from "./SignForm";
import SplitViewPdfViewer from "../inbox/shared/pdfViewer/pdfViewer";
import SendIcon from "@material-ui/icons/Send";
import RestorePageIcon from "@material-ui/icons/RestorePage";
import { DataGrid } from "@material-ui/data-grid";
import ShowAndHide from "../utilities/ShowAndHide";

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
  input: {
    display: "none",
  },
  divZIndex: {
    zIndex: "1500 !important",
  },
  paperCss: {
    position: "relative",
  },
  sign_btn: {
    position: "fixed",
    right: "30px !important",
    bottom: "30px !important",
    zIndex: 1,
  },
  sign_btn1: {
    position: "fixed",
    right: "30px !important",
    bottom: "100px !important",
    zIndex: 10,
  },
}));

const styles = {
  customRow: {
    "&:hover": {
      backgroundColor: "lightgray",
    },
  },
};

// functional Component begins
const Annexure = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const columns = [
    { name: "serialNo", title: "SL NO" },
    { name: "pfileName", title: t("file_name") },
    { name: "createdOn", title: t("date_created") },
  ];
  const [rowData, setRowData] = useState([]);
  const [paID, setpaID] = useState("");
  const [open, setOpen] = useState(false);
  const [deletedRow, setDeletedRow] = useState();
  const [pdfLoads, setPdfLoads] = useState(false);
  const [openSign, setOpenSign] = useState(false);
  const [pdfDataStore, setpdfDataStore] = useState({});
  const [blnOpenEditor, setBlnOpenEditor] = useState(false);
  const [annexureId, setAnnexureId] = useState("");
  const [iconBtn, setIconBtn] = useState(false);
  const [type, setType] = useState(false);
  const [editorUrl, setEditorUrl] = useState("");
  const [editorId, setEditorId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [totalCount, setTotalCount] = useState(0);
  const [extension, setExtension] = useState("docx");

  const columns1 = [
    {
      field: "serialNo",
      headerName: t("SL NO"),
      width: 10,
    },
    {
      field: "pfileName",
      headerName: t("file_name"),
      width: 194,
      renderCell: (params) => (
        <div>
          <Typography onClick={(event) => event.stopPropagation()}>
            {/* {params.row.subject} */}
            <ShowAndHide data={params.row.pfileName} />
          </Typography>
        </div>
      ),
    },
    {
      field: "createdOn",
      headerName: t("date_created"),
      width: 180,
      renderCell: (params) => (
        <div>
          <Typography onClick={(event) => event.stopPropagation()}>
            {params.row.createdOn}
            {/* {params.row.subject} */}
            {props.showUploader && (
              <div style={{ display: "inline" }}>
                <IconButton
                  aria-label="userHistory"
                  size="small"
                  onClick={(e) => {
                    setDeletedRow(params.row);
                    deleteDoc(params.row);
                  }}
                >
                  <Tooltip
                    title={t("delete_file")}
                    aria-label="Show User History"
                  >
                    <DeleteIcon color="primary" />
                  </Tooltip>
                </IconButton>
              </div>
            )}
          </Typography>
        </div>
      ),
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = useCallback(
    ({ row }) => {
      console.log(row);
      let arr = row.pfileName.split(".");
      setExtension(arr[arr.length - 1]);
      setAnnexureId(row.id);
      setpdfDataStore(row);
      setEditorUrl(row.fileURL);
      setEditorId(row.id);
      if (row.pfileName.endsWith(".docx")) {
        if (row.signed) {
          setBlnOpenEditor(false);
        } else {
          setBlnOpenEditor(true);
          // setTimeout(() => {
          //   setBlnOpenEditor(true);
          // }, 500);
        }
      } else {
        setBlnOpenEditor(false);
      }
    },
    [editorId]
  );

  const [defaultColumnWidths] = useState([
    // setting up default width of table
    { columnName: "serialNo", width: 130 },
    { columnName: "pfileName", width: 165 },
    { columnName: "createdOn", width: 130 },
  ]);

  let { blnValue } = props.subscribeApi; // apitrigger that is used to update table by using redux

  const loadAnnextureTableData = (fileId, sign) => {
    props
      .loadAnnexureTableData(fileId)
      .then((resp) => {
        // API call with redux to fetch table data based on Personal Inventory ID
        let tmpArr = [];
        try {
          if (resp.data !== undefined) {
            // condition to check if response has data then process further
            tmpArr =
              resp.data &&
              resp.data.reverse().map((item, index) => {
                return { ...item, serialNo: index + 1 };
              });
            setRowData(tmpArr);
            let arr = tmpArr[0].pfileName.split(".");
            setExtension(arr[arr.length - 1]);
            if (sign) {
              let data = resp.data.find((item) => item.id === pdfDataStore.id);
              setpdfDataStore(data);
              setAnnexureId(data.id);
            } else {
              setpdfDataStore(tmpArr[0]);
              setAnnexureId(resp.data[0].id);
            }
            if (resp.data[0].pfileName.endsWith(".docx")) {
              if (resp.data[0].signed) {
                setBlnOpenEditor(false);
              } else {
                setBlnOpenEditor(true);
              }
            } else {
              setBlnOpenEditor(false);
            }
            props.changingTableStateAnnexure(false, "CHANGE_PA_ANNEXURE"); // redux call to change trigger to false as table got updated
          } else {
            const errorMessage =
              resp.status + " : " + resp.error + " AT " + resp.path;
            callMessageOut(errorMessage);
          }
        } catch (e) {
          callMessageOut(e.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadPaAnnextureTableData = (fileId) => {
    props
      .getPAWithAnnexureList(fileId)
      .then((resp) => {
        // API call with redux to fetch table data based on Personal Inventory ID
        let tmpArr = [];
        try {
          if (resp !== undefined) {
            // condition to check if response has data then process further
            const { pfileName, createdOn, annotationId, fileURL } =
              resp.personalApplication;
            tmpArr.push({
              id: fileId,
              pfileName,
              createdOn,
              annotationId,
              fileUrl: fileURL,
              serialNo: 1,
            });
            resp.annexures.map((item, index) => {
              return tmpArr.push({
                id: item.personalApplicationId,
                pfileName: item.fileName,
                createdOn: item.uploadingDate,
                annotationId: item.annotationId,
                fileUrl: item.annexureFileURL,
                serialNo: index + 2,
              });
            });
            setRowData(tmpArr);
            setpdfDataStore(tmpArr[0]);
            props.changingTableStateAnnexure(false, "CHANGE_PA_ANNEXURE"); // redux call to change trigger to false as table got updated
          } else {
            const errorMessage =
              resp.status + " : " + resp.error + " AT " + resp.path;
            callMessageOut(errorMessage);
          }
        } catch (e) {
          callMessageOut(e.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const { fileId } = props; // Personal Inventory ID that is passed by parent component to peocess API

    setpaID(fileId);
    props.showUploader
      ? loadAnnextureTableData(fileId, false)
      : loadPaAnnextureTableData(fileId);
  }, [blnValue]);

  const callMessageOut = (message) => {
    // dispatch(setSnackbar(true, "error", message));
    if (this.id === undefined) {
      return dispatch(setSnackbar(true, "error", message));
    }
  };

  const callMessageSuccess = (msg) => {
    dispatch(setSnackbar(true, "success", msg));
  };

  const CustomToolbarMarkup = () => (
    // table header.
    <div style={{ textAlign: "center", margin: ".7rem" }}>
      {props.showUploader ? (
        <div style={{ margin: "auto", alignSelf: "center" }}>
          <Typography variant="button" align="center" color="primary">
            {t("annexure")}
          </Typography>
        </div>
      ) : (
        <div style={{ margin: "auto", alignSelf: "center" }}>
          <Typography variant="button" align="center" color="primary">
            {t("my_personal_applications")}
          </Typography>
        </div>
      )}
    </div>
  );

  const send = () => {
    const { sendToogle } = props;
    sendToogle(true);
  };

  const deleteDoc = (row) => {
    // mtd to perform delete operation
    handleClickOpen();
  };

  const disAgreeFun = () => {
    handleClose();
  };

  const agreeFun = () => {
    handleClose();
    const row = deletedRow;
    const rowID = row.id;
    props.deleteAnnexureData(rowID).then((resp) => {
      dispatch(
        // once file has been deleted shows snackbar to notify user.
        setSnackbar(
          true,
          "success",
          `${t("annexure_has_been_deleted_successfully")} !`
        )
      );
      props.changingTableStateAnnexure(true, "CHANGE_PA_ANNEXURE");
    });
  };

  const handleDocumentRollback = async () => {
    try {
      const res = await props.rollbackAnnexureDocument(pdfDataStore.id, true);
      const data = rowData.map((item) => (item.id === res.id ? res : item));
      setRowData(data);
      setIconBtn(false);
      if (res) {
        setEditorUrl(
          `${pdfDataStore.fileUrl}?versionId=${pdfDataStore.versionId}`
        );
        setEditorId(pdfDataStore.id);
        setBlnOpenEditor(true);
        callMessageSuccess(`${t("Signature has been remove")} !`);
      }
    } catch (err) {
      callMessageOut(err.message);
    }
    // props.rollbackAnnexureDocument(pdfDataStore.id, true).then((res) => {
    //   try {
    //     const data = rowData.map((item) =>
    //       item.id === pdfDataStore.id
    //         ? {
    //             ...item,
    //             fileUrl: `${pdfDataStore.fileUrl}?versionId=${pdfDataStore.versionId}`,
    //             signed: false,
    //             versionId: null,
    //           }
    //         : { ...item }
    //     );
    //     let objData = data.find((item) => item.id === pdfDataStore.id);
    //     debugger;
    //     setpdfDataStore(objData);
    //     setRowData(data);
    //   } catch (e) {
    //     callMessageOut(e.message);
    //   }
    // });
  };

  useEffect(() => {
    if (pdfDataStore && pdfDataStore.pfileName) {
      setType(pdfDataStore.pfileName.endsWith(".docx"));
    }
    if (pdfDataStore && pdfDataStore.signed) {
      setIconBtn(true);
    } else {
      setIconBtn(false);
    }
    if (pdfDataStore && pdfDataStore.id && pdfDataStore.fileUrl) {
      setEditorId(pdfDataStore.id);
      setEditorUrl(pdfDataStore.fileUrl);
    }
  }, [pdfDataStore]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ minWidth: "300px" }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {t("confirmation")}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: props.theme ? "" : "black" }}
          >
            {t("do_you_want_delete_ANNEXURE")} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={disAgreeFun} color="primary">
            {t("cancel")}
          </Button>
          <Button
            variant="outlined"
            onClick={agreeFun}
            color="primary"
            autoFocus
          >
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Grid className={classes.paperCss}>
          {type ? (
            iconBtn ? (
              <Tooltip title={t("undo")}>
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
            ) : (
              <Tooltip title={t("send")}>
                <Fab
                  aria-label="close"
                  color="primary"
                  className={`button-glow ${classes.sign_btn1}`}
                  onClick={(e) => setOpenSign(true)}
                >
                  <EditIcon style={{ fontSize: "1rem" }} />
                </Fab>
              </Tooltip>
            )
          ) : (
            ""
          )}
          {props.blnOpenQuickSign && (
            <Tooltip title={t("send")}>
              <Fab
                aria-label="close"
                color="secondary"
                className={`button-glow ${classes.sign_btn}`}
                onClick={(e) => props.setSend(true)}
              >
                <SendIcon style={{ fontSize: "1rem" }} />
              </Fab>
            </Tooltip>
          )}
          <Grid container spacing={1}>
            <Grid item xs={9}>
              {rowData.length !== 0 ? (
                <div style={{ border: "1px solid #b6b6b66b" }}>
                  {blnOpenEditor ? (
                    <div className="customDiv">
                      <HeadersAndFootersView
                        fileId={editorId}
                        fileUrl1={editorUrl}
                        blnIsPartCase={false}
                        isAnnexure={true}
                        // blnOpenQuickSign={(e) => setBlnOpenEditor(false)}
                        blnShowQuickSign={true}
                      />
                      {/* <p>id: ${editorId}</p>
                      <p>url: ${editorUrl}</p> */}
                    </div>
                  ) : (
                    <SplitViewPdfViewer
                      fileUrl={pdfDataStore && pdfDataStore.fileUrl}
                      extension={extension}
                      pdfLoads={(val) => {
                        setPdfLoads(val);
                      }}
                    />
                  )}
                </div>
              ) : (
                <div
                  style={{
                    height: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1>No Annexure</h1>
                </div>
              )}
            </Grid>
            <Grid item xs={3}>
              <Paper
                style={{ border: "1px solid #b6b6b66b", borderRadius: "18px" }}
              >
                <CustomToolbarMarkup />
                <div
                  style={{
                    height: "50vh",
                    overflowY: "auto",
                  }}
                >
                  <DataGrid
                    rows={rowData}
                    columns={columns1}
                    rowHeight={36}
                    pageSize={pageSize}
                    rowsPerPageOptions={pageSizes}
                    onPageSizeChange={(value) => setPageSize(value)}
                    disableSelectionOnClick
                    paginationMode="server"
                    rowCount={totalCount}
                    onRowClick={handleClick}
                    onPageChange={(newPage) => {
                      setCurrentPage(newPage);
                    }}
                  />
                </div>
              </Paper>
              <div>
                {props.showUploader && (
                  <Paper>
                    <AnnexureUploader personalAppID={paID} sendClick={send} />
                  </Paper>
                )}
                {props.sampleData && (
                  <Card
                    className="user_history_card"
                    style={{
                      border: "1px solid rgba(182, 182, 182, 0.42)",
                      marginTop: "1rem",
                      borderRadius: "18px",
                    }}
                  >
                    <div style={{ margin: "auto", textAlign: "center" }}>
                      <Typography
                        variant="button"
                        align="center"
                        color="primary"
                      >
                        History
                      </Typography>
                    </div>
                    <CardContent
                      style={{ maxHeight: "40vh", overflowY: "auto" }}
                    >
                      <Timeline>
                        {props.sampleData.map((item) => (
                          <TimelineItem
                            key={item.id}
                            style={{ fontSize: ".5rem" }}
                          >
                            <TimelineSeparator>
                              <TimelineDot
                                color={item.color}
                                variant={item.variant}
                              >
                                <item.icon />
                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Paper
                                elevation={3}
                                className={classes.paper}
                                style={{
                                  backgroundColor: item.background,
                                  display: "flex",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {item.title}
                                  {item.title === "Created Personal Application"
                                    ? ""
                                    : ":"}
                                  &nbsp;
                                </Typography>
                                <Typography>{item.description}</Typography>
                              </Paper>
                              <Typography variant="body2" color="textSecondary">
                                {item.typo}
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </CardContent>
                  </Card>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
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
              <SignForm
                annexureId={annexureId}
                fileURL={pdfDataStore ? pdfDataStore.fileUrl : ""}
                fileId={pdfDataStore ? pdfDataStore.id : ""}
                loadAnnextureTableData={loadAnnextureTableData}
                setOpenSign={setOpenSign}
                paID={paID}
              />
            </DialogContent>
          </Paper>
        </Dialog>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    props: state.props,
    subscribeApi: state.subscribeApi,
    theme: state.theme,
  };
}
export default connect(mapStateToProps, {
  loadAnnexureTableData,
  getPAWithAnnexureList,
  changingTableStateAnnexure,
  deleteAnnexureData,
  rollbackAnnexureDocument,
})(Annexure);
