// import { render } from 'react-dom';
// import './index.css';
// import * as React from 'react';
// import { SampleBase } from './sample-base';

// import { DocumentEditorContainerComponent, Toolbar, Print } from '@syncfusion/ej2-react-documenteditor';
// import { TitleBar } from './title-bar';
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import { saveDocument } from "../../../camunda_redux/redux/action";
// import { setSnackbar } from "../../../camunda_redux/redux/ducks/snackbar";
// import { Loading } from '../../Personnel/therme-source/material-ui/loading'
// import { withTranslation } from 'react-i18next';
// import {
//     testURL
// } from "../../../camunda_redux/redux/action";

// DocumentEditorContainerComponent.Inject(Toolbar, Print);
// // tslint:disable:max-line-length

// class HeadersAndFootersView extends SampleBase {

//     constructor(props) {
//         super(...arguments);
//         this.state = {
//             newToolBar: [],
//             documenteditor: null,
//             blnOpenQuickSin: false,
//             hostUrl: '',
//             willAutoSave: true,
//             editorLoading: true,
//             // contentChanged : false
//         };
//         this.contentChanged = false
//     }
//     timeout = 0;

//     onLoadDefault = async () => {
//         let response = await fetch(this.props.fileUrl1);
//         let data = response.blob();

//         let file = new File([data], "test.docx");
//         this.loadFile(file);

//         // this.props.testURL(this.props.fileUrl1).then((response) => {
//         //     debugger
//         //     let data = response.blob();

//         //     let file = new File([data], "test.docx");
//         //     this.loadFile(file);
//         // })

//         let saveButton = {
//             prefixIcon: "e-save-icon",
//             tooltipText: "Save",
//             text: "Save",
//             id: "save",
//             type: "Button",

//         };
//         let sendButton = {
//             prefixIcon: "e-send-icon",
//             tooltipText: "Send",
//             text: "Send",
//             id: "send",
//             type: "Button",

//         };
//         let downloadButton = {
//             prefixIcon: "e-download-icon",
//             tooltipText: "Download",
//             text: "Download",
//             id: "download",
//             type: "Button",

//         };
//         let printButton = {
//             prefixIcon: "e-print-icon",
//             tooltipText: "Print",
//             text: "Print",
//             id: "print",
//             type: "Button",

//         };

//         this.props.blnShowQuickSign ?
//             this.setState({ newToolBar: [saveButton, 'Open', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Comments', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'Separator', 'Find', 'Separator', 'LocalClipboard', 'RestrictEditing', printButton] })
//             : this.setState({ newToolBar: [saveButton, 'Open', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Comments', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'Separator', 'Find', 'Separator', 'LocalClipboard', 'RestrictEditing', printButton] })

//     };
//     loadFile(file) {
//         let ajax = new XMLHttpRequest();
//         ajax.open('POST', process.env.REACT_APP_SYNCFUSION_URL, true);
//         ajax.onreadystatechange = () => {
//             if (ajax.readyState === 4) {
//                 if (ajax.status === 200 || ajax.status === 304) {
//                     this.container.documentEditor.open(ajax.responseText);
//                     this.save(this.props, false)
//                     this.setState({ editorLoading: false })
//                 }
//             }
//         };
//         let formData = new FormData();
//         formData.append('files', file);
//         ajax.send(formData);
//         this.setState({ editorLoading: false })
//     }

