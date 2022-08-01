import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import { getPersonalInfo, updatePersonalInfo, myInfo } from "../../camunda_redux/redux/action";
import * as yup from "yup";
import { setSnackbar } from "../../camunda_redux/redux/ducks/snackbar";
import { useTranslation } from "react-i18next";
import { DialogActions } from "@material-ui/core";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const useStyles1 = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    textFiled: {
        marginTop: "1rem"
    }
}));

function InfoForm(props) {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const classes = useStyles1();
    const username = sessionStorage.getItem("username");
    const roleName = sessionStorage.getItem("role");
    const [name, setName] = useState('');
    // const [email,setEmail] = useState('');
    const [tele, setTele] = useState('');
    const [rank, setRank] = useState('');
    const [decorations, setDecorations] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    // const [designation,setDesignation] = useState('');

    const handleClick = (values) => {
        let formData = new FormData();
        formData.append('name', values.name);
        formData.append('address1', values.address1);
        formData.append('address2', values.address2);
        formData.append('address3', values.address3);
        // formData.append('email',values.email);
        formData.append('tele', values.tele);
        formData.append('rank', values.rank);
        formData.append('decorations', values.decorations);
        // formData.append('designation',values.designation);
        formData.append('username', username);
        formData.append('roleName', roleName);

        props.updatePersonalInfo(formData).then((res) => {
            try {
                if (res !== undefined) {
                    dispatch(setSnackbar(true, "success", "Personal Information Updated Successfully!"));
                    props.handleSubmit(false)
                    props.myInfo(true)
                    // props.disableBtn(false)
                } else {
                    const errorMessage = res.status + " : " + res.error + " AT " + res.path
                    callMessageOut(errorMessage);
                }
            }
            catch (e) {
                callMessageOut(e.message);
            }
        })
    };

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }

    useEffect(() => {
        let formData = new FormData();
        formData.append('username', username);

        props.getPersonalInfo(formData).then((res) => {
            if (res.status === 'OK') {
                setName(res.name);
                // setEmail(res.email);
                setTele(res.tele);
                setRank(res.rank);
                setDecorations(res.decorations);
                setAddress1(res.address1);
                setAddress2(res.address2);
                setAddress3(res.address3);
                // setDesignation(res.designation);
            }
        })
    }, []);

    const validationSchema = yup.object({
        // email: yup.string(t("enter_your_email")).email(t("enter_a_valid_email")).required(t("email_is_required")),

        name: yup.string(t("enter_your_name")).required(t("name_is_required")),
        tele: yup
            .string(t("enter_your_tele"))
            .required(t("tele_is_required"))
            .min(10, t("phone_number_must_be_10_number_long"))
            .matches(
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                t("please_enter_valid_number")
            ),
        rank: yup.string(t("enter_your_rank")).required(t("rank_is_required")),
        decorations: yup
            .string(t("enter_your_decorations"))
            .required(t("decorations_is_required")),
        address1: yup
            .string(t("enter_your_address1"))
            .required(t("address1_is_required")),
        address2: yup
            .string(t("enter_your_address2"))
            .required(t("address2_is_required")),
        address3: yup
            .string(t("enter_your_address3"))
            .required(t("address3_is_required")),

        // designation: yup.string(t("enter_your_designation")).required(t("designation_is_required"))
    });

    const formik = useFormik({
        initialValues: {
            name: name,
            // email: email,
            tele: tele,
            rank: rank,
            decorations: decorations,
            address1: address1,
            address2: address2,
            address3: address3,
            // designation: designation
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleClick(values);
        }
    });

    const configData = {
        fullWidth: true,
        variant: "outlined",
        className: classes.textFiled,
        size: "small"
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    {...configData}
                    id="name"
                    name="name"
                    label={t("name")}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField
                            {...configData}
                            id="tele"
                            name="tele"
                            label={t("tele")}
                            value={formik.values.tele}
                            onChange={formik.handleChange}
                            error={formik.touched.tele && Boolean(formik.errors.tele)}
                            helperText={formik.touched.tele && formik.errors.tele}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            {...configData}
                            id="rank"
                            name="rank"
                            label={t("rank")}
                            value={formik.values.rank}
                            onChange={formik.handleChange}
                            error={formik.touched.rank && Boolean(formik.errors.rank)}
                            helperText={formik.touched.rank && formik.errors.rank}
                        />
                    </Grid>
                </Grid>
                {/* <TextField
                    {...configData}
                    id="email"
                    name="email"
                    label={t("email")}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                /> */}
                <TextField
                    {...configData}
                    id="decorations"
                    name="decorations"
                    label={t("decorations")}
                    value={formik.values.decorations}
                    onChange={formik.handleChange}
                    error={formik.touched.decorations && Boolean(formik.errors.decorations)}
                    helperText={formik.touched.decorations && formik.errors.decorations}
                />
                {/* <TextField
                    {...configData}
                    id="designation"
                    name="designation"
                    label={t("designation")}
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.designation && Boolean(formik.errors.designation)
                    }
                    helperText={formik.touched.designation && formik.errors.designation}
                /> */}
                <TextField
                    {...configData}
                    id="address1"
                    name="address1"
                    label={t("address_line_1")}
                    multiline
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    error={formik.touched.address1 && Boolean(formik.errors.address1)}
                    helperText={formik.touched.address1 && formik.errors.address1}
                />
                <TextField
                    {...configData}
                    id="address2"
                    name="address2"
                    label={t("address_line_2")}
                    multiline
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    error={formik.touched.address2 && Boolean(formik.errors.address2)}
                    helperText={formik.touched.address2 && formik.errors.address2}
                />
                <TextField
                    {...configData}
                    id="address3"
                    name="address3"
                    label={t("address_line_3")}
                    multiline
                    value={formik.values.address3}
                    onChange={formik.handleChange}
                    error={formik.touched.address3 && Boolean(formik.errors.address3)}
                    helperText={formik.touched.address3 && formik.errors.address3}
                />
                <DialogActions>
                    <Button color="primary" variant="outlined" type="submit" endIcon={<SystemUpdateAltIcon />} style={{ marginTop: "1rem" }} >
                        {t("update")}
                    </Button>
                </DialogActions>
            </form>
        </div>
    );
}
function mapStateToProps(state) {

    return { props: state.props };
}
export default connect(mapStateToProps, { getPersonalInfo, updatePersonalInfo, myInfo })(InfoForm);
