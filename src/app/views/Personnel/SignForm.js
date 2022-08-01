import React, { useState } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import CommentIcon from "@material-ui/icons/Comment";
import CheckIcon from "@material-ui/icons/Check";
import { useSelector, connect, useDispatch } from "react-redux";
import { quickSign } from "../../camunda_redux/redux/action";
import { setSnackbar } from "../..//camunda_redux/redux/ducks/snackbar";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "420px",
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  blue: {
    color: "blue",
  },
  black: {
    color: "#808080",
  },
}));

const SignForm = (props) => {
  const { t } = useTranslation();
  const [pencilColorCode, setPencilColorCode] = useState("blue");
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialValues = {
    comments: "",
  };

  const validationSchema = Yup.object({
    comments: Yup.string(t("enter_a_comment")),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (data) => {
      let formData = new FormData();
      formData.append("comments", data.comments);
      formData.append("tag", "APPROVED");
      formData.append("signTitle", sessionStorage.getItem("username")); //data.signTitle
      formData.append("pencilColorCode", pencilColorCode);
      formData.append("username", sessionStorage.getItem("username"));
      formData.append("color", pencilColorCode);
      formData.append("personalAppliactionFileId", props.fileId);
      formData.append("dep_desc", sessionStorage.getItem("department")); //data.dep_desc
      formData.append("filebytearray", data.filebytearray);
      formData.append("url", props.fileURL);
      formData.append("partCaseFileId", props.fileId);
      formData.append("annexureSign", true);

      const roleName = sessionStorage.getItem("role");
      props.setOpenSign(false);

      props
        .quickSign(formData, roleName, "", true, props.annexureId)
        .then((resp) => {
          console.log(resp);
          props.loadAnnextureTableData(props.paID, true);
          dispatch(
            setSnackbar(
              true,
              "success",
              t("sign_successful,_please-wait_till_PDF_renders.")
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const options = [
    { value: "red", label: t("red") },
    { value: "green", label: t("green") },
    { value: "blue", label: t("blue") },
    { value: "black", label: t("black") },
  ];

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="comments"
          name="comments"
          label={t("comment")}
          multiline
          rows={10}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <CommentIcon />
              </InputAdornment>
            ),
          }}
          value={formik.values.comments}
          onChange={formik.handleChange}
          error={formik.touched.comments && Boolean(formik.errors.comments)}
          helperText={formik.touched.comments && formik.errors.comments}
        />
        <FormControl
          component="fieldset"
          style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}
        >
          <FormLabel component="legend">{t("color")} :</FormLabel>
          <RadioGroup
            aria-label="gender"
            name=""
            row
            value={pencilColorCode}
            onChange={(e) => {
              setPencilColorCode(e.target.value);
            }}
          >
            {options.map((option, i) => (
              <FormControlLabel
                value={option.value}
                control={<Radio color="primary" />}
                label={option.label}
                key={i}
                className={
                  option.value === "red"
                    ? classes.red
                    : option.value === "green"
                    ? classes.green
                    : option.value === "black"
                    ? classes.black
                    : classes.blue
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          endIcon={<CheckIcon />}
          style={{ float: "right", marginTop: "1rem" }}
        >
          {t("sign")}
        </Button>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return { props: state.props };
}

export default connect(mapStateToProps, { quickSign })(SignForm);
// export default SignForm
