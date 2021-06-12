import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authAction';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    const user = useSelector(state => state.authReducer.user);
    const isAdmin = useSelector(state => state.authReducer.isAdmin);
    const dispatch = useDispatch();

    return (
        <Fragment>
            <nav className={'navbar-main'}>
                <ul className={'nav'}>
                    <li>
                        <NavLink to={'/'} exact activeClassName={'active'}>
                            <i className="fas fa-home"></i>
                            Home
                        </NavLink>
                    </li>
                    {user && isAdmin === 1 && 
                    <Fragment>
                        <li>
                            <NavLink to={'/admin/new-vacation'} activeClassName={'active'}>
                                New Vacation
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/admin/statistics'}>
                                Statistics
                            </NavLink>
                        </li>
                    </Fragment>}
                    {user && (
                        <li>
                            <small><i className="fas fa-user"></i>{` Hi ${user.username}`}</small>
                        </li>
                    )}  
                </ul>
                <div className={'nav-left'}>
                    {user ? (
                        <li onClick={() => dispatch(logout())}>
                            <NavLink to={'/'}>
                                Logout
                            </NavLink>
                        </li>
                        ) : (
                        <li>
                            <NavLink to={'/register'}
                                activeClassName={'active'}>Signup
                            </NavLink>
                        </li>
                        )}  
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar;