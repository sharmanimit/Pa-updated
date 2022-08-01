import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tooltip,
  Button,
  TextField,
} from "@material-ui/core";
import {
  getPersonalApplicationFileData,
  loadAnnexureTableData,
} from "../../camunda_redux/redux/action";
import { connect, useSelector } from "react-redux";
import PdfViewer from "../../pdfViewer/pdfViewer";
import { useDispatch } from "react-redux";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { setPassData } from "app/camunda_redux/redux/ducks/passData";
import { Breadcrumb } from "matx";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import SplitViewPdfViewer from "../inbox/shared/pdfViewer/pdfViewer";
import "./therme-source/material-ui/loading.css";
import { DataGrid } from "@material-ui/data-grid";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShowAndHide from "../utilities/ShowAndHide";

const useStyles = makeStyles({
  formControl: {
    margin: 5,
    minWidth: 340,
    maxWidth: 350,
  },
});

const FileViewTable = (props) => {
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
      headerName: t("subject"),
      width: 150,
      // editable: true,
      renderCell: (params) => (
        <div>
          <Typography>
            <ShowAndHide data={params.row.subject} />
          </Typography>
        </div>
      ),
    },
    {
      field: "status",
      headerName: t("status"),
      width: 140,
      // editable: true,
    },
  ];

  const [rowData, setRowData] = useState([]);
  const [pdfLoads, setPdfLoads] = useState(false);
  const pFileName = Cookies.get("paFileId");
  const referenceNumber = Cookies.get("paFileName");
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [NOF, setNOF] = useState("");
  const [NOF1, setNOF1] = useState("");
  const [enclosureData, setEnclosureData] = useState([]);
  const [enclosureValue, setEnclosureValue] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [annexurefileURL, setAnnexurefileURL] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [extension, setExtension] = useState("docx");

  const handleClick = ({ row }) => {
    setSelectedRowIndex(row.serialNo);
    setFileURL(row.fileURL);
    setNOF(`${row.pfileName} | ${row.subject}`);
    console.log(row.id);
    const paID = row.id;
    props.loadAnnexureTableData(paID).then((resp) => {
      let tmpArr = [];
      tmpArr = resp.data.map((item, i) => {
        return { ...item, serialNo: i };
      });
      if (tmpArr === []) {
        setAnnexurefileURL("");
      } else {
        setAnnexurefileURL(tmpArr[0].fileUrl);
        setNOF1(JSON.stringify(tmpArr[0]));
        setEnclosureValue(tmpArr[0]);
        let arr = tmpArr[0].pfileName.split(".");
        setExtension(arr[arr.length - 1]);
      }
      setEnclosureData(tmpArr);
    });
  };

  const handleChangeAnnexure = (event) => {
    console.log(event.target.value);
    const data = JSON.parse(event.target.value);
    setNOF1(event.target.value);
    setEnclosureValue(data);
    setAnnexurefileURL(data.fileUrl);
    let arr = data.pfileName.split(".");
    setExtension(arr[arr.length - 1]);
  };

  const handleChangeNextAnnexure = () => {
    let data = JSON.parse(NOF1);

    if (data.serialNo + 1 === enclosureData.length) {
      let newData = enclosureData[0];
      setNOF1(JSON.stringify(newData));
      setEnclosureValue(newData);
      setAnnexurefileURL(newData.fileUrl);
    } else {
      let newData = enclosureData[data.serialNo + 1];
      setNOF1(JSON.stringify(newData));
      setEnclosureValue(newData);
      setAnnexurefileURL(newData.fileUrl);
    }
  };

  const handleChangePreviousAnnexure = () => {
    let data = JSON.parse(NOF1);

    if (data.serialNo === 0) {
      let newData = enclosureData[enclosureData.length - 1];
      setNOF1(JSON.stringify(newData));
      setEnclosureValue(newData);
      setAnnexurefileURL(newData.fileUrl);
    } else {
      let newData = enclosureData[data.serialNo - 1];
      setNOF1(JSON.stringify(newData));
      setEnclosureValue(newData);
      setAnnexurefileURL(newData.fileUrl);
    }
  };

  const dataPA = useSelector((state) => state.filepa);
  console.log(dataPA);

  useEffect(() => {
    loadFileView();
  }, [dispatch, currentPage]);

  useEffect(() => {
    let tmpArr = [];
    tmpArr = dataPA.padata.map((item, index) => {
      return { ...item, serialNo: pageSize * currentPage + (index + 1) };
    });
    setTotalCount(dataPA.padata.length != null ? dataPA.padata.length : 0);
    setRowData(tmpArr);
    setFileURL(tmpArr.length === 0 ? "" : tmpArr[0].fileURL);
  }, [dataPA]);

  const loadFileView = () => {
    dispatch(getPersonalApplicationFileData(pFileName, pageSize, currentPage));
  };

  useEffect(() => {
    if (!pFileName) {
      history.push("/eoffice/personnel/file");
    }
  }, [pFileName]);

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  };

  const CustomToolbarMarkup = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "3rem",
        border: `1px solid ${theme ? "#505050" : "#d9d9d9"}`,
        borderRadius: "15px 15px 0 0"
      }}
    >
      <Typography variant="button" align="center" color="primary">
        {t("personal_application")}
      </Typography>
    </div>
  );

  useEffect(() => {
    console.log(annexurefileURL);
    if (pdfLoads === true && annexurefileURL !== "") {
      let data = { extension, url: annexurefileURL };
      dispatch(setPassData(data));
    } else {
      let data = { extension, url: process.env.REACT_APP_PDF_SAMPLE_URL };
      dispatch(setPassData(data));
    }
  }, [pdfLoads, annexurefileURL]);

  return (
    <div className="container_Personal">
      <Grid container spacing={1} >
        <Grid item xs={4}>
          <Breadcrumb
            routeSegments={[
              { name: t("personnel"), path: "/eoffice/personnel/file" },
              {
                name: `${t("personal_file")}`,
                path: "/eoffice/personnel/fileview",
              },
            ]}
            otherData={[{ key: "file number", value: referenceNumber }]}
          />
        </Grid>
        <Grid item xs={3}>
          <div className={classes.formControl}>
            <FormControl>
              {NOF && (
                <Typography variant="body1" gutterBottom color="primary">
                  {NOF}
                </Typography>
              )}
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={5}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 4rem 4rem",
              gridGap: ".5rem",
            }}
          >
            <TextField
              select
              label="Annexure"
              value={NOF1}
              size="small"
              fullWidth
              onChange={handleChangeAnnexure}
              variant="outlined"
            >
              {enclosureData.map((item, index) => (
                <MenuItem key={index} value={JSON.stringify(item)}>
                  {item.pfileName}
                </MenuItem>
              ))}
            </TextField>
            <Tooltip title={t("Previous Annexure")} aria-label="Add Noting">
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePreviousAnnexure}
              >
                <SkipPreviousIcon />
              </Button>
            </Tooltip>
            <Tooltip title={t("Next Annexure")} aria-label="Add Noting">
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangeNextAnnexure}
              >
                <SkipNextIcon />
              </Button>
            </Tooltip>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Paper elevation={3} style={{ borderRadius: "15px" }}>
            <CustomToolbarMarkup />
            <div
              className="fileViewtable mui-table-customize"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <DataGrid
                rows={rowData}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={pageSizes}
                paginationMode="server"
                rowCount={totalCount}
                onRowClick={handleClick}
                disableSelectionOnClick
                rowHeight={36}
                onPageChange={(value) => setCurrentPage(value)}
                onPageSizeChange={(value) => setPageSize(value)}
                getRowClassName={(params) =>
                  params.row.serialNo === selectedRowIndex
                    ? `super-app-theme-${params.row.status} selected-row`
                    : `super-app-theme-${params.row.status}`
                }
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <div style={{ border: "1px solid #b6b6b66b" }}>
            <SplitViewPdfViewer
              fileUrl={fileURL}
              pdfLoads={(val) => {
                setPdfLoads(val);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={5}>
          <div style={{ border: "1px solid #b6b6b66b" }}>
            <PdfViewer
              fileUrl={""}
              pdfLoads={(val) => {
                setPdfLoads(val);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

function mapStateToProps(state) {
  return { props: state.props };
}

export default connect(mapStateToProps, {
  getPersonalApplicationFileData,
  loadAnnexureTableData,
})(FileViewTable);
