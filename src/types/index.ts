import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router-dom'

interface RouteExtensions {
  title?: string;
  Icon?: (props: Partial<object>) => React.ReactElement | null;
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: Array<RouteObject & RouteExtensions>;
}

export type CustomRoute = (IndexRouteObject | CustomNonIndexRouteObject ) &  RouteExtensions;
