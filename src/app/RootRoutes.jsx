import React from "react";
import { Redirect } from "react-router-dom";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import inboxRoutes from "./views/inbox/InboxRoutes";
import materialRoutes from "./views/material-kit/MaterialRoutes";
import initiateRoutes from "./views/initiate/InitiateRoutes";
import formsRoutes from "./views/forms/FormsRoutes";
import outboxRoutes from "./views/outbox/OutboxRoutes";
import StartProcessPage from "./views/initiate/shared/startProcess/StartProcessPage";
import initiateFileRoutes from "./views/FileSend/InitiateFileRoutes";
import  fileApproveRoutes from "./views/FileApproval/FileApprovalRoutes";
import PersonnelRoutes from "./views/Personnel/PersonnelRoutes";
import MisRoutes from "./views/mis/MisRoutes";

const redirectRoute = [
    {
        path: "/eoffice",
        exact: true,
            component: () => <Redirect to="/eoffice/dashboard/analytics" />
            // component: () => <Redirect to="/costa/mis/file" />
    }
];

const startProcess = [
    {path: "/eoffice/startprocess/key/:process",

        exact: true,
        component: {StartProcessPage},
    }
]

const routes = [
    ...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...formsRoutes,
    ...initiateRoutes,
    ...initiateFileRoutes,
    ...fileApproveRoutes,
    ...PersonnelRoutes,
    ...MisRoutes,
    ...inboxRoutes,
    ...outboxRoutes,
    ...sessionRoutes,
    ...redirectRoute,
    ...startProcess,
];

export default routes;
