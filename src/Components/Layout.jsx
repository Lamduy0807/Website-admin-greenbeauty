import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  import UserProvider from '../Context/UserContext/UserProvider';
  import AuthProvider from '../Context/AuthContext/AuthProvider'
  import Login from '../Pages/Login'
  import PrivateRoute from '../Routes/PrivateRoute';
  import Home from '../Pages/Home';
const Layout = () => {
  return (
    <UserProvider>
        <AuthProvider>
            <Router>
                <div >
                    <Switch>
                        <Route path={'/login'}>
                            <Login/>
                        </Route>
                        <PrivateRoute path="/">
                            <Home/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    </UserProvider>
  )
}

export default Layout