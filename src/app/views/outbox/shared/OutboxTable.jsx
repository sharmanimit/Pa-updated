import React, { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "@devexpress/dx-react-grid-material-ui";
import {
  IconButton,
  Paper,
  Tooltip,
  FormControl,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  loadOutboxData,
  getHistory,
  loadOutboxRow,
  getDataForExport,
} from "../../../camunda_redux/redux/action";
import { changingTableStateOutbox } from "../../../camunda_redux/redux/action/apiTriggers";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import DateRangeFilter from "../shared/DateRangeFilter";
import { addDays, subDays } from "date-fns";
import "../therme-source/material-ui/loading.css";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import HistoryIcon from "@material-ui/icons/History";
import { DataGrid } from "@material-ui/data-grid";
import ShowAndHide from "../../utilities/ShowAndHide";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SplitViewPdfViewer from "../../inbox/shared/pdfViewer/pdfViewer";
import Annexure from "./Annexure";
import FileViewTable from "./FileViewTable";
import ReactExport from "react-data-export";
import GetAppIcon from "@material-ui/icons/GetApp";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  historyTimeLine: {
    justifyContent: "flex-start",
    "& .MuiTimelineOppositeContent-root": {
      flex: "none",
    },
  },
}));

const OutboxTable = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { theme } = useSelector((state) => state);

  const columns = [
    {
      field: "serialNo",
      headerName: t("SL NO"),
      width: 10,
      // editable: true,
    },
    {
      field: "subject",
      headerName: t("subject").toUpperCase(),
      width: 250,
      // editable: true,
      renderCell: (params) => (
        <div>
          <Typography>
            <ShowAndHide data={params.row.subject} />
          </Typography>
          {/* <Typography color="textSecondary">{params}</Typography> */}
        </div>
      ),
    },
    {
      field: "fileName",
      headerName: `${t("PA NO.")}`,
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography>
            <ShowAndHide data={params.row.fileName} />
          </Typography>
        </div>
      ),
    },
    {
      field: "status",
      headerName: t("status"),
      width: 150,
      // editable: true,
      renderCell: (params) => (
        <div>
          <Typography>
            <span style={cellStyles[params.row.status]}>
              {params.row.status === 2
                ? "In-Progress"
                : params.row.status === 3
                ? "Approved"
                : params.row.status === 4
                ? "Rejected"
                : params.row.status}
            </span>
          </Typography>
        </div>
      ),
    },
    {
      field: "dateSent",
      headerName: t("date_sent"),
      width: 150,
      // editable: true,
    },
    {
      field: "to",
      headerName: t("to"),
      width: 160,
      // editable: true,
    },
    {
      field: "type",
      headerName: t("type"),
      width: 120,
      // editable: true,
      renderCell: (params) => (
        <div>
          {params.row.type}&nbsp;&nbsp;&nbsp;
          {params.row.type === "File" ? (
            <IconButton
              aria-label="userHistory"
              size="small"
              onClick={(e) => {
                handleOnClickOpenHistory(e, params.row);
              }}
            >
              <Tooltip
                title={t("show_user_history")}
                aria-label="Show User History"
              >
                <HistoryIcon color="primary" />
              </Tooltip>
            </IconButton>
          ) : (
            <span style={{ marginLeft: "2em" }}></span>
          )}
        </div>
      ),
    },
  ];

  const [date, setDate] = useState([
    {
      startDate: subDays(new Date(), 30),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sampleData, setSampleData] = useState([]);
  const [blnOpenHistory, setblnOpenHistory] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [resp, setResp] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [type, setType] = useState(false);
  const [exportData, setExportData] = useState([]);

  const role = sessionStorage.getItem("role");
  const userName = sessionStorage.getItem("username");

  const { blnValueOutbox } = props.subscribeApi;
  const outboxData = useSelector((state) => state.outbox);
  console.log("export data check :", exportData);
  // const docStatusColor = data.status === "Approved" ? "green" : data.status === "In-Progress" ? "orange" : "red";
  const DataSet = [
    {
      columns: [
        {
          title: "SL. NO.",
          style: { font: { sz: "16", bold: true } },
          width: { wpx: 60 },
        },
        {
          title: "SUBJECT",
          style: { font: { sz: "16", bold: true } },
          width: { wpx: 180 },
        },
        {
          title: "FILE#",
          style: { font: { sz: "16", bold: true } },
          width: { wpx: 180 },
        },
        {
          title: "STATUS",
          style: { font: { sz: "16", bold: true } },
          width: { wpx: 180 },
        },
        {
          title: "DATE SENT",
          style: { font: { sz: "16", bold: true } },
          width: { wpx: 180 },
        },
        {
          title: "SEND TO",
          style: { font: { sz: "16", bold: true } },
          width: { wpx: 180 },
        },
        {
          title: "TYPE",
          style: { font: { sz: "16", bold: true } },
          width: { wpx: 180 },
        },
      ],
      data: exportData.map((data) => [
        { value: data.serialNo, style: { font: { sz: "12" }, align: "right" } },
        { value: data.subject, style: { font: { sz: "12" } } },
        { value: data.fileName, style: { font: { sz: "12" } } },
        { value: data.status, style: { font: { sz: "12" } } },
        { value: data.dateSent, style: { font: { sz: "12" } } },
        { value: data.to, style: { font: { sz: "12" } } },
        { value: data.type, style: { font: { sz: "12" } } },
      ]),
    },
  ];
  // useEffect(() => {
  //   loadOutBoxTable();
  // }, [dispatch]);

  useEffect(() => {
    let tmpArr = [];
    tmpArr = outboxData.dataoutbox.map((item, index) => {
      return { ...item, serialNo: pageSize * currentPage + (index + 1) };
    });
    setTotalCount(outboxData.length);
    // props.changingTableStateOutbox(false, "CHANGE_OUTBOX");
    // props.blnEnableLoader(false);
    setRowData(tmpArr);
  }, [outboxData]);

  const loadOutBoxTable = () => {
    dispatch(loadOutboxData(role, userName, pageSize, currentPage, date[0]));
  };

  useEffect(() => loadOutBoxTable(), [blnValueOutbox, currentPage]);

  // const loadOutBoxTable = () => {
  //   let tmpArr = [];
  //   props.blnEnableLoader(true);
  //   setRowData([]);
  //   console.log(date[0]);
  //   props
  //     .loadOutboxData(role, userName, pageSize, currentPage, date[0])
  //     .then((resp) => {
  //       try {
  //         if (resp) {
  //           if (!isNullOrUndefined(resp.Data)) {
  //             setTotalCount(resp.length);
  //             tmpArr = resp.Data.map((item, index) => {
  //               return {
  //                 ...item,
  //                 serialNo: pageSize * currentPage + (index + 1),
  //               };
  //             });
  //             props.changingTableStateOutbox(false, "CHANGE_OUTBOX");
  //             setRowData(tmpArr);
  //             props.blnEnableLoader(false);
  //           } else {
  //             const errorMessage =
  //               resp.status + " : " + resp.error + " AT " + resp.path;
  //             callMessageOut(errorMessage);
  //           }
  //         }
  //       } catch (e) {
  //         callMessageOut(e.message);
  //       }
  //     });
  // };

  const callMessageOut = (message) => {
    props.blnEnableLoader(false);
    dispatch(setSnackbar(true, "error", message));
  };

  const cellStyles = {
    2: {
      color: "rgb(21, 101, 192)",
      fontWeight: "bolder",
    },
    3: {
      color: "rgb(76, 175, 80)",
      fontWeight: "bolder",
    },
    4: {
      color: "rgb(198, 40, 40)",
      fontWeight: "bolder",
    },
  };

  const handleOnClickOpenHistory = (e, row) => {
    e.stopPropagation();
    if (row) {
      props.getHistory("file", row.inboxId).then((resp) => {
        if (resp) {
          !isNullOrUndefined(resp.data)
            ? setSampleData(resp.data)
            : setSampleData([]);
        }
        setblnOpenHistory(true);
      });
    }
  };

  const HeaderDateRange = () => (
    <div className="header-input">
      <Typography
        variant="button"
        color="primary"
        style={{ fontSize: "20px", marginLeft: "20px" }}
      >
        {t("outbox")}
      </Typography>
      <FormControl variant="outlined" size="small">
        <label style={{ marginBottom: "0px", marginRight: "15px" }}>
          {t("filter_by_date_sent")} :{" "}
        </label>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={`${
            months[date[0].startDate.getMonth()]
          } ${date[0].startDate.getDate()}, ${date[0].startDate.getFullYear()} - ${
            months[date[0].endDate.getMonth()]
          } ${date[0].endDate.getDate()}, ${date[0].endDate.getFullYear()} `}
          onClick={handleClickOpen}
        />
        <IconButton style={{ padding: "0px 15px" }} onClick={loadOutBoxTable}>
          <Tooltip title="Search" aria-label="Search">
            <SearchIcon />
          </Tooltip>
        </IconButton>

        {/* {exportData.length !== 0 ? ( */}
        <ExcelFile
          filename="outbox Data"
          element={
            <IconButton style={{ padding: "0px", paddingRight: "15px" }}>
              <Tooltip title="Export Data" aria-label="Export Data">
                <GetAppIcon />
              </Tooltip>
            </IconButton>
          }
        >
          <ExcelSheet dataSet={DataSet} name="OutBox Data" />
        </ExcelFile>
        {/* ) : null} */}
      </FormControl>
    </div>
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };

  const onDateChange = (ranges) => {
    // ranges ...
    // alert("changed check the console log");
    console.log("from outbox", ranges);
    setDate([ranges]);
    // call api here
    props.getDataForExport(role, userName, ranges).then((res) => {
      setExportData(res.response.Data);
      console.log("res dateRange :", exportData);
    });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleOnRowClick = ({ row }) => {
    // console.log(row)
    row.type === "PA" ? setType(true) : setType(false);
    setOpenDialog(true);

    props
      .loadOutboxRow(row.id)
      .then((resp) => {
        setResp(resp.response.Data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{ position: "relative", borderRadius: "18px" }}
      >
        <div>
          <Grid rows={rowData} columns={columns} className="outbox-table">
            <>
              <Dialog
                maxWidth="md"
                open={open}
                keepMounted
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  <Typography
                    variant="button"
                    color="primary"
                    style={{ fontSize: "20px" }}
                  >
                    {t("choose_date_range")}
                  </Typography>
                  <Typography
                    variant="button"
                    color="primary"
                    style={{ fontSize: "20px", float: "right" }}
                  >
                    <CloseIcon
                      style={{ cursor: "pointer" }}
                      onClick={handleClose}
                    />
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DateRangeFilter onDateChange={onDateChange} date={date} />
                </DialogContent>
              </Dialog>
            </>
            <HeaderDateRange />
            <div
              style={{ height: "calc(100vh - 160px)", width: "100%" }}
              className="mui-table-customize"
            >
              <DataGrid
                rows={rowData}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={pageSizes}
                rowHeight={36}
                // checkboxSelection
                disableSelectionOnClick
                paginationMode="server"
                rowCount={totalCount}
                onPageChange={(value) => setCurrentPage(value)}
                onPageSizeChange={(value) => setPageSize(value)}
                onRowClick={handleOnRowClick}
                getRowClassName={(params) => `super-app-theme-${params.row.status}`}
              />
            </div>
          </Grid>
        </div>
      </Paper>
      <Dialog
        open={blnOpenHistory}
        onClose={(e) => setblnOpenHistory(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ minWidth: "300px" }}
        fullWidth
        className="outbox-history"
        maxWidth="sm"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {t("user_history")}
        </DialogTitle>
        <DialogContent dividers style={{ maxHeight: "600px" }}>
          <Timeline align="left">
            {sampleData.map((item, index) => (
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
                  {sampleData.length === index + 1 ? "" : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={classes.paper}
                    style={{ backgroundColor: "#eaeaea" }}
                  >
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", color: "#000" }}
                    >
                      <span
                        style={{ fontWeight: "bold", color: "#000" }}
                      >{`${item.title} :`}</span>{" "}
                      {item.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
      </Dialog>
      {openDialog && (
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleClose}
          // TransitionComponent={Transition}
        >
          <div
            style={{
              backgroundColor: theme ? "rgb(46 46 46)" : "rgb(241 241 241)",
            }}
          >
            {type ? (
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
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                  <div
                    style={{ border: "1px solid #b6b6b66b" }}
                    className={classes.pdfWrapper}
                  >
                    <SplitViewPdfViewer
                      fileUrl={resp && resp.fileUrl}
                      pdfLoads={(val) => {}}
                    />
                  </div>
                </TabPanel>
                <TabPanel>
                  <Annexure resp={resp} />
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
                    {t("personal_file").toUpperCase()}
                  </Tab>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                  <FileViewTable resp={resp} />
                </TabPanel>
              </Tabs>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    props: state.props,
    subscribeApi: state.subscribeApi,
  };
}

export default connect(mapStateToProps, {
  loadOutboxData,
  changingTableStateOutbox,
  getHistory,
  loadOutboxRow,
  getDataForExport,
})(OutboxTable);
