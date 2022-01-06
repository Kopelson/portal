import React, { useState, useEffect } from "react";
import Jumbotron from "../../components/Jumbotron";
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
      <section>
      <Jumbotron
        title={"Welcome "+ user.name + "!"}
        body={user.email}
      />
      </section>
    </div>
  );
}

export default Home;