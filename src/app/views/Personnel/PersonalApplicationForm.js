import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Grid,
  Button,
  MenuItem,
  IconButton,
  Fab,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete } from "@material-ui/lab";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import {
  loadPFileData,
  personalApplicationFormData,
  updateSubjectApplicationForm,
} from "../../camunda_redux/redux/action";
import { changeTableStateDraft } from "../../camunda_redux/redux/action/apiTriggers";
import { connect as reduxConnect, useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import { setRefresh1 } from "../../redux/actions/Refresh1Actions";
import { useTranslation } from "react-i18next";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import AddIcon from "@material-ui/icons/Add";
import { OPEN_PA_DRAFT } from "app/camunda_redux/redux/constants/ActionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  btnGrid: {
    textAlign: "right",
    marginTop: theme.spacing(4),
  },
}));

const PersonalApplicationForm = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { changeFile } = useSelector((state) => state);

  const [pFileArr, setPFileArr] = useState([]);
  const [blnDisable, setBlnDisable] = useState(false);
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const grp = sessionStorage.getItem("department");
  const { mount } = useSelector((state) => state.refreshings);

  useEffect(() => {
    props.loadPFileData(username, role).then(({ data }) => {
      let tmpArray = [];

      data.forEach((item) => {
        tmpArray.push(`${item.fileName} | ${item.subject}`);
      });
      setPFileArr(tmpArray);
    });
  }, [changeFile]);

  const configData = {
    fullWidth: true,
    size: "small",
  };

  const INITIAL_STATE = {
    subject: props.updateSubject ? props.draftSubject : "",
    pfileName: "",
  };

  const VALIDATION_SCHEMA = Yup.object().shape({
    subject: Yup.string(t("enter_a_subject"))
      .trim()
      .max(250, t("subject_should_not_be_greater_than_250_characters"))
      .required(`${t("this_field_is_required")} !`),
    pfileName: Yup.string(t("enter_personal_file_name"))
      .nullable()
      .required(`${t("this_field_is_required")} !`),
  });

  const VALIDATION_UPDATE_SCHEMA = Yup.object().shape({
    subject: Yup.string(t("enter_a_subject"))
      .trim()
      .max(250, t("subject_should_not_be_greater_than_250_characters"))
      .required(`${t("this_field_is_required")} !`),
  });

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: props.updateSubject
      ? VALIDATION_UPDATE_SCHEMA
      : VALIDATION_SCHEMA,
    onSubmit: (values) => {
      setBlnDisable(true);
      let data = { ...values, subject: values.subject.trim() };
      props.updateSubject
        ? props
            .updateSubjectApplicationForm(formik.values.subject, props.draftId)
            .then(async (res) => {
              props.handleClose();
              setBlnDisable(false);
              console.log(res);
              if (res.response.status === "OK") {
                let trigger = false;
                setTimeout(() => {
                  trigger = true;
                  props.changeTableStateDraft(trigger, "CHANGE_PA_DRAFT");
                }, 0);
                // setTimeout(() => {
                //   dispatch({
                //     type: OPEN_PA_DRAFT,
                //     payload: res.response.PA,
                //   });
                // }, 100);
                props.setRefresh1(!mount);
                dispatch(
                  setSnackbar(
                    true,
                    "success",
                    t("personal_application_update_successfully!")
                  )
                );
              }
            })
        : props
            .personalApplicationFormData(
              { ...data, userName: username },
              role,
              grp
            )
            .then(async (res) => {
              props.handleClose();
              if (res.response.status === "OK") {
                let trigger = false;
                // setTimeout(() => {
                //   trigger = true;
                //   props.changeTableStateDraft(trigger, "CHANGE_PA_DRAFT");
                // }, 0);
                setTimeout(() => {
                  dispatch({
                    type: OPEN_PA_DRAFT,
                    payload: res.response.PA,
                  });
                }, 100);
                props.setRefresh1(!mount);
                dispatch(
                  setSnackbar(
                    true,
                    "success",
                    t("personal_application_created_successfully!")
                  )
                );
              }
            });
    },
  });

  return (
    <div classes={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          {...configData}
          variant="outlined"
          multiline
          rows={3}
          name="subject"
          label={t("subject")}
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
          // ref={subjectRef}
          autoFocus
        />
        {!props.updateSubject && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2rem",
              alignItems: "center",
            }}
          >
            <Autocomplete
              size="small"
              name="pfileName"
              options={pFileArr.map((option) => option)}
              value={formik.values.pfileName}
              onChange={(_, value) =>
                formik.setFieldValue(
                  "pfileName",
                  !isNullOrUndefined(value)
                    ? value.substr(0, value.indexOf(" |"))
                    : null
                )
              }
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t("p_file")}
                    margin="normal"
                    error={
                      formik.touched.pfileName &&
                      Boolean(formik.errors.pfileName)
                    }
                    helperText={
                      formik.touched.pfileName && formik.errors.pfileName
                    }
                  />
                </>
              )}
            />
            {/* <NoteAddOutlinedIcon
            color="secondary"
            style={{ fontSize: "1.8rem", cursor: "pointer", marginTop: "6px" }}
            onClick={() => props.handleClickFile()}
          /> */}
            <Fab
              disabled={props.blnDisableButtoms}
              style={{
                height: ".1rem",
                width: "2.2rem",
                cursor: "pointer",
                marginTop: "6px",
                marginLeft: "2px",
                backgroundColor: "#5f78c4",
              }}
              onClick={() => props.handleClickFile()}
            >
              <AddIcon style={{ fontSize: "20", color: "#fff" }} />
            </Fab>
          </div>
        )}
        <Grid className={classes.btnGrid}>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            style={{ marginLeft: "1rem" }}
            endIcon={<DoneIcon />}
            disabled={blnDisable}
          >
            {props.updateSubject ? t("update").toUpperCase() : t("submit")}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            style={{ marginLeft: "1rem" }}
            onClick={formik.handleReset}
            endIcon={<UndoIcon />}
          >
            {t("reset")}
          </Button>
        </Grid>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    props: state.props,
  };
}

export default reduxConnect(mapStateToProps, {
  loadPFileData,
  personalApplicationFormData,
  updateSubjectApplicationForm,
  changeTableStateDraft,
  setRefresh1,
})(PersonalApplicationForm);
