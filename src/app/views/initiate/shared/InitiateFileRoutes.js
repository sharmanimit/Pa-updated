import { MatxLoadable } from "./../../../matx";
import { authRoles } from "../../auth/authRoles";

const FileSend = MatxLoadable({
    loader: () => import('./FileSend')
})

const startProcess = MatxLoadable({
  loader: () => import("./shared/startProcess/StartProcessPage")
})
const initiateFileRoutes = [
    {
        path: "/costa/initiate/file/send",
        component: FileSend
    }
];

export default initiateFileRoutes;
