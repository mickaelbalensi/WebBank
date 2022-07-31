import axios from "axios"

// { token: Token, name: String, manager: Boolean }
export const login = (data) =>
  axios
    .post("http://localhost:5555/api/user/login", data)
    .then((res) => res.data)
    .catch(console.error("erreur"))

export const register = async (data) =>
  axios
    .post("http://localhost:5555/api/user/register", data)
    .then((res) => res.data)
    .catch(console.error("erreur"))

export const promoteToManager = () =>
  axios
    .put("http://localhost:3000/api/auth/promote/to/manager", null, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => localStorage.setItem("manager", "true"))