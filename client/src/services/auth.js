import axios from "axios";

const signup = (username, email, password) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, { username, email, password })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete(`${process.env.REACT_APP_API_URL}/api/auth/logout`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};


export { signup, login, logout, };