//     rendereComplete() {
//         let data = sessionStorage.getItem("username");
//         this.container.serviceUrl = process.env.REACT_APP_SYNCFUSION_SERVICE_URL;
//         this.container.documentEditor.pageOutline = '#E0E0E0';
//         this.container.documentEditor.acceptTab = true;
//         this.container.documentEditor.resize();
//         this.container.documentEditor.currentUser = data;
//         this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container, true);
//         this.onLoadDefault();
//         // if(this.state.willAutoSave){
//         // this.timeout = setInterval(() => {
//         if (this.contentChanged) {
//             //You can save the document as below
//             this.container.documentEditor.saveAsBlob("Docx").then(blob => {
//                 let exportedDocument = blob;
//                 var file = new File([blob], "SampleFile.docx");
//                 let formData = new FormData();
//                 formData.append('file', file);
//                 var reader = new FileReader();
//                 reader.onload = function () {
//                 };
//                 reader.readAsText(blob);
//                 const { fileUrl1, fileId, isAnnexure } = this.props;
//                 this.props.saveDocument(fileId, formData, this.role, this.username, this.props.blnIsPartCase, fileUrl1, isAnnexure).then(resp => {
//                     // console.log(resp);
//                     clearInterval(this.timeout)
//                 });
//             });
//             this.contentChanged = false;
//         }
//         // }, 20000);
//         //}
//         this.container.contentChange = () => {
//             //this.setState({contentChange:true})
//             this.contentChanged = true
//         };

//     }
//     update(value) {
//         // console.log(value);
//     }

//     send(props) {
//         const { sendToogle } = props;
//         sendToogle(true);
//     }
//     role = sessionStorage.getItem("role");
//     username = sessionStorage.getItem("username")

//     save(props, showSnackbar) {
//         this.container.documentEditor.saveAsBlob("Docx").then(blob => {
//             var file = new File([blob], "SampleFile.docx");
//             let formData = new FormData();
//             formData.append('file', file);
//             formData.append('isPartCase', props.blnIsPartCase)
//             var reader = new FileReader();
//             reader.onload = function () {
//                 // console.log(reader.result);
//             };
//             reader.readAsText(blob);
//             const { fileUrl1, fileId, isAnnexure } = this.props;
//             console.log("username : ", this.username)
//             this.props.saveDocument(fileId, formData, this.role, this.username, props.blnIsPartCase, fileUrl1, isAnnexure).then(resp => {
//                 showSnackbar && this.props.setSnackbar(
//                     true,
//                     "success",
//                     this.props.t("Document_saved_successfully!")
//                 );
//             });
//         });
//     };

//     print = value => {
//         this.titleBar.onPrint();
//     };

//     async createFile() {
//         const { fileUrl1 } = this.props;
//         let response = await fetch(fileUrl1)

//         let data = await response.blob();
//         let file = new File([data], "test.docx");
//         console.log(file[0]);
//         this.loadFile(file[0]);
//     };

//     //   componentWillUnmount() {
//     //      this.save(this.props);
//     //   }
//     componentWillUnmount() {
//         this.container.destroy()
//     }

//     render() {
//         const { editorLoading } = this.state
//         return (<div className='control-pane'>
//             <div className='control-section'>

//                 <div id="documenteditor_container_body">
//                     {editorLoading && <Loading />}
//                     <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }} height='100%'
//                         enableToolbar={true}
//                         showPropertiesPane={false}
//                         // enableEditorHistory={true}
//                         // enableAllModules={true}
//                         toolbarItems={this.state.newToolBar}
//                         toolbarClick={(args) => {
//                             switch (args.item.id) {
//                                 case 'save':
//                                     this.save(this.props, true);
//                                     break;
//                                 case 'send':
//                                     this.send(this.props);
//                                     break;
//                                 case 'print':
//                                     this.print;
//                                     break;
//                                 // case 'quickSign':
//                                 //     this.openQuickSignDiv(this.props);
//                                 //     break;
//                             }
//                         }} />

//                 </div>
//             </div>
//             <script>{window.onbeforeunload = function () {
//                 return 'Want to save your changes?';
//             }}
//             </script>

//         </div>
//         );
//     }
// }
// const mapStateToProps = state => ({
//     props: state.props,
//     saveDocument: PropTypes.func.isRequired,
//     theme: state.theme,
// });
// export default
//     connect(
//         mapStateToProps,
//         { saveDocument, setSnackbar, testURL }
//     )(withTranslation()(HeadersAndFootersView));

// import { render } from "react-dom";
// import "./index.css";
// import * as React from "react";
// import { SampleBase } from "./sample-base";

