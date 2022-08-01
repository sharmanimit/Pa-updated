import React, { Component, Fragment } from "react";
import { Grid, Button, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Breadcrumb } from "../../../matx";
import TableCard2 from "./shared/TableCard2";
import MaterialUiTable from "./shared/MaterialUiTable";
import StartProcessPage from "./shared/startProcess/StartProcessPage";
import { connect } from "react-redux";
import { loadProcessDefinitionsWithXML, loadTasks } from "../../camunda_redux/redux/action";
import CloseIcon from '@material-ui/icons/Close';
import { withTranslation } from "react-i18next";
import Draggable from "react-draggable";

const PaperComponent = (props) => {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

class Initiate1 extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false,
        mount: false,
        mountData1: false
    };
    //Camunda Process and Task Load
    // componentDidMount()
    // {
    //     this.props.loadDraftData().then(resp => {
    //         let tmpArr = [];
    //         if (resp.Data !== undefined) {
    //             tmpArr = resp.Data;
    //             console.log(tmpArr);
    //             this.setState({rowData: tmpArr});
    //         }
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }
    componentWillMount() {
        this.props.loadProcessDefinitionsWithXML();
        this.props.loadTasks();
    }
    mountData = (val) => { this.setState({ mountData1: val }); return val; }
    // Dialogue Open Event
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    //Dialogue Close Event
    handleClose = () => {
        this.setState({ open: false });
    };
    handleCloseEvent = (e) => {
        this.setState({ open: e });
    }
    render() {
        const { processDefinition, processDefinitionXML } = this.props;
        let mountData2 = this.state.mountData1
        console.log(mountData2);
        let { theme, completeForm } = this.props;
        let name = JSON.parse(sessionStorage.getItem("userInfo"));
        const department = name.grp[0];
        return (
            <Fragment>
                <div className="m-sm-30">
                    <div >
                        <Grid container justify="center" spacing={2}>
                            <Grid xs={4}>
                                <Breadcrumb
                                    routeSegments={[
                                        { name: t("initiate"), path: "/initiate/file" }
                                    ]}
                                />
                            </Grid>
                            <Grid xs={8}>
                                <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
                                    <Button>{t("correspondence")}</Button>
                                    <Button onClick={this.handleClickOpen}>{t("file")}</Button>
                                    <Button>{t("action_point")}</Button>
                                    <Button>{t("part_file")}</Button>
                                    <Button>{t("notice")}</Button>
                                    <Button>{t("scanned_file")}</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <Grid container justify="center" spacing={2}>
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <MaterialUiTable />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12} sm={6}>
                                <TableCard2 chkData={mountData2} />
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Dialog
                            open={this.state.open}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                            style={{ minWidth: '700px' }}
                        // maxWidth='md'

                        >
                            <DialogTitle id="draggable-dialog-title" style={{ padding: "0px 24px !important" }}>
                                {t("create_a_file")}
                                <IconButton aria-label="close" onClick={this.handleClose} color="primary" style={{ float: 'right' }}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent dividers pt={0}>
                                <StartProcessPage process={'sampleForm'} handleCloseEvent={this.handleCloseEvent} didMounting={this.mountData} department={department} />
                            </DialogContent>
                            {/*<DialogActions>*/}
                            {/*    <Button autoFocus onClick={this.handleClose} color="primary">*/}
                            {/*        Cancel*/}
                            {/*    </Button>*/}
                            {/*</DialogActions>*/}
                        </Dialog>
                    </div>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const params = ownProps.match.params
    return {
        ...params,
        ...state.entities
    }
}
export default connect(mapStateToProps,
    { loadProcessDefinitionsWithXML, loadTasks })(withStyles({ withTheme: true })(withTranslation()(Initiate1)));
