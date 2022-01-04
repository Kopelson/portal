import firebase from "firebase/app";
import "firebase/auth";

import API from "./API";

//this creates an new user in database if firebase user doesn't exist
function createNewUser() {
    console.log(firebase.auth().currentUser);
    let name = firebase.auth().currentUser.displayName;
    let nameArr = name.split(" ");
    let firstName = nameArr[0];
    let lastName = nameArr[1];
    let email = firebase.auth().currentUser.email;
    let firebase_uid = firebase.auth().currentUser.uid;
    API.createUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      firebase_uid: firebase_uid
    }).then((res) => {
      window.location.reload();
    }).catch((err) => {
        console.log(err.message);
    });
  };

export default createNewUser;