// import {
//   DocumentEditorContainerComponent,
//   Toolbar,
//   Print,
// } from "@syncfusion/ej2-react-documenteditor";
// import { TitleBar } from "./title-bar";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import { saveDocument } from "../../../camunda_redux/redux/action";
// import { setSnackbar } from "../../../camunda_redux/redux/ducks/snackbar";
// import { Loading } from "../../Personnel/therme-source/material-ui/loading";
// import { withTranslation } from "react-i18next";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Typography,
//   Button,
// } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";
// import { Autocomplete } from "@material-ui/lab";
// import DoneIcon from "@material-ui/icons/Done";

// DocumentEditorContainerComponent.Inject(Toolbar, Print);
// // tslint:disable:max-line-length

// class HeadersAndFootersView extends SampleBase {
//   constructor(props) {
//     super(...arguments);
//     this.requestNavigate = (args) => {
//       if (args.linkType !== 'Bookmark') {
//         let link = args.navigationLink;
//         console.log(link)
//         if (args.localReference.length > 0) {
//             link += '#' + args.localReference;
//         }
//         //Navigate to the specified URL.
//         window.open(link);
//         args.isHandled = true;
//     }
//     };
//     this.state = {
//       newToolBar: [],
//       documenteditor: null,
//       blnOpenQuickSin: false,
//       hostUrl: "",
//       willAutoSave: true,
//       editorLoading: true,
//       // contentChanged : false
//       textToDisplay: "",
//       link: {},
//     };
//     this.contentChanged = false;
//   }
//   timeout = 0;

//   onLoadDefault = async () => {
//     console.log(this.props.fileUrl1);
//     let response = await fetch(this.props.fileUrl1);
//     let data = await response.blob();

//     let file = new File([data], "test.docx");
//     this.loadFile(file);

//     let saveButton = {
//       prefixIcon: "e-save-icon",
//       tooltipText: "Save",
//       text: "Save",
//       id: "save",
//       type: "Button",
//     };
//     let sendButton = {
//       prefixIcon: "e-send-icon",
//       tooltipText: "Send",
//       text: "Send",
//       id: "send",
//       type: "Button",
//     };
//     let downloadButton = {
//       prefixIcon: "e-download-icon",
//       tooltipText: "Download",
//       text: "Download",
//       id: "download",
//       type: "Button",
//     };
//     let printButton = {
//       prefixIcon: "e-print-icon",
//       tooltipText: "Print",
//       text: "Print",
//       id: "print",
//       type: "Button",
//     };

//     let linkButton = {
//       prefixIcon: "e-de-ctnr-lock",
//       tooltipText: "Link",
//       text: "Link",
//       id: "link",
//       // type: "Button",
//     };

//     this.props.blnShowQuickSign
//       ? this.setState({
//           newToolBar: [
//             saveButton,
//             "Open",
//             "Undo",
//             "Redo",
//             "Separator",
//             "Image",
//             "Table",
//             // "Hyperlink",
//             linkButton,
//             "Comments",
//             "TableOfContents",
//             "Separator",
//             "Header",
//             "Footer",
//             "PageSetup",
//             "PageNumber",
//             "Break",
//             "Separator",
//             "Find",
//             "Separator",
//             "LocalClipboard",
//             "RestrictEditing",
//             printButton,
//           ],
//         })
//       : this.setState({
//           newToolBar: [
//             saveButton,
//             "Open",
//             "Undo",
//             "Redo",
//             "Separator",
//             "Image",
//             "Table",
//             // "Hyperlink",
//             linkButton,
//             "Comments",
//             "TableOfContents",
//             "Separator",
//             "Header",
//             "Footer",
//             "PageSetup",
//             "PageNumber",
//             "Break",
//             "Separator",
//             "Find",
//             "Separator",
//             "LocalClipboard",
//             "RestrictEditing",
//             printButton,
//           ],
//         });
//   };

//   //   componentWillReceiveProps = () => {
//   //     this.onLoadDefault(this.props.fileUrl1);
//   //   };

