import React, { useState, useEffect, Suspense } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <Router>
      <div className="MainApp">
        <NavBarWithRouter />
        <main className="main">
          {data ? (
            <>
              <Route exact path="/" component={Home} />
              {data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import(`./components/${route.component}`));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    render={(props) => (
                      <Suspense fallback={<FallbackSpinner />}>
                        <SectionComponent {...props} header={route.headerTitle} />
                      </Suspense>
                    )}
                  />
                );
              })}
            </>
          ) : (
            <FallbackSpinner />
          )}
        </main>
      </div>
    </Router>
  );
}

export default MainApp;
