import React, { useState, useRef } from "react";
import FileUpload from "./fileUpload/file-upload.component";
import { Button } from "@material-ui/core";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import { connect, useDispatch } from "react-redux";
import { uploadAnnexure } from "../../camunda_redux/redux/action";
import { changingTableStateAnnexure } from "../../camunda_redux/redux/action/apiTriggers";
import { Grid } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import SendIcon from '@material-ui/icons/Send';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './therme-source/material-ui/loading'
import { useTranslation } from "react-i18next";

function AnnexureUploader(props) {
    const { t } = useTranslation()
    const dispatch = useDispatch();

    const [newUserInfo, setNewUserInfo] = useState({
        attachedAnnexures: []
    });
    const role = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username");
    const [blnFlag, setBlnFlag] = useState(false);
    const { personalAppID, sendClick } = props;
    const [singleProgress, setSingleProgress] = useState(0);
    const [blnProgressBar, setblnProgressBar] = useState(false);
    const [totalFileSelected, setTotalFileSelected] = useState(0)

    const updateUploadedFiles = (files) => {
        setNewUserInfo({ ...newUserInfo, attachedAnnexures: files });
        handleSubmit(files)
    };


    const onUploadProgress = {
        onUploadProgress: (progressEvent) => {
            setSingleProgress(0);
            setblnProgressBar(true);
            const { loaded, total } = progressEvent;
            console.log(progressEvent)
            const percentage = Math.floor(loaded / total * 100);
            setSingleProgress(percentage - 1);
            console.log('percentage local', percentage)
            console.log('percentage state', singleProgress)
        }
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        let formData = new FormData();
        let fileData = event;
        for (var x = 0; x < fileData.length; x++) {
            formData.append('file', fileData[x]);
        }
        setTotalFileSelected(fileData.length)
        console.log("fileData.length ", fileData.length)
        return props.uploadAnnexure(personalAppID, formData, role, username, onUploadProgress).then(resp => {
            try {
                if (resp.status === 200) {
                    setblnProgressBar(false);
                    setBlnFlag(true);
                    blnClearFileList();
                    dispatch(setSnackbar(true, "success", `${t("annexure_has_been_inserted_successfully")}!`));
                    let trigger = false;
                    setTimeout(() => {
                        trigger = true;
                        props.changingTableStateAnnexure(trigger, 'CHANGE_PA_ANNEXURE');
                    }, 0);

                }
                else {
                    setblnProgressBar(false);
                    setBlnFlag(true);
                    blnClearFileList();
                    dispatch(setSnackbar(true, "success", `${t("annexure_has_been_inserted_successfully")}!`));
                    let trigger = false;
                    setTimeout(() => {
                        trigger = true;
                        props.changingTableStateAnnexure(trigger, 'CHANGE_PA_ANNEXURE');
                    }, 5000);
                }
            }
            catch (e) {
                callMessageOut(e.message)
            }
        })
    };

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }



    const blnClearFileList = () => {
        if (blnFlag === true) {
            setBlnFlag(false);
            return true;
        }
        return false;
    }
    return (
        <div>
            {blnProgressBar &&
                <div className="fileUploder">
                    <CircularProgressbarWithChildren value={singleProgress} styles={buildStyles({ backgroundColor: 'pink', pathColor: `#4267b2` })}>
                        <img style={{ width: 180, marginTop: -5 }} src={process.env.PUBLIC_URL + `/assets/images/loading_icon.gif`} alt="doge" />
                        <div style={{ fontSize: 16, marginTop: 5, color: '#d6d6d6' }}>
                            <strong>{singleProgress} %</strong>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            }
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
                <Grid item style={{ textAlignLast: 'right' }} >
                    {/* <Button variant="outlined" size="medium" color="primary" type="submit" style={{ marginLeft: '5px' }} endIcon={<PublishIcon />}>
                        Upload
                    </Button> */}
                    {/* <Button variant="outlined" size="medium" color="primary" onClick={sendClick} style={{ marginLeft: '5px' }} endIcon={<SendIcon />}>
                        {t("send")}
                    </Button> */}
                </Grid>
            </form>
        </div>
    );
}
function mapStateToProps(state) {

    return { props: state.props };
}

export default connect(mapStateToProps, { uploadAnnexure, changingTableStateAnnexure })(AnnexureUploader);
