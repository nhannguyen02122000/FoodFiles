import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import LoadingScreen from './components/LoadingScreen';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/errors/notFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/auth',
    component: lazy(() => import('./views/auth/index'))
  },
  {
    path: '/',
    guard: AuthGuard,

    routes: [
      {
        exact: true,
        path: '/',
        component: () => <Redirect to="/ingredients" />
      },
      {
        exact: true,
        path: '/ingredients',
        component: lazy(() => import("./views/ingredients/ingredientsListView/index"))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
