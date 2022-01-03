//import react and react hooks
import React, { useContext, useState, useEffect } from "react";
//import api routes
import API from "../utils/API";
//import firebase
import fire from "../utils/firebase";

import createNewUser from "../utils/createNewUser";

//create context
const AuthContext = React.createContext();
//export context
export const useAuth = () => {
  return useContext(AuthContext);
};
// initialize and export AuthProvider
export const AuthProvider = ({ children }) => {
  //set state hooks
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [mongoID, setMongoId] = useState();

  //this creates user on firebase
  const signUp = (email, password) => {
    return fire.auth().createUserWithEmailAndPassword(email, password);
  };
  //this logsIn the user on firebase
  const logIn = (email, password) => {
    return fire.auth().signInWithEmailAndPassword(email, password);
  };
  
  const passwordUpdate = (email) => {
    return fire.auth().sendPasswordResetEmail(email)
      .then(() => {
        // Email sent
        console.log("Email has been sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMongoID = (firebase_id) => {
    API.getUser(firebase_id).then((res) => {
      if(res.data === null){
        createNewUser();
      }
    });
  };
  //logs the user out of firebase
  const logout = () => {
    fire.auth().signOut();
  };
  //this side effect unsubscribes the user from firebase
  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      user ? getMongoID(user.uid) : setMongoId(false);
    });
    return unsubscribe;
  }, []);
  //this side effect grabs the user id from the data base
  useEffect(() => {
    let unsubscribe;
    if (currentUser && !loading) {
      unsubscribe = API.getUser(currentUser.uid).then((res) => {
        setMongoId(res.data._id);
      });
    }
    return unsubscribe;
  }, [currentUser]);
  //this is what sends through the Provider
  const value = {
    currentUser,
    signUp,
    logIn,
    logout,
    passwordUpdate,
    mongoID,
  };
  //this returns the different variables and functions when the Provider is used.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};