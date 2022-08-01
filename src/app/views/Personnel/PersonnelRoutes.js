import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";


const Personnel = MatxLoadable({
    loader: () => import('./Personnel')
})

const FileView = MatxLoadable({
    loader: () => import('./FileViewTable')
})
const PersonnelRoutes = [
    {
        path: "/eoffice/personnel/file",
        component: Personnel,
        auth: authRoles.admin
    },
    {
        path: "/eoffice/personnel/fileview",
        component: FileView,
        auth: authRoles.admin
    }
];

export default PersonnelRoutes;