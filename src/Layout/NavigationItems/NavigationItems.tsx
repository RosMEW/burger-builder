import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';

import { authState } from '../../store/reducers/authReducer';
import './NavigationItems.scss';

const NavigationItems = (props: { isAuthenticated: boolean }) => {
    return (
        <ul className='navigation-items'>
            <NavigationItem link='/' exact>
                Burger Builder
            </NavigationItem>
            {props.isAuthenticated ? (
                <React.Fragment>
                    <NavigationItem link='/orders'>Orders</NavigationItem>
                    <NavigationItem link='/logout'>Logout</NavigationItem>
                </React.Fragment>
            ) : (
                <NavigationItem link='/auth'>Sign Up</NavigationItem>
            )}
        </ul>
    );
};

const mapStateToProps = (state: { auth: authState }) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(NavigationItems);
