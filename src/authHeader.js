export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.data.token) {
    // for Node.js Express back-end authorization
    //return { "x-access-token": user.token };
    return { "x-access-token": user.data.token };
  } else {
    return {};
  }
}
