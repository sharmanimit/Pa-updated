import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import { Fab, Tooltip, Typography } from "@material-ui/core";
import { loadPFData } from "../../camunda_redux/redux/action";
import { connect, useDispatch } from "react-redux";
import history from "../../../history";
import { changingTableState } from "../../camunda_redux/redux/action/apiTriggers";
import { setRefresh1 } from "../../redux/actions/Refresh1Actions";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { DataGrid } from "@material-ui/data-grid";
import ShowAndHide from "../utilities/ShowAndHide";
import AddIcon from "@material-ui/icons/Add";
// import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
// import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
// import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
// import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';

const PersonalFileTable = (props) => {
  const { t } = useTranslation();
  //Initialization of state variables
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSizes] = useState([5, 10, 15]);

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
      width: 250,
      renderCell: (params) => (
        <div>
          <Typography>
            <ShowAndHide data={params.row.subject} />
          </Typography>
        </div>
      ),
    },
    {
      field: "displayFileName",
      headerName: `${t("pa_number")}`,
      width: 150,
      // editable: true,
    },
  ];

  const handleClick = ({ row }) => {
    // mtd that has been triggered while row clicks
    if (row !== undefined && row !== "") {
      Cookies.set("paFileId", row.id);
      Cookies.set("paFileName", row.fileName);
      history.push({ pathname: "/eoffice/personnel/fileview", state: row.id });
    } else {
      const errorMessage = t("failed_to_load,_kindly_refresh_the_page!");
      callMessageOut(errorMessage);
    }
  };

  const { blnValuePF } = props.subscribeApi; // redux trigger that helps in refreshing table
  useEffect(() => loadPFTableData(), [blnValuePF, currentPage, pageSize]);

  const loadPFTableData = () => {
    setRowData([]);
    props
      .loadPFData(username, role, pageSize, currentPage, pageSize)
      .then((resp) => {
        let tmpArr = [];
        try {
          if (resp) {
            // condition to check if response then perform further
            if (resp.data !== undefined) {
              tmpArr = resp.data.map((item, index) => {
                return {
                  ...item,
                  serialNo: pageSize * currentPage + (index + 1),
                };
              });
              setRowData(tmpArr);
              setTotalCount(resp.length != null ? resp.length : 0);
            } else {
              const errorMessage =
                resp.status + " : " + resp.error + " AT " + resp.path;
              callMessageOut(errorMessage);
            }
            props.changingTableState(false, "CHANGE_PA_FILE"); // setting trigger to false as table got updated
            props.setRefresh1(false);
          }
        } catch (e) {
          callMessageOut(e.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  };

  const CustomToolbarMarkup = () => (
    // Custom table header
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
          fontFamily: "inherit !important",
          fontSize: "medium",
          marginLeft: "15px",
        }}
      >
        {t("my_personal_files")}
      </Typography>
      <Tooltip title={t("personal_file")}>
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
            disableSelectionOnClick
            rowHeight={36}
            onPageChange={(value) => setCurrentPage(value)}
            onPageSizeChange={(value) => setPageSize(value)}
          />
        </div>
      </Paper>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    props: state.props,
    subscribeApi: state.subscribeApi,
    refreshing: state.refreshing,
    theme: state.theme,
    myInfo: state.myInfo,
  };
}

export default connect(mapStateToProps, {
  setRefresh1,
  loadPFData,
  changingTableState,
})(PersonalFileTable);
