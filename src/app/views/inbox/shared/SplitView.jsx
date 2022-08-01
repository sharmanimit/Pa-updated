// import React, { useEffect, useState } from "react";
// import { connect, useDispatch } from "react-redux";
// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   Grid,
//   Icon,
//   IconButton,
//   InputLabel,
//   makeStyles,
//   MenuItem,
//   Select,
//   DialogContentText,
//   DialogActions,
//   Tooltip,
//   Paper,
//   Typography,
//   TextField,
//   Fab,
// } from "@material-ui/core";
// import HeadersAndFootersView from "../../FileApproval/documentEditor/editor";
// import PdfViewer from "../../../pdfViewer/pdfViewer";
// import {
//   getPANotingData,
//   getPAEnclosureData,
//   loadPartCaseData,
//   loadInboxDataSplitView,
//   savePartCaseTag,
//   fetchSplitViewTags,
//   createPartCaseNotingFile,
//   createCoverLetter,
//   rollbackSplitViewDocument,
//   rollbackSplitViewEnclosureDocument,
// } from "../../../camunda_redux/redux/action";
// import { Loading } from "../therme-source/material-ui/loading";
// import { Breadcrumb } from "../../../../matx";
// import { setInboxDatas } from "../../../redux/actions/InboxActions";
// import history from "../../../../history";
// import { setPassData } from "../../../camunda_redux/redux/ducks/passData";
// import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
// import CloseIcon from "@material-ui/icons/Close";
// import InputForm from "./quickSignFrom";
// import "../therme-source/material-ui/loading.css";
// import SplitViewPdfViewer from "./pdfViewer/pdfViewer";
// import { useTranslation } from "react-i18next";
// import Draggable from "react-draggable";
// import Cookies from "js-cookie";
// import NoteAddIcon from "@material-ui/icons/NoteAdd";
// import AddIcon from "@material-ui/icons/Add";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
// import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
// import FileUploader from "./FileUpload";
// import RestorePageIcon from "@material-ui/icons/RestorePage";
// import CreateIcon from "@material-ui/icons/Create";
// import SendIcon from "@material-ui/icons/Send";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// const PaperComponent = (props) => {
//   return (
//     <Draggable
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// };

// const useStyles = makeStyles({
//   mainDiv: {
//     textAlign: "center",
//   },
//   formControl: {
//     marginTop: 10,
//     width: 300,
//     // minWidth: 150,
//     // maxWidth: 250,
//   },
//   button: {
//     marginTop: 12,
//     marginLeft: 4,
//   },
//   sign_btn: {
//     position: "fixed",
//     right: "40px !important",
//     bottom: "40px !important",
//     zIndex: 1,
//   },
//   back_btn: {
//     position: "fixed",
//     right: "40px !important",
//     bottom: "110px !important",
//     zIndex: 1,
//   },
// });
// const SplitView = (props) => {
//   const { t } = useTranslation();

//   let title = Cookies.get("inboxFile");
//   let priority = Cookies.get("priority");
//   let referenceNumber = Cookies.get("referenceNumber");

//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const [NOF, setNOF] = useState("");
//   const [NOF1, setNOF1] = useState("");
//   const [sfdtData, setSfdtData] = useState("");
//   const [prevNFUrl, setPrevNFUrl] = useState("");
//   const [prevEnclouser, setPrevEnclouser] = useState("");
//   const FileID = sessionStorage.getItem("pa_id");
//   const InboxIdFromHrmSection = sessionStorage.getItem("InboxID");
//   const [blnVisible, setBlnVisible] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [rowID, setRowID] = useState("");
//   const [enclosureData, setEnclosureData] = useState([]);
//   const inboxId = sessionStorage.getItem("InboxID");
//   const [open, setOpen] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [URL, setURL] = useState("");
//   const [enclosureURL, setEnclosureURL] = useState("");
//   const [pdfLoads, setpdfLoads] = useState(false);
//   const [enclosurePdfLoads, setEnclosurePdfLoads] = useState(false);
//   const [blnHideSyncfusion, setBlnHideSyncfusion] = useState(false);
//   const [fileChange, setFileChange] = useState(false);
//   const [pdfWidth, setpdfWidth] = useState(6);
//   const [notingURL, setNotingURL] = useState("");
//   const [flag, setFlag] = useState("Noting");
//   const [partCaseId, setPartCaseId] = useState("");
//   const [flagNumber, setFlagNumber] = useState(0);
//   const [prevFlagNumberNF, setPrevFlagNumberNF] = useState(0);
//   const [prevFlagNumberEnclouser, setPrevFlagNumberEnclouser] = useState(0);
//   const [hrmRole, setHrmRole] = useState("");
//   const username = sessionStorage.getItem("username");
//   const [coverLetter, setCoverLetter] = useState(false);
//   const [hasCoverNote, setHasCoverNote] = useState(false);

//   const [blnDisableForward, setBlnDisableForward] = useState(false);
//   const [notingData, setNotingData] = useState([]);

// const [pdfViewerButtons, setPdfViewerButtons] = useState([
//   {
//     btnName: "A",
//     btnId: 0,
//     backgroundColor: "grey",
//     fileurl: "",
//   },
//   {
//     btnName: "B",
//     btnId: 1,
//     backgroundColor: "grey",
//     fileurl: "",
//   },
//   {
//     btnName: "C",
//     btnId: 2,
//     backgroundColor: "grey",
//     fileurl: "",
//   },
//   {
//     btnName: "D",
//     btnId: 3,
//     backgroundColor: "grey",
//     fileurl: "",
//   },
//   {
//     btnName: "E",
//     btnId: 4,
//     backgroundColor: "grey",
//     fileurl: "",
//   },
// ]);

