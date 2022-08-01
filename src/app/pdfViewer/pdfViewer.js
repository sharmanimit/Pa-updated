// import React, { useEffect, useRef, useState, useMemo, memo } from 'react';
// import WebViewer from '@pdftron/webviewer';
// import './App.css';
// import { connect, useDispatch, useSelector } from "react-redux";
// import { downloadFile, saveAnnotation, getAnnotation } from "../camunda_redux/redux/action";
// import { PropTypes } from "prop-types";
// import { setPassData, instanceLoadBln, setPdfInstance } from "../camunda_redux/redux/ducks/passData";
// // import { setPdfInstance } from "../camunda_redux/redux/ducks/instanceStore"
// import { setLoadData } from "../redux/actions/LoadingActions";
// import { setSnackbar } from "../camunda_redux/redux/ducks/snackbar";
// import { changingTableStateInbox, changingTableStateAnnexure, changingTableStateHrmConcern } from "../camunda_redux/redux/action/apiTriggers";
// import { isNullOrUndefined } from '@syncfusion/ej2-base';

// const PdfViewer = (props) => {
//     const viewer = useRef(null);
//     const messageReceived = useSelector(state => state.passData.messageToPassUrl);
//     const pdfLoadOnce = useSelector(state => state.passData.instanceLoadBln);
//     const pdfInstance = useSelector(state => state.passData.pdfInstance);

//     const { personalID, flag, flagNumber } = props;
//     let annotatId = props.anottId;
//     const [instance, setInstance] = useState(null);
//     let [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         console.log("messageReceived :", messageReceived)
//         try {
//             let flag1 = true;
//             if (!pdfLoadOnce && messageReceived !== "" && messageReceived !== null && !isNullOrUndefined(messageReceived)) {
//                 const { docViewer, annotManager } = pdfInstance;
//                 const fileName = messageReceived.split("/")
//                 console.log("fileName :", fileName[fileName.length - 1])
//                 // debugger
//                 pdfInstance.loadDocument(messageReceived, {
//                     filename: fileName,
//                     // extension: 'docx',
//                     // streaming: true,
//                     // startOffline: true,
//                     // customHeaders: {
//                     //     Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
//                     // },
//                     // withCredentials: true
//                 });
//                 // pdfInstance.loadDocument(messageReceived);
//                 // debugger

//                 docViewer.setWatermark({
//                     // Draw diagonal watermark in middle of the document
//                     diagonal: {
//                         fontSize: 35, // or even smaller size
//                         fontFamily: "sans-serif",
//                         color: "#5a5ad6",
//                         opacity: 40, // from 0 to 100
//                         text: `${sessionStorage.getItem("displayUserName")}`,
//                     },

//                     // Draw header watermark
//                     header: {
//                         fontSize: 10,
//                         fontFamily: "sans-serif",
//                         color: "red",
//                         opacity: 70,
//                     },
//                 });

//                 pdfInstance.setHeaderItems((header) => {
//                     header.pop()
//                 });

//                 pdfInstance.setHeaderItems((header) => {
//                     header.push({
//                         type: 'actionButton',
//                         img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
//                         title: 'Save',
//                         onClick: async () => {
//                             annotManager.exportAnnotations().then((res) => {
//                                 const body = { "annotationData": res };
//                                 const val = JSON.stringify(body);
//                                 props.saveAnnotation(val, personalID, flag, flagNumber).then(function (response) {
//                                     if (response.status === "OK") {
//                                         // props.setReloadInboxData();
//                                         flag1 = true;
//                                         dispatch(
//                                             setSnackbar(
//                                                 true,
//                                                 "success",
//                                                 "Annotation saved successfully"
//                                             )
//                                         );

