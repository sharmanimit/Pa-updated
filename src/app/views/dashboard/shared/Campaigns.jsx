import React, { Component } from "react";
import { useTranslation } from "react-i18next";

import { SimpleCard, MatxProgressBar } from "./../../../../matx";

const Campaigns = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SimpleCard title="Campaigns">
        <small className="text-muted">{t("today")}</small>
        <div className="pt-8" />
        <MatxProgressBar value={75} color="primary" text="Google (102k)" />
        <div className="py-4" />
        <MatxProgressBar value={45} color="secondary" text="Twitter (40k)" />
        <div className="py-4" />
        <MatxProgressBar value={75} color="primary" text="Facebook (80k)" />

        <div className="py-12" />
        <small className="text-muted">{t("yesterday")}</small>
        <div className="pt-8" />
        <MatxProgressBar value={75} color="primary" text="Google (102k)" />
        <div className="py-4" />
        <MatxProgressBar value={45} color="secondary" text="Twitter (40k)" />
        <div className="py-4" />
        <MatxProgressBar value={75} color="primary" text="Facebook (80k)" />

        <div className="py-12" />
        <small className="text-muted">{t("yesterday")}</small>
        <div className="pt-8" />
        <MatxProgressBar value={75} color="primary" text="Google (102k)" />
        <div className="py-4" />
        <MatxProgressBar value={45} color="secondary" text="Twitter (40k)" />
        <div className="py-4" />
        <MatxProgressBar value={75} color="primary" text="Facebook (80k)" />
      </SimpleCard>
    </div>
  );
};

export default Campaigns;
