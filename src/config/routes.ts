import Planning from "@/screens/Planning";
import Home from "@/screens/Home";
import Dashboard from "@/screens/Dashboard";
import Projects from "@/screens/Projects";

export interface RouteType {
    path: string;
    component: any;
    name: string;
    protected: boolean;
    navbar: boolean;
}

const routes: RouteType[] = [

    /* -----| Public Routes |----- */

    {
        path: "/login",
        // TODO
        // component: Login,
        component: Home,
        name: "Login",
        protected: false,
        navbar: false,
    },
    {
        path: "",
        component: Home,
        name: "Home",
        protected: false,
        navbar: false,
    },

    /* -----| Protected Routes |------ */

    {
        path: "/dashboard",
        component: Dashboard,
        name: "Dashboard",
        protected: true,
        navbar: true,
    },
    {
        path: "/planning",
        component: Planning,
        name: "Planning",
        navbar: true,
        protected: true,
    },
    {
        path: "/projects",
        component: Projects,
        name: "Projects",
        protected: true,
        navbar: true,
    },
];

export default routes;
