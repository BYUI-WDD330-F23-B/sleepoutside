// import * as jwt_decode from 'jwt-decode';
const baseURL = import.meta.env.VITE_SERVER_URL;
//import utils and external services
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { loginRequest, findProductById, checkout, getProductsByCategory } from "./externalServices.mjs";
// import { jwt_decode } from "jwt-decode";
const { default: jwt_decode } = require("jwt-decode");

// a login function that takes 2 args, a credentials object and a redirect url
// Define the login function that takes a credentials object and a redirect url as arguments
export async function login(credentials, redirectUrl) {
  // send a post request to the server with the credentials, expected object format:{email: "email", password: "password"}
  // if the request is successful, redirect to the redirectUrl
  // if the request is not successful, show an alert

  // We call the loginRequest function passing in the credentials. wrapped in a try catch block
  try {
    const token = loginRequest(credentials);
    //save the token to local storage under so_token
    setLocalStorage("so_token", token);
    window.location.href = redirectUrl;
  }
  catch(e){
    // TODO: Replace with alert functionality once its fixed
    alert("Login failed" + e.message.message);
  }
}

// A function to verify if the user is authenticated
export async function checkLogin(){
  // get the token from local storage
  const token = getLocalStorage("so_token");
  // check if the token is valid
  if(isTokenValid(token)){
    return token;
  } else {
    // remove the token from local storage
    setLocalStorage("so_token", "");
    const redirectUrl = window.location;
    // redirect to the login page
    window.location= `/login/index.html?redirect=${redirectUrl.pathname}`;
    return false;
  }
}



// A function to check an authentication token
function isTokenValid(token){
  // Perform the token verification logic here
  try {
    const currentDate = new Date();
    const decodedToken = jwt_decode(token); // Assuming you have imported jwt_decode library
    //check if the token is expired
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      // Token is expired
      return false;
    } else {
      // Token is not expired
      return true;
    }
  } catch (error) {
    // Handle any errors that occur during token verification
    console.error("Error verifying token:", error);
    // Return false if there is an error verifying the token
    return false;
  }
  }