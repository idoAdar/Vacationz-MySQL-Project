import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomeScreen from './containers/HomeScreen/HomeScreen';
import RegisterScreen from './containers/RegisterScreen/RegisterScreen';
import LoginScreen from './containers/LoginScreen/LoginScreen';
import NewVacationScreen from './containers/NewVacationScreen/NewVacationScreen';
import EditVacationScreen from './containers/EditVacationScreen/EditVacationScreen';
import StatisticsScreen from './containers/StatisticsScreen/StatisticsScreen';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ErrorScreen from './containers/ErrorScreen/ErrorScreen';
import PrivateRoute from './utills/PrivateRoute';
import './App.css';

const App = props => {
  const location = useLocation();

  return (
    <Fragment>
      <div className={'layout'}>
        <Navbar />
        <main>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path={'/'} exact component={HomeScreen}/>
              <Route path={'/register'} component={RegisterScreen}/>
              <Route path={'/login'} component={LoginScreen}/>
              <PrivateRoute path={'/admin/new-vacation'} component={NewVacationScreen} isAdmin={props.isAdmin}/>
              <PrivateRoute path={'/admin/update-vacation/:vacationId'} component={EditVacationScreen} isAdmin={props.isAdmin}/>
              <PrivateRoute path={'/admin/statistics'} component={StatisticsScreen} isAdmin={props.isAdmin}/>
              <Route path={'/'} component={ErrorScreen}/>
            </Switch>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isAdmin: state.authReducer.isAdmin
  }
}

export default connect(mapStateToProps, null)(App);