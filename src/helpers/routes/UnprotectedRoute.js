import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getAuth } from 'store/auth/selectors';

export default function UnprotectedRoute({ component, children, ...rest }) {
  const { token } = useSelector(getAuth);

  if (!token) {
    return component
      ? <Route {...rest} component={component} />
      : <Route {...rest}>{children}</Route>;
  }

  return <Redirect to="/" />;
}
