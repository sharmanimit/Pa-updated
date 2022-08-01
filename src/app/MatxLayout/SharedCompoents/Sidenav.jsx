import React, { Component, Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import { navigations } from "../../navigations";

import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import MatxVerticalNav from "../../../matx/components/MatxVerticalNav/MatxVerticalNav";
import { withTranslation } from "react-i18next";
import { Icon, Tooltip } from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';


class Sidenav extends Component {
  state = {};

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  renderOverlay = () => (
    <div
      onClick={() => this.updateSidebarMode({ mode: "close" })}
      className="sidenav__overlay"
    />
  );
  render() {

    const { t } = this.props

    const navigations = [
      {
        name: t("dashboard"),
        path: "/eoffice/dashboard/analytics",
        icon: <Tooltip title={t("dashboard")} aria-label="Dashboard"  marginTop="10px"><DashboardIcon fontSize="small" style={{ marginTop: '-10px' }} /></Tooltip>
      },
      {
        name: t("inbox"),
        path: "/eoffice/inbox/file",
        icon: <Tooltip title={t("inbox")} aria-label="Inbox"><DraftsOutlinedIcon fontSize="small" style={{ marginTop: '-10px' }} /></Tooltip>
      },
      {
        name: t("outbox"),
        path: "/eoffice/outbox/file",
        icon: <Tooltip title={t("outbox")} aria-label="Outbox"><OpenInBrowserIcon fontSize="small" style={{ marginTop: '-10px' }} /></Tooltip>
      },
      {
        name: t("pa"),
        path: "/eoffice/personnel/file",
        icon: <Tooltip title={t("pa")} aria-label="PA"><MoveToInboxIcon fontSize="small" style={{ marginTop: '-10px' }} /></Tooltip>
      },
      // {
      //   name: t("initiate"),
      //   path: "/eoffice/initiate/file",
      //   icon: <Tooltip title={t("initiate")} aria-label="Initiate"><ViewQuiltIcon fontSize="normal" style={{ marginTop: '-10px' }} /></Tooltip>
      // },
    ];

    return (
      <Fragment>
        <Scrollbar option={{ suppressScrollX: true }} className="scrollable position-relative">
          {this.props.children}
          <MatxVerticalNav navigation={navigations} />
        </Scrollbar>
        {this.renderOverlay()}
      </Fragment>
    );
  }
}
Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      setLayoutSettings
    }
  )(withTranslation()(Sidenav))
);
