//import react and react hooks
import React, { useState } from "react";

//import context
import { useAuth } from "../contexts/AuthContext";
//import route
import API from "../utils/API";

function SignIn() {
  //set state hooks
  const [formDisplay, setFormDisplay] = useState("Log In");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //grab the signup/login info from context
  const { signUp, logIn } = useAuth();


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name !== "firstName" && name !== "lastName") {
      setError("");
    }
    setFormData({ ...formData, [name]: value });
    passwordsMatch(name, value);
  };

  return (
   <div>

   </div>
  );
};

export default SignIn;