//   // componentWillMount = ()=>{
//   //     this.onLoadDefault(this.props.fileUrl1)
//   // }

//   // componentDidUpdate = () => {
//   //     this.onLoadDefault(this.props.fileUrl1)
//   // }

//   // componentWillUnmount = () => {
//   //     this.onLoadDefault(this.props.fileUrl1)
//   // }

//   loadFile(file) {
//     let ajax = new XMLHttpRequest();
//     ajax.open("POST", process.env.REACT_APP_SYNCFUSION_URL, true);
//     ajax.onreadystatechange = () => {
//       if (ajax.readyState === 4) {
//         if (ajax.status === 200 || ajax.status === 304) {
//           this.container.documentEditor.open(ajax.responseText);
//           this.save(this.props, false);
//           this.setState({ editorLoading: false });
//         }
//       }
//     };
//     let formData = new FormData();
//     formData.append("files", file);
//     ajax.send(formData);
//     this.setState({ editorLoading: false });
//   }

//   rendereComplete() {
//     let data = sessionStorage.getItem("username");
//     this.container.serviceUrl = process.env.REACT_APP_SYNCFUSION_SERVICE_URL;
//     this.container.documentEditor.pageOutline = "#E0E0E0";
//     this.container.documentEditor.acceptTab = true;
//     this.container.documentEditor.resize();
//     this.container.documentEditor.currentUser = data;
//     this.titleBar = new TitleBar(
//       document.getElementById("documenteditor_titlebar"),
//       container,
//       true
//     );
//     this.onLoadDefault();
//     // if(this.state.willAutoSave){
//     // this.timeout = setInterval(() => {
//     if (this.contentChanged) {
//       //You can save the document as below
//       this.container.documentEditor.saveAsBlob("Docx").then((blob) => {
//         let exportedDocument = blob;
//         var file = new File([blob], "SampleFile.docx");
//         let formData = new FormData();
//         formData.append("file", file);
//         var reader = new FileReader();
//         reader.onload = function () {};
//         reader.readAsText(blob);
//         const { fileUrl1, fileId, isAnnexure } = this.props;
//         this.props
//           .saveDocument(
//             fileId,
//             formData,
//             this.role,
//             this.username,
//             this.props.blnIsPartCase,
//             fileUrl1,
//             isAnnexure
//           )
//           .then((resp) => {
//             clearInterval(this.timeout);
//           });
//       });
//       this.contentChanged = false;
//     }
//     // }, 20000);
//     //}
//     this.container.contentChange = () => {
//       //this.setState({contentChange:true})
//       this.contentChanged = true;
//     };
//   }
//   update(value) {
//     // console.log(value);
//   }

//   send(props) {
//     const { sendToogle } = props;
//     sendToogle(true);
//   }
//   role = sessionStorage.getItem("role");
//   username = sessionStorage.getItem("username");

//   save(props, showSnackbar) {
//     this.container.documentEditor.saveAsBlob("Docx").then((blob) => {
//       var file = new File([blob], "SampleFile.docx");
//       let formData = new FormData();
//       formData.append("file", file);
//       formData.append("isPartCase", props.blnIsPartCase);
//       var reader = new FileReader();
//       reader.onload = function () {
//         // console.log(reader.result);
//       };
//       reader.readAsText(blob);
//       const { fileUrl1, fileId, isAnnexure } = this.props;
//       console.log("username : ", this.username);
//       this.props
//         .saveDocument(
//           fileId,
//           formData,
//           this.role,
//           this.username,
//           props.blnIsPartCase,
//           fileUrl1,
//           isAnnexure
//         )
//         .then((resp) => {
//           showSnackbar &&
//             this.props.setSnackbar(
//               true,
//               "success",
//               this.props.t("Document_saved_successfully!")
//             );
//         });
//     });
//   }

//   print = (value) => {
//     this.titleBar.onPrint();
//   };

//   link = (props) => {
//     this.setState({ blnOpenQuickSin: true });
//   };

