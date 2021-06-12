import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAdmin, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={() => {
            return isAdmin === 1 ? <Component /> : <Redirect to={'/'}/>
        }}/>
    )
}

export default PrivateRoute;