import React, { useEffect } from "react";
import {
    Grid
} from "@material-ui/core";
import PdfViewer from "../../../pdfViewer/pdfViewer";
import FileListTable from "./FileListTable";
import { Breadcrumb } from "../../../../matx";
import { connect, useDispatch } from "react-redux";
import { useState } from "react";
import { Loading } from "../therme-source/material-ui/loading";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie'
import { setPassData } from "app/camunda_redux/redux/ducks/passData";
import { useLocation } from "react-router-dom";

const HrmConcerned = (props) => {
    const location = useLocation();
    const { t } = useTranslation()
    const dispatch = useDispatch()
    let title = Cookies.get("inboxFile")
    let priority = Cookies.get("priority")
    let referenceNumber = Cookies.get("referenceNumber")

    const [annotId, setAnnotId] = useState("")
    const [blnShowPDF, setBlnShowPDF] = useState(false)
    const [loading, setLoading] = useState(false)
    const [contentId, setContentId] = useState("")
    const [flag, setFlag] = useState("")
    const [pdfLoads, setPdfLoads] = useState(false)
    const pa_id = sessionStorage.getItem("pa_id")
    const [fileUrl, setFileUrl] = useState("")
    const [annotationId, setAnnotationId] = useState("")


    const handleShowPdf = (val) => {
        setBlnShowPDF(val)
    }

    const handleContentID = (val) => {
        setContentId(val)
    }
    const annotation = (val) => {
        console.log(val)
        setAnnotId(val)
    }

    useEffect(() => {
        if (pdfLoads === true && fileUrl !== undefined) {
            setTimeout(() => {
                dispatch(setPassData(fileUrl))
            }, 1000)
        }
    }, [pdfLoads, fileUrl])

    return (
        <div className="m-sm-30">
            <div>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <Breadcrumb
                            routeSegments={[
                                { name: t("inbox"), path: "/eoffice/inbox/file" },
                                { name: t("HRM_concerned_view"), path: "/eoffice/hrmConcernedView/file" }
                            ]}
                            otherData={[{ key: "Title", value: title }, { key: "Ref no", value: referenceNumber }, { key: "Priority", value: priority }]}
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={2} style={{ paddingTop: '0px' }}>
                <Grid item xs={8} >
                    {blnShowPDF && <div style={{ border: "1px solid #b6b6b66b" }}><PdfViewer personalID={contentId} anottId={annotId} flag={flag} pdfLoads={(val) => { setPdfLoads(val) }} annotationId={annotationId} /></div>}
                </Grid>
                <Grid item xs={4} >
                    <FileListTable pdfLoadsHRM={pdfLoads} setFileUrl={setFileUrl} annotID={annotation} flagValue={(val) => setFlag(val)} contentID={handleContentID} fileID={title} blnShowPdf={handleShowPdf} blnEnableLoader={(val) => setLoading(val)} setAnnotationId={setAnnotationId} paId={location.state} />
                </Grid>
                {loading && <Loading />}
            </Grid>
        </div>
    );
};
function mapStateToProps(state) {

    return {
        props: state.props
        ,
        inboxData: state.inboxData
    };
}

export default connect(mapStateToProps,)(HrmConcerned);
