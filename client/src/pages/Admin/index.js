import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import fire from "../../utils/firebase";

import './styles.css';

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    const getUser = () => {
      const uid = fire.auth().currentUser.uid
      API.getUser(uid)
      .then((res) => {
        console.log(res)
        if(res.data.roles.indexOf('admin') !== -1){
            setIsAdmin(true);
        }
      })
      .catch((err) => {
        if(err){
          setHasError(true);
          setIsAdmin(false); 
        }
      }
      );
    };
  
    useEffect(() => {
      getUser();
    }, []);

  return (
    <div>
    {hasError || !isAdmin ? (
      <div>
        Oops! Something Went Wrong.
      </div>
    ) : (
      <div>
        <h1>Admin Page</h1>
      </div>
    )
  }

    
      
    </div>
  );
}

export default Admin;