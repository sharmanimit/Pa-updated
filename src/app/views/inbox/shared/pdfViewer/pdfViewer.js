import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { setInboxPassData } from "app/camunda_redux/redux/ducks/passDataInbox";

const SplitViewPdfViewer = (props) => {
    const dispatch = useDispatch();
    const viewer = useRef(null);
    const { flag } = props;
    let annotatId = props.anottId;
    const [instance, setInstance] = useState(null);
    let [loading, setLoading] = useState(true);
    const messageToPassInboxUrl = props.fileUrl;
    const {extension} = props;
    
    console.log(extension)

    async function loadPDF() {
        try {
            if (instance != null) {
                const { docViewer } = instance;

                docViewer.setWatermark({
                    // Draw diagonal watermark in middle of the document
                    diagonal: {
                        fontSize: 35, // or even smaller size
                        fontFamily: "sans-serif",
                        color: "#5a5ad6",
                        opacity: 40, // from 0 to 100
                        text: `${sessionStorage.getItem("pklDirectrate")}`,
                    },

                    // Draw header watermark
                    header: {
                        fontSize: 10,
                        fontFamily: "sans-serif",
                        color: "red",
                        opacity: 70,
                    },
                });

                const URL =
                    messageToPassInboxUrl === ""
                        ? process.env.REACT_APP_PDF_SAMPLE_URL +
                        "?token=" +
                        sessionStorage.getItem("jwt_token")
                        : messageToPassInboxUrl;
                console.log(URL)        
                instance.loadDocument(URL, {extension: extension ? extension : "docx"});
            } else {
                await Promise.all([
                    WebViewer(
                        {
                            path: `${process.env.PUBLIC_URL + "/webviewer/lib"}`,
                            initialDoc:
                                process.env.REACT_APP_PDF_SAMPLE_URL +
                                "?token=" +
                                sessionStorage.getItem("jwt_token"),
                            fullAPI: true,
                            enableRedaction: true,
                            backendType: "ems",
                        },
                        viewer.current
                    ).then((instance) => {


                        setInstance(instance);
                        // instance.UI.textPopup.add({
                        //   type: "actionButton",
                        //   label: "some-label",
                        //   onClick: () => alert("clicked"),
                        // });

                        // instance.setZoomLevel('150%')
                        // var FitMode = instance.FitMode;
                        // instance.setFitMode(FitMode.FitWidth);
                        const { annotManager, docViewer, Tools } = instance;

                        docViewer.on('documentLoaded', function () {
                            instance.setZoomLevel('100%')
                        });

                        console.log(instance.getZoomLevel())

                        docViewer.setWatermark({
                            // Draw diagonal watermark in middle of the document
                            diagonal: {
                                fontSize: 35, // or even smaller size
                                fontFamily: "sans-serif",
                                color: "#5a5ad6",
                                opacity: 40, // from 0 to 100
                                text: `${sessionStorage.getItem("pklDirectrate")}`,
                            },

                            // Draw header watermark
                            header: {
                                fontSize: 10,
                                fontFamily: "sans-serif",
                                color: "red",
                                opacity: 70,
                            },
                        });

                        let data = sessionStorage.getItem("username");
                        console.log(data);
                        annotManager.setCurrentUser(data);
                        annotManager.setIsAdminUser(true);

                        // instance.UI.disableElements(['textSquigglyToolButton']);
                        // instance.UI.textPopup.add({
                        //     type: "actionButton",
                        //     label: "some-label",
                        //     onClick: () => alert("clicked")
                        // });
                        // instance.UI.updateElement("linkButton", { label: 'new-label', onClick: () => alert('clicked') });
                        // instance.UI.contextMenuPopup.update([
                        //     {
                        //         type: 'actionButton',
                        //         label: '1',
                        //         onClick: () => console.log('clicked 1'),
                        //     },
                        //     {
                        //         type: 'actionButton',
                        //         label: '2',
                        //         onClick: () => console.log('clicked 2'),
                        //     },
                        // ]);
                        // instance.UI.textPopup.add({
                        //     type: 'actionButton',
                        //     label: 'some-label',
                        //     onClick: () => console.log('clicked test'),
                        // });

                        const fullScreen = {
                            type: "actionButton",
                            img: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>',
                            title: "FullScreen",
                            onClick: () => {
                                instance.toggleFullScreen(true);
                            },
                            dataElement: "fullscreen",
                        };
                        props.pdfLoads(true);
                    }),
                ]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadPDF();
    }, [messageToPassInboxUrl, instance]);

    // Make a GET request to get XFDF string
    var loadxfdfStrings = function (documentId) {
        return props.getAnnotation(documentId);
    };

    return (
        <div className="App">
            <div
                id="pdfV"
                className="webviewer"
                ref={viewer}
                style={{ height: "calc(100vh - 120px)" }}
            ></div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        props: state.props,
        theme: state.theme,
    };
}

export default connect(mapStateToProps, {})(SplitViewPdfViewer);
