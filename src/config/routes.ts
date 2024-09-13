import Home from "../screens/Home";
import Login from "../screens/Login";
import Calendar from "../screens/Calendar";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "",
    component: Home,
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
