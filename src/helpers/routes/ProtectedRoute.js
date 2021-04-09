import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import authActions from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';
import { decodeJWT } from 'utils/auth';

export default function ProtectedRoute({
  component, wrapper, children, ...rest
}) {
  const { token } = useSelector(getAuth);
  const dispatch = useDispatch();

  try {
    if (token) {
      const tokenDecoded = decodeJWT(token);

      // if token is expired
      if (Date.now() - tokenDecoded.exp * 1000 > 0) {
        throw new Error('Token Expired');
      }

      return component && !wrapper
        ? <Route {...rest} component={component} />
        : <Route {...rest}>{children}</Route>;
    }
  } catch (err) {
    dispatch(authActions.logout());

    return <Redirect to="/login" />;
  }

  return <Redirect to="/login" />;
}
