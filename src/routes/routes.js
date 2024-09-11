import React, { lazy, memo, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoutesFile from './routeFile';
const Login = lazy(() => import('../components/login'));

const RoutesList = memo(() => {

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {RoutesFile.map((itm, key) =>
                        <Route
                            key={key}
                            exact={itm.exact}
                            path={itm.path}
                            name={itm.name}
                            Component={itm.component}
                        />
                    )}
                </Routes>
            </Suspense>
        </Router>
    );
});

export default RoutesList;
