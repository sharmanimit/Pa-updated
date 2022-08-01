import React, { useEffect, useState } from "react";
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
// import HeadersAndFootersView from "../FileApproval/documentEditor/editor";
import DeleteIcon from "@material-ui/icons/Delete";
// import AnnexureUploader from "./AnnexureUploader";
import {
  loadAnnexureTableData,
  getPAWithAnnexureList,
  deleteAnnexureData,
  rollbackAnnexureDocument,
} from "../../../camunda_redux/redux/action";
import { changingTableStateAnnexure } from "../../../camunda_redux/redux/action/apiTriggers";
import { setSnackbar } from "../../../camunda_redux/redux/ducks/snackbar";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";

import SplitViewPdfViewer from "../../inbox/shared/pdfViewer/pdfViewer";

import { DataGrid } from "@material-ui/data-grid";
import ShowAndHide from "../../utilities/ShowAndHide";

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
    right: "50px !important",
    bottom: "30px !important",
    zIndex: 1,
  },
  sign_btn1: {
    position: "fixed",
    right: "50px !important",
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
  const [rowData, setRowData] = useState([]);
  const [selection, setSelection] = useState([1]);
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    {
      field: "serialNo",
      headerName: t("SL NO"),
      width: 120,
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

  const handleChange = (event) => {
    console.log(bodyRows);
  };

  let { blnValue } = props.subscribeApi; // apitrigger that is used to update table by using redux

  const loadAnnextureTableData = (fileId) => {
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
              resp.data.map((item, index) => {
                return { ...item, serialNo: index + 1 };
              });
            setRowData(tmpArr);
            setpdfDataStore(tmpArr[0]);
            setAnnexureId(resp.data[0].id);
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
      ? loadAnnextureTableData(fileId)
      : loadPaAnnextureTableData(fileId);
  }, [blnValue]);

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  };

  const callMessageSuccess = (msg) => {
    dispatch(setSnackbar(true, "success", msg));
  };

  const send = () => {
    const { sendToogle } = props;
    sendToogle(true);
  };

  const deleteDoc = (row) => {
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
  };

  console.log({ editorUrl });

  const handleOnRowClick = (args, e) => {
    setAnnexureId(args.row.id);
    // setAnnotationID(row.annotationId);
    setpdfDataStore(args.row);
    if (args.row.pfileName.endsWith(".docx")) {
      if (args.row.signed) {
        setBlnOpenEditor(false);
      } else {
        setBlnOpenEditor(true);
      }
    } else {
      setBlnOpenEditor(false);
    }
  };

  return (
    <>
      <div>
        <Paper elevation={3} className={classes.paperCss}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Paper>
                <div style={{ border: "1px solid #b6b6b66b" }}>
                  <SplitViewPdfViewer
                    fileUrl={pdfDataStore && pdfDataStore.fileUrl}
                    pdfLoads={(val) => {
                      setPdfLoads(val);
                    }}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "400px" }} className="mui-table-customize">
                <DataGrid
                  rows={rowData}
                  columns={columns}
                  pageSize={pageSize}
                  rowsPerPageOptions={pageSizes}
                  onPageSizeChange={(value) => setPageSize(value)}
                  disableSelectionOnClick
                  paginationMode="server"
                  rowCount={totalCount}
                  onRowClick={handleOnRowClick}
                  onPageChange={(newPage) => {
                    console.log("newPage", newPage);
                    setCurrentPage(newPage);
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
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
