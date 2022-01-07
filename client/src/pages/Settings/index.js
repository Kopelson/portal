import React, { useState, useEffect }  from "react";
import { Link } from 'react-router-dom';
import Jumbotron from "../../components/Jumbotron";
import Button from "../../components/Button";
import fire from '../../utils/firebase';
import API from '../../utils/API';

import './styles.css';


function Settings() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "",
    suite: "" 
  });
  const [error, setError] = useState();

  useEffect(() => {
    let componentMounted = true;
      const fetchData = async () => {
       //you async action is here
       const uid = fire.auth().currentUser.uid
        API.getUser(uid).then((response) => {
          if(componentMounted) {
            setFormData(response?.data);
          }
        })
      }
      fetchData();
      return () => {
       componentMounted = false;
      }
    }, []);

  //this handles changes to the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name === "") {
      setError("Please enter your name");
    } else if (formData.email === "") {
      setError("Please enter your email address");
    } else if (formData.suite === "") {
      setError("Please enter your suite number");
    } else {
      setError("");
      const uid = fire.auth().currentUser.uid
      API.updateUser(uid, formData)
        .then(() => {
          setError(
            "Your name has been updated. Go back to the dashboard to view the change"
          );
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to update user");
        });
    }
  };

  return (
    <div>
      <Jumbotron
        title="Settings"
        body={error}
      />
        <div className='sign-in-container'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
            value={formData.name}
              type="text"
              id="name"
              name="name"
              maxLength="32"
              autoComplete="name"
              spellCheck="false"
              autoFocus
              required
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email address</label>
            <input
              value={formData.email}
              type="email"
              id="email"
              name="email"
              autoCapitalize="off"
              autoComplete="email"
              spellCheck="false"
              required
              onChange={handleInputChange}
            />
            <label htmlFor="suite">Suite Number</label>
            <input
              value={formData.suite}
              type="text"
              id="suite"
              name="suite"
              autoCapitalize="off"
              spellCheck="false"
              required
              onChange={handleInputChange}
            />
            <Button 
              label="Edit"
              classes="btn"
            />
          </form>
          </div>
        <Link to="/">
          <Button
            label="Home"
            classes="btn"
          />
          </Link>
    </div>
  );
}

export default Settings;