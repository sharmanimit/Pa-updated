import React, { useEffect, useState } from "react";
import history from '../../../../history'
import {
    CustomPaging,
    FilteringState,
    IntegratedFiltering,
    PagingState,
    SortingState,
    IntegratedSorting,
    SelectionState,
    IntegratedSelection,
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableColumnResizing,
    TableFilterRow,
    TableSelection,
} from "@devexpress/dx-react-grid-material-ui";
import { Dialog, DialogContent, DialogTitle, Tooltip, IconButton, Paper, withStyles, Icon, Fab } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadInboxData, loadSfdt } from "../../../camunda_redux/redux/action";
import CloseIcon from '@material-ui/icons/Close';
import StartProcessPage from "../../initiate/shared/startProcess/StartProcessPage";
import HeadersAndFootersView from "../../FileApproval/documentEditor/editor";
import Slide from "@material-ui/core/Slide/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { setPassData } from "../../../camunda_redux/redux/ducks/passData";
import { setLoadData } from "../../../redux/actions/LoadingActions";
import { setInboxDatas } from "../../../redux/actions/InboxActions";
import { changingTableStateInbox } from "../../../camunda_redux/redux/action/apiTriggers";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { Loading } from "../therme-source/material-ui/loading";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie'
import Draggable from "react-draggable";
import NearMeIcon from '@material-ui/icons/NearMe';

const PaperComponent = (props) => {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    divZIndex: {
        zIndex: '1500 !important',
    },
    customRow: {
        '&:hover': {
            backgroundColor: 'lightgray',
        }
    },
}));

