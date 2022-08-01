import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormControlLabel, FormLabel, ListItemIcon, makeStyles, MenuItem, Radio, RadioGroup } from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import TitleIcon from '@material-ui/icons/Title';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import StopIcon from '@material-ui/icons/Stop';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
	MenuProperty: {
		position: 'relative',
	},
	ButtonMarginLeft: {
		margin: '15px 0px 20px 5px'
	},
	red: {
		color: 'red'
	},
	green: {
		color: 'green'
	},
	blue: {
		color: 'blue'
	},
	black: {
		color: 'black'
	},
}));

const FormikRadioGroup = ({ field, name, options, children, theme, t, ...props }) => {
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
	}))
	const fieldName = name || field.name;

	const renderOptions = (options) => {
		const classes = useStyles1();
		return options.map((option) => (
			<FormControlLabel
				key={option}
				value={option}
				control={<Radio color='primary' />}
				label={option}
				style={{ color: { option } }}
				className={option === t('red') ? classes.red : option === t('green') ? classes.green : option === t('black') ? classes.black : classes.blue}
			/>
		));
	};

	return (
		<div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
			<FormLabel component="legend" style={{ display: "flex", width: 'auto', marginRight: '15px', color: theme ? "" : "black" }}>
				{t("color")} :
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



export const Form = props => {
	const { t } = useTranslation()
	const { theme } = useSelector(state => state)
	const classes = useStyles(); //tag, signTitle, username, dep_desc, color
	const {
		values: { comments, pencilColorCode },
		errors,
		touched,
		handleSubmit,
		handleChange,
		isValid,
		setFieldTouched,
		blnDisable
	} = props;

	const options = [t("red"), t("green"), t("blue"), t("black")];
	// const countries = [
	// 	{"label":"Red","icon":<ListItemIcon><StopIcon  style={{color: 'red'}}/></ListItemIcon>},
	// 	{"label":"Green","icon":<ListItemIcon><StopIcon style={{color: 'green'}}/></ListItemIcon>},
	// 	{"label":"Blue","icon":<ListItemIcon><StopIcon style={{color: 'blue'}}/></ListItemIcon>},
	// ]
	const change = (name, e) => {
		e.persist();
		handleChange(e);
		setFieldTouched(name, true, false);
	};

	const { sendClick, returnToEditorCLick } = props;
	const [rowHeight, setRowHeight] = useState(14)
	useEffect(() => {
		window.innerWidth >= 1920 ? setRowHeight(14) : setRowHeight(10)
	}, [])
	return (
		<form onSubmit={handleSubmit} style={{ "margin": "10px", zIndex: 35001 }}>
			<TextField
				name="comments"
				helperText={touched.comments ? errors.comments : ""}
				error={Boolean(errors.comments)}
				label={t("comment")}
				value={comments || ''}
				onChange={handleChange}
				fullWidth
				multiline
				rows={rowHeight}
				variant='outlined'
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<CommentIcon />
						</InputAdornment>
					)
				}}
			/>
			<div style={{ fontSize: 'small', color: 'red', textAlign: 'end' }}>{Boolean(errors.comments) ? errors.comments : ""}</div>
			{/* <TextField
				name="tag"
				helperText={touched.tag ? errors.tag : ""}
				error={Boolean(errors.tag)}
				label="Tag"
				value={tag}
				onChange={handleChange}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<TagFacesIcon />
						</InputAdornment>
					)
				}}
			/> */}
			{/* <div style={{fontSize: 'small', color: 'red', textAlign: 'end'}}>{Boolean(errors.tag) ? errors.tag : ""}</div>
			<TextField
				name="signTitle"
				helperText={touched.signTitle ? errors.signTitle : ""}
				error={Boolean(errors.signTitle)}
				label="Sign Title"
				value={signTitle}
				onChange={handleChange}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<TitleIcon />
						</InputAdornment>
					)
				}}
			/> */}
			{/* <div style={{fontSize: 'small', color: 'red', textAlign: 'end'}}>{Boolean(errors.signTitle) ? errors.signTitle : ""}</div> */}
			{/* <TextField
				select
				name="pencilColorCode"
				helperText={touched.pencilColorCode ? errors.pencilColorCode : ""}
				error={Boolean(errors.pencilColorCode)}
				label="Pencil Color"
				value={pencilColorCode || ''}
				onChange={handleChange}

				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<ColorLensIcon />
						</InputAdornment>
					)
				}}
			>
				{countries.length ?
					countries.map((country) => (
						<MenuItem key={country.label} value={country.label}   >
							{country.icon}
							{country.label}
						</MenuItem>
					))
					:
					<MenuItem>loading...</MenuItem>
				}
			</TextField > */}
			<Field
				name="pencilColorCode"
				value={pencilColorCode}
				options={options}
				component={FormikRadioGroup}
				helperText={touched.pencilColorCode ? errors.pencilColorCode : ""}
				error={Boolean(errors.pencilColorCode)}
				t={t}
				theme={theme}
			/>
			<div style={{ fontSize: 'small', color: 'red', textAlign: 'end' }}>{Boolean(errors.pencilColorCode) ? errors.pencilColorCode : ""}</div>
			{/* <TextField
				name="username"
				helperText={touched.username ? errors.username : ""}
				error={Boolean(errors.username)}
				label="Username"
				value={username}
				onChange={handleChange}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<AccountCircleIcon />
						</InputAdornment>
					)
				}}
			/> */}
			{/* <div style={{fontSize: 'small', color: 'red', textAlign: 'end'}}>{Boolean(errors.username) ? errors.username : ""}</div>
			<TextField
				name="dep_desc"
				helperText={touched.dep_desc ? errors.dep_desc : ""}
				error={Boolean(errors.dep_desc)}
				label="Department Description"
				value={dep_desc}
				onChange={handleChange}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<DescriptionIcon />
						</InputAdornment>
					)
				}}
			/> */}
			{/* <div style={{fontSize: 'small', color: 'red', textAlign: 'end'}}>{Boolean(errors.dep_desc) ? errors.dep_desc : ""}</div>
			<TextField
				select
				name="color"
				helperText={touched.color ? errors.color : ""}
				error={Boolean(errors.color)}
				label="Color"
				value={color}
				onChange={handleChange}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<ColorLensIcon />
						</InputAdornment>
					)
				}}
			>
				{countries.length ?
					countries.map((country) => (
						<MenuItem key={country.label} value={country.label}>
							{country.label}
						</MenuItem>
					))
					:
					<MenuItem>loading...</MenuItem>
				}
			</TextField > */}
			{/* <div style={{fontSize: 'small', color: 'red', textAlign: 'end'}}	>{Boolean(errors.color) ? errors.color : ""}</div> */}
			<div style={{ textAlign: 'end', marginLeft: 'auto', marginRight: 'auto' }}>
				{/* <Button
					variant="outlined"
					color="primary"
					onClick={returnToEditorCLick}
					endIcon={< KeyboardReturnIcon />}
					className={classes.ButtonMarginLeft}
				>
					Return To Editor
				</Button> */}
				<Button
					type="submit"
					variant="outlined"
					color="primary"
					disabled={!isValid || blnDisable}
					endIcon={<CheckIcon />}
					className={classes.ButtonMarginLeft}
				>
					{t("sign")}
				</Button>
				{/* <Button
					variant="outlined"
					color="primary"
					disabled={!isValid}
					onClick={sendClick}
					endIcon={<SendIcon />}
					className={classes.ButtonMarginLeft}
				>
					Send
				</Button> */}
			</div>
		</form>
	);
};
