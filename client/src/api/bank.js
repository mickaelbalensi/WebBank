import axios from "axios"

export const borrow = (data) =>
  {
    return axios
    .post("http://localhost:4000/bankOperations/borrow", data, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
    .then((res) => {
        console.log('res data',res.data);
        return res.data})}

export const transfer = (data) =>
{
  return axios
  .post("http://localhost:4000/bankOperations/transfer", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
  .then((res) => {
      return res.data})}