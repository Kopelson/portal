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
  const [hasError, setHasError] = useState(false);

  const getUser = () => {
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
        suite: ""
       }) 
      }
    }
    );
  };

  useEffect(() => {
    getUser();
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
        </section>
      </div>
    )
  
  
  }

    
      
    </div>
  );
}

export default Home;