import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from "@material-ui/core";
import {
  getPersonalApplicationFileData,
  loadAnnexureTableData,
} from "../../../camunda_redux/redux/action";
import { connect, useSelector } from "react-redux";
import PdfViewer from "../../../pdfViewer/pdfViewer";
import { useDispatch } from "react-redux";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { setPassData } from "app/camunda_redux/redux/ducks/passData";
import { Breadcrumb } from "matx";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import SplitViewPdfViewer from "../../inbox/shared/pdfViewer/pdfViewer";
import "../therme-source/material-ui/loading.css";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles({
  formControl: {
    margin: 5,
    minWidth: 350,
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
      width: 120,
      // editable: true,
    },
    {
      field: "fileName",
      headerName: t("subject"),
      width: 150,
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
  const [fileURL, setFileURL] = useState("");
  const [annexurefileURL, setAnnexurefileURL] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [extension, setExtension] = useState("docx");

  const handleClick = ({ row }) => {
    setSelectedRowIndex(row.serialNo);
    setFileURL(row.fileUrl);
  };

  const handleChangeAnnexure = (event) => {
    const data = JSON.parse(event.target.value);
    let arr = data.fileName.split(".");
    setExtension(arr[arr.length - 1]);
    setNOF1(event.target.value);
    setAnnexurefileURL(data.fileUrl);
  };

  console.log({ rowData, enclosureData });

  const dataPA = useSelector((state) => state.filepa);
  console.log(dataPA);

  // useEffect(() => {
  //   console.log(annexurefileURL);

  // }, [pdfLoads, annexurefileURL]);

  useEffect(() => {
    loadFileView();
  }, [dispatch]);

  console.log(props.resp);

  useEffect(() => {
    let tmpArr = [];
    let tmpArr2 = [];
    if (props.resp) {
      tmpArr =
        props.resp.notingList &&
        props.resp.notingList.map((item, index) => {
          return {
            ...item,
            serialNo: pageSize * currentPage + (index + 1),
            id: index,
          };
        });

      setRowData(tmpArr);
      if (tmpArr && tmpArr.length !== 0) {
        setFileURL(tmpArr[0].fileUrl);
      }
      tmpArr2 =
        props.resp &&
        props.resp.enclosureList.map((item, index) => {
          return { ...item, id: index };
        });
      setEnclosureData(tmpArr2);
      if (tmpArr2 && tmpArr2.length !== 0) {
        let arr = tmpArr2[0].fileName.split(".");
        setExtension(arr[arr.length - 1]);
      }
      setNOF1(JSON.stringify(tmpArr2[0]));
      setAnnexurefileURL(tmpArr2[0].fileUrl);
    }
  }, [props.resp]);

  const loadFileView = () => {
    dispatch(getPersonalApplicationFileData(pFileName, pageSize, currentPage));
  };

  const CustomToolbarMarkup = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "3rem",
        border: `1px solid ${theme ? "#505050" : "#d9d9d9"}`,
        borderRadius: "18px 18px 0 0"
      }}
    >
      <Typography variant="button" align="center" color="primary">
        {t("personal_application")}
      </Typography>
    </div>
  );

  return (
    <div className="m-sm-30">
      <Grid container spacing={1}>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}>
          <div className={classes.formControl}></div>
        </Grid>
        <Grid item xs={5}>
          <div>
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
                  {item.fileName}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Paper elevation={3} style={{borderRadius: "18px"}} >
          <CustomToolbarMarkup />
            <div
              className="fileViewtable mui-table-customize"
              style={{ height: "calc(100vh - 160px)" }}
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
                  params.row.serialNo === selectedRowIndex ? "selected-row" : ""
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
            <SplitViewPdfViewer
              fileUrl={annexurefileURL}
              extension={extension}
              // pdfLoads={(val) => {
              //   props.blnPdfLoads(val);
              // }}
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
