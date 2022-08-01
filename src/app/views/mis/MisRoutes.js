import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const Mis = MatxLoadable({
    loader: () => import('./Mis')
});

const MisRoutes = [
    {
        path: "/eoffice/mis/file",
        component: Mis,
        auth: authRoles.admin
    }
];

export default MisRoutes;