import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import Jumbotron from "../../components/Jumbotron";
// import Button from "../../components/Button";
import API from "../../utils/API";
import fire from "../../utils/firebase";

import './styles.css';

function Home() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    suite: "",
    receive_emails: false,
    receive_texts: false,
    receive_alerts: false,
    roles: ""
  });
  const [hasError, setHasError] = useState(false);

  const getUser = () => {
    console.log(fire.auth().currentUser);
    const uid = fire.auth().currentUser.uid
    API.getUser(uid)
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      if(err){
       setHasError(true);
       setUser({
        name: "",
        email: "",
        suite: "",
        receive_emails: false,
        receive_texts: false,
        receive_alerts: false,
        roles: ""
       }) 
      }
    }
    );
  };

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if(componentMounted){
        getUser();
      }
    }
    fetchData();
      return () => {
        componentMounted = false;
      }
  }, []);

  return (
  <div>
    {hasError ? (
      <div>
        Something Went Wrong
      </div>
    ) : (
      <div>
        <section>
        <Jumbotron
          title={"Hello "+ user.name + "!"}
          subtitle={"Email: " + user.email + " | Suite: " + user.suite}
          body={"Message of the Day: Welcome to the Liberty Lake Portal! "}
        />
        <h1>Emails: {user.receive_emails ? "yes":"no"}</h1>
        <h1>Texts: {user.receive_texts ? "yes":"no"}</h1>
        <h1>Notifications: {user.receive_alerts ? "yes":"no"}</h1>
        <h1>Roles: {user.roles}</h1>
        </section>
      </div>
    )
  }
    </div>
  );
}

export default Home;