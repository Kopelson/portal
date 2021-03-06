import React, { useState, useEffect }  from "react";
import { Link } from 'react-router-dom';
import Jumbotron from "../../components/Jumbotron";
import Button from "../../components/Button";
import fire from '../../utils/firebase';
import API from '../../utils/API';
import { getAuth, updateEmail, updateProfile  } from "firebase/auth";


import './styles.css';

const signOut = () => {
  fire.auth().signOut();
  window.location.reload();
}

function Settings() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "",
    suite: "" ,
    receive_emails: false,
    receive_texts: false,
    receive_alerts: false
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
    console.log(formData);
  };

  //this handles changes to the form
  const handleCheckboxChange = (e) => {
    let { name, value } = e.target;
    console.log(value);
    if(value === "true"){
      console.log("on is now off")
      value= false;
    }
    if(value === "false"){
      console.log("off is now on")
      value= true;
    }
    setFormData({ ...formData, [name]: value });
    console.log(formData);
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
      // Updates Firebase Authentication Profile
      const auth = getAuth();   
      updateProfile(auth.currentUser, {displayName : formData.name})
      .catch((error) => {
          setFormData({ ...formData, name: auth.currentUser.displayName })
          setError("Failed to update user - " + error.message); 
          updateDatabase(error.message);
         
      })
      
      updateEmail(auth.currentUser, formData.email)
      .catch((error) => {
        setFormData({ ...formData, email: auth.currentUser.email })
        setError("Failed to update user - "  + error.message); 
        updateDatabase(error.message);
        
      })

      updateDatabase()
  
    }
  };

  const updateDatabase = (message) => {
    const uid = fire.auth().currentUser.uid
        console.log(formData);
        API.updateUser(uid, formData)
        .then(() => {
          setError(
            "Your account has been updated. Go back to the home to view the change"
          );
          if(message){
            setError(message);
          }
        })
        .catch((err) => {
          setError("Failed to update user"); 
        });
  }

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
            <label htmlFor="receive_texts">Receive Emails</label>
            <input
            
              type="checkbox"
              value={formData.receive_emails  ? true : false}
              checked={formData.receive_emails}
              id="receive_emails"
              name="receive_emails"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="receive_texts">Receive Texts</label>
            <input
          
              type="checkbox"
              value={formData.receive_texts ? true : false}
              checked={formData.receive_texts}
              id="receive_texts"
              name="receive_texts"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="receive_alerts">Receive Notifications</label>
            <input

              value={formData.receive_alerts ? true : false}
              checked={formData.receive_alerts}
              type="checkbox"
              id="receive_alerts"
              name="receive_alerts"
              onChange={handleCheckboxChange}
            />
            <Button 
              label="Edit"
              classes="btn"
            />
          </form>
          </div>
        <div className="nav-button-container">   
          <Link to="/">
            <Button
              label="Home"
              classes="btn"
            />
          </Link>
          <Button
            classes="btn"
            onClick={signOut}
            label="Sign Out"
          />
      </div>
    </div>
  );
}

export default Settings;