import axios from "axios";
import url from "./URL";
import setupUser from "./setupUser";

async function registerUser({ email, password, username }) {
  const response = await axios
    .post(`${url}/api/auth/local/register`, {
      email,
      password,
      username,
    })
    .catch((error) => console.log("eroarea este asta", error.response));
  if (response) {
    //setup user
    setupUser(response);
  }
  return response;
}

export default registerUser;
