/* eslint-disable camelcase */
import { store } from 'store';
import { api } from './api-helper';

const UNKNOWN_ERROR_CODE = 'UNKNOWN_ERROR_CODE';
const UNKNOWN_ERROR_STATUS = 504;
const NETWORK_ERROR = 'Network Error';

function ApiError(error) {
  const { response, config: requestConfig, stack } = error;
  this.name = 'ApiError';
  this.requestConfig = requestConfig;
  this.stack = stack;

  if (response) {
    this.status = response.status ?? UNKNOWN_ERROR_STATUS;

    if (response.data) {
      this.code = response.status ?? UNKNOWN_ERROR_CODE;
      this.message = response.data.message ?? NETWORK_ERROR;
    } else {
      this.code = response.status;
    }
  } else {
    this.status = UNKNOWN_ERROR_STATUS;
    this.code = UNKNOWN_ERROR_CODE;
    this.message = NETWORK_ERROR;
  }
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

api.interceptors.request.use((config) => {
  const state = store.getState();

  if (state.auth && state.auth.token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${state.auth.token}`,
      },
    };
  }
  return config;
});

api.interceptors.response.use(
  undefined,
  (error) => Promise.reject(new ApiError(error)),
);
