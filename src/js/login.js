import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

const urlParam = getParam("redirect");

//Next we add a listener for the login button
document.getElementById("login").addEventListener("click", function(event) {
  event.preventDefault();
  //get the username and password
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  login({ username, password }, urlParam);
  //redirect to the redirect url
  window.location.href = urlParam;
});

