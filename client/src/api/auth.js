import axios from "axios"

// { token: Token, name: String, manager: Boolean }
export const login = (data) =>
   axios
  .post("http://localhost:5555/api/auth/login", data)
  .then((res) => res.data)

export const register = async (data) => {
  console.log('data',data);

  return await axios
    .post("http://localhost:5555/api/auth/register", data)
    .then((res) => res.data)
    .catch((err)=>console.log(err))
}
export const promoteToManager = () =>
  axios
    .put("http://localhost:3000/api/auth/promote/to/manager", null, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => localStorage.setItem("manager", "true"))
