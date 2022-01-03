/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firebaseID, setFirebaseID] = useState();
  const [error, setError] = useState();


  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (isLoggedIn && user) {
        setFirebaseID(user.uid);
      }
      return (
        user ? setIsLoggedIn(true) : setIsLoggedIn(false), setFirebaseID(false)
      );
    });
  }, [isLoggedIn]);

  useEffect(() => {
    let unsubscribe;
    if (isLoggedIn) {
      unsubscribe = API.getUser(firebaseID)
        .then(() => {
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
    return unsubscribe;
  }, [firebaseID, error]);

  return (
    <div>
      <AuthProvider>
          <Router>
            {!isLoggedIn && !error ? (
              <>
                <Switch>
                  <Route exact path="/">
                    <SignIn />
                  </Route>
                </Switch>
              </>
            ) : (
              <div>
                <Header />
                  <Switch>
                    <Route exact path={["/"]}>
                      <Dashboard />
                    </Route>
                    <Route>
                      <NoMatch />
                    </Route>
                  </Switch>
               <Footer />
              </div>
            )}
          </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
