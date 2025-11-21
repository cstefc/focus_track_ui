import PlanningScreen from "@/features/planning/PlanningScreen";
import Home from "@/features/home/Home";
import Dashboard from "@/features/dashboard/Dashboard";
import ProjectsScreen from "@/features/projects/ProjectsScreen";
import ProjectScreen from "@/features/project/ProjectScreen";

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
        component: PlanningScreen,
        name: "planning",
        protected: true,
        navbar: true,
    },
    {
        path: "/projects",
        component: ProjectsScreen,
        name: "projects",
        protected: true,
        navbar: true,
    },
    {
        path: "/projects/:id",
        component: ProjectScreen,
        name: "Project",
        protected: true,
        navbar: false,
    }
];

export default routes;
