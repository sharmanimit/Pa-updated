import {MatxLoadable} from "./../../../matx";

const AppDialog = MatxLoadable({
    loader: () => import("./dialog/AppDialog")
});
const AppIcon = MatxLoadable({
    loader: () => import("./icons/AppIcon")
});
const AppForm = MatxLoadable({
    loader: () => import("./forms/AppForm")
});


const materialRoutes = [
    {
        path: "/material/form",
        component: AppForm
    },
    {
        path: "/material/icons",
        component: AppIcon
    },
    {
        path: "/material/dialog",
        component: AppDialog
    },
]

export default materialRoutes;
