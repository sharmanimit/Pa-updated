// import React, { useState } from 'react';
// import SplitViewPdfViewer from '../../inbox/shared/pdfViewer/pdfViewer'
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// // import AppBar from '@material-ui/core/AppBar';
// // import Tabs from '@material-ui/core/Tabs';
// // import Tab from '@material-ui/core/Tab';
// // import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import CloseIcon from '@material-ui/icons/Close';
// import {
//   Paper, Typography, Dialog, Button, Slide, IconButton, AppBar
// } from "@material-ui/core";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { useTranslation } from "react-i18next";
// import AnnexureView from './AnnexureView'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
//   closeDialogBtn: {
//     position: 'fixed',
//     right: '0px',
//     zIndex: '11',
//   }
// }));

// // function TabPanel(props) {
// //   const { children, value, index, ...other } = props;

// //   return (
// //     <div
// //       role="tabpanel"
// //       hidden={value !== index}
// //       id={`simple-tabpanel-${index}`}
// //       aria-labelledby={`simple-tab-${index}`}
// //       {...other}
// //     >
// //       {value === index && (
// //         <Box p={3}>
// //           <Typography>{children}</Typography>
// //         </Box>
// //       )}
// //     </div>
// //   );
// // }

// // TabPanel.propTypes = {
// //   children: PropTypes.node,
// //   index: PropTypes.any.isRequired,
// //   value: PropTypes.any.isRequired,
// // };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const DashbordDialogComp = (props) => {
//   const { t } = useTranslation()
//   const classes = useStyles();
//   const [value, setValue] = useState(0);
//   const [tabIndex, setTabIndex] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div>

//       {/* <IconButton
//         edge="start"
//         color="inherit"
//         onClick={() => props.closeDialog()}
//         aria-label="close"
//         className={classes.closeDialogBtn}
//       >
//         <CloseIcon />
//       </IconButton>
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//           <Tab label="PA" {...a11yProps(0)} />
//           <Tab label="Annuxer" {...a11yProps(1)} />
//         </Tabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>
//         <div
//           style={{ border: "1px solid #b6b6b66b" }}
//           className={classes.pdfWrapper}
//         >
//           <SplitViewPdfViewer
//             fileUrl={props.pdfUrl}
//             pdfLoads={(val) => {
//               props.blnPdfLoads(val);
//             }}
//           />
//         </div>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel> */}

//       <Tabs forceRenderTabPanel selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
//         <TabList>
//           <Tab style={{ borderRadius: '5px 5px 0 0' }}>{t("personal_application").toUpperCase()}</Tab>
//           <Tab style={{ borderRadius: '5px 5px 0 0' }}>{t("annexure")}</Tab>
//           {/* <p className={classes.headerText}><b>Subject:&nbsp;</b>  {headerLable.subject} <b>&nbsp;| File No:&nbsp;</b>{headerLable.pfileName}</p> */}
//           <IconButton aria-label="close" onClick={() => props.closeDialog()} style={{ borderRadius: '40%', float: 'right', height: '35px', width: '35px', backgroundColor: 'rgb(81 115 184)', color: "#fff", borderWidth: '1px' }}>
//             <CloseIcon />
//           </IconButton>
//         </TabList>
//         <TabPanel>
//           <div
//             style={{ border: "1px solid #b6b6b66b" }}
//             className={classes.pdfWrapper}
//           >
//             <SplitViewPdfViewer
//               fileUrl={props.pdfUrl}
//               pdfLoads={(val) => {
//                 props.blnPdfLoads(val);
//               }}
//             />
//           </div>
//         </TabPanel>
//         <TabPanel>
//           {/* <>
//             {blnOpenQuickSign && <Tooltip title={t("send")}><Fab aria-label="close" color="secondary" className={`button-glow ${classes.sign_btn}`} onClick={e => setSend(true)}><SendIcon style={{ fontSize: "1rem" }} /></Fab></Tooltip>}
//             <Annexure fileId={rowID} sendToogle={e => { setTabIndex(3) }} showUploader={true} />
//           </> */}
//           <AnnexureView />
//         </TabPanel>
//       </Tabs>

//     </div>
//   )
// }

// export default DashbordDialogComp;

import React, { useState } from "react";
import SplitViewPdfViewer from "../../inbox/shared/pdfViewer/pdfViewer";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "react-i18next";
import Annexure from "./Annexure";
import PdfViewer from "../../../pdfViewer/pdfViewer";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  closeDialogBtn: {
    position: "fixed",
    right: "0px",
    zIndex: "11",
  },
}));

const DashbordDialogComp = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const { theme } = useSelector((state) => state);

  return (
    <div
      style={{ backgroundColor: theme ? "rgb(46 46 46)" : "rgb(241 241 241)" }}
    >
      <Tabs
        forceRenderTabPanel
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab style={{ borderRadius: "5px 5px 0 0" }}>
            {t("personal_application").toUpperCase()}
          </Tab>
          <Tab style={{ borderRadius: "5px 5px 0 0" }}>{t("annexure")}</Tab>
          <IconButton
            aria-label="close"
            onClick={() => props.closeDialog()}
            style={{
              borderRadius: "40%",
              float: "right",
              height: "35px",
              width: "35px",
              backgroundColor: "rgb(81 115 184)",
              color: "#fff",
              borderWidth: "1px",
            }}
          >
            <CloseIcon />
          </IconButton>
        </TabList>
        <TabPanel>
          <div
            style={{ border: "1px solid #b6b6b66b" }}
            className={classes.pdfWrapper}
          >
            <SplitViewPdfViewer
              fileUrl={props.pdfUrl}
              pdfLoads={(val) => {
                props.blnPdfLoads(val);
              }}
            />
            {/* <PdfViewer personalID={personalid} refreshView={refreshes} anottId={annotId} flag={"DASHBOARD"} pdfLoads={(val) => { this.setState({ pdfLoads: val }) }} /> */}
            {/* <PdfViewer flag={"DASHBOARD"} pdfLoads={(val) => {
              props.blnPdfLoads(val);
            }} /> */}
          </div>
        </TabPanel>
        <TabPanel>
          <Annexure
            showUploader={false}
            fileId={props.fileId}
            sampleData={props.sampleData}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DashbordDialogComp;
