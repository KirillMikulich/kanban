import axios from "axios";
import jwt_decode from "jwt-decode";

export const API_URL = "http://localhost:5001/api";

export async function fetchWithAuth(url: any, options: any) {
  options.withCredentials = true;

  const loginUrl = "/login"; //"/user/authenticate"

  const localToken = localStorage.getItem('token');

  if (!localToken) {
    return window.location.replace(loginUrl);
  }
  if (localToken) {
    let decodedToken: any = jwt_decode(localToken);//JSON.parse((localToken.split(".")[1]));
    if (Date.now() >= decodedToken.exp * 1000) {
      try {
        await refreshToken();
      } catch (e) {
        return  window.location.replace(loginUrl);
      }
    }

    options.headers.Authorization = `Bearer ${localToken}`;
  }

  return axios(`${API_URL}${url}`, options);
}

export function refreshToken() {
  return axios(`${API_URL}/user/refresh-token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.jwtToken);
        return res.data;
      }
      return Promise.reject();
    });
}

export const REQUEST_CONFIG = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
};