const InboxPage = (props) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const dispatch = useDispatch()
    const { theme } = useSelector(state=> state)
    const columns = [
        { name: "serialNo", title: t("SL NO") },
        { name: "subject", title: t("subject") },
        { name: "referenceNumber", title: t("inbox_referenceNumber") },
        { name: "type", title: t("type") },
        { name: "createdOn", title: t("received_time") },
        { name: "from", title: t("inbox_from") },
        { name: "custom", title: t("action").toUpperCase() },
    ];
    const [rowData, setRowData] = useState([])
    const [rowID, setRowID] = useState("")
    const [selection, setSelection] = useState([])
    const [bodyRows, setBodyRows] = useState([])
    const [open, setOpen] = useState(false)
    const [openQuickSign, setOpenQuickSign] = useState(false)
    const [openUserTimeLine, setopenUserTimeLine] = useState(false)
    const [SFDT, setSFDT] = useState("")
    const [paID, setPAID] = useState("")
    const [loading, setLoading] = useState(false)
    const [multiSelectBtnShow, setMultiSelectBtnShow] = useState(false)
    const [pdfDataStore, setpdfDataStore] = useState({})
    const [pageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    const handleChange = (event) => {
        setSelection(event);
        let tempArr = []
        let finalArr = []
        for (let i = 0; i < event.length; i++) {
            tempArr.push(event[i])
        }
        for (let x = 0; x < tempArr.length; x++) {

            finalArr.push(rowData.find(val => val.id === tempArr[x]).subject)
        }
        if(event.length <= 0) {
            setMultiSelectBtnShow(false)
        }
        if (event.length > 0) {
            setMultiSelectBtnShow(true)
        }
    };
   

    const role = sessionStorage.getItem('role')
    const userName = sessionStorage.getItem('username')
    const TableComponentBase = ({ classes, ...restProps }) => (
        <Table.Table
            {...restProps}
            className={classes.tableStriped}
        />
    );
    const styles = {
        customRow: {
            '&:hover': {
                backgroundColor: 'lightgray',
            }
        },
    };
    const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase)
    let data = {}
    const { blnValueInbox } = props.subscribeApi

    useEffect(() => loadInboxTable(),[blnValueInbox,currentPage])
    
    const loadInboxTable = () => {
        setLoading(true)
        setRowData([])
       
        props.loadInboxData(role, userName, pageSize, currentPage).then(resp => {
            const tmpArr = []
            try {
                if (resp.Data !== undefined) {
                    setLoading(false)
                    for (var i = 0; i < resp.Data.length; i++) {
                        tmpArr.push({...resp.Data[i], serialNo: pageSize*currentPage + (i+1), from: resp.Data[i].displayFrom})
                    }
                    props.changingTableStateInbox(false, 'CHANGE_INBOX');
                    setpdfDataStore(resp.Data[0])
                    blnShowPdf(true)
                    setTotalCount(resp.length)
                   
                }
                else {
                    setLoading(false)
                    const errorMessage = resp.status + " : " + resp.error + " AT " + resp.path
                    callMessageOut(errorMessage)
                }
                setRowData(tmpArr)
            } catch (e) {
                setLoading(false)
                callMessageOut(e.message)
            }

        });

    }

    useEffect(() => {
        if (props.pdfLoadsInbox == true && pdfDataStore !== undefined) {
            annotationId(pdfDataStore.annotationId)
            personalId(pdfDataStore.personalApplicationInventoryId)
            setTimeout(() => {
                dispatch(setPassData(pdfDataStore.personalUrl))
            },1000)
            
        }
    },[props.pdfLoadsInbox])

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message))
    }
    
    const handleClose = () => {
        setOpen(false)
    };

    const handleCloseEvent = (e) => {
        setOpen(e)
    };
    const { personalId, annotationId, inboxId, blnShowPdf } = props

    const handleClick = (e, row) => {
        annotationId(row.annotationId)
        personalId(row.personalApplicationInventoryId)

        setBodyRows(row)
        dispatch(
            setPassData(row.personalUrl)
        )
    };

    useEffect(()=>{
        Cookies.remove("inboxFile")
        Cookies.remove("priority")
        Cookies.remove("referenceNumber")
    }, [])

    const [defaultColumnWidths, setDefaultColumnWidths] = useState([
        { columnName: 'serialNo', width: 100 },
        { columnName: 'subject', width: 300 },
        { columnName: 'referenceNumber', width: 120 },
        { columnName: 'type', width: 100 },
        { columnName: 'createdOn', width: 160 },
        { columnName: 'from', width: 100 },
        { columnName: 'custom', width: 0 },
    ]);
    const TableRow = ({ row, ...restProps }) => (
        <Table.Row
            {...restProps}
            onClick={(e) => handleClick(e, row)}
            // onDoubleClick={(e) => {console.log("Double Click : ",row)}}
            style={{
                cursor: 'pointer'
            }}
        />
    );
    const getRowId = row => row.id

    const showDetails = row => {

        setRowID(row.id)
        setPAID(row.personalApplicationInventoryId)
        rowID !== "" ? setOpen(true) : setOpen(false)
    };

    const editDoc = (row) => {

        setPAID(row.personalApplicationInventoryId)
        props.loadSfdt(row.personalUr)

            .then(response => {

                setRowID(row.id)
                setSFDT(response.sfdt)
                if (response.sfdt) {
                    setOpenQuickSign(true)
                }
            })


    };

    const handleClickQuickSignClose = () => {
        setOpenQuickSign(false)
    };

    const handleClickUserTimelineClose = () => {
        setopenUserTimeLine(false)
    };

    const handleRedirectToHrmConcernedAgency = (row, e) => {
        e.stopPropagation()
            props.setInboxDatas(row)
            if (row.personalApplicationInventoryId !== undefined && row.personalApplicationInventoryId !== "") {
                sessionStorage.setItem("InboxID",row.id)
                sessionStorage.setItem("pa_id",row.personalApplicationInventoryId)
                Cookies.set("inboxFile", row.subject)
                Cookies.set("priority", row.priority)
                Cookies.set("referenceNumber", row.referenceNumber)
                row.type === "PA" ?
                history.push({ pathname: "/eoffice/hrmConcernedView/file", state: row.subject })
                :history.push({ pathname: "/eoffice/splitView/file",  state: row.subject})
            } else {
                const errorMessage = `${t("ID_is_undefined_please_refresh_page")} !`
                callMessageOut(errorMessage)
            }
    };

    const Cell = ({ row, column, ...props }) => {
        if (column.name === "custom")
            return (
                <Table.Cell {...props} className="table-action-btn" style={{backgroundColor: theme ? "rgb(66 66 66)": "#fff"}} >
                    <IconButton aria-label="hrmConcernedAgency" size="small" onClick={(e) => {handleRedirectToHrmConcernedAgency(row, e)}} style={{ marginTop: '-6px' }}>
                    <Tooltip title={t("open_file")} aria-label={t("open_file")}>
                            {/* <Icon><img style={{filter: theme ? 'invert(1)': 'invert(0)'}} src={process.env.PUBLIC_URL + `/assets/icons/send-plane-fill.svg` } 
                            alt={row.type === 'File' ? t("open_file"):  t("open_file")}/></Icon> */}
                        <NearMeIcon />    
                    </Tooltip>
                    </IconButton>
                </Table.Cell>
            );
        return <Table.Cell {...props} />
    };

    const handleOpenUserTimeLine = row => {
        setopenUserTimeLine(true)
    };


    const handleMultiFileSelect = (event) => {
        console.log("multi", event)
        setopenUserTimeLine(true)
    }

    return (
        <>
        { multiSelectBtnShow && 
                
            <div className="send-button-Wrapper">
                <Fab size="small" color="primary" onClick={() => (handleMultiFileSelect(selection))} >
                <Tooltip title={t("send_to_all")} aria-label="Send"><NearMeIcon /></Tooltip>
                </Fab>
            </div>

            }
        <Paper elevation={3} style={{ position: 'relative' }}>
        <div style={{ border: "1px solid #b6b6b66b" }}>
            <Grid rows={rowData} columns={columns} getRowId={getRowId}>
                <FilteringState columnExtensions={[{ columnName: 'custom', filteringEnabled: false }]} />
                <IntegratedFiltering />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                />
                <CustomPaging
                    totalCount={totalCount}
                />
                <SortingState columnExtensions={[{ columnName: 'custom', sortingEnabled: false }]} />
                <IntegratedSorting />
                <SelectionState
                    selection={selection}
                    onSelectionChange={handleChange}
                />
                <IntegratedSelection />
                <Table tableComponent={TableComponent} cellComponent={Cell} rowComponent={TableRow} />
                <TableColumnResizing columnWidths={defaultColumnWidths} onColumnWidthsChange={setDefaultColumnWidths} resizingMode="nextColumn" />
                <TableHeaderRow showSortingControls />
                <TableSelection showSelectAll />
                <TableFilterRow />
                <PagingPanel />
            </Grid>
            </div>
            {loading && <Loading />}

            <Dialog
                open={open}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth='md'
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" onClose={handleClose}>
                {t("send_file")}
                    <IconButton aria-label="close" onClick={handleClose} color="primary" style={{ float: 'right' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <StartProcessPage process={'sendFile'} fileId={paID} handleCloseEvent={handleCloseEvent} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={openQuickSign}
                onClose={handleClickQuickSignClose}
                fullScreen
                aria-labelledby="quickSignDialog"
                TransitionComponent={Transition}
                className={classes.divZIndex}
            >
                <DialogContent dividers>
                    <IconButton aria-label="close" onClick={handleClickQuickSignClose} style={{ float: 'right', marginTop: '-4px', color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                    <HeadersAndFootersView fileId={paID} txtSfdt={SFDT} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={openUserTimeLine}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth='md'
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" onClose={handleClickUserTimelineClose}>
                {t("send_file")}
                    <IconButton aria-label="close" onClick={handleClickUserTimelineClose} color="primary" style={{ float: 'right' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <userTimeLine />
                </DialogContent>
            </Dialog>
        </Paper>
        </>
    );
};

function mapStateToProps(state) {

    return {
        props: state.props,
        subscribeApi: state.subscribeApi,
    };
}


export default connect(mapStateToProps, { setInboxDatas, setLoadData, loadInboxData, loadSfdt, changingTableStateInbox })(InboxPage);