//   const loadSplitViewData = () => {
//     Cookies.set("HrmRole", null);
//     setLoading(true);
//     const inboxId = sessionStorage.getItem("InboxID");
//     const InboxID = inboxId !== undefined ? inboxId : InboxIdFromHrmSection;
//     props.loadInboxDataSplitView(inboxId, username).then((resp) => {
//       if (resp.Data.partCaseId) {
//         setPartCaseId(resp.Data.partCaseId);
//         sessionStorage.setItem("partcaseID", resp.Data.partCaseId);
//         let formData = new FormData();
//         formData.append("id", resp.Data.partCaseId);
//         props.loadPartCaseData(formData).then((resp) => {
//           if (resp != undefined) {
//             setHrmRole(resp.data.hrmRole);
//             setHasCoverNote(resp.data.hasCoverNote);
//             let enclouserTmpArr = [];
//             if (!coverLetter) {
//               resp.data.enclosureList.map((item) => {
//                 item.coverLetter === true ? setCoverLetter(true) : null;
//               });
//             }
//             for (let x = 0; x < resp.data.enclosureList.length; x++) {
//               if (resp.data.enclosureList[x].coverLetter === true) {
//                 enclouserTmpArr.unshift({
//                   ...resp.data.enclosureList[x],
//                   // serialNo: 0,
//                 });
//               } else {
//                 enclouserTmpArr.push({
//                   ...resp.data.enclosureList[x],
//                   // serialNo: x,
//                 });
//               }
//             }
//             let notngTmpArr = [];
//             for (let x = 0; x < resp.data.notingList.length; x++) {
//               notngTmpArr.push({ ...resp.data.notingList[x], serialNo: x });
//             }
//             setNotingData(notngTmpArr);
//             setEnclosureData(enclouserTmpArr);
//             if (enclouserTmpArr.length !== 0) {
//               setURL(enclouserTmpArr[0].fileUrl);
//               setNOF1(JSON.stringify(enclouserTmpArr[0]));
//             }
//             setURL(enclouserTmpArr[0].fileUrl);
//             setRowID(resp.data.id);
//             setFlagNumber(enclouserTmpArr[0].flagNumber);
//             setPrevFlagNumberNF(notngTmpArr[0].flagNumber);
//             setPrevFlagNumberEnclouser(enclouserTmpArr[0].flagNumber);
//             setSfdtData(notngTmpArr[0].fileUrl);
//             setPrevNFUrl(notngTmpArr[0].fileUrl);
//             setPrevEnclouser(enclouserTmpArr[0].fileUrl);
//             setNotingURL(notngTmpArr[0].fileUrl);
//             setFileName(notngTmpArr[0].fileName);
//             setNOF(JSON.stringify(notngTmpArr[0]));
//             setBlnHideSyncfusion(notngTmpArr[0].signed);
//             setBlnVisible(true);
//             setLoading(false);
//             setBlnDisableForward(!resp.data.enableAddNoting);
//             loadEnclouserTags();
//           }
//         });
//       }
//     });
//   };

//   const loadEnclouserTags = () => {
//     const dept = sessionStorage.getItem("department");
//     const PartCaseID = sessionStorage.getItem("partcaseID");
//     props.fetchSplitViewTags(PartCaseID, dept).then((resp) => {
//       if (resp) {
//         if (resp.Data != null && resp.Data != [] && resp.Data != "") {
//           setPdfViewerButtons(resp.Data);
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     loadSplitViewData();
//     // loadEnclouserTags()
//   }, []);

//   useEffect(() => {
//     if (enclosurePdfLoads === true && URL !== undefined) {
//         dispatch(setPassData(URL));
//     }
//   }, [enclosurePdfLoads, URL]);

//   const callMessageOut = (message) => {
//     // dispatch(setSnackbar(true, "error", message));
//     if (this.id === undefined) {
//       return dispatch(setSnackbar(true, "error", message));
//     }
//   };

//   const handleChange = (event) => {
//     // setNOF1("");
//     setNOF(JSON.stringify(event.target.value));
//     const data = JSON.parse(event.target.value);
//     let url = data.fileUrl;
//     const flagNumber = data.flagNumber;
//     const hideViewer = data.signed;
//     setBlnHideSyncfusion(hideViewer);
//     setFlag("Noting");
//     setFlagNumber(flagNumber);
//     setSfdtData(url);
//     setNotingURL(url);
//     setPrevNFUrl(url);
//     setPrevFlagNumberNF(flagNumber);
//   };

//   const handleChange1 = (event) => {
//     setNOF1(event.target.value);

//     // setNOF1(JSON.parse(event.target.value));
//     const data = JSON.parse(event.target.value);
//     const url = data.fileUrl;
//     const flagNumber = data.flagNumber;
//     setFileChange(true);
//     setURL(url);
//     setFlag("Enclouser");
//     setSfdtData(url);
//     setPrevEnclouser(url);
//     setFlagNumber(flagNumber);
//     setPrevFlagNumberEnclouser(flagNumber);
//     // dispatch(setPassData(url));
//   };

//   const handleChangePreviousEnclosure = () => {
//     let data = JSON.parse(NOF1);
//     if (data.serialNo === 0) {
//       let newData = enclosureData[enclosureData.length - 1];
//       setNOF1(JSON.stringify(newData));
//       const url = newData.fileUrl;
//       const flagNumber = newData.flagNumber;
//       setFileChange(true);
//       setURL(url);
//       setFlag("Enclouser");
//       setSfdtData(url);
//       setPrevEnclouser(url);
//       setFlagNumber(flagNumber);
//       setPrevFlagNumberEnclouser(flagNumber);
//       // dispatch(setPassData(url));
//     } else {
//       let newData = enclosureData[data.serialNo - 1];
//       setNOF1(JSON.stringify(newData));
//       const url = newData.fileUrl;
//       const flagNumber = newData.flagNumber;
//       setFileChange(true);
//       setURL(url);
//       setFlag("Enclouser");
//       setSfdtData(url);
//       setPrevEnclouser(url);
//       setFlagNumber(flagNumber);
//       setPrevFlagNumberEnclouser(flagNumber);
//       // dispatch(setPassData(url));
//     }
//   };

//   const handleChangeNextEnclosure = () => {
//     let data = JSON.parse(NOF1);
//     if (data.serialNo + 1 === enclosureData.length) {
//       let newData = enclosureData[0];
//       setNOF1(JSON.stringify(newData));
//       const url = newData.fileUrl;
//       const flagNumber = newData.flagNumber;
//       setFileChange(true);
//       setURL(url);
//       setFlag("Enclouser");
//       setSfdtData(url);
//       setPrevEnclouser(url);
//       setFlagNumber(flagNumber);
//       setPrevFlagNumberEnclouser(flagNumber);
//       // dispatch(setPassData(url));
//     } else {
//       let newData = enclosureData[data.serialNo + 1];
//       setNOF1(JSON.stringify(newData));
//       const url = newData.fileUrl;
//       const flagNumber = newData.flagNumber;
//       setFileChange(true);
//       setURL(url);
//       setFlag("Enclouser");
//       setSfdtData(url);
//       setPrevEnclouser(url);
//       setFlagNumber(flagNumber);
//       setPrevFlagNumberEnclouser(flagNumber);
//       // dispatch(setPassData(url));
//     }
//   };

