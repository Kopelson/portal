//import react and react hooks
import React, { useState, useEffect } from "react";
//import context
import { useAuth } from "../contexts/AuthContext";
//import routes
import API from "../utils/API";


function Home() {
  const [user, setUser] = useState({});
 
  const { currentUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = () => {
    API.getUser(currentUser.uid).then((res) => {
      setUser(res.data);
    });
  };


  return (
    <div>
      <h1>Hello {user.name}!</h1>
    </div>
  );
}
//exports the Dashboard page
export default Dashboard;