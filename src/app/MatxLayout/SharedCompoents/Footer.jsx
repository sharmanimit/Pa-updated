import React, { useEffect, useState } from "react";
import {
  withStyles,
  MuiThemeProvider,
  MenuItem,
  Menu,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import "./footer.css";

const languages = [
  {
    code: "hi",
    name: "हिन्दी",
  },
  {
    code: "en",
    name: "English",
  },
];

const Footer = ({ theme, settings, show }) => {
  const lang = Cookies.get("i18next");
  const { t } = useTranslation();
  const footerTheme = settings.themes[settings.footer.theme] || theme;

  const [anchorEl, setAnchorEl] = useState(null);
  const [zoomValue, setZoomValue] = useState(100);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.zoom = `${zoomValue}%`;
  }, [zoomValue]);

  return (
    <>
      <MuiThemeProvider theme={footerTheme}>
        <div style={{ display: show ? "block" : "none" }}>
          <div
            className="container"
            style={{
              padding: "0px !important",
              position: "fixed",
              bottom: "0px",
              justifyContent: "space-around",
              backgroundColor: "rgb(82 81 81)",
              width: "100%",
              display: "flex",
              height: "27px",
            }}
          >
            <div className="eOffice">
              <p
                style={{
                  fontSize: "12px",
                  position: "relative",
                  color: "#fff",
                  margin: "auto",
                  marginTop: "5px",
                  right:"10em"
                }}
              >
                &reg; {t("indian_airforce_automated_cell")}
              </p>
            </div>
            <div className="versions">
              <p
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  position: "relative",
                  margin: "auto",
                  marginTop: "5px",
                }}
                onClick={() => setOpen(true)}
              >
                v1.1.1
              </p>
            </div>
            <div style={{ display: "flex", justifyContent:"space-around" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "1rem",
                 

                }}
              >
                <select
                  className="select"
                  onChange={(e) => setZoomValue(e.target.value)}
                  value={zoomValue}
                  style={{
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    backgroundColor: "rgb(82 81 81)",

                   
                  }}
                >
                  <option className="options_zoom" value={90}>
                    90%
                  </option>
                  <option className="options_zoom" value={100}>
                    100%
                  </option>
                  <option className="options_zoom" value={110}>
                    110%
                  </option>
                </select>
                <div />
              </div>
              <div style={{ display: "flex",marginLeft:"-30px" }}>
                {languages.map(({ code, name }) => (
                  <p
                    onClick={() => i18next.changeLanguage(code)}
                    style={{
                      padding: "0 .5rem",
                      color: lang === code ? "#fff" : "rgb(180 177 177)",
                      cursor: "pointer",
                      margin: "auto",
                      marginTop: "5px",
                      
                    }}
                  >
                    {name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <div>
            <p style={{ fontWeight: "bold" }}>Frontend Version - 1.0.0</p>
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}>Backend Versions</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

Footer.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.layout.settings,
});

export default withStyles(
  {},
  { withTheme: true }
)(connect(mapStateToProps, {})(Footer));
