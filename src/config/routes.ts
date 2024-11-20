import Login from "../screens/Login";
import Calendar from "../screens/Calendar";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";

interface RouteType {
    path: string;
    component: any;
    name: string;
    protected: boolean;
}

const routes: RouteType[] = [

    /* -----| Public Routes |----- */

    {
        path: "/login",
        component: Login,
        name: "Login Screen",
        protected: false,
    },
    {
        path: "",
        component: Home,
        name: "Home Screen",
        protected: false,
    },

    /* -----| Protected Routes |------ */

    {
        path: "/calendar",
        component: Calendar,
        name: "Calendar Screen",
        protected: true,
    },
    {
        path: "/dashboard",
        component: Dashboard,
        name: "Calendar Screen",
        protected: true,
    },
];

export default routes;