//                                         let trigger = false;
//                                         setTimeout(() => {
//                                             trigger = true;
//                                             props.changingTableStateInbox(trigger, 'CHANGE_INBOX');
//                                             if (flag === 'Initiate') {
//                                                 props.changingTableStateAnnexure(trigger, 'CHANGE_PA_ANNEXURE');
//                                             }
//                                             if (flag === 'PA' || 'Annexture') {
//                                                 props.changingTableStateHrmConcern(trigger, 'CHANGE_HRM');
//                                             }
//                                         }, 2000);
//                                     }
//                                     else {
//                                         dispatch(
//                                             setSnackbar(
//                                                 true,
//                                                 "error",
//                                                 "Annotation saved Failure !"
//                                             )
//                                         );
//                                     }
//                                 });
//                                 setLoading(false)
//                             });
//                         }
//                     });
//                 });



//                 // Load annotations when document is loaded
//                 docViewer.on('documentLoaded', function () {
//                     instance.setZoomLevel("100%");
//                     if (flag1) {
//                         flag1 = false;
//                         if (annotatId !== null && annotatId !== undefined && annotatId !== "") {
//                             loadxfdfStrings(annotatId).then(function (rows) {
//                                 let xString = rows.xsdfString;
//                                 annotManager.importAnnotations(xString).then(response => {
//                                     response.forEach(col => {
//                                         annotManager.importAnnotCommand(col).then(function (annotations) {
//                                             annotManager.drawAnnotationsFromList(annotations);
//                                         });
//                                     })
//                                 });
//                             });
//                         }
//                         annotatId = "";
//                     }
//                 });

//                 dispatch(
//                     setPassData("")
//                 )
//                 props.pdfLoads(true)
//             }
//             // props.setLoadData(true);
//             // dispatch(setPassData(""))
//         } catch (e) {
//             // debugger
//             console.error(e)
//         }
//     }, [messageReceived]);

//     // if using a class, equivalent of componentDidMount
//     console.log("pdfLoadOnce :", pdfLoadOnce)
//     useEffect(() => {
//         if (pdfLoadOnce === true) {
//             try {
//                 // if (pdfInstance !== null) {
//                 //     pdfInstance.loadDocument(messageReceived, {});
//                 //     // setInstance(instance);
//                 // }
//                 // else {
//                 WebViewer(
//                     {
//                         path: `${process.env.PUBLIC_URL + '/webviewer/lib'}`,
//                         // initialDoc: process.env.REACT_APP_PDF_SAMPLE_URL + '?token=' + sessionStorage.getItem('jwt_token'),
//                         fullAPI: true,
//                         enableRedaction: true,
//                         backendType: 'ems',
//                         accessibleMode: true,
//                         // initialDoc: messageReceived,
//                     },
//                     viewer.current,
//                 ).then((instance) => {
//                     console.log("instance of second function:", instance)
//                     // debugger
//                     instance.loadDocument(messageReceived);
//                     // const FitMode = instance.FitMode;
//                     // instance.setFitMode(FitMode.FitWidth);
//                     // setInstance(instance);
//                     const { annotManager, docViewer, Tools } = instance;
//                     let data = sessionStorage.getItem("username");
//                     annotManager.setCurrentUser(data);
//                     annotManager.setIsAdminUser(true);
//                     // docViewer.on('documentLoaded',function(){
//                     //     var FitMode = instance.FitMode;
//                     //     instance.setFitMode(FitMode.FitWidth);
//                     // });

//                     docViewer.on('documentLoaded', function () {
//                         instance.setZoomLevel('100%')
//                     });
//                     docViewer.setWatermark({
//                         // Draw diagonal watermark in middle of the document
//                         diagonal: {
//                             fontSize: 35, // or even smaller size
//                             fontFamily: "sans-serif",
//                             color: "#5a5ad6",
//                             opacity: 40, // from 0 to 100
//                             text: `${sessionStorage.getItem("displayUserName")}`,
//                         },

//                         // Draw header watermark
//                         header: {
//                             fontSize: 10,
//                             fontFamily: "sans-serif",
//                             color: "red",
//                             opacity: 70,
//                         },
//                     });

//                     const fullScreen = {
//                         type: 'actionButton',
//                         img: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>',
//                         title: 'FullScreen',
//                         onClick: () => {
//                             instance.toggleFullScreen(true);
//                         },
//                         dataElement: 'fullscreen',
//                     };


