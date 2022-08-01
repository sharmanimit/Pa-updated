
import { authRoles } from "../../auth/authRoles";
import {MatxLoadable} from "../../../matx";

const File = MatxLoadable({
  loader: () => import("./File")
})

const outboxRoutes = [
  {
    path: "/eoffice/outbox/file",
    component: File,
    auth: authRoles.admin
  }
];

export default outboxRoutes;
