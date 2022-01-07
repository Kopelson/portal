import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from "../../components/Button";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import fire from "../../utils/firebase";

import './styles.css';

function Home() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    suite: ""
  });

  const getUser = () => {
    const uid = fire.auth().currentUser.uid
    API.getUser(uid).then((res) => {
      setUser(res.data);
    });
  };

  const signOut = () => {
    fire.auth().signOut();
    window.location.reload();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="settings-container">
        <Link to="/settings">
          <i className="fas fa-user settings-icon"></i>
         </Link>  
       </div>
      <section>
      <Jumbotron
        title={"Hello "+ user.name + "!"}
        subtitle={"Email: " + user.email + " | Suite: " + user.suite}
        body={"Message of the Day: Welcome to the Liberty Lake Portal! "}
      />
      </section>
      <div className="sign-out-container">
        <Button
          classes="btn"
          onClick={signOut}
          label="Sign Out"
        />
      </div>
      
    </div>
  );
}

export default Home;