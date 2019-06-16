import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { logout } from '../store/actions/auth';

type logout = {
    onLogout: () => void;
};

const Logout = (props: logout) => {
    useEffect(() => {
        props.onLogout();
    }, []);

    return <Redirect to='/' />;
};

const mapDispatchToProps = (dispatch: DispatchProp['dispatch']) => {
    return {
        onLogout: () => dispatch(logout())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Logout);
