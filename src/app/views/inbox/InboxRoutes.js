import { MatxLoadable } from "./../../../matx";
import { authRoles } from "../../auth/authRoles";

const File = MatxLoadable({
  loader: () => import("./File")
});
const HrmConcernedAgencyView = MatxLoadable({
  loader: () => import("./shared/HrmConcerned")
});
const HrmSection = MatxLoadable({
  loader: () => import("./shared/HrmSection")
});
const SplitView = MatxLoadable({
  loader: () => import("./shared/SplitView")
});

const inboxRoutes = [
  {
    path: "/eoffice/inbox/file",
    component: File,
    auth: authRoles.admin
  },
  {
    path: "/eoffice/hrmConcernedView/file",
    component: HrmConcernedAgencyView,
    auth: authRoles.admin
  },
  {
    path: "/eoffice/splitView/file",
    component: SplitView,
    auth: authRoles.admin
  },

  {
    path: "/eoffice/hrmSection/file",
    component: HrmSection,
    auth: authRoles.admin
  },
];

export default inboxRoutes;
