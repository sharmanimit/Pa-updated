import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import "react-tabs/style/react-tabs.css";
import { loadAnnexureTableData } from "../../../camunda_redux/redux/action";
import { changingTableStateAnnexure } from "../../../camunda_redux/redux/action/apiTriggers";
import { setSnackbar } from "../../../camunda_redux/redux/ducks/snackbar";
import { useTranslation } from "react-i18next";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab";
import SplitViewPdfViewer from "../../inbox/shared/pdfViewer/pdfViewer";
import { DataGrid } from "@material-ui/data-grid";
import ShowAndHide from "../../../views/utilities/ShowAndHide";

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

// functional Component begins
const Annexure = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [pdfLoads, setPdfLoads] = useState(false);
  const [pdfDataStore, setpdfDataStore] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [extension, setExtension] = useState("docx");

  const columns = [
    {
      field: "serialNo",
      headerName: t("SL NO"),
      width: 120,
    },
    {
      field: "fileName",
      headerName: t("file_name"),
      width: 194,
    },
  ];

  let { blnValue } = props.subscribeApi; // apitrigger that is used to update table by using redux

  // const loadAnnextureTableData = (fileId) => {
  //   props
  //     .loadAnnexureTableData(fileId)
  //     .then((resp) => {
  //       // API call with redux to fetch table data based on Personal Inventory ID
  //       let tmpArr = [];
  //       try {
  //         if (resp.data !== undefined) {
  //           // condition to check if response has data then process further
  //           tmpArr =
  //             resp.data &&
  //             resp.data.map((item, index) => {
  //               return { ...item, serialNo: index + 1 };
  //             });
  //           setRowData(tmpArr);
  //           setpdfDataStore(tmpArr[0]);
  //           props.changingTableStateAnnexure(false, "CHANGE_PA_ANNEXURE"); // redux call to change trigger to false as table got updated
  //         } else {
  //           const errorMessage =
  //             resp.status + " : " + resp.error + " AT " + resp.path;
  //           callMessageOut(errorMessage);
  //         }
  //       } catch (e) {
  //         callMessageOut(e.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    console.log(props.resp);
    let tempArr =
      props.resp &&
      props.resp.annexuresList.map((item, i) => {
        return {
          fileName: item.fileName,
          serialNo: i + 1,
          id: `${i + 1}`,
          displayFileName: item.displayFileName,
        };
      });
    console.log(tempArr);
    if (tempArr && tempArr.length !== 0) {
      setRowData(tempArr);
      setFileUrl(`${props.resp.annexureUrl}/${tempArr[0].fileName}`);
      let arr = tempArr[0].displayFileName.split(".");
      setExtension(arr[arr.length - 1]);
    }
  }, [props.resp]);

  console.log(rowData);

  //   console.log(props.annexuresList)

  // useEffect(() => {
  //   const { fileId } = props; // Personal Inventory ID that is passed by parent component to peocess API
  //   loadAnnextureTableData(fileId);
  // }, [blnValue]);

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  };

  const handleOnRowClick = ({ row }) => {
    setSelectedRowIndex(row.serialNo);
    setFileUrl(`${props.resp.annexureUrl}/${row.fileName}`);
    console.log({ row });
    let arr = row.displayFileName.split(".");
    setExtension(arr[arr.length - 1]);
  };

  return (
    <>
      <div>
        {/* <button onClick={handleUndo} >undo</button> */}
        <Paper elevation={3} className={classes.paperCss}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Paper>
                {rowData.length !== 0 ? (
                  <div style={{ border: "1px solid #b6b6b66b" }}>
                    <SplitViewPdfViewer
                      fileUrl={fileUrl}
                      extension={extension}
                      pdfLoads={(val) => {
                        setPdfLoads(val);
                      }}
                    />
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
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "400px" }} className="mui-table-customize">
                <DataGrid
                  rows={rowData ? rowData : []}
                  columns={columns}
                  rowHeight={32}
                  pageSize={pageSize}
                  rowsPerPageOptions={pageSizes}
                  onPageSizeChange={(value) => setPageSize(value)}
                  disableSelectionOnClick
                  paginationMode="server"
                  rowCount={totalCount}
                  onRowClick={handleOnRowClick}
                  onPageChange={(newPage) => setCurrentPage(newPage)}
                  getRowClassName={(params) =>
                    params.row.serialNo === selectedRowIndex
                      ? "selected-row"
                      : ""
                  }
                />
              </div>
              <div>
                {props.sampleData && (
                  <Card
                    className="user_history_card"
                    style={{
                      border: "1px solid rgba(182, 182, 182, 0.42)",
                      marginTop: "1rem",
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
  changingTableStateAnnexure,
})(Annexure);