// const handleRedirectToHrm = (row) => {
//   Cookies.set("hasCoverNote", hasCoverNote);
//   props.savePartCaseTag(partCaseId, pdfViewerButtons).then((resp) => {
//     if (resp) {
//       Cookies.set("HrmRole", hrmRole);
//       props.setInboxDatas(row);
//       history.push({
//         pathname: "/eoffice/hrmSection/file",
//         state: { FileID, inboxId, hasCoverNote },
//       });
//     }
//   });
// };

// const pdfCustomButton = (e) => {
//   let elementName = e.target.parentElement.getAttribute("buttonName");
//   let fileurl = e.target.parentElement.getAttribute("fileurl");
//   const tempColour = ["orange", "green", "purple", "blue", "mediumvioletred"];

//   let data = enclosureData.find((item) => item.fileUrl === fileurl);
//   let strData = JSON.stringify(data);

//   var urlExist = true;
//   var resUrl = "";
//   for (let x = 0; x < pdfViewerButtons.length; x++) {
//     if (pdfViewerButtons[x].fileurl === URL) {
//       urlExist = false;
//     }
//     if (fileurl) {
//       resUrl = fileurl;
//     }
//   }
//   if (resUrl) {
//     // dispatch(setPassData(resUrl));
//     setNOF1(strData);
//   } else {
//     let updatedElement = pdfViewerButtons.map((item) =>
//       item.btnId == elementName && fileChange && urlExist
//         ? {
//             ...item,
//             backgroundColor: tempColour[item.btnId],
//             fileurl: URL,
//           }
//         : item
//     );
//     setFileChange(false);
//     setPdfViewerButtons(updatedElement);
//   }
// };

//   const handleSignedCompleted = (val) => {
//     setpdfWidth(6);
//     setOpen(false);
//   };

//   const handleReturnedURL = (url) => {
//     setBlnHideSyncfusion(true);
//     setNotingURL(url);
//     loadSplitViewData();
//   };

//   const handleAddPartCaseNoting = () => {
//     const groupName = sessionStorage.getItem("department");
//     props.createPartCaseNotingFile(partCaseId, groupName).then((resp) => {
//       loadSplitViewData();
//     });
//   };

//   const handleCoverLetter = () => {
//     const groupName = sessionStorage.getItem("role");
//     props.createCoverLetter(partCaseId, groupName).then((resp) => {
//       loadSplitViewData();
//     });
//   };

//   const handleDocumentRollback = () => {
//     rowID &&
//       props.rollbackSplitViewDocument(rowID, flagNumber).then((resp) => {
//         try {
//           console.log(resp);
//           setSfdtData(resp.url);
//           setBlnDisableForward();
//           setBlnHideSyncfusion(false);
//           setNotingURL(resp.url);
//         } catch (error) {
//           callMessageOut(error.message);
//         }
//       });
//   };

//   const handleDocumentRollbackEnclosure = () => {
//     partCaseId &&
//       props
//         .rollbackSplitViewEnclosureDocument(partCaseId, flagNumber)
//         .then((resp) => {
//           try {
//             console.log(resp);
//             setTimeout(() => {
//               // dispatch(setPassData(resp.url));
//             }, 1000);
//           } catch (error) {
//             callMessageOut(error.message);
//           }
//         });
//   };

//   console.log({ rowID });

//   return (
//     <div className="m-sm-30" style={{ marginRight: "10px" }}>
//       <div>
//         <Tooltip title={t("send")}>
//           <Fab
//             variant="contained"
//             color="secondary"
//             className={`button-glow ${classes.sign_btn}`}
//             onClick={handleRedirectToHrm}
//           >
//             <SendIcon />
//           </Fab>
//         </Tooltip>
//         <Tooltip title={t("back")} aria-label="BACK">
//           <Fab
//             variant="contained"
//             className={classes.back_btn}
//             color="primary"
//             onClick={() => history.push({ pathname: "/eoffice/inbox/file" })}
//           >
//             <ArrowBackIcon />
//           </Fab>
//         </Tooltip>

//         <Grid container justifyContent="center" spacing={2}>
//           <Grid item xs={8}>
//             <Breadcrumb
//               routeSegments={[
//                 { name: t("inbox"), path: "/eoffice/inbox/file" },
//                 { name: t("file"), path: "/costa/splitView/file" },
//               ]}
//               otherData={[
//                 { key: "Subject", value: title },
//                 { key: "Ref no", value: referenceNumber },
//                 { key: "Priority", value: priority },
//               ]}
//             />
//           </Grid>
//           <Grid item xs={4}></Grid>
//         </Grid>
//       </div>
//       <Grid container justifyContent="center" spacing={1}>
//         <Grid item xs={6}>
//           {blnVisible ? (
//             <FormControl
//               variant="outlined"
//               size="small"
//               className={classes.formControl}
//             >
//               <InputLabel id="demo-simple-select-outlined-label">
//                 {t("note_on_file")}
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-outlined-label"
//                 id="demo-simple-select-outlined"
//                 value={NOF}
//                 onChange={handleChange}
//                 label="NoteOnFile"
//               >
//                 {notingData.map((item, index) => (
//                   <MenuItem key={index} value={JSON.stringify(item)}>
//                     {item.fileName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           ) : null}
//           <Tooltip title={t("sign")} aria-label="Sign">
//             <Button
//               // style={{ marginBottom: "15px" }}
//               variant="contained"
//               color="secondary"
//               className={classes.button}
//               onClick={() => {
//                 setFlagNumber(prevFlagNumberNF);
//                 setSfdtData(prevNFUrl);
//                 setFlag("Noting");
//                 setOpen(true);
//               }}
//             >
//               {/* <Icon>
//                             <img src={process.env.PUBLIC_URL + `/assets/icons/fact_check_white_24dp.svg`} alt="Remark & Check" style={{ marginTop: '-10px' }} />
//                         </Icon> */}
//               <CreateIcon />
//             </Button>
//           </Tooltip>
//           <Tooltip title={t("add_noting")} aria-label="Add Noting">
//             <Button
//               // style={{ marginBottom: "15px" }}
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               disabled={blnDisableForward}
//               onClick={handleAddPartCaseNoting}
//             >
//               <NoteAddIcon />
//             </Button>
//           </Tooltip>
//           <Button
//             // style={{ marginBottom: "15px" }}
//             variant="contained"
//             color="primary"
//             className={classes.button}
//             onClick={handleDocumentRollback}
//           >
//             <RestorePageIcon />
//           </Button>

