// eslint-disable-next-line
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { publicRoutes, privateRoutes } from './routes';
//import cookies from 'react-cookies';

function App() {
  // const token = localStorage.getItem('token');
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  // const getUser = () => {
  //   const user = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   dispatch(login({ user: user, token: token }));
  // };

  useEffect(() => {
    // getUser();
  });
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {token &&
          privateRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  token ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}
      </Routes>
    </Router>
  );
}

export default App;