//   handleAddLink = () => {
//     this.container.documentEditor.editor.insertHyperlink(
//       this.state.link.fileUrl,
//       this.state.textToDisplay
//     );
//     this.setState({ link: {}, textToDisplay: "", blnOpenQuickSin: false });
//   };

//   async createFile() {
//     const { fileUrl1 } = this.props;
//     console.log(fileUrl1);
//     let response = await fetch(fileUrl1);

//     let data = await response.blob();
//     let file = new File([data], "test.docx");
//     console.log(file[0]);
//     this.loadFile(file[0]);
//   }

//   //   componentWillUnmount() {
//   //      this.save(this.props);
//   //   }
//   componentWillUnmount() {
//     this.container.destroy();
//   }

//   render() {
//     const { editorLoading, blnOpenQuickSin, link, textToDisplay } = this.state;
//     const { enclosureData } = this.props;

//     console.log(enclosureData)

//     return (
//       <div key={this.props.fileUrl1} >
//         {enclosureData && (
//         <Dialog
//           open={blnOpenQuickSin}
//           onClose={() => this.setState({ blnOpenQuickSin: false })}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           //   maxWidth="md"
//           //   fullWidth
//         >
//           <div style={{ width: "300px" }}>
//             <DialogTitle
//             // style={{
//             //   display: "flex",
//             //   justifyContent: "space-between",
//             //   alignItems: "center",
//             // }}
//             >
//               <Typography>Insert Hyperlink</Typography>
//               <IconButton
//                 onClick={() => this.setState({ blnOpenQuickSin: false })}
//                 style={{ position: "absolute", right: "1rem", top: ".2rem" }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Text to display"
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 value={textToDisplay}
//                 onChange={(e) =>
//                   this.setState({ textToDisplay: e.target.value })
//                 }
//               />
//               <Autocomplete
//                 size="small"
//                 options={enclosureData.map((option) => option)}
//                 getOptionLabel={(option) => option.fileName}
//                 value={link}
//                 onChange={(_, value) => this.setState({ link: value })}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     variant="outlined"
//                     label="Address"
//                     margin="normal"
//                   />
//                 )}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 color="primary"
//                 variant="outlined"
//                 style={{ marginBottom: "1rem" }}
//                 endIcon={<DoneIcon />}
//                 onClick={this.handleAddLink}
//               >
//                 OK
//               </Button>
//               <Button
//                 color="primary"
//                 variant="outlined"
//                 style={{ marginRight: "1rem", marginBottom: "1rem" }}
//                 endIcon={<CloseIcon />}
//                 onClick={() => this.setState({ blnOpenQuickSin: false })}
//               >
//                 CANCEL
//               </Button>
//             </DialogActions>
//           </div>
//         </Dialog>
//         )}
//         <div className="control-pane">
//           <div className="control-section">
//             <div id="documenteditor_container_body">
//               {editorLoading && <Loading />}
//               <DocumentEditorContainerComponent
//                 id="container"
//                 ref={(scope) => {
//                   this.container = scope;
//                 }}
//                 style={{ display: "block" }}
//                 height="100%"
//                 enableToolbar={true}
//                 showPropertiesPane={false}
//                 requestNavigate={this.requestNavigate.bind(this)}
//                 // enableEditorHistory={true}
//                 // enableAllModules={true}
//                 toolbarItems={this.state.newToolBar}
//                 toolbarClick={(args) => {
//                   switch (args.item.id) {
//                     case "save":
//                       this.save(this.props, true);
//                       break;
//                     case "send":
//                       this.send(this.props);
//                       break;
//                     case "print":
//                       this.print;
//                       break;
//                     case "link":
//                       this.link(this.props);
//                       break;
//                     // case 'quickSign':
//                     //     this.openQuickSignDiv(this.props);
//                     //     break;
//                   }
//                 }}
//               />
//             </div>
//           </div>
//           <script>
//             {
//               (window.onbeforeunload = function () {
//                 return "Want to save your changes?";
//               })
//             }
//           </script>
//         </div>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   saveDocument: PropTypes.func.isRequired,
//   theme: state.theme,
// });
// export default connect(mapStateToProps, { saveDocument, setSnackbar })(
//   withTranslation()(HeadersAndFootersView)
// );

