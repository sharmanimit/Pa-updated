import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import { personalFileFormData } from "../../camunda_redux/redux/action";
import { changingTableState } from "../../camunda_redux/redux/action/apiTriggers";
import { connect as reduxConnect, useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import { setRefresh } from "../../redux/actions/RefreshActions";
import { useTranslation } from "react-i18next";
import { CHANGE_PA_FILE } from "app/camunda_redux/redux/constants/ActionTypes";

const useStyles = makeStyles((theme) => ({
  btnGrid: {
    textAlign: "right",
    marginTop: theme.spacing(4),
  },
}));

const PersonalFileForm = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [blnDisable, setBlnDisable] = useState(false)
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const { changeFile } = useSelector((state) => state);

  const dispatch = useDispatch();

  const configData = {
    fullWidth: true,
    size: "small",
    className: classes.textField,
  };

  const INITIAL_STATE = {
    subject: "",
  };

  const VALIDATION_SCHEMA = Yup.object().shape({
    subject: Yup.string(t("enter_a_subject"))
      .trim(t("no_spaces_allowed_at_the_start_and_end"))
      .max(250, t("subject_should_not_be_greater_than_250_characters"))
      .required(`${t("this_field_is_required")} !`),
  });

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      setBlnDisable(true)
      let data = { ...values, subject: values.subject.trim() };
      props
        .personalFileFormData({ ...data, userName: username, roleName: role })
        .then(async (res) => {
          props.handleClose();
          setBlnDisable(false)
          if (res.status === "OK") {
            let trigger = false;
            setTimeout(() => {
              let trigger = true;
              props.changingTableState(trigger, "CHANGE_PA_FILE");
            }, 0);
            dispatch({type: CHANGE_PA_FILE, payload: !changeFile})
            await props.setRefresh(true);
            dispatch(
              setSnackbar(
                true,
                "success",
                `${t("personal")} ${t("file_created_successfully!")}`
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
          autoFocus
        />
        <Grid className={classes.btnGrid}>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            style={{ marginLeft: "1rem" }}
            endIcon={<DoneIcon />}
            disabled={blnDisable}
          >
            {t("submit")}
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
  personalFileFormData,
  changingTableState,
  setRefresh,
})(PersonalFileForm);
