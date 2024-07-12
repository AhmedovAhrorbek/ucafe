import { lazy } from 'react';
import type { CustomRoute } from '../types';

import { routes as authRoutes } from '../features/auth'


///// Global pages /////

const Root = lazy(()=>import("../views/root"));


 export const routes: CustomRoute[] = [
  {
    id:'root',
    title: "Ucafe",
    path: "/",
    element: <Root getRoutes={() => routes} />,
    loader: async () => null,
    errorElement: null,
    children: [
      /////  Routes ////////
    ],
  },
  authRoutes,
  {
    ////// not - found ///////
  }
]
