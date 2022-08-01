import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Dialog,
  IconButton,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Icon,
  Typography,
  Paper,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getHrmListData,
  createPANotingData,
  getbyfilename,
  loadPartCaseData,
  loadInboxDataSplitView,
} from "../../../camunda_redux/redux/action";
import { setPassData } from "../../../camunda_redux/redux/ducks/passData";
import history from "../../../../history";
import Grid from "@material-ui/core/Grid";
import NofFilesTable from "./NofFilesTable";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import "../therme-source/material-ui/loading.css";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { changingTableStateHrmConcern } from "app/camunda_redux/redux/action/apiTriggers";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { DataGrid } from "@material-ui/data-grid";
import ShowAndHide from "../../utilities/ShowAndHide";
import { returnPA } from "app/camunda_redux/redux/action";
import Cookies from "js-cookie";

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

const styles = {
  pa: {
    backgroundColor: "#b3e5fc",
  },
};

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  button: {
    marginBottom: 10,
  },
  mainDiv: {
    textAlign: "center",
  },
  formControl: {
    marginTop: 20,
    minWidth: 350,
    maxWidth: 350,
  },
  txtFieldFormControl: {
    minWidth: 500,
    maxWidth: 500,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  list: {
    border: "outset",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",

    background: "whitesmoke",
    //marginLeft: 250,
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },

  list: {
    border: "outset",
    display: "block",
    textAlign: "left",
    padding: "6px 15px",
    "& p": {
      margin: "0px",
    },
  },
  dNone: {
    display: "none",
  },
});

