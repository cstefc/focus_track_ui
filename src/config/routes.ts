import Dashboard from "../sections/Dashboard";
import Login from "../sections/Login";
import Calendar from "../sections/Calendar";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "",
    component: Dashboard,
    name: "Home Screen",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
  {
    path: "/calendar",
    component: Calendar,
    name: "Calendar Screen",
    protected: true,
  },
];

export default routes;
