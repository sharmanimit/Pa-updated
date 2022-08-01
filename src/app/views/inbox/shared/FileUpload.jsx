import React, { useState, useRef } from "react";
import FileUpload from "./fileUpload/file-upload.component";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { connect, useDispatch } from "react-redux";
import { uploadEnclosure } from "../../../camunda_redux/redux/action";
import { setSnackbar } from "../../../camunda_redux/redux/ducks/snackbar";
import { useTranslation } from "react-i18next";

function FileUploader(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch();

  const [newUserInfo, setNewUserInfo] = useState({
    attachedAnnexures: [],
  });
  const grp = sessionStorage.getItem("department");
  const partcaseID = sessionStorage.getItem("partcaseID");
  const [blnFlag, setBlnFlag] = useState(false);
  const [singleProgress, setSingleProgress] = useState(0);
  const [blnProgressBar, setblnProgressBar] = useState(false);
  const [totalFileSelected, setTotalFileSelected] = useState(0);

  const updateUploadedFiles = (files) => {
    setNewUserInfo({ ...newUserInfo, attachedAnnexures: files });
    handleSubmit(files);
  };

  const config = {
    onUploadProgress: (progressEvent) => {
      console.log(progressEvent)
      setSingleProgress(0);
      setblnProgressBar(true);
      const { loaded, total } = progressEvent;
      console.log(progressEvent);
      const percentage = Math.floor((loaded / total) * 100);
      setSingleProgress(percentage - 1);
      console.log("percentage local", percentage);
      console.log("percentage state", singleProgress);
    },
  };

  const handleSubmit = (event) => {
    let formData = new FormData();
    let fileData = event;
    for (var x = 0; x < fileData.length; x++) {
      formData.append("file", fileData[x]);
    }
    setTotalFileSelected(fileData.length);
    return props
      .uploadEnclosure(
        partcaseID,
        formData,
        config,
        grp
      )
      .then((resp) => {
        try {
          // if (!resp.error) {
            props.loadSplitViewData();
            setblnProgressBar(false);
            setBlnFlag(true);
            blnClearFileList();
            dispatch(
              setSnackbar(
                true,
                "success",
                t("enclousre_has_been_inserted")
              )
            );
            setTimeout(() => {
              props.loadSplitViewData();
            }, 0);
          // }
          // else {
          //   callMessageOut("Duplicate File(s) not allowed");
          //   setblnProgressBar(false);
          //   setBlnFlag(true);
          //   blnClearFileList();
          //   setTimeout(() => {
          //     props.loadSplitViewData();
          //   }, 0);
          // }
        } catch (e) {
          callMessageOut(e.message);
          setblnProgressBar(false);
        }
      });
  };

  const callMessageOut = (message) => {
    dispatch(setSnackbar(true, "error", message));
  };

  const blnClearFileList = () => {
    if (blnFlag === true) {
      setBlnFlag(false);
      return true;
    }
    return false;
  };
  return (
    <div>
      {blnProgressBar && (
        <div className="fileUploder">
          <CircularProgressbarWithChildren
            value={singleProgress}
            styles={buildStyles({
              backgroundColor: "pink",
              pathColor: `#4267b2`,
            })}
          >
            <img
              style={{ width: 180, marginTop: -5 }}
              src={process.env.PUBLIC_URL + `/assets/images/loading_icon.gif`}
              alt="doge"
            />
            <div style={{ fontSize: 16, marginTop: 5, color: "#d6d6d6" }}>
              <strong>{singleProgress} %</strong>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      )}
      <form>
        <FileUpload
          accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,
                    application/vnd.openxmlformats-officedocument.presentationml.presentation,image/png,image/jpeg,
                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          label="Attachment(s)"
          multiple
          totalFileSelected={totalFileSelected}
          blnProgressBar={blnProgressBar}
          updateFilesCb={updateUploadedFiles}
          blnClearFlag={blnClearFileList}
        />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return { props: state.props };
}

export default connect(mapStateToProps, { uploadEnclosure })(FileUploader);
