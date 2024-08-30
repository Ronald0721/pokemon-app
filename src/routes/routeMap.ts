import { ComponentType } from "react";
import { Home, PokemonProfile } from "../pages";
import NoMatch from "../components/NoMatch/NoMatch";

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
  {
    component: PokemonProfile,
    path: "/pokemon/:id",
    exact: true,
  },
  {
    component: NoMatch,
    path: "*",
  },
];

export default routeMap;