const FileListTable = (props) => {
  let type = Cookies.get("type");
  const { t } = useTranslation();
  const { theme } = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const columns = [
  //     { name: "name", title: t('list_of_files') }
  // ];
  const columns = [
    {
      field: "serialNo",
      headerName: t("SL NO"),
      width: 130,
      // editable: true,
    },
    {
      field: "name",
      headerName: t("list_of_files"),
      width: 250,
      renderCell: (params) => (
        <div>
          <Typography>
            {" "}
            <ShowAndHide data={params.row.name} />
          </Typography>
        </div>
      ),
    },
  ];
  const nofColumns = [
    { name: "filename", title: "File Number" },
    { name: "fileno", title: "File Name" },
  ];
  const [blnDisableNext, setBlnDisableNext] = useState(true);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const getRowId = (row) => row.index;
  const [hrmConcernURL, setHRMConcernURL] = useState("");
  const [fileTrackID, setFileTrackID] = useState("");
  const [fileNumber, setFileNumber] = React.useState("");
  const [indexofListofFiles, setIndexofListofFiles] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes, setPageSizes] = useState([5, 10, 15]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [partCaseId, setPartCaseId] = useState("");
  const username = sessionStorage.getItem("username");
  const [personName, setPersonName] = React.useState([]);
  const [nofFileID, setNofFileID] = React.useState("");
  const [rowData, setRowData] = React.useState([]);
  const [blnOpenDialog, setBlnOpenDialog] = React.useState(false);
  const [blnOpenRTA, setBlnOpenRTA] = React.useState(false);
  const [extension, setExtension] = useState("docx");

  // const TableRow = ({ row, ...restProps }) => (
  //   <Table.Row
  //     className="tableCustomRow"
  //     {...restProps}
  //     {...{ hover: true }}
  //     // eslint-disable-next-line no-alert
  //     onClick={(e) => handleClick(e, row)}
  //     style={{
  //       cursor: "pointer",
  //       ...styles[row.flag.toLowerCase()],
  //       // ...styles[indexofListofFiles.flag.toLowerCase()],
  //       backgroundColor: row.index === indexofListofFiles ? "#b3e5fc" : "",
  //     }}
  //   />
  // );

  const { fileID } = props;

  const InboxID = sessionStorage.getItem("InboxID");
  const { blnValueHrm } = props.subscribeApi;
  const loadHrmData = () => {
    props.getHrmListData(InboxID).then((resp) => {
      console.log(resp);
      const tmpArr = [];
      try {
        if (resp !== undefined) {
          tmpArr.push({
            index: 0,
            url: resp.annexureData[0].fileUrl,
            name: resp.annexureData[0].applicationList.subject,
            contentID: resp.paId,
            annotId: "",
            flag: "PA",
            id: 0,
            serialNo: 1,
          });
          // tmpArr.push({ "index":0, "url": resp.annexureData[0].fileUrl, "name": resp.annexureData[0].applicationList[0], "contentID": resp.paId, "annotId": resp.annotationId,"flag":"PA" });

          for (let i = 0; i < resp.annexures.length; i++) {
            tmpArr.push({
              index: i + 1,
              url: resp.annexures[i].annexureFileURL,
              name: resp.annexures[i].fileName,
              contentID: resp.annexures[i].contentId,
              annotId: "",
              flag: "Annexure",
              id: i + 1,
              serialNo: i + 2,
            });
            // tmpArr.push({ "index": i+1, "url": `${resp.annexureData[0].annexureUrl}/${resp.annexureData[0].annexuresList[i]}`, "name": resp.annexureData[0].annexuresList[i], "contentID": resp.annexures[i].contentId, "annotId": resp.annexures[i].annotationId,"flag":"Annexture" })
          }
          if (resp.annexureData !== undefined) {
            resp.annexureData[0].fileUrl;
            props.blnShowPdf(true);
          }
          props.changingTableStateHrmConcern(false, "CHANGE_HRM");
          props.setAnnotationId(resp.annotationId);
        } else {
          const errorMessage =
            resp.status + " : " + resp.error + " AT " + resp.path;
          callMessageOut(errorMessage);
        }
        setRowData(tmpArr);
        setHRMConcernURL(tmpArr[0].url)
        props.setFileUrl(tmpArr[0].url);
        props.flagValue(tmpArr[0].flag);
        props.annotID(resp.annotationId);
        props.contentID(tmpArr[0].contentID);
        setFileTrackID(resp.fileTrackId);
      } catch (e) {
        callMessageOut(e.message);
      }
    });
  };

  const loadServiceLetter = () => {
    Cookies.set("HrmRole", null);
    const inboxId = sessionStorage.getItem("InboxID");
    props.loadInboxDataSplitView(inboxId, username).then((resp) => {
      if (resp.Data.partCaseId) {
        setPartCaseId(resp.Data.partCaseId);
        sessionStorage.setItem("partcaseID", resp.Data.partCaseId);
        let formData = new FormData();
        formData.append("id", resp.Data.partCaseId);
        props.loadPartCaseData(formData).then((resp) => {
          const tmpArr = [];
          try {
            if (resp !== undefined) {
              props.blnShowPdf(true);
              resp.data.notingList.map((item, index) => {
                tmpArr.push({
                  url: item.fileUrl,
                  name: item.fileName,
                  contentID: "",
                  annotId: "",
                  flag: "PA",
                  id: index,
                  serialNo: index + 1,
                });
              });
              resp.data.enclosureList.reverse().map((item, index) => {
                tmpArr.push({
                  url: item.fileUrl,
                  name: item.fileName,
                  contentID: "",
                  annotId: "",
                  flag: "PA",
                  id: index,
                  serialNo: tmpArr.length + 1,
                });
              });
            } else {
              const errorMessage =
                resp.status + " : " + resp.error + " AT " + resp.path;
              callMessageOut(errorMessage);
            }
            setRowData(tmpArr);
            props.setFileUrl(tmpArr[0].url);
          } catch (error) {
            callMessageOut(e.message);
          }
        });
      }
    });
  };

  useEffect(() => {
    type === "PA" ? loadHrmData() : loadServiceLetter();
  }, [blnValueHrm]);

  useEffect(() => {
    if (props.pdfLoadsHRM == true && hrmConcernURL !== undefined) {
      props.blnShowPdf(true);
      let data = {extension, url: hrmConcernURL}
      dispatch(setPassData(data));
    }
  }, [props.pdfLoadsHRM, hrmConcernURL]);

  const callMessageOut = (message) => {
    props.blnEnableLoader(false);
    dispatch(setSnackbar(true, "error", message));
  };

  const handleClick = ({ row }) => {
    console.log(row)
    setSelectedRowIndex(row.serialNo);
    setIndexofListofFiles(row.index);
    let arr = row.name.split(".");
    arr.length !== 1 ? setExtension(arr[arr.length - 1]) : setExtension("docx");
    // props.annotID(row.annotId);
    props.contentID(row.contentID);
    props.flagValue(row.flag);
    setHRMConcernURL(row.url)
    // let data = {extension, url: row.url}
    // dispatch(setPassData(data));
  };
  console.log(extension)

  const nofHandleClick = (val) => {
    console.log("file diaolog values", val);
    setFileNumber(val.fileno);
    setPersonName(val.filename);
    setBlnOpenDialog(false);
    setBlnDisableNext(false);
  };


  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const [defaultColumnWidths] = useState([{ columnName: "name", width: 350 }]);

  const handleOpenDialog = () => {
    setBlnOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setBlnOpenDialog(false);
  };

  const handleOpenRTA = () => {
    setBlnOpenRTA(true);
  };

  const handleCloseRTA = () => {
    setBlnOpenRTA(false);
  };

  const handleRedirectToSplitView = () => {
    setOpenConfirmation(false);
    props.blnEnableLoader(true);
    const roleName = sessionStorage.getItem("role");
    const groupName = sessionStorage.getItem("department");
    const userName = sessionStorage.getItem("username");
    props
      .createPANotingData(
        fileTrackID,
        roleName,
        userName,
        groupName,
        personName,
        nofFileID
      )
      .then((resp) => {
        try {
          if (resp !== undefined && resp !== "") {
            if (resp.status === "OK" && resp.status !== 500) {
              props.blnEnableLoader(false);
              history.push({ pathname: "/eoffice/splitView/file" });
            } else {
              const errorMessage =
                resp.status + " : " + resp.error + " AT " + resp.path;

              callMessageOut(errorMessage);
            }
          } else {
            const errorMessage =
              resp.status + " : " + resp.error + " AT " + resp.path;

            callMessageOut(errorMessage);
          }
          console.log(resp);
        } catch (e) {
          callMessageOut(e.message);
        }
      });
  };

  const group = sessionStorage.getItem("pklDirectrate");

  const handleReturnPA = () => {
    props
      .returnPA(props.paId, group)
      .then((resp) => {
        history.push({ pathname: "/eoffice/inbox/file" });
        console.log(resp);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.mainDiv}>
      {type === "PA" && (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{ marginRight: "15px" }}
              color="primary"
              onClick={handleReturnPA}
              startIcon={<SkipPreviousIcon />}
              className={classes.button}
            >
              {t("Return PA")}
            </Button>
            <Button
              disabled={blnDisableNext}
              variant="contained"
              color="primary"
              onClick={() => setOpenConfirmation(true)}
              endIcon={<SkipNextIcon />}
              className={classes.button}
            >
              {t("create_part_case_file")}
            </Button>
          </Grid>
        </Grid>
      )}
      <Paper elevation={3} style={{ position: "relative", borderRadius: "18px" }}>
        <div
          style={{ height: "60vh" }}
          className="mui-table-customize"
        >
          <DataGrid
            rows={rowData}
            columns={columns}
            disableSelectionOnClick
            rowHeight={36}
            pageSize={pageSize}
            onRowClick={handleClick}
            rowsPerPageOptions={pageSizes}
            paginationMode="server"
            // onEditRowsModelChange={(value) => {
            //   console.log(value);
            // }}
            onPageSizeChange={(value) => setPageSize(value)}
            getRowClassName={(params) =>
              params.row.serialNo === selectedRowIndex ? "selected-row" : ""
            }
          />
        </div>
      </Paper>
      {type === "PA" && (
        <>
          <Grid
            container
            justify="center"
            spacing={2}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
                endIcon={<InsertDriveFileIcon />}
              >
                {t("select_file_for_nof")}
              </Button>
            </Grid>
          </Grid>

          <FormControl className={classes.formControl}>
            <List
              dense={true}
              className={personName.length > 0 ? classes.list : classes.dNone}
            >
              <p>
                <b>File No. :</b> {fileNumber} <br />
                <b>File Name. :</b> {personName}
              </p>
            </List>
          </FormControl>
        </>
      )}
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
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: theme ? "#fff" : "black" }}
          >
            {t("are_you_sure_to_create_a_part_case")} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenConfirmation(false)}
            color="primary"
          >
            {t("cancel")}
          </Button>
          <Button
            variant="outlined"
            onClick={handleRedirectToSplitView}
            color="primary"
            autoFocus
          >
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={blnOpenDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          onClose={handleCloseDialog}
        >
          {t("part_case_file_creation")}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            color="primary"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers style={{ overflow: "hidden" }}>
          <NofFilesTable
            onSelectFileData={nofHandleClick}
            onSelectFileID={(id) => setNofFileID(id)}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={blnOpenRTA}
        onClose={handleCloseRTA}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {t("return_application")} ?
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.txtFieldFormControl}>
            <TextField
              id="txtReason"
              label="Reason"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRTA} color="primary">
            {t("cancel")}
          </Button>
          <Button onClick={handleCloseRTA} color="primary" autoFocus>
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    props: state.props,
    subscribeApi: state.subscribeApi,
  };
}

export default connect(mapStateToProps, {
  getbyfilename,
  getHrmListData,
  createPANotingData,
  changingTableStateHrmConcern,
  returnPA,
  loadPartCaseData,
  loadInboxDataSplitView,
})(FileListTable);