//                     // Add a new button that alerts "Hello world!" when clicked
//                     instance.setHeaderItems((header) => {
//                         header.push(fullScreen)
//                     })
//                     // instance.disableElements(['textSquigglyToolButton']);
//                     // instance.textPopup.add({
//                     //     type: "actionButton",
//                     //     label: "some-label",
//                     //     onClick: () => alert("clicked")
//                     // });
//                     // const displaymode=new DisplayMode(docViewer, mode, false);
//                     // instance.setDisplayMode((doc)=>{

//                     // })
//                     dispatch(setPdfInstance(instance))

//                     dispatch(instanceLoadBln(false))
//                     props.pdfLoads(true)
//                 });
//                 // }
//             } catch (e) { console.error(e) }
//         }
//     }, []);

//     console.log(props.fileUrl)


//     // Make a GET request to get XFDF string
//     var loadxfdfStrings = function (documentId) {
//         return props.getAnnotation(documentId)
//     };

//     return (
//         <div className="App">
//             <div id="pdfV" className="webviewer" ref={viewer} style={{ height: "calc(100vh - 70px)" }}></div>
//         </div>
//     );
// };

// function mapStateToProps(state) {

//     return {
//         saveAnnotation: PropTypes.func.isRequired,
//         getAnnotation: PropTypes.func.isRequired,
//         props: state.props,
//         theme: state.theme
//     };
// }

// export default connect(mapStateToProps, { setLoadData, downloadFile, saveAnnotation, getAnnotation, changingTableStateInbox, changingTableStateAnnexure, changingTableStateHrmConcern })(PdfViewer);












import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  downloadFile,
  saveAnnotation,
  getAnnotation,
} from "../camunda_redux/redux/action";
import { PropTypes } from "prop-types";
import { setPassData } from "../camunda_redux/redux/ducks/passData";
import { setPdfInstance } from "../camunda_redux/redux/ducks/instanceStore";
import { setLoadData } from "../redux/actions/LoadingActions";
import { setSnackbar } from "../camunda_redux/redux/ducks/snackbar";
import {
  changingTableStateInbox,
  changingTableStateAnnexure,
  changingTableStateHrmConcern,
} from "../camunda_redux/redux/action/apiTriggers";
import { isNullOrUndefined } from "@syncfusion/ej2-base";

