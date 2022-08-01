import React, { useState, useRef, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@material-ui/data-grid";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  Paper,
  withStyles,
  Icon,
  Fab,
  Button,
} from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadInboxData, loadSfdt } from "../../../camunda_redux/redux/action";
import history from "../../../../history";
// import CloseIcon from '@material-ui/icons/Close';
// import StartProcessPage from "../../initiate/shared/startProcess/StartProcessPage";
// import HeadersAndFootersView from "../../FileApproval/documentEditor/editor";
import Slide from "@material-ui/core/Slide/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { setPassData } from "../../../camunda_redux/redux/ducks/passData";
import { setLoadData } from "../../../redux/actions/LoadingActions";
import { setInboxDatas } from "../../../redux/actions/InboxActions";
import { changingTableStateInbox } from "../../../camunda_redux/redux/action/apiTriggers";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
// import { Loading } from "../therme-source/material-ui/loading";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
// import Draggable from "react-draggable";
import NearMeIcon from "@material-ui/icons/NearMe";
import "../therme-source/material-ui/loading.css";
import ShowAndHide from "../../utilities/ShowAndHide";
import Typography from "@material-ui/core/Typography";

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
  customRow: {
    "&:hover": {
      backgroundColor: "lightgray",
    },
  },
}));

const InboxTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [rowData, setRowData] = useState([]);
  const [rowID, setRowID] = useState("");
  const [selection, setSelection] = useState([]);
  const [bodyRows, setBodyRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openQuickSign, setOpenQuickSign] = useState(false);
  const [openUserTimeLine, setopenUserTimeLine] = useState(false);
  const [SFDT, setSFDT] = useState("");
  const [paID, setPAID] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiSelectBtnShow, setMultiSelectBtnShow] = useState(false);
  const [pdfDataStore, setpdfDataStore] = useState({});
  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);
  // const tableSelect = useRef();
  const floatIcon = useRef();

  const role = sessionStorage.getItem("role");
  const userName = sessionStorage.getItem("username");
  const { blnValueInbox } = props.subscribeApi;
  const { personalId, annotationId, inboxId, blnShowPdf } = props;

  const { getInboxData } = useSelector((state) => state.getInbox);

  useEffect(() => {
    loadInboxTable();
  }, [dispatch]);

  useEffect(() => {
    getInboxData && setTotalCount(getInboxData.length);
    setRowData(getInboxData);

    // getInboxData && dispatch(setPassData(getInboxData[0] && getInboxData[0].personalUrl))

    // annotationId(getInboxData[0].annotationId)
    getInboxData && setpdfDataStore(getInboxData[0]);
    props.changingTableStateInbox(false, "CHANGE_INBOX");
    blnShowPdf(true);
  }, [getInboxData]);

  const loadInboxTable = () => {
    dispatch(loadInboxData(role, userName, pageSize, currentPage));
  };

  // useEffect(() => loadInboxTable(), [blnValueInbox, currentPage])

  // const loadInboxTable = () => {
  //     setLoading(true)
  //     setRowData([])
  //     // dispatch(loadInboxData(role, userName, pageSize, currentPage))
  //     props.loadInboxData(role, userName, pageSize, currentPage).then(resp => {
  //         const tmpArr = []
  //         try {
  //             if (resp.response.Data !== undefined) {
  //                 setLoading(false)
  //                 for (var i = 0; i < resp.response.Data.length; i++) {
  //                     tmpArr.push(resp.response.Data[i])
  //                 }
  //                 props.changingTableStateInbox(false, 'CHANGE_INBOX');
  //                 setpdfDataStore(resp.response.Data[0])
  //                 blnShowPdf(true)
  //                 setTotalCount(resp.response.length)
  //             }
  //             else {
  //                 setLoading(false)
  //                 const errorMessage = resp.response.status + " : " + resp.response.error + " AT " + resp.response.path
  //                 callMessageOut(errorMessage)
  //             }
  //             setRowData(tmpArr)
  //         } catch (e) {
  //             setLoading(false)
  //             callMessageOut(e.message)
  //         }

  //     });

  // }

  useEffect(() => {
    if (props.pdfLoadsInbox == true && pdfDataStore !== undefined) {
      annotationId(pdfDataStore.annotationId);
      personalId(pdfDataStore.personalApplicationInventoryId);
      if (getInboxData.length !== 0) {
        let data = { extension: "docx", url: getInboxData[0].personalUrl };
        dispatch(setPassData(data));
      }
      // setTimeout(() => {
      // pdfDataStore.personalUrl && dispatch(setPassData(pdfDataStore.personalUrl))
      // }, 1000)
    }
  }, [props.pdfLoadsInbox]);

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  };

  useEffect(() => {
    Cookies.remove("inboxFile");
    Cookies.remove("priority");
    Cookies.remove("referenceNumber");
    Cookies.remove("hasCoverNote");
    Cookies.remove("type");
  }, []);

  // const columns = [
  //     { name: "subject", title: t("subject") },
  //     { name: "referenceNumber", title: t("inbox_referenceNumber") },
  //     { name: "type", title: t("type") },
  //     { name: "createdOn", title: t("received_time") },
  //     { name: "from", title: t("inbox_from") },
  //     { name: "custom", title: t("action").toUpperCase() },
  // ];

  const columns = [
    {
      field: "subject",
      headerName: "subject",
      width: 200,
      // editable: true,
      renderCell: (params) => (
        <div>
          <Typography>
            {" "}
            <ShowAndHide data={params.row.subject} />
          </Typography>
          {/* <Typography color="textSecondary">{params}</Typography> */}
        </div>
      ),
    },
    {
      field: "referenceNumber",
      headerName: "PA NO.",
      width: 200,
      // editable: true,
      renderCell: (params) => (
        <div>
          <Typography>
            {" "}
            <ShowAndHide data={params.row.referenceNumber} />
          </Typography>
        </div>
      ),
      // cellStyle: {
      //     whiteSpace: 'nowrap',
      //     width: '20%',
      // },
    },
    {
      field: "type",
      headerName: "type",
      width: 120,
    },
    {
      field: "createdOn",
      headerName: "createdOn",
      width: 160,
    },
    {
      field: "from",
      headerName: "from",
      width: 150,
      // editable: true,
      renderCell: (params) => (
        <div>
          <Typography>
            <ShowAndHide data={params.row.displayFrom} />
          </Typography>
        </div>
      ),
    },
    // {
    //     field: "custom",
    //     headerName: "custom",
    //     width: 0,

    //     renderCell: (params) => {
    //         const handleRedirectToHrmConcernedAgency = (e) => {
    //             e.stopPropagation(); // don't select this row after clicking
    //             const api = params.api;
    //             const row = params.row;
    //             const thisRow = {};

    //             api
    //                 .getAllColumns()
    //                 .filter((c) => c.field !== '__check__' && !!c)
    //                 .forEach(
    //                     (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
    //                 );

    //             console.log("params :", params, thisRow)
    //             // return alert(JSON.stringify(thisRow, null, 4));

    //             props.setInboxDatas(row)
    //             if (row.personalApplicationInventoryId !== undefined && row.personalApplicationInventoryId !== "") {
    //                 sessionStorage.setItem("InboxID", row.id)
    //                 sessionStorage.setItem("pa_id", row.personalApplicationInventoryId)
    //                 Cookies.set("inboxFile", row.subject)
    //                 Cookies.set("priority", row.priority)
    //                 Cookies.set("referenceNumber", row.referenceNumber)
    //                 row.type === "PA" ?
    //                     history.push({ pathname: "/eoffice/hrmConcernedView/file", state: row.subject })
    //                     : history.push({ pathname: "/eoffice/splitView/file", state: row.subject })
    //             } else {
    //                 const errorMessage = `${t("ID_is_undefined_please_refresh_page")} !`
    //                 callMessageOut(errorMessage)
    //             }
    //         };

    //         // const asdasd = (row, e) => {
    //         //     e.stopPropagation()
    //         // };

    //         return (
    //             <div className="table-action-btn" ref={floatIcon} style={{ backgroundColor: theme ? "rgb(66 66 66)" : "#fff" }} >
    //                 <IconButton aria-label="hrmConcernedAgency" size="small" style={{ marginTop: '-6px' }}>
    //                     <div title={t("open_file")} aria-label={t("open_file")}>
    //                         {/* <Icon><img style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} src={process.env.PUBLIC_URL + `/assets/icons/send-plane-fill.svg`} /></Icon> */}
    //                         <NearMeIcon onClick={(e) => handleRedirectToHrmConcernedAgency(e)} />
    //                         {/* dsds */}
    //                     </div>
    //                 </IconButton>
    //             </div>
    //         );
    //     }
    // }
    // {
    //     field: "fullName",
    //     headerName: "Full name",
    //     description: "This column has a value getter and is not sortable.",
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue(params.id, "firstName") || ""} ${params.getValue(params.id, "lastName") || ""
    //         }`
    // },
  ];

  // const rows = [
  //     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
  // ];

  const multipleRowSelect = (ids) => {
    if (ids.length <= 0) {
      setMultiSelectBtnShow(false);
    }
    if (ids.length > 0) {
      setMultiSelectBtnShow(true);
    }
    console.log("ids :", ids);
    const selectedIDs = new Set(ids);
    const selectedRowData = rowData.filter((row) => selectedIDs.has(row.id));
    console.log("selectedRowData :", selectedRowData);
    setSelection(ids);
  };

  const handleOnRowClick = (args) => {
    console.log("single Events :", args);
    annotationId(args.row.annotationId);
    personalId(args.row.personalApplicationInventoryId);
    setBodyRows(args.row);
    let data = { extension: "docx", url: args.row.personalUrl };
    dispatch(setPassData(data));
  };

  const handleOnRowDoubleClick = (args) => {
    console.log("double Events :", args);
    const row = args.row;

    props.setInboxDatas(row);
    if (
      row.personalApplicationInventoryId !== undefined &&
      row.personalApplicationInventoryId !== ""
    ) {
      sessionStorage.setItem("InboxID", row.id);
      sessionStorage.setItem("pa_id", row.personalApplicationInventoryId);
      Cookies.set("inboxFile", row.subject);
      Cookies.set("priority", row.priority);
      Cookies.set("referenceNumber", row.referenceNumber);
      Cookies.set("type", row.type);
      row.type === "PA"
        ? history.push({
            pathname: "/eoffice/hrmConcernedView/file",
            state: row.id,
          })
        : row.type === "File"
        ? history.push({
            pathname: "/eoffice/splitView/file",
            state: row.subject,
          })
        : history.push({
            pathname: "/eoffice/hrmConcernedView/file",
            state: row.id,
          });
    } else {
      const errorMessage = `${t("ID_is_undefined_please_refresh_page")} !`;
      callMessageOut(errorMessage);
    }
  };

  const handleMultiFileSelect = (event) => {
    console.log("multi", event);
    setopenUserTimeLine(true);
  };

  // if (tableSelect.current !== undefined) {
  // tableSelect.current.children[1].children[1].children[0].children[0].addEventListener('scroll', (event) => {
  //     // for (let i = 0; i < tableSelect.current.length; i++) {
  //     console.log("styles:", tableSelect)
  //     const positoinValue = tableSelect.current.children[1].children[1].children[0].children[0].children[0].children[0].children[0].style.transform;
  //     const values = positoinValue.split(/\w+\(|\);?/);
  //     const trans = values[1].split(/,\s?/g).map(parseInt);
  //     const val = 248 + trans[0]
  //     floatIcon.current.style.right = val + "px";
  //     console.log("scroll:", floatIcon)
  //     // }
  // });
  // }

  return (
    <Paper
      style={{ height: "calc(100vh - 120px)", width: "100%", borderRadius: "18px" }}
      className="mui-table-customize"
    >
      {multiSelectBtnShow && (
        <div className="send-button-Wrapper">
          <Fab
            size="small"
            color="primary"
            onClick={() => handleMultiFileSelect(selection)}
          >
            <Tooltip title={t("send_to_all")} aria-label="Send">
              <NearMeIcon />
            </Tooltip>
          </Fab>
        </div>
      )}
      <DataGrid
        // ref={(element) => {
        //     tableSelect.current[index] = element;
        // }}
        // classes={{
        //     root: classes.root
        // }}
        // className="datagrid-table"
        // ref={tableSelect}
        rows={rowData}
        // autoHeight={true}
        // cellContent
        columns={columns}
        // FilterPanelDeleteIcon
        rowHeight={36}
        // page={pageSize}
        // pagination
        pageSize={pageSize}
        // components={{ Toolbar: GridToolbar }}
        rowsPerPageOptions={[2]}
        checkboxSelection={(row) => console.log("r :", row)}
        onSelectionModelChange={multipleRowSelect}
        // selectionModel={selection}
        disableSelectionOnClick
        paginationMode="server"
        rowCount={totalCount}
        onRowClick={handleOnRowClick}
        onRowDoubleClick={handleOnRowDoubleClick}
        disableExtendRowFullWidth={true}
        // onPageSizeChange={(newPageSize) => { console.log("newPageSize", newPageSize); setCurrentPage(newPageSize) }}
        onPageChange={(newPage) => {
          console.log("newPage", newPage);
          setCurrentPage(newPage);
        }}
      />
    </Paper>
  );
};

function mapStateToProps(state) {
  return {
    props: state.props,
    subscribeApi: state.subscribeApi,
  };
}
export default connect(mapStateToProps, {
  setInboxDatas,
  loadInboxData,
  loadSfdt,
  changingTableStateInbox,
})(InboxTable);
// export default InboxTable
