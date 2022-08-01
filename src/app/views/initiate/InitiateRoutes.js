import { MatxLoadable } from "./../../../matx";
import { authRoles } from "../../auth/authRoles";

const File = MatxLoadable({
  loader: () => import("./File")
})

const startProcess = MatxLoadable({
  loader: () => import("./shared/startProcess/StartProcessPage")
})
const initiateRoutes = [
  {
    path: "/eoffice/initiate/file",
    component: File,
    auth: authRoles.admin
  }

  // {
  //   path: "/eoffice/:processDefinitionId/:taskId",
  //   component: File
  // }
];

export default initiateRoutes;