import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import { SampleBase } from "./sample-base";

import {
  DocumentEditorContainerComponent,
  Toolbar,
  Print,
} from "@syncfusion/ej2-react-documenteditor";
import { TitleBar } from "./title-bar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { saveDocument } from "../../../camunda_redux/redux/action";
import { setSnackbar } from "../../../camunda_redux/redux/ducks/snackbar";
import { Loading } from "../../Personnel/therme-source/material-ui/loading";
import { withTranslation } from "react-i18next";
import { URLHide } from "../../../camunda_redux/redux/action";

DocumentEditorContainerComponent.Inject(Toolbar, Print);
// tslint:disable:max-line-length

class HeadersAndFootersView extends SampleBase {
  constructor(props) {
    super(...arguments);
    this.state = {
      newToolBar: [],
      documenteditor: null,
      blnOpenQuickSin: false,
      hostUrl: "",
      willAutoSave: true,
      editorLoading: true,
      // contentChanged : false
    };
    this.contentChanged = false;
  }
  timeout = 0;

  onLoadDefault = async () => {
    // let response = await fetch(this.props.fileUrl1);
    // let data = await response.blob();

    // let file = new File([data], "test.docx");
    // this.loadFile(file);

    this.props.URLHide(this.props.fileUrl1).then(async (response) => {
      let data = await response.blob();

      let file = new File([data], "test.docx");
      this.loadFile(file);
    });

    let saveButton = {
      prefixIcon: "e-save-icon",
      tooltipText: "Save",
      text: "Save",
      id: "save",
      type: "Button",
    };
    let sendButton = {
      prefixIcon: "e-send-icon",
      tooltipText: "Send",
      text: "Send",
      id: "send",
      type: "Button",
    };
    let downloadButton = {
      prefixIcon: "e-download-icon",
      tooltipText: "Download",
      text: "Download",
      id: "download",
      type: "Button",
    };
    let printButton = {
      prefixIcon: "e-print-icon",
      tooltipText: "Print",
      text: "Print",
      id: "print",
      type: "Button",
    };

    this.props.blnShowQuickSign
      ? this.setState({
          newToolBar: [
            saveButton,
            "Open",
            "Undo",
            "Redo",
            "Separator",
            "Image",
            "Table",
            "Hyperlink",
            "Comments",
            "TableOfContents",
            "Separator",
            "Header",
            "Footer",
            "PageSetup",
            "PageNumber",
            "Break",
            "Separator",
            "Find",
            "Separator",
            "LocalClipboard",
            "RestrictEditing",
            printButton,
          ],
        })
      : this.setState({
          newToolBar: [
            saveButton,
            "Open",
            "Undo",
            "Redo",
            "Separator",
            "Image",
            "Table",
            "Hyperlink",
            "Comments",
            "TableOfContents",
            "Separator",
            "Header",
            "Footer",
            "PageSetup",
            "PageNumber",
            "Break",
            "Separator",
            "Find",
            "Separator",
            "LocalClipboard",
            "RestrictEditing",
            printButton,
          ],
        });
  };
  loadFile(file) {
    let ajax = new XMLHttpRequest();
    ajax.open("POST", process.env.REACT_APP_SYNCFUSION_URL, true);
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        if (ajax.status === 200 || ajax.status === 304) {
          this.container.documentEditor.open(ajax.responseText);
          this.save(this.props, false);
          this.setState({ editorLoading: false });
        }
      }
    };
    let formData = new FormData();
    formData.append("files", file);
    ajax.send(formData);
    this.setState({ editorLoading: false });
  }

  rendereComplete() {
    window.onbeforeunload = function () {
      return "Want to save your changes?";
    };
    let data = sessionStorage.getItem("username");
    this.container.serviceUrl = process.env.REACT_APP_SYNCFUSION_SERVICE_URL;
    this.container.documentEditor.pageOutline = "#E0E0E0";
    this.container.documentEditor.acceptTab = true;
    this.container.documentEditor.resize();
    this.container.documentEditor.currentUser = data;
    this.titleBar = new TitleBar(
      document.getElementById("documenteditor_titlebar"),
      container,
      true
    );
    this.onLoadDefault();
    // if(this.state.willAutoSave){
    // this.timeout = setInterval(() => {
    if (this.contentChanged) {
      //You can save the document as below
      this.container.documentEditor.saveAsBlob("Docx").then((blob) => {
        let exportedDocument = blob;
        var file = new File([blob], "SampleFile.docx");
        let formData = new FormData();
        formData.append("file", file);
        var reader = new FileReader();
        // reader.onload = function () {};
        reader.readAsText(blob);
        const { fileUrl1, fileId, isAnnexure } = this.props;
        this.props
          .saveDocument(
            fileId,
            formData,
            this.role,
            this.username,
            this.props.blnIsPartCase,
            fileUrl1,
            isAnnexure
          )
          .then((resp) => {
            // console.log(resp);
            clearInterval(this.timeout);
          });
      });
      this.contentChanged = false;
    }
    // }, 20000);
    //}
    this.container.contentChange = () => {
      //this.setState({contentChange:true})
      this.contentChanged = true;
    };
  }
  update(value) {
    // console.log(value);
  }

  send(props) {
    const { sendToogle } = props;
    sendToogle(true);
  }
  role = sessionStorage.getItem("role");
  username = sessionStorage.getItem("username");

  save(props, showSnackbar) {
    this.container.documentEditor.saveAsBlob("Docx").then((blob) => {
      var file = new File([blob], "SampleFile.docx");
      let formData = new FormData();
      formData.append("file", file);
      formData.append("isPartCase", props.blnIsPartCase);
      var reader = new FileReader();
      reader.onload = function () {
        // console.log(reader.result);
      };
      reader.readAsText(blob);
      const { fileUrl1, fileId, isAnnexure } = this.props;
      console.log("username : ", this.username);
      this.props
        .saveDocument(
          fileId,
          formData,
          this.role,
          this.username,
          props.blnIsPartCase,
          fileUrl1,
          isAnnexure
        )
        .then((resp) => {
          showSnackbar &&
            this.props.setSnackbar(
              true,
              "success",
              this.props.t("Document_saved_successfully!")
            );
        });
    });
  }

  print = (value) => {
    this.titleBar.onPrint();
  };

  async createFile() {
    const { fileUrl1 } = this.props;

    let response = await fetch(fileUrl1);

    let data = await response.blob();
    let file = new File([data], "test.docx");
    console.log(file[0]);
    this.loadFile(file[0]);
  }

  //   componentWillUnmount() {
  //      this.save(this.props);
  //   }
  componentWillUnmount() {
    this.container.destroy();
  }

  render() {
    const { editorLoading } = this.state;
    return (
      <div className="control-pane">
        <div className="control-section">
          <div id="documenteditor_container_body">
            {editorLoading && <Loading />}
            <DocumentEditorContainerComponent
              id="container"
              ref={(scope) => {
                this.container = scope;
              }}
              style={{ display: "block" }}
              height="100%"
              enableToolbar={true}
              showPropertiesPane={false}
              // enableEditorHistory={true}
              // enableAllModules={true}
              toolbarItems={this.state.newToolBar}
              toolbarClick={(args) => {
                switch (args.item.id) {
                  case "save":
                    this.save(this.props, true);
                    break;
                  case "send":
                    this.send(this.props);
                    break;
                  case "print":
                    this.print;
                    break;
                  // case 'quickSign':
                  //     this.openQuickSignDiv(this.props);
                  //     break;
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  props: state.props,
  saveDocument: PropTypes.func.isRequired,
  theme: state.theme,
});
export default connect(mapStateToProps, { saveDocument, setSnackbar, URLHide })(
  withTranslation()(HeadersAndFootersView)
);
