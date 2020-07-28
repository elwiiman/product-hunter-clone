import React, { useState, useEffect } from "react";
import firebase from "../firebaseModule";

function useAuthentication() {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
      console.log("im heeere");
    });
    return () => {
      console.log("im here now");
      unsuscribe();
    };
  }, []);

  return userAuth;
}

export default useAuthentication;