//           {/* <Tooltip title={t("back")} aria-label="BACK">
//             <Button
//               variant="contained"
//               style={{ padding: "8px 16px" }}
//               className={classes.button}
//               color="primary"
//               onClick={() => history.push({ pathname: "/eoffice/inbox/file" })}
//               startIcon={<SkipPreviousIcon style={{ marginRight: "-8px" }} />}
//             ></Button>
//           </Tooltip> */}
//         </Grid>
//         <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
//           {/* <FormControl
//             variant="outlined"
//             size="small"
//             className={classes.formControl}
//           >
//             <InputLabel id="demo-simple-select-outlined-label">
//               {t("enclosure")}
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-outlined-label"
//               id="demo-simple-select-outlined1"
//               value={NOF1}
//               onChange={handleChange1}
//               label="NoteOnFile"
//             >
//               {enclosureData.map((item, index) => (
//                 <MenuItem key={index} value={JSON.stringify(item)}>
//                   {item.fileName}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl> */}
//           <TextField
//             select
//             label={t("enclosure")}
//             value={NOF1}
//             size="small"
//             fullWidth
//             onChange={handleChange1}
//             variant="outlined"
//             className={classes.formControl}
//           >
//             {enclosureData.map((item, index) => (
//               <MenuItem key={index} value={JSON.stringify(item)}>
//                 {item.fileName}
//               </MenuItem>
//             ))}
//           </TextField>
//           <Tooltip title={t("sign")} aria-label="Sign">
//             <Button
//               variant="contained"
//               color="secondary"
//               className={classes.button}
//               onClick={() => {
//                 setFlagNumber(prevFlagNumberEnclouser);
//                 setSfdtData(prevEnclouser);
//                 setFlag("Enclouser");
//                 setOpen(true);
//               }}
//             >
//               {/* {t("remarks_and_sign")} */}
//               <CreateIcon />
//             </Button>
//           </Tooltip>

//           <Tooltip
//             title={t("Add Cover Letter to Forward PA to Next Level")}
//             aria-label="Cover Letter"
//           >
//             <Button
//               // style={{ marginBottom: "15px" }}
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               disabled={coverLetter ? blnDisableForward : ""}
//               onClick={handleCoverLetter}
//             >
//               <AddIcon />
//             </Button>
//           </Tooltip>

//           <div className={classes.button}>
//             <FileUploader loadSplitViewData={loadSplitViewData} />
//           </div>
//           {/* <Tooltip title={t("send")}>
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               onClick={handleRedirectToHrm}
//             >
//               <SendIcon />
//             </Button>
//           </Tooltip> */}
//           <Button
//             variant="contained"
//             color="primary"
//             className={classes.button}
//             onClick={handleDocumentRollbackEnclosure}
//           >
//             <RestorePageIcon />
//           </Button>
//           {/* <Tooltip title={t("Previous Enclosure")} aria-label="Add Noting">
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               onClick={handleChangePreviousEnclosure}
//             >
//               <SkipPreviousIcon />
//             </Button>
//           </Tooltip>
//           <Tooltip title={t("Next Enclosure")} aria-label="Add Noting">
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               onClick={handleChangeNextEnclosure}
//             >
//               <SkipNextIcon />
//             </Button>
//           </Tooltip> */}
//           <Tooltip title={t("Previous Enclosure")} aria-label="Add Noting">
//             <Button
//               variant="contained"
//               style={{
//                 backgroundColor: "#fff",
//                 border: "2px solid #eee",
//                 minWidth: "12px",
//                 padding: "5px",
//                 boxShadow: "none",
//               }}
//               color="white"
//               className={classes.button}
//               onClick={handleChangePreviousEnclosure}
//             >
//               <SkipPreviousIcon style={{ color: "#4267b2" }} />
//             </Button>
//           </Tooltip>
//           <Tooltip title={t("Next Enclosure")} aria-label="Add Noting">
//             <Button
//               variant="contained"
//               color="white"
//               style={{
//                 backgroundColor: "#fff",
//                 border: "2px solid #eee",
//                 minWidth: "12px",
//                 padding: "5px",
//                 boxShadow: "none",
//               }}
//               className={classes.button}
//               onClick={handleChangeNextEnclosure}
//             >
//               <SkipNextIcon style={{ color: "#4267b2" }} />
//             </Button>
//           </Tooltip>
//         </Grid>
//         {!blnHideSyncfusion ? (
//           <Grid item xs={6}>
//             {blnVisible ? (
//               <div className="customDiv">
//                 <HeadersAndFootersView
//                   fileId={rowID}
//                   fileUrl1={sfdtData}
//                   blnIsPartCase={true}
//                   enclosureData={enclosureData}
//                   style={{ border: "1px solid #b6b6b6" }}
//                 />
//               </div>
//             ) : (
//               loading && <Loading />
//             )}
//           </Grid>
//         ) : (
//           <Grid item xs={6} style={{ flexWrap: "nowrap" }}>
//             <div style={{ border: "1px solid #b6b6b6" }}>
//               <SplitViewPdfViewer
//                 fileUrl={pdfLoads ? notingURL : ""}
//                 pdfLoads={(val) => {
//                   setpdfLoads(val);
//                 }}
//               />
//             </div>
//           </Grid>
//         )}
//         <Grid item xs={pdfWidth}>
//           <Grid container style={{ flexWrap: "nowrap" }}>
//             <Grid item style={{ width: "95%", border: "1px solid #b6b6b6" }}>
//               {console.log("asbakjasndjklnasdasjln", NOF1 && JSON.parse(NOF1))}
//               {/* {NOF1 && JSON.parse(NOF1).coverLetter === false ? ( */}
//                 <PdfViewer
//                   personalID={rowID}
//                   flag={"SPLIT"}
//                   flagNumber={prevFlagNumberEnclouser}
//                   fileUrl={""}
//                   pdfLoads={(val) => {
//                     setEnclosurePdfLoads(val);
//                   }}
//                 />
//               {/* ) : (
//                 <>
//                   {blnVisible ? (
//                     <div className="customDiv">
//                       <HeadersAndFootersView
//                         fileId={rowID}
//                         fileUrl1={URL}
//                         blnIsPartCase={true}
//                         style={{ border: "1px solid #b6b6b6" }}
//                       />
//                     </div>
//                   ) : (
//                     loading && <Loading />
//                   )}
//                 </>
//               )} */}

