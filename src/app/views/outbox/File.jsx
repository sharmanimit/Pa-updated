import React, { Component, Fragment } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Breadcrumb } from "../../../matx";
import OutboxTable from "./shared/OutboxTable";
import { Loading } from "./therme-source/material-ui/loading"
import { withTranslation } from "react-i18next";

class Outbox1 extends Component {
    state = {
        loading: false,
    };
    render() {
        let { theme } = this.props;
        const { loading } = this.state;

        return (
            <Fragment>
                <div className="m-sm-30">
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={4}>
                            <Breadcrumb
                                routeSegments={[
                                    { name: this.props.t("outbox"), path: "/inbox/file" }
                                ]}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            {/* <ButtonGroup style={{boxShadow:'0px 0px 25px -10px black',backgroundColor: 'white'}} color="primary" size="small" aria-label="small outlined button group">
                                <Button>All</Button>
                                <Button>File</Button>
                                <Button>Correspondence</Button>
                                <Button>Monitored</Button>
                            </ButtonGroup> */}
                        </Grid>
                    </Grid>
                    <div className="mt-0">
                        <Grid container >
                            <Grid item xs={12} className="outbox-table">
                                <OutboxTable blnEnableLoader={(val) => this.setState({ loading: val })} />
                            </Grid>
                        </Grid>
                    </div>
                    {loading && <Loading />}
                </div>
            </Fragment>
        );

    }

}

export default withStyles({}, { withTheme: true })(withTranslation()(Outbox1));