const PdfViewer = (props) => {
  const viewer = useRef(null);
  const messageReceived = useSelector(
    (state) => state.passData.messageToPassUrl
  );
  const extension = useSelector(
    (state) => state.passData.extension
  );

  const { personalID, flag, flagNumber } = props;
  let annotatId = props.anottId;

  console.log(annotatId)

  const [instance, setInstance] = useState(null);
  let [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      let flag1 = true;
      if (
        messageReceived !== "" &&
        messageReceived !== null &&
        !isNullOrUndefined(messageReceived)
      ) {
        instance.setHeaderItems((header) => {
          header.pop();
        });  
        //git changes

        instance.loadDocument(messageReceived, {extension: extension ? extension : "docx"});
        const { docViewer, annotManager } = instance;

        docViewer.setWatermark({
          // Draw diagonal watermark in middle of the document
          diagonal: {
            fontSize: 35, // or even smaller size
            fontFamily: "sans-serif",
            color: "#5a5ad6",
            opacity: 40, // from 0 to 100
            text: `${sessionStorage.getItem("displayUserName")}`,
          },

          // Draw header watermark
          header: {
            fontSize: 10,
            fontFamily: "sans-serif",
            color: "red",
            opacity: 70,
          },
        });

        instance.setHeaderItems((header) => {
          header.push({
            type: "actionButton",
            img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
            title: "Save",
            onClick: async () => {
              annotManager.exportAnnotations().then((res) => {
                const body = { annotationData: res };
                const val = JSON.stringify(body);
                props
                  .saveAnnotation(val, personalID, flag, flagNumber)
                  .then(function (response) {
                    if (response.status === "OK") {
                      // props.setReloadInboxData();
                      flag1 = true;
                      dispatch(
                        setSnackbar(
                          true,
                          "success",
                          "Annotation saved successfully"
                        )
                      );

                      let trigger = false;
                      setTimeout(() => {
                        trigger = true;
                        props.changingTableStateInbox(trigger, "CHANGE_INBOX");
                        if (flag === "Initiate") {
                          props.changingTableStateAnnexure(
                            trigger,
                            "CHANGE_PA_ANNEXURE"
                          );
                        }
                        if (flag === "PA" || "Annexture") {
                          props.changingTableStateHrmConcern(
                            trigger,
                            "CHANGE_HRM"
                          );
                        }
                      }, 2000);
                    } else {
                      dispatch(
                        setSnackbar(true, "error", "Annotation saved Failure !")
                      );
                    }
                  });
                setLoading(false);
              });
            },
          });
        });
        // Load annotations when document is loaded

        docViewer.on("documentLoaded", function () {
          if (flag1) {
            flag1 = false;
            if (
              annotatId !== null &&
              annotatId !== undefined &&
              annotatId !== ""
            ) {
              loadxfdfStrings(annotatId).then(function (rows) {
                let xString = rows.xsdfString;
                annotManager.importAnnotations(xString).then((response) => {
                  response.forEach((col) => {
                    annotManager
                      .importAnnotCommand(col)
                      .then(function (annotations) {
                        annotManager.drawAnnotationsFromList(annotations);
                      });
                  });
                });
              });
            }
            annotatId = "";
          }
        });
      }
      dispatch(setPassData(""));
      props.setLoadData(true);
    } catch (e) {
      console.error(e);
    }
  }, [messageReceived]);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    try {
      if (instance !== null) {
        instance.loadDocument(props.fileUrl, {extension: extension ? extension : "docx"});
        setInstance(instance);
      } else {
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
          var FitMode = instance.FitMode;
          instance.setFitMode(FitMode.FitWidth);
          setInstance(instance);
          dispatch(setPdfInstance(instance));
          const { annotManager, docViewer, Tools } = instance;
          let data = sessionStorage.getItem("username");

          docViewer.setWatermark({
            // Draw diagonal watermark in middle of the document
            diagonal: {
              fontSize: 35, // or even smaller size
              fontFamily: "sans-serif",
              color: "#5a5ad6",
              opacity: 40, // from 0 to 100
              text: `${sessionStorage.getItem("displayUserName")}`,
            },

            // Draw header watermark
            header: {
              fontSize: 10,
              fontFamily: "sans-serif",
              color: "red",
              opacity: 70,
            },
          });

          annotManager.setCurrentUser(data);
          annotManager.setIsAdminUser(true);
          // docViewer.on('documentLoaded',function(){
          //     var FitMode = instance.UI.FitMode;
          //     instance.UI.setFitMode(FitMode.FitWidth);
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

          // Add a new button that alerts "Hello world!" when clicked
          instance.setHeaderItems((header) => {
            header.push(fullScreen);
          });
          // instance.UI.disableElements(['textSquigglyToolButton']);
          // instance.UI.textPopup.add({
          //     type: "actionButton",
          //     label: "some-label",
          //     onClick: () => alert("clicked")
          // });
          props.pdfLoads(true);
          // const displaymode=new DisplayMode(docViewer, mode, false);
          // instance.setDisplayMode((doc)=>{

          // })
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [props.fileUrl]);

  console.log(props.fileUrl);

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
        style={{ height: "calc(100vh - 70px)" }}
      ></div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    saveAnnotation: PropTypes.func.isRequired,
    getAnnotation: PropTypes.func.isRequired,
    props: state.props,
    theme: state.theme,
  };
}

export default connect(mapStateToProps, {
  setLoadData,
  downloadFile,
  saveAnnotation,
  getAnnotation,
  changingTableStateInbox,
  changingTableStateAnnexure,
  changingTableStateHrmConcern,
})(PdfViewer);
