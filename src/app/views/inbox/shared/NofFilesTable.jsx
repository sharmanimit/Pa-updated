import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    CustomPaging,
} from '@devexpress/dx-react-grid';
import {
    Grid as DevGrid,
    Table,
    TableHeaderRow,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { Grid, IconButton, makeStyles, TextField, Typography } from "@material-ui/core";
import { Loading } from '../therme-source/material-ui/loading';
import { connect, useDispatch } from "react-redux";
import { getbyfilename } from "../../../camunda_redux/redux/action";
import { Formik } from "formik";
import SearchIcon from '@material-ui/icons/Search';
import { setSnackbar } from 'app/camunda_redux/redux/ducks/snackbar';
import '../therme-source/material-ui/loading.css'
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({});

const NofFilesTable = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const dispatch = useDispatch();
    const [columns] = useState([
        { name: "fileno", title: `${t('file_no')}.` },
        // { name: 'pkldirectorate', title: 'DEPARTMENT' },
        { name: "filename", title: t('file_name').toUpperCase() },
    ]);
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState();
    const [fileName, setFileName] = useState("");
    const [fileNo, setFileNo] = useState("");


    const bodyFormData = () => {
        const dept = sessionStorage.getItem("pklDirectrate");
        let formData = new FormData();
        // formData.append('pkldirectorate',"7WG.HRC");
        formData.append('pkldirectorate', dept);
        formData.append('filename', fileName);
        formData.append('skip', pageSize * currentPage);
        formData.append('row', pageSize);
        formData.append('fileno', fileNo);
        return formData;
    };

    const getPageCount = () => (
        pageSize * currentPage
    );

    const NofTableRow = ({ row, ...restProps }) => (
        <Table.Row
            className="tableCustomRow"
            {...restProps}
            {... { hover: true }}
            onClick={(e) => nofHandleClick(e, row)}
            style={{
                cursor: 'pointer'
            }}
        />
    );

    const nofHandleClick = (e, row) => {
        props.onSelectFileData(row);
        props.onSelectFileID(row.id);
    };

    const loadData = () => {
        const pageCount = getPageCount();
        if (pageCount !== lastQuery && !loading) {
            setLoading(true);
            props.getbyfilename(bodyFormData())
                .then((res) => {
                    try {
                        if (!isNullOrUndefined(res)) {
                            setRows(res.data);
                            setTotalCount(res.length);
                            setLoading(false);
                        } else {
                            const errorMessage = res.status + " : " + res.error + " AT " + res.path
                            callMessageOut(errorMessage);
                        }
                    }
                    catch (e) {
                        callMessageOut(e.message)
                    }
                })
                .catch(() => setLoading(false));
            setLastQuery(pageCount);
        }
    };

    useEffect(() => loadData(), []);

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }

    return (
        <Paper style={{ position: 'relative' }}>
            <Typography>{t("please_select_the_file_to_create_partcase_form")}</Typography>
            <Formik
                initialValues={{ fileName: '', fileNo: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    setFileName(values.fileName);
                    setFileNo(values.fileNo);
                    setTimeout(() => {
                        setSubmitting(false);
                        setLastQuery(undefined);
                        setCurrentPage(0);
                        loadData();
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                    isSubmitting,

                }) => (
                    <form className={classes.form} autoComplete="off">
                        <div>
                            <Grid container justifyContent='center' direction='row' style={{ width: '100%' }} >
                                <Grid item xs={5}>
                                    <TextField id="standard-basic1" label={t("file_number")} onBlur={handleBlur} value={values.fileNo} name={'fileNo'} onChange={handleChange} style={{ width: '90%' }} required={true} />{touched.fileNo}
                                </Grid>
                                <Grid item xs={7} style={{ display: 'flex' }}>
                                    <TextField id="standard-basic" label={t("file_name")} onBlur={handleBlur} value={values.fileName} name={'fileName'} onChange={handleChange} style={{ width: '90%' }} required={true} />{touched.fileName}
                                    <IconButton aria-label="search" onClick={handleSubmit} >
                                        <SearchIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                )}
            </Formik>

            <DevGrid
                rows={rows}
                columns={columns}
            >
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                />
                <CustomPaging
                    totalCount={totalCount}
                />
                <Table rowComponent={NofTableRow} />
                <TableHeaderRow />
                <PagingPanel />
            </DevGrid>
            {loading && <Loading />}
        </Paper>
    );
};

function mapStateToProps(state) {

    return { props: state.props };
}
export default connect(mapStateToProps, { getbyfilename })(NofFilesTable);
