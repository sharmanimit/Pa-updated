import React, { Component, useEffect, useState } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import TableCard from "./TableCard";
import { useTranslation } from "react-i18next";
import CardDashboard from "./CardDashboard";
import BarDashboard from "./BarDashboard";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ErrorIcon from "@material-ui/icons/Error";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import EmailIcon from "@material-ui/icons/Email";
import { useDispatch, useSelector } from "react-redux";
import { instanceLoadBln } from "../../../camunda_redux/redux/ducks/passData";
import TimelineDashboard from "./TimelineDashboard";

import AOS from "aos";
import "aos/dist/aos.css";

const StatCards = (props) => {
  const [PACount, setPACount] = useState({});

  const callBackTotalCount = (val) => {
    setPACount(val);
  };
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const CardData = useSelector((state) => state.dashboard.getDashboardData);
  console.log("cardsData", CardData);

  // const Data = useSelector((state) => state.dashboard.getDashboardData);
  // console.log('Data', Data);

  useEffect(() => {
    // pdf webviewer Load only once
    dispatch(instanceLoadBln(true));
  }, []);

  AOS.init({
    offset: 200,
    duration: 600,
    easing: "ease-in-sine",
    delay: 300,
  });

  return (
    <Grid container spacing={1} justifyContent="center" className="mt-2">
      <Grid item xs={12} md={4}>
        <div data-aos="fade-down">
          <TimelineDashboard num={CardData} />
        </div>
        <div data-aos="fade-right">
          <BarDashboard num={CardData} />
        </div>
        <div data-aos="fade-right">
          <CardDashboard num={CardData} />
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        className="widget"
        style={{ marginBottom: "26px" }}
      >
        {/* <div  data-aos="fade-left"> */}{" "}
        <div data-aos="fade-left">
          <TableCard totalCountPA={callBackTotalCount} />
        </div>
      </Grid>
    </Grid>
  );
};

export default StatCards;