//               {/* <PdfViewer personalID={""} fileUrl={""} /> */}
//             </Grid>
//             <Grid>
//               <div className="split-custom-btn-wrapper">
//                 {pdfViewerButtons.map((item) => {
//                   return (
//                     <Button
//                       key={item.btnId}
//                       size={"small"}
//                       fileurl={item.fileurl}
//                       buttonname={item.btnId}
//                       style={{ backgroundColor: item.backgroundColor }}
//                       onClick={(e) => pdfCustomButton(e)}
//                       className="split-btn-custom"
//                       variant="contained"
//                       color="primary"
//                       href="#contained-buttons"
//                     >
//                       {item.btnName}
//                     </Button>
//                   );
//                 })}
//               </div>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Dialog
//         open={open}
//         PaperComponent={PaperComponent}
//         aria-labelledby="draggable-dialog-title"
//       >
//         <DialogTitle
//           style={{ cursor: "move" }}
//           id="draggable-dialog-title"
//           onClose={() => setOpen(false)}
//         >
//           {t("remark_&_sign")}
//           <IconButton
//             aria-label="close"
//             onClick={() => setOpen(false)}
//             color="primary"
//             style={{ float: "right" }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <InputForm
//             flag={flag}
//             callBackURL={handleReturnedURL}
//             isSignedCompleted={handleSignedCompleted}
//             fileId={rowID}
//             SignURL={sfdtData}
//             flagNum={flagNumber}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   props: state.props,
//   inboxer: state.inboxer,
//   theme: state.theme,
// });
// export default connect(mapStateToProps, {
//   setInboxDatas,
//   loadInboxDataSplitView,
//   loadPartCaseData,
//   getPANotingData,
//   getPAEnclosureData,
//   savePartCaseTag,
//   fetchSplitViewTags,
//   createPartCaseNotingFile,
//   createCoverLetter,
//   rollbackSplitViewDocument,
//   rollbackSplitViewEnclosureDocument,
// })(SplitView);

