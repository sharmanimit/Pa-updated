import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect as reduxConnect, useDispatch } from "react-redux";
import {
  getGroupList,
  sendFiles,
  addToFavourite,
  fetchFavouriteList,
  deleteFavourite,
} from "../../camunda_redux/redux/action";
import {
  changingTableStatePA,
  changeTableStateDraft,
} from "../../camunda_redux/redux/action/apiTriggers";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { useTranslation } from "react-i18next";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const SendFileForm = (props) => {
  const { t } = useTranslation();
  const [hobbies, setHobbies] = useState([]);
  const [values, setValues] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);
  const [deleteFavourite, setDeleteFavourite] = useState("");
  const username = sessionStorage.getItem("username");
  const displayUserName = sessionStorage.getItem("displayUserName");
  const [addedFavourite, setAddedFavourite] = useState(false);

  const dispatch = useDispatch();
  const role = sessionStorage.getItem("role");

  const initialState = {
    section: [],
  };

  const validation = Yup.object().shape({
    section: Yup.string()
      .nullable()
      .required(`${t("this_field_is_required")} !`),
  });
  console.log(props.pfileName);

  const onHandleSubmit = async (value) => {
    props.setSend(false);
    await props
      .sendFiles(props.fileId, value, role, username, displayUserName, props.pfileName)
      .then((resp) => {
        console.log(resp);
        if (resp.status === "OK") {
          dispatch(setSnackbar(true, "success", t("file_sent_successfully!")));
          props.handleCloseEvent(false);
          let trigger = false;
          setTimeout(() => {
            trigger = true;
            props.changingTableStatePA(trigger, "CHANGE_PA_APPLICATION");
            props.changeTableStateDraft(trigger, "CHANGE_PA_DRAFT");
          }, 0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validation,

    onSubmit: (value) => onHandleSubmit(value.section.sau),
  });

  const formik1 = useFormik({
    initialValues: initialState,
    validationSchema: validation,

    onSubmit: (value) => onHandleSubmit(value.section),
  });

  const handleInputChange = async (e) => {
    if (!isNullOrUndefined(e.target.value)) {
      if (e.target.value.length > 2) {
        let formData = new FormData();
        formData.append("sau", e.target.value);
        await props.getGroupList(formData).then((resp) => {
          console.log(resp);
          let tmpArray = [];
          for (var i = 0; i < resp.data.length; i++) {
            tmpArray.push(resp.data[i]);
          }
          setHobbies(tmpArray);
        });
      }
    }
  };

  const handleAddToFavourite = async (e) => {
    await props
      .addToFavourite(values, role, "send")
      .then((resp) => {
        console.log(resp);
        fetchFavourite();
        setAddedFavourite(true);
        setValues([]);
        dispatch(
          setSnackbar(true, "success", "Added to favourate successfully")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFavourite = async () => {
    await props
      .fetchFavouriteList(role)
      .then((resp) => {
        console.log(resp);
        setFavouriteList(resp.favourite.sendFavourite);
        // dispatch(setSnackbar(true, "success", t("Favourite list added!")));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(async () => {
    fetchFavourite();
  }, []);

  const handleDeletFavourite = async () => {
    await props
      .deleteFavourite(deleteFavourite, role, "send")
      .then((resp) => {
        console.log(resp);
        fetchFavourite();
        setDeleteFavourite("");
        dispatch(
          setSnackbar(true, "success", "Delete to favourate successfully")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dialog_sendButton">
        <div style={{ border: "1px solid #b6b6b66b" }}>
          <Card className="card_1" style={{ padding: "25px" }} elevation={5}>
            <Typography
              color="primary"
              style={{ fontSize: "1.2rem", textAlign: "left" }}
              className="typography"
            >
              DEPARTMENT LIST
            </Typography>
            <form onSubmit={formik.handleSubmit} autocomplete="off">
              <Autocomplete
                //   multiple
                limitTags={2}
                value={formik.values.section}
                options={hobbies}
                onChange={(_, value) => {
                  formik.setFieldValue("section", value), setValues(value.sau);
                }}
                onInputChange={handleInputChange}
                name="section"
                getOptionLabel={(option) => option.sauDisplayName}
                getOptionSelected={(option, value) =>
                  option.sauDisplayName === value.sauDisplayName
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t("choose_department")}
                    margin="normal"
                    error={
                      formik.touched.section && Boolean(formik.errors.section)
                    }
                    helperText={formik.touched.section && formik.errors.section}
                  />
                )}
              />
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                style={{ float: "right", marginTop: "1rem" }}
                endIcon={<SendIcon />}
              >
                {t("send")}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleAddToFavourite}
                style={{
                  float: "right",
                  marginTop: "1rem",
                  marginRight: "1rem",
                }}
                endIcon={<ThumbUpIcon />}
                // disabled={formik.values.section ? false : true}
              >
                {t("ADD TO FAVOURITE")}
              </Button>
            </form>
          </Card>
        </div>
        <div style={{ border: "1px solid #b6b6b66b", marginTop: "2rem" }}>
          <Card className="card_1" style={{ padding: "25px" }} elevation={5}>
            <Typography
              color="primary"
              style={{ fontSize: "1.2rem", textAlign: "left" }}
              className="typography"
            >
              FAVOURITE LIST
            </Typography>
            <form onSubmit={formik1.handleSubmit} autocomplete="off">
              <Autocomplete
                limitTags={2}
                value={formik1.values.section}
                options={favouriteList}
                onChange={(_, value) => {
                  formik1.setFieldValue("section", value),
                    setDeleteFavourite(value);
                }}
                name="section"
                getOptionLabel={(option) => option}
                getOptionSelected={(option, value) => option === value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t("CHOOSE FROM FAVOURITE LIST")}
                    margin="normal"
                    error={
                      formik1.touched.section && Boolean(formik1.errors.section)
                    }
                    helperText={
                      formik1.touched.section && formik1.errors.section
                    }
                  />
                )}
              />
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                style={{ float: "right", marginTop: "1rem" }}
                endIcon={<SendIcon />}
              >
                {t("send")}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                style={{
                  float: "right",
                  marginTop: "1rem",
                  marginRight: "1rem",
                }}
                onClick={handleDeletFavourite}
                endIcon={<DeleteOutlineIcon />}
              >
                {t("DELETE FAVOURITE")}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    props: state.props,
  };
}

export default reduxConnect(mapStateToProps, {
  getGroupList,
  sendFiles,
  addToFavourite,
  fetchFavouriteList,
  changingTableStatePA,
  changeTableStateDraft,
  deleteFavourite,
})(SendFileForm);
