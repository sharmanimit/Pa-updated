import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  FormControlLabel,
  FormLabel,
  ListItemIcon,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import StopIcon from "@material-ui/icons/Stop";
import CheckIcon from "@material-ui/icons/Check";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  MenuProperty: {
    position: "relative",
  },
  ButtonMarginLeft: {
    margin: "15px 0px 20px 5px",
  },
}));

const FormikRadioGroup = ({
  field,
  name,
  options,
  children,
  theme,
  t,
  ...props
}) => {
  const useStyles1 = makeStyles(() => ({
    red: {
      color: theme ? "#fd3f3f" : "red",
    },
    green: {
      color: theme ? "lime" : "green",
    },
    blue: {
      color: theme ? "#3080ff" : "blue",
    },
    black: {
      color: "#808080",
    },
  }));

  const fieldName = name || field.name;

  const classes = useStyles1();
  const renderOptions = (options) => {
    return options.map((option) => (
      <FormControlLabel
        key={option}
        value={option}
        control={<Radio color="primary" />}
        label={option}
        className={
          option === t("red")
            ? classes.red
            : option === t("green")
            ? classes.green
            : option === t("black")
            ? classes.black
            : classes.blue
        }
      />
    ));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <FormLabel
        component="legend"
        style={{ display: "flex", color: theme ? "" : "black" }}
      >
        {t("color")}
      </FormLabel>
      <RadioGroup
        {...field}
        {...props}
        name={fieldName}
        style={{ position: "relative", display: "table-cell" }}
      >
        {options ? renderOptions(options) : children}
      </RadioGroup>
    </div>
  );
};

export const Form = (props) => {
  const classes = useStyles(); //tag, signTitle, username, dep_desc, color
  const { t } = useTranslation();
  const { theme } = useSelector((state) => state);
  const {
    values: { comments, pencilColorCode },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
  } = props;

  const options = [t("red"), t("green"), t("blue"), t("black")];

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "10px", zIndex: 35001 }}>
      <TextField
        name="comments"
        helperText={touched.comments ? errors.comments : ""}
        error={Boolean(errors.comments)}
        label={t("comment")}
        value={comments || ""}
        onChange={handleChange}
        fullWidth
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
      />
      <div style={{ fontSize: "small", color: "red", textAlign: "end" }}>
        {Boolean(errors.comments) ? errors.comments : ""}
      </div>
      <Field
        name="pencilColorCode"
        value={pencilColorCode}
        options={options}
        component={FormikRadioGroup}
        helperText={touched.pencilColorCode ? errors.pencilColorCode : ""}
        error={Boolean(errors.pencilColorCode)}
        theme={theme}
        t={t}
      />

      <div style={{ fontSize: "small", color: "red", textAlign: "end" }}>
        {Boolean(errors.pencilColorCode) ? errors.pencilColorCode : ""}
      </div>
      <div
        style={{ textAlign: "end", marginLeft: "auto", marginRight: "auto" }}
      >
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={!isValid}
          endIcon={<CheckIcon />}
          className={classes.ButtonMarginLeft}
        >
          {t("sign")}
        </Button>
      </div>
    </form>
  );
};
