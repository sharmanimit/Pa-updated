import React, { Component, useEffect, useState } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form } from "./form";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import { Button, Grid, Typography, makeStyles } from "@material-ui/core";
import PdfViewer from "../../../pdfViewer/pdfViewer";
import { connect, useDispatch } from "react-redux";
import { quickSign } from "../../../camunda_redux/redux/action";
import { setPassData } from "../../../camunda_redux/redux/ducks/passData";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Loading } from "../therme-source/material-ui/loading"
import { useTranslation } from "react-i18next";

const styles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
      .spacing.unit * 5}px`
  },
  container: {
    maxWidth: "200px"
  },
  signLoading: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000033',
    zIndex: '11'
  }
}));

const InputForm = (props) => {
  const { t } = useTranslation()
  const url = sessionStorage.getItem("FileURL");

  const [fileURL, setFileURL] = useState(url);
  const dispatch = useDispatch();
  const [quickSignLoading, setQuickSignLoading] = useState(false)
  const [blnDisable, setBlnDisable] = useState(false);
  const [pdfLoads, setPdfLoads] = useState(false)

  console.log(props.pfileName)

  const classNames = styles()

  const validationSchema = Yup.object({
    comments: Yup.string(t("enter_a_comment")),
    // .required(t("comment_is_required")),
    // tag: Yup.string("Enter a Tag")
    //   .required("Tag is required"),
    // signTitle: Yup.string("Enter a Title")
    //   .required("Title is required")
    pencilColorCode: Yup.string(t("select_a_pencil_color"))
      .required(t("color_is_required")),
    // username: Yup.string("Enter Username")
    //   .required("Username is required"),
    // dep_desc: Yup.string("Enter Department Description")
    //   .required("Department Description is required"),
    // color: Yup.string("Select a Color")
    //   .required("Color is required"),

  });

  useEffect(() => {
    if (props.fileUrl1) {
      if (props.fileUrl1 !== null && props.fileUrl1 !== "") {
        setTimeout(() => {
          dispatch(
            setPassData(props.fileUrl1)
          )
        }, 1000)
      }
    }
  }, [props.fileUrl1]);

  const submit = (data, action) => {
    setBlnDisable(true)
    setQuickSignLoading(true)
    let formData = new FormData();
    formData.append('comments', data.comments);
    formData.append('tag', "APPROVED");
    formData.append('signTitle', sessionStorage.getItem("username")); //data.signTitle
    formData.append('pencilColorCode', data.pencilColorCode);
    formData.append('username', sessionStorage.getItem("username"));
    formData.append('color', data.pencilColorCode);
    formData.append('personalAppliactionFileId', data.personalAppliactionFileId);
    formData.append('dep_desc', sessionStorage.getItem("department")); //data.dep_desc
    formData.append('filebytearray', data.filebytearray);
    formData.append('url', url);
    formData.append('partCaseFileId', data.personalAppliactionFileId);

    const roleName = sessionStorage.getItem("role");

    props.quickSign(formData, roleName, "", false, "", props.pfileName)
      .then(response => {
        try {
          if (response !== undefined && response !== null) {
            if (response.url) {
              props.toggleViewer(false)
              const url = response.url
              props.callBack(url)
              setQuickSignLoading(false)
              dispatch(setPassData(url))

              dispatch(setSnackbar(true, "success", t("sign_successful,_please-wait_till_PDF_renders.")));
              action.resetForm()
              setBlnDisable(false)
            }
          } else {
            const errorMessage = resp.status + " : " + resp.error + " AT " + resp.path
            callMessageOut(errorMessage);
          }
        }
        catch (e) {
          callMessageOut(e.message);
        }

      });

    const callMessageOut = (message) => {
      dispatch(setSnackbar(true, "error", message));
    }
  };

  const classes = props;

  const send = () => {
    const { sendToogle } = props;
    sendToogle(true);
  }

  const handleReturnToEditor = () => {
    const { returnToEditor } = props;
    returnToEditor(true);
  }

  const values = { comments: "", pencilColorCode: t("blue"), personalAppliactionFileId: props.fileId }; //tag: "", signTitle: "",username: "", dep_desc: "", color: "",
  return (
    <React.Fragment>
      {/* {quickSignLoading && <Loading />
      } */}

      <div className={classes.container} >
        <Grid container spacing={4}>
          {/* <Grid item xs={8} >
            <PdfViewer fileUrl={fileURL} pdfLoads={(val) => {setPdfLoads(val)}} />
          </Grid> */}
          <Grid item xs={12} >
            <Paper className={classes.paper}>
              {/* <Typography variant="subtitle2" gutterBottom>Quick Sign</Typography> */}
              <Formik
                render={(props, quickSignLoading) => (<Form {...props} quickSignLoading={quickSignLoading} sendClick={send} returnToEditorCLick={handleReturnToEditor} blnDisable={blnDisable} />)}
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={submit}
              />
            </Paper>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', }}>

            </div>
          </Grid>
        </Grid>

      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {

  return { props: state.props };
}

export default connect(mapStateToProps, { quickSign })(InputForm);
