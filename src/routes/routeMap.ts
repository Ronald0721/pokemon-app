import { ComponentType } from "react";
import { Home } from "../pages";

interface RouteType {
  component: ComponentType;
  path: string;
  exact?: boolean;
}

const routeMap: Array<RouteType> = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
];

export default routeMap;