import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  DialogContentText,
  DialogActions,
  Tooltip,
  Paper,
  Typography,
  TextField,
  Fab,
} from "@material-ui/core";
import HeadersAndFootersView from "../../FileApproval/documentEditor/editor";
import PdfViewer from "../../../pdfViewer/pdfViewer";
import {
  getPANotingData,
  getPAEnclosureData,
  loadPartCaseData,
  loadInboxDataSplitView,
  savePartCaseTag,
  fetchSplitViewTags,
  createPartCaseNotingFile,
  createCoverLetter,
  rollbackSplitViewDocument,
  rollbackSplitViewEnclosureDocument,
} from "../../../camunda_redux/redux/action";
import { Loading } from "../therme-source/material-ui/loading";
import { Breadcrumb } from "../../../../matx";
import { setInboxDatas } from "../../../redux/actions/InboxActions";
import history from "../../../../history";
import { setPassData } from "../../../camunda_redux/redux/ducks/passData";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import CloseIcon from "@material-ui/icons/Close";
import InputForm from "./quickSignFrom";
import "../therme-source/material-ui/loading.css";
import SplitViewPdfViewer from "./pdfViewer/pdfViewer";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import Cookies from "js-cookie";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import FileUploader from "./FileUpload";
import RestorePageIcon from "@material-ui/icons/RestorePage";
import CreateIcon from "@material-ui/icons/Create";
import SendIcon from "@material-ui/icons/Send";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import AddIcon from "@material-ui/icons/Add";
import HrmDialog from "./HrmDialog";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const useStyles = makeStyles({
  mainDiv: {
    textAlign: "center",
  },
  formControl: {
    marginTop: 10,
    width: 300,
    // minWidth: 150,
    // maxWidth: 250,
  },
  button: {
    marginTop: 12,
    marginLeft: 4,
    minWidth: "16px",
    padding: "10px 12px",
    // backgroundColor: "#808080"
  },
  uploadButton: {
    marginTop: 12,
    marginLeft: 4,
    // backgroundColor: "#808080"
  },
  sign_btn: {
    position: "fixed",
    right: "8px !important",
    bottom: "40px !important",
    zIndex: 1,
    maxHeight: "50px",
    minHeight: "50px",
    minWidth: "50px",
    maxWidth: "50px",
  },
  back_btn: {
    position: "fixed",
    right: "8px !important",
    bottom: "110px !important",
    zIndex: 1,
    maxHeight: "50px",
    minHeight: "50px",
    minWidth: "50px",
    maxWidth: "50px",
  },
});
const SplitView = (props) => {
  const { t } = useTranslation();

  let title = Cookies.get("inboxFile");
  let priority = Cookies.get("priority");
  let referenceNumber = Cookies.get("referenceNumber");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [NOF, setNOF] = useState("");
  const [NOF1, setNOF1] = useState("");
  const [sfdtData, setSfdtData] = useState("");
  const [prevNFUrl, setPrevNFUrl] = useState("");
  const [prevEnclouser, setPrevEnclouser] = useState("");
  const FileID = sessionStorage.getItem("pa_id");
  const InboxIdFromHrmSection = sessionStorage.getItem("InboxID");
  const [blnVisible, setBlnVisible] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [rowID, setRowID] = useState("");
  const [enclosureData, setEnclosureData] = useState([]);
  const [enclosureArr, setEnclosureArr] = useState([]);
  const inboxId = sessionStorage.getItem("InboxID");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [URL, setURL] = useState("");
  const [enclosureURL, setEnclosureURL] = useState("");
  const [pdfLoads, setpdfLoads] = useState(false);
  const [enclosurePdfLoads, setEnclosurePdfLoads] = useState(false);
  const [blnHideSyncfusion, setBlnHideSyncfusion] = useState(false);
  const [fileChange, setFileChange] = useState(false);
  const [pdfWidth, setpdfWidth] = useState(6);
  const [notingURL, setNotingURL] = useState("");
  const [flag, setFlag] = useState("Noting");
  const [partCaseId, setPartCaseId] = useState("");
  const [flagNumber, setFlagNumber] = useState(0);
  const [prevFlagNumberNF, setPrevFlagNumberNF] = useState(0);
  const [prevFlagNumberEnclouser, setPrevFlagNumberEnclouser] = useState(0);
  const [hrmRole, setHrmRole] = useState("");
  const [coverLetter, setCoverLetter] = useState(false);
  const [extension, setExtension] = useState("docx");
  const username = sessionStorage.getItem("username");
  const [hasCoverNote, setHasCoverNote] = useState(false);

  const [blnDisableForward, setBlnDisableForward] = useState(false);
  const [notingData, setNotingData] = useState([]);
  const [send, setSend] = useState(false);

  const [pdfViewerButtons, setPdfViewerButtons] = useState([
    {
      btnName: "A",
      btnId: 0,
      backgroundColor: "grey",
      fileurl: "",
    },
    {
      btnName: "B",
      btnId: 1,
      backgroundColor: "grey",
      fileurl: "",
    },
    {
      btnName: "C",
      btnId: 2,
      backgroundColor: "grey",
      fileurl: "",
    },
    {
      btnName: "D",
      btnId: 3,
      backgroundColor: "grey",
      fileurl: "",
    },
    {
      btnName: "E",
      btnId: 4,
      backgroundColor: "grey",
      fileurl: "",
    },
  ]);

  const loadSplitViewData = () => {
    Cookies.set("HrmRole", null);
    setLoading(true);
    const inboxId = sessionStorage.getItem("InboxID");
    const InboxID = inboxId !== undefined ? inboxId : InboxIdFromHrmSection;
    props.loadInboxDataSplitView(inboxId, username).then((resp) => {
      if (resp.Data.partCaseId) {
        setPartCaseId(resp.Data.partCaseId);
        sessionStorage.setItem("partcaseID", resp.Data.partCaseId);
        let formData = new FormData();
        formData.append("id", resp.Data.partCaseId);
        props.loadPartCaseData(formData).then((resp) => {
          if (resp != undefined) {
            setHrmRole(resp.data.hrmRole);
            setHasCoverNote(resp.data.hasCoverNote);
            let enclouserTmpArr = [];
            if (!coverLetter) {
              resp.data.enclosureList.map((item) => {
                item.coverLetter === true && setCoverLetter(true);
              });
            }
            for (let x = 0; x < resp.data.enclosureList.length; x++) {
              if (resp.data.enclosureList[x].coverLetter === true) {
                enclouserTmpArr.unshift({
                  ...resp.data.enclosureList[x],
                });
              } else {
                enclouserTmpArr.push({
                  ...resp.data.enclosureList[x],
                });
              }
            }
            let notngTmpArr = [];
            for (let x = 0; x < resp.data.notingList.length; x++) {
              notngTmpArr.push({ ...resp.data.notingList[x], serialNo: x });
            }
            setNotingData(notngTmpArr);
            setEnclosureData(enclouserTmpArr);

            setRowID(resp.data.id);
            setPrevFlagNumberNF(notngTmpArr[0].flagNumber);
            setSfdtData(notngTmpArr[0].fileUrl);
            setPrevNFUrl(notngTmpArr[0].fileUrl);
            setNotingURL(notngTmpArr[0].fileUrl);
            setFileName(notngTmpArr[0].fileName);
            setNOF(JSON.stringify(notngTmpArr[0]));
            setBlnHideSyncfusion(notngTmpArr[0].signed);
            setBlnVisible(true);
            setLoading(false);
            setBlnDisableForward(!resp.data.enableAddNoting);
            loadEnclouserTags();
          }
        });
      }
    });
  };

  const loadEnclouserTags = () => {
    const dept = sessionStorage.getItem("department");
    const PartCaseID = sessionStorage.getItem("partcaseID");
    props.fetchSplitViewTags(PartCaseID, dept).then((resp) => {
      if (resp) {
        if (resp.Data != null && resp.Data != [] && resp.Data != "") {
          setPdfViewerButtons(resp.Data);
        }
      }
    });
  };

  useEffect(() => {
    loadSplitViewData();
    // loadEnclouserTags()
  }, []);

  useEffect(() => {
    let temArr = [];
    enclosureData.length !== 0 &&
      enclosureData.map((item, i) => {
        temArr.push({ ...item, serialNo: i });
      });

    setEnclosureArr(temArr);
    if (temArr.length !== 0) {
      setURL(temArr[0].fileUrl);
      setNOF1(JSON.stringify(temArr[0]));
      setEnclosureURL(temArr[0].fileUrl);
      setFlagNumber(temArr[0].flagNumber);
      setPrevFlagNumberEnclouser(temArr[0].flagNumber);
      setPrevEnclouser(temArr[0].fileUrl);
    }
  }, [enclosureData]);

  useEffect(() => {
    if (enclosurePdfLoads === true && URL !== undefined) {
      let data = { extension, url: URL };
      console.log(data);
      dispatch(setPassData(data));
    }
  }, [enclosurePdfLoads, URL]);

  const callMessageOut = (message) => {
    // dispatch(setSnackbar(true, "error", message));
    if (this.id === undefined) {
      return dispatch(setSnackbar(true, "error", message));
    }
  };

  const handleChange = (event) => {
    // setNOF1("");
    setNOF(JSON.stringify(event.target.value));
    const data = JSON.parse(event.target.value);
    let url = data.fileUrl;
    const flagNumber = data.flagNumber;
    const hideViewer = data.signed;
    setBlnHideSyncfusion(hideViewer);
    setFlag("Noting");
    setFlagNumber(flagNumber);
    setSfdtData(url);
    setNotingURL(url);
    setPrevNFUrl(url);
    setPrevFlagNumberNF(flagNumber);
  };

  const handleChange1 = (event) => {
    setNOF1(event.target.value);
    const data = JSON.parse(event.target.value);
    console.log(data);
    const url = data.fileUrl;
    const flagNumber = data.flagNumber;
    setFileChange(true);
    setURL(url);
    setFlag("Enclouser");
    setSfdtData(url);
    setPrevEnclouser(url);
    setFlagNumber(flagNumber);
    setPrevFlagNumberEnclouser(flagNumber);
    let arr = data.fileName.split(".");
    arr.length !== 1 ? setExtension(arr[arr.length - 1]) : setExtension("docx");
  };

  const handleChangePreviousEnclosure = () => {
    let data = JSON.parse(NOF1);
    if (data.serialNo === 0) {
      let newData = enclosureArr[enclosureArr.length - 1];
      setNOF1(JSON.stringify(newData));
      const url = newData.fileUrl;
      const flagNumber = newData.flagNumber;
      setFileChange(true);
      setURL(url);
      setFlag("Enclouser");
      setSfdtData(url);
      setPrevEnclouser(url);
      setFlagNumber(flagNumber);
      setPrevFlagNumberEnclouser(flagNumber);
    } else {
      let newData = enclosureArr[data.serialNo - 1];
      setNOF1(JSON.stringify(newData));
      const url = newData.fileUrl;
      const flagNumber = newData.flagNumber;
      setFileChange(true);
      setURL(url);
      setFlag("Enclouser");
      setSfdtData(url);
      setPrevEnclouser(url);
      setFlagNumber(flagNumber);
      setPrevFlagNumberEnclouser(flagNumber);
    }
  };

  const handleChangeNextEnclosure = () => {
    let data = JSON.parse(NOF1);
    if (data.serialNo + 1 === enclosureArr.length) {
      let newData = enclosureArr[0];
      setNOF1(JSON.stringify(newData));
      const url = newData.fileUrl;
      const flagNumber = newData.flagNumber;
      setFileChange(true);
      setURL(url);
      setFlag("Enclouser");
      setSfdtData(url);
      setPrevEnclouser(url);
      setFlagNumber(flagNumber);
      setPrevFlagNumberEnclouser(flagNumber);
    } else {
      let newData = enclosureArr[data.serialNo + 1];
      console.log(newData);
      setNOF1(JSON.stringify(newData));
      const url = newData.fileUrl;
      const flagNumber = newData.flagNumber;
      setFileChange(true);
      setURL(url);
      setFlag("Enclouser");
      setSfdtData(url);
      setPrevEnclouser(url);
      setFlagNumber(flagNumber);
      setPrevFlagNumberEnclouser(flagNumber);
    }
  };

  const handleRedirectToHrm = (row) => {
    Cookies.set("hasCoverNote", hasCoverNote);
    props.savePartCaseTag(partCaseId, pdfViewerButtons).then((resp) => {
      if (resp) {
        Cookies.set("HrmRole", hrmRole);
        props.setInboxDatas(row);
        // history.push({
        //   pathname: "/eoffice/hrmSection/file",
        //   state: { FileID, inboxId, hasCoverNote },
        // });
        setSend(true)
      }
    });
  };

  const pdfCustomButton = (e) => {
    let elementName = e.target.parentElement.getAttribute("buttonName");
    let fileurl = e.target.parentElement.getAttribute("fileurl");
    const tempColour = ["orange", "green", "purple", "blue", "mediumvioletred"];

    let data = enclosureData.find((item) => item.fileUrl === fileurl);
    let strData = JSON.stringify(data);

    var urlExist = true;
    var resUrl = "";
    for (let x = 0; x < pdfViewerButtons.length; x++) {
      if (pdfViewerButtons[x].fileurl === URL) {
        urlExist = false;
      }
      if (fileurl) {
        resUrl = fileurl;
      }
    }
    if (resUrl) {
      // dispatch(setPassData(resUrl));
      setNOF1(strData);
    } else {
      let updatedElement = pdfViewerButtons.map((item) =>
        item.btnId == elementName && fileChange && urlExist
          ? {
              ...item,
              backgroundColor: tempColour[item.btnId],
              fileurl: URL,
            }
          : item
      );
      setFileChange(false);
      setPdfViewerButtons(updatedElement);
    }
  };

  const handleSignedCompleted = (val) => {
    setpdfWidth(6);
    setOpen(false);
  };

  const handleReturnedURL = (url) => {
    setBlnHideSyncfusion(true);
    setNotingURL(url);
    loadSplitViewData();
  };

  const handleAddPartCaseNoting = () => {
    const groupName = sessionStorage.getItem("department");
    props.createPartCaseNotingFile(partCaseId, groupName).then((resp) => {
      loadSplitViewData();
    });
  };

  const handleDocumentRollback = () => {
    rowID &&
      props.rollbackSplitViewDocument(rowID, flagNumber).then((resp) => {
        try {
          console.log(resp);
          setSfdtData(resp.url);
          setBlnDisableForward();
          setBlnHideSyncfusion(false);
          setNotingURL(resp.url);
        } catch (error) {
          callMessageOut(error.message);
        }
      });
  };

  const handleDocumentRollbackEnclosure = () => {
    rowID &&
      props
        .rollbackSplitViewEnclosureDocument(partCaseId, flagNumber)
        .then((resp) => {
          try {
            console.log(resp);
            setTimeout(() => {
              dispatch(setPassData(resp.url));
            }, 1000);
          } catch (error) {
            callMessageOut(error.message);
          }
        });
  };

  const handleCoverLetter = () => {
    const groupName = sessionStorage.getItem("role");
    props.createCoverLetter(partCaseId, groupName).then((resp) => {
      loadSplitViewData();
    });
  };

  return (
    <div
      className="m-sm-30"
      style={{ marginRight: "10px", overflowY: "hidden" }}
    >
      <div>
        <Tooltip title={t("send")}>
          <Fab
            variant="contained"
            color="secondary"
            className={`${classes.sign_btn}`}
            onClick={handleRedirectToHrm}
          >
            <SendIcon style={{ fontSize: "1rem" }} />
          </Fab>
        </Tooltip>

        <Tooltip title={t("back")} aria-label="BACK">
          <Fab
            variant="contained"
            className={classes.back_btn}
            color="primary"
            onClick={() => history.push({ pathname: "/eoffice/inbox/file" })}
          >
            <ArrowBackIcon style={{ fontSize: "1rem" }} />
          </Fab>
        </Tooltip>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <Breadcrumb
              routeSegments={[
                { name: t("inbox"), path: "/eoffice/inbox/file" },
                { name: t("file"), path: "/costa/splitView/file" },
              ]}
              otherData={[
                { key: "Subject", value: title },
                { key: "Ref no", value: referenceNumber },
                { key: "Priority", value: priority },
              ]}
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={6}>
          {blnVisible ? (
            <FormControl
              variant="outlined"
              size="small"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {t("note_on_file")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={NOF}
                onChange={handleChange}
                label="NoteOnFile"
              >
                {notingData.map((item, index) => (
                  <MenuItem key={index} value={JSON.stringify(item)}>
                    {item.fileName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
          <Tooltip title={t("sign")} aria-label="Sign">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                setFlagNumber(prevFlagNumberNF);
                setSfdtData(prevNFUrl);
                setFlag("Noting");
                setOpen(true);
              }}
            >
              <CreateIcon style={{ fontSize: "1rem" }} />
            </Button>
          </Tooltip>
          <Tooltip title={t("add_noting")} aria-label="Add Noting">
            <Button
              // style={{ marginBottom: "15px" }}
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={blnDisableForward}
              onClick={handleAddPartCaseNoting}
            >
              <NoteAddIcon style={{ fontSize: "1rem" }} />
            </Button>
          </Tooltip>
          <Button
            // style={{ marginBottom: "15px" }}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleDocumentRollback}
          >
            <RestorePageIcon style={{ fontSize: "1rem" }} />
          </Button>
        </Grid>

        <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
          <TextField
            select
            label={t("enclosure")}
            value={NOF1}
            size="small"
            fullWidth
            onChange={handleChange1}
            variant="outlined"
            className={classes.formControl}
          >
            {enclosureArr.map((item, index) => (
              <MenuItem key={index} value={JSON.stringify(item)}>
                {item.fileName}
              </MenuItem>
            ))}
          </TextField>
          <Tooltip title={t("sign")} aria-label="Sign">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                setFlagNumber(prevFlagNumberEnclouser);
                setSfdtData(prevEnclouser);
                setFlag("Enclouser");
                setOpen(true);
              }}
            >
              <CreateIcon style={{ fontSize: "1rem" }} />
            </Button>
          </Tooltip>
          <Tooltip
            title={t("Add Cover Letter to Forward PA to Next Level")}
            aria-label="Cover Letter"
          >
            <Button
              // style={{ marginBottom: "15px" }}
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={coverLetter ? blnDisableForward : ""}
              onClick={handleCoverLetter}
            >
              <AddIcon style={{ fontSize: "1rem" }} />
            </Button>
          </Tooltip>
          <div className={classes.uploadButton}>
            <FileUploader loadSplitViewData={loadSplitViewData} />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleDocumentRollbackEnclosure}
          >
            <RestorePageIcon style={{ fontSize: "1rem" }} />
          </Button>
          <Tooltip title={t("Previous Enclosure")} aria-label="Add Noting">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleChangePreviousEnclosure}
            >
              <SkipPreviousIcon style={{ fontSize: "1rem" }} />
            </Button>
          </Tooltip>
          <Tooltip title={t("Next Enclosure")} aria-label="Add Noting">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleChangeNextEnclosure}
            >
              <SkipNextIcon style={{ fontSize: "1rem" }} />
            </Button>
          </Tooltip>
        </Grid>
        <Grid container spacing={2}>
          {!blnHideSyncfusion ? (
            <Grid item xs={6}>
              {blnVisible ? (
                <div className="customDiv">
                  <HeadersAndFootersView
                    fileId={rowID}
                    fileUrl1={sfdtData}
                    blnIsPartCase={true}
                    enclosureData={enclosureData}
                    style={{ border: "1px solid #b6b6b6" }}
                  />
                </div>
              ) : (
                loading && <Loading />
              )}
            </Grid>
          ) : (
            <Grid item xs={6} style={{ flexWrap: "nowrap" }}>
              <div style={{ border: "1px solid #b6b6b6" }}>
                <SplitViewPdfViewer
                  fileUrl={pdfLoads ? notingURL : ""}
                  pdfLoads={(val) => {
                    setpdfLoads(val);
                  }}
                />
              </div>
            </Grid>
          )}

          <Grid item xs={6}>
            <Grid container style={{ flexWrap: "nowrap" }}>
              <Grid item style={{ width: "95%", border: "1px solid #b6b6b6" }}>
                <PdfViewer
                  personalID={rowID}
                  flag={"SPLIT"}
                  flagNumber={prevFlagNumberEnclouser}
                  fileUrl={""}
                  pdfLoads={(val) => {
                    setEnclosurePdfLoads(val);
                  }}
                />
                {/* <PdfViewer personalID={""} fileUrl={""} /> */}
              </Grid>

              <Grid>
                <div className="split-custom-btn-wrapper">
                  {pdfViewerButtons.map((item) => {
                    return (
                      <Button
                        key={item.btnId}
                        size={"small"}
                        fileurl={item.fileurl}
                        buttonname={item.btnId}
                        style={{ backgroundColor: item.backgroundColor }}
                        onClick={(e) => pdfCustomButton(e)}
                        className="split-btn-custom"
                        variant="contained"
                        color="primary"
                        href="#contained-buttons"
                      >
                        {item.btnName}
                      </Button>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          onClose={() => setOpen(false)}
        >
          {t("remark_&_sign")}
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            color="primary"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <InputForm
            flag={flag}
            callBackURL={handleReturnedURL}
            isSignedCompleted={handleSignedCompleted}
            fileId={rowID}
            SignURL={sfdtData}
            flagNum={flagNumber}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={send}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <Paper>
          <DialogTitle
            id="draggable-dialog-title"
            style={{ padding: "0px 24px !important", cursor: "move" }}
          >
            {t("send_to")}

            <IconButton
              aria-label="close"
              onClick={() => setSend(false)}
              color="primary"
              style={{ float: "right" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers pt={0}>
            {/* <SendFileForm
              fileId={rowID}
              handleCloseEvent={(e) => {
                setOpen(false);
                setOpenQuickSign(false);
              }}
              setSend={setSend}
            /> */}
            <HrmDialog
              handleClose={() => setSend(false)}
              pfileName={referenceNumber}
            />
          </DialogContent>
        </Paper>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  props: state.props,
  inboxer: state.inboxer,
  theme: state.theme,
});
export default connect(mapStateToProps, {
  setInboxDatas,
  loadInboxDataSplitView,
  loadPartCaseData,
  getPANotingData,
  getPAEnclosureData,
  savePartCaseTag,
  fetchSplitViewTags,
  createPartCaseNotingFile,
  rollbackSplitViewDocument,
  rollbackSplitViewEnclosureDocument,
  createCoverLetter,
})(SplitView);
