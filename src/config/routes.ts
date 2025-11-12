import Planning from "@/features/planning/Planning";
import Home from "@/features/home/Home";
import Dashboard from "@/features/dashboard/Dashboard";
import Projects from "@/features/projects/Projects";

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
        name: "login",
        protected: false,
        navbar: false,
    },
    {
        path: "",
        component: Home,
        name: "home",
        protected: false,
        navbar: false,
    },

    /* -----| Protected Routes |------ */

    {
        path: "/dashboard",
        component: Dashboard,
        name: "dashboard",
        protected: true,
        navbar: true,
    },
    {
        path: "/planning",
        component: Planning,
        name: "planning",
        protected: true,
        navbar: true,
    },
    {
        path: "/projects",
        component: Projects,
        name: "projects",
        protected: true,
        navbar: true,
    },
];

export default routes;
