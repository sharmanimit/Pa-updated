import React, { Component, Fragment } from "react";
import {
    Grid, Button, ButtonGroup
} from "@material-ui/core";
import TableCard from "./shared/InboxPage";
import { withStyles } from "@material-ui/styles";
import { Breadcrumb } from "../../../matx";
import PdfViewer from "../../pdfViewer/pdfViewer";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { connect } from "react-redux";
import { createPANotingData, getbyfilename, getHrmListData } from "../../camunda_redux/redux/action";
import { withTranslation } from "react-i18next";
import InboxTable from './shared/InboxTable'
import './therme-source/material-ui/loading.css'

class Inbox1 extends Component {
    state = {
        personalid: "",
        annotId: "",
        refreshes: false,
        refreshInboxData: false,
        isLoading: false,
        inboxId: '',
        showPdf: false,
        pdfLoads: false
    };

    componentDidMount() {

        this.setState({ isLoading: true });
    }

    setReloadInboxData = () =>

        this.setState(previousState => ({
            refreshInboxData: !previousState.refreshInboxData
        }));

    personalID = (id) => {
        this.setState({ personalid: id });
    };

    inboxId = (id) => {
        this.setState({ inboxId: id });
    }
    annotId = (val) => {
        this.setState({ annotId: val });
    };

    ref = (val) => {
        this.setState({ refreshes: val });
    };

    handleShowPdf = (val) => {
        this.setState({ showPdf: val })
    }

    render() {
        let { theme } = this.props;
        let { isLoading, personalid, annotId, refreshes } = this.state;

        if (isLoading !== true) {
            return (
                <Loading />
            )
        }
        else {
            return (

                <div className="m-sm-30">
                    <div>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={4} >
                                <Breadcrumb
                                    routeSegments={[
                                        { name: this.props.t("inbox"), path: "/inbox/file" }
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={2}>
                            {/* <Grid item md={5} xs={12} className="inbox-table">
                                <TableCard pdfLoadsInbox={this.state.pdfLoads} refreshInboxData={this.state.refreshInboxData} refresh={this.ref}
                                    inboxId={this.inboxId}  personalId={this.personalID} annotationId={this.annotId} blnShowPdf={this.handleShowPdf}/>
                            </Grid> */}

                            <Grid item md={6} xs={12} className="inbox-table">
                                {/* <TableCard pdfLoadsInbox={this.state.pdfLoads} refreshInboxData={this.state.refreshInboxData} refresh={this.ref}
                                    inboxId={this.inboxId} personalId={this.personalID} annotationId={this.annotId} blnShowPdf={this.handleShowPdf} /> */}

                                {console.time("file-table")}
                                <InboxTable pdfLoadsInbox={this.state.pdfLoads} refreshInboxData={this.state.refreshInboxData} refresh={this.ref}
                                    inboxId={this.inboxId} personalId={this.personalID} annotationId={this.annotId} blnShowPdf={this.handleShowPdf} />
                                {console.timeEnd("file-table")}
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <div style={{ border: "1px solid #b6b6b66b" }}>
                                    {console.time("file")}
                                    <PdfViewer personalID={personalid} refreshView={refreshes} anottId={annotId} flag={"PA"} pdfLoads={(val) => { this.setState({ pdfLoads: val }) }} />
                                    {console.timeEnd("file")}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            );
        }
    }
}
const mapStateToProps = (state) => ({
    props: state.props,
    loader: state.loader,

});

export default connect(mapStateToProps,)(withTranslation()(Inbox1));
