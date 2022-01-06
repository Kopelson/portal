import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import fire from "../../utils/firebase";


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
      <h1>Hello {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Suite: {user.suite}</p>
    </div>
  );
}

export default Home;