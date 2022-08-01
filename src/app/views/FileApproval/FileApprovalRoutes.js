import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const FileApproval = MatxLoadable({
    loader: () => import('./FileApproval')
})
const fileApproveRoutes = [
    {
        path: "/costa/file/approval",
        component: FileApproval,
        auth: authRoles.admin
    }
];

export default fileApproveRoutes;
