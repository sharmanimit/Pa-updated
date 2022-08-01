import React, { Component, useEffect, useState } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form } from "./form";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import { Grid, Typography } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { quickSign } from "../../../../camunda_redux/redux/action";
import { setPassData } from "../../../../camunda_redux/redux/ducks/passData";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { useTranslation } from "react-i18next";

const styles = theme => ({
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
  }
});

const InputForm = (props) => {

  const {t} = useTranslation()

  const [fileURL, setFileURL] = useState("");
  const dispatch = useDispatch();
  const {SignURL, flagNum} = props;

  const validationSchema = Yup.object({
    comments: Yup.string(t('enter_a_comment')),
    pencilColorCode: Yup.string(t("select_a_pencil_color"))
      .required(t("color_is_required")),
  });

  const submit = (data,action) => {
    props.isSignedCompleted(true)
    let formData = new FormData();
    formData.append('comments', data.comments);
    formData.append('tag', "APPROVED");
    formData.append('signTitle', sessionStorage.getItem("username")); //data.signTitle
    formData.append('pencilColorCode', data.pencilColorCode);
    formData.append('username', sessionStorage.getItem("username"));
    formData.append('color', data.pencilColorCode);
    formData.append('personalAppliactionFileId', data.personalAppliactionFileId);
    formData.append('dep_desc',sessionStorage.getItem("department") ); //data.dep_desc
    formData.append('filebytearray', data.filebytearray);
    formData.append('url', SignURL);
    formData.append('partCaseFileId', data.personalAppliactionFileId);

    const roleName = sessionStorage.getItem("role");

    props.quickSign(formData, roleName, flagNum)

      .then(response => {
        try {
          if (response !== undefined && response !== null) {
            if (response.url) {
              setFileURL(response.url);
              {props.flag == 'Enclouser' ? dispatch(setPassData(response.url)) : props.callBackURL(response.url)}
               action.resetForm()
            }
          } else {
            props.isSignedCompleted(false)
            const errorMessage = resp.status + " : " + resp.error + " AT " + resp.path
            callMessageOut(errorMessage);
          }
        }
        catch (e) {
          props.isSignedCompleted(false)
          callMessageOut(e.message);
        }

      });
  };
  
  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  }

  const classes = props;

  const values = { comments: "",  pencilColorCode: t("blue"), personalAppliactionFileId: props.fileId }; //tag: "", signTitle: "",username: "", dep_desc: "", color: "",
  return (
    <React.Fragment>
      <div className={classes.container} >
        <Grid container spacing={4}>
          <Grid item xs={12} >
            <Paper className={classes.paper}>
              <Typography variant="subtitle2" gutterBottom>{t('quick_sign')}</Typography>
              <Formik
                render={props => <Form {...props} />}
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
