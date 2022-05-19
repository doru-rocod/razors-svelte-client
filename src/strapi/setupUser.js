import { setUser, setStorageUser } from "../stores/user";

function setupUser(response) {
  const { jwt } = response.data;
  const { username } = response.data.user;
  const user = { username, jwt };
  setStorageUser(user);
  setUser(user);
}

export function logout() {
  localStorage.clear();
  setUser({ user: null, jwt: null });
}
export default setupUser;
