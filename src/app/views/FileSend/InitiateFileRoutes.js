import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const FileSend = MatxLoadable({
    loader: () => import('./FileSend')
})
const initiateFileRoutes = [
    {
        path: "/costa/file/send",
        component: FileSend,
        auth: authRoles.admin
    }
];

export default initiateFileRoutes;
