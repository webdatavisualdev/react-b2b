import axios from 'axios';

export const BASEURL = window.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASEURL,
  headers: {
    'content-type': 'application/json',
  },
});

async function request({
  method = 'get', url, params, data, headers
}) {
  const response = await api.request({
    method,
    url,
    params,
    data,
    headers
  });
  return response.data;
}

export function get(url, params) {
  return request({
    method: 'get',
    url,
    params,
  });
}

export function post(url, data, headers) {
  return request({
    method: 'post',
    url,
    data,
    headers
  });
}

export function put(url, data) {
  return request({
    method: 'put',
    url,
    data,
  });
}

export function patch(url, data) {
  return request({
    method: 'patch',
    url,
    data,
  });
}

export function remove(url, data) {
  return request({
    method: 'delete',
    url,
    data,
  });
}
