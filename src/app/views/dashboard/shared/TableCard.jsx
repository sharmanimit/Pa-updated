import React, { useState, useEffect } from "react";
import { Paper, Typography, Dialog, Slide } from "@material-ui/core";
import {
  getPADashboardData,
  getHistory,
} from "../../../camunda_redux/redux/action";
import { connect, useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../../camunda_redux/redux/ducks/snackbar";
import { setPassData } from "../../../camunda_redux/redux/ducks/passData";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@material-ui/data-grid";
import ShowAndHide from "../../utilities/ShowAndHide";
import DashbordDialogComp from "./DashbordDialogComp";
import Axios from "axios";
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from "@material-ui/core/styles";
import { isNullOrUndefined } from '@syncfusion/ej2-base';
// import fileDownload from "js-file-download";


const useStyles = makeStyles((theme) => ({
  dialogShowHide: {
    visibility: 'hidden',
    PointerEvent: 'none',
  },
}));

const TableCard = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles()
  const [rowData, setRowData] = useState([]);
  const [rowId, setRowId] = useState("");
  let username = sessionStorage.getItem("username");
  let role = sessionStorage.getItem("role");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [pdfLoads, setPdfLoads] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pageSizes] = useState([5, 10, 15]);
  const [sampleData, setSampleData] = useState([]);
  const [dialogClassToggle, setDialogClassToggle] = useState(true)

  const columns = [
    {
      field: "serialNo",
      headerName: t("SL NO"),
      width: 10,
    },
    {
      field: "subject",
      headerName: t("subject"),
      width: 250,
      renderCell: (params) => (
        <div>
          <Typography onClick={(event) => event.stopPropagation()}>
            {/* {params.row.subject} */}
            <ShowAndHide data={params.row.subject} />
          </Typography>
        </div>
      ),
      // cellStyle: {
      //     whiteSpace: 'nowrap',
      //     width: '20%',
      // },
    },
    {
      field: "pfileName",
      headerName: `${t("pa_number")}`,
      width: 170,
      renderCell: (params) => (
        <div>
          <Typography>
            {/* {params.row.pfileName} */}
            <ShowAndHide data={params.row.pfileName} />
          </Typography>
        </div>
      ),
    },
    {
      field: "createdOn",
      headerName: t("date_send"),
      width: 170,
    },
    {
      field: "status",
      headerName: t("status"),
      width: 130,
      renderCell: (params) => {

        const downloadFile = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const row = params.row;
          console.log("download file :", row)
          const anchor = document.createElement("a");
          anchor.href = row.fileURL;
          anchor.download = row.displayPfileName;

          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);

        }

        return (
          <div>
            <Typography>
              <GetAppIcon color="primary" onClick={(e) => downloadFile(e)} /> {params.row.status}
            </Typography>
          </div>
        )
      },
    },
  ];

  const { data } = useSelector((state) => state.dashboard.getDashboardData);

  useEffect(() => {
    let tmpArr = [];
    tmpArr = data && data.map((item, index) => {
      return { ...item, serialNo: pageSize * currentPage + (index + 1) }
    });
    setRowData(tmpArr);
    const count = data && data.length;
    setTotalCount(count);
  }, [data]
  )
  const loadPATableData = () => {
    dispatch(getPADashboardData(username, role, pageSize, currentPage));

  };

  useEffect(() => loadPATableData(), [currentPage, pageSize]);

  // const loadPATableData = () => {
  //   setRowData([]);
  //   props
  //     .getPADashboardData(username, role, pageSize, currentPage)
  //     .then((resp) => {
  //       try {
  //         let tmpArr = [];
  //         if (resp) {
  //           if (resp.response.data !== undefined) {
  //             setTotalCount(resp.response.length);
  //             tmpArr = resp.response.data.map((item, index) => {
  //               return {
  //                 ...item,
  //                 serialNo: pageSize * currentPage + (index + 1),
  //               };
  //             });
  //             setRowData(tmpArr);
  //             const dataToBeSend = {
  //               ApprovalCount: resp.response.Approve,
  //               RejectCount: resp.response.Reject,
  //               InProgressCount: resp.response.InProgress,
  //               SentCount: resp.response.Sent,
  //             };
  //             props.totalCountPA(dataToBeSend);
  //           } else {
  //             const errorMessage =
  //               resp.response.status +
  //               " : " +
  //               resp.response.error +
  //               " AT " +
  //               resp.response.path;
  //             callMessageOut(errorMessage);
  //           }
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
  };

  const handleClose = () => {
    setOpen(false);
    // setDialogClassToggle(false)
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleOnRowClick = ({ row }) => {

    setPdfUrl(row.fileURL);
    // debugger
    dispatch(
      setPassData(row.fileURL)
    )
    setOpen(true);
    setDialogClassToggle(true)
    setRowId(row.id);
    if (row) {
      props.getHistory("PA", row.id).then((resp) => {
        if (resp) {
          !isNullOrUndefined(resp.data)
            ? setSampleData(resp.data)
            : setSampleData([]);
        }
      });
    }

    // const anchor = document.createElement("a");
    // anchor.href = row.fileURL;
    // anchor.download = row.displayPfileName;

    // document.body.appendChild(anchor);
    // anchor.click();
    // document.body.removeChild(anchor);

    // Axios.get(row.fileURL, {
    //   responseType: "blob",
    // }).then((res) => {
    //   fileDownload(res.data, `${row.displayPfileName}.docx`);
    // });
  };

  const blnPdfLoads = (val) => {
    setPdfLoads(val);
  };

  return (
    <Paper elevation={3} style={{ position: "relative", borderRadius: "18px" }} className="dashboard_table">
      {rowData && (
        <div
          style={{ height: "calc(100vh - 100px)", width: "100%" }}
          className="mui-table-customize"
        >
          <DataGrid
            rows={rowData}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={pageSizes}
            disableSelectionOnClick
            rowHeight={36}
            paginationMode="server"
            rowCount={totalCount}
            onRowClick={handleOnRowClick}
            onPageSizeChange={(value) => setPageSize(value)}
            onPageChange={(value) => setCurrentPage(value)}
          />
        </div>
      )
      }
      {open && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
        // TransitionComponent={Transition}
        // className={dialogClassToggle ? 'kp' : classes.dialogShowHide} 
        >
          <DashbordDialogComp
            closeDialog={handleClose}
            pdfUrl={pdfUrl}
            blnPdfLoads={blnPdfLoads}
            fileId={rowId}
            sampleData={sampleData}
          />
        </Dialog>
      )}
    </Paper>
  );
};
function mapStateToProps(state) {
  return {
    props: state.props,
  };
}

export default connect(mapStateToProps, { getPADashboardData, getHistory })(
  TableCard
);

