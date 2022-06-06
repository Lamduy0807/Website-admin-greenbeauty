import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../Context/UserContext/UserContext';
export default function PrivateRoute({ children, ...rest }) {
    let {isLogin} = useContext(UserContext);
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isLogin? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }