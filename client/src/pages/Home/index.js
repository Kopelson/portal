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
    suite: ""
  });

  const getUser = () => {
    const uid = fire.auth().currentUser.uid
    API.getUser(uid).then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {/* <div className="settings-container">
        <Link to="/settings">
          <i className="fas fa-user settings-icon"></i>
         </Link>  
       </div> */}
      <section>
      <Jumbotron
        title={"Hello "+ user.name + "!"}
        subtitle={"Email: " + user.email + " | Suite: " + user.suite}
        body={"Message of the Day: Welcome to the Liberty Lake Portal! "}
      />
      {/* <Button 
        label="Submit a Ticket" 
        classes="btn" 
      /> */}
      </section>
    </div>
  );
}

export default Home;