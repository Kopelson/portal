import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import fire from "../../utils/firebase";
import './styles.css';


function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
      let componentMounted = true;
      const fetchData = async () => {
      const uid = fire.auth().currentUser.uid;
      if(uid){
        API.getUser(uid)
        .then((res) => {
          console.log(res);
          if(componentMounted){
            if(res.data.roles.indexOf('admin') !== -1){
              setIsAdmin(true);
            }
          }
        })
        .catch((err) => {
          if(err){
            setHasError(true);
            setIsAdmin(false); 
          }
        });
      } else {
        console.log("cannot get UID")
      }
    }
      fetchData();
      return () => {
        componentMounted = false;
       }
    }, []);

    useEffect(() => {
      let componentMounted = true;
      const fetchData = async () => {
        API.getUsers().then((response) => {
          if(componentMounted) {
            setUsers(response?.data);
          }
        })
      };
      fetchData();
      return () => {
       componentMounted = false;
      }
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
        <table id="users">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Suite</th>
            <th>Roles</th>
            <th>Receive emails</th>
            <th>Receive texts</th>
            <th>Receive alerts</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        {users.length ? (
          users.map(user => (
            <tr>
              <td>
                {user.name}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.suite}
              </td>
              <td>
                {user.roles.map(role => (role))}
              </td>
              <td>
                {user.receive_emails ? ("yes") : ("no")}
              </td>
              <td>
                {user.receive_texts ? ("yes") : ("no")}
              </td>
              <td>
                {user.receive_alerts ? ("yes") : ("no")}
              </td>
              <td>
              X
              </td>
              <td>
              X
              </td>
           </tr>
          ))
        ): (
          <tr>
            <td>
              NA
            </td>
            <td>
            NA
            </td>
            <td>
            NA
            </td>
            <td>
              NA
            </td>
            <td>
            NA
            </td>
            <td>
            NA
            </td>
            <td>
              NA
            </td>
            <td>
            NA
            </td>
            <td>
            NA
            </td>
          </tr>
        )}</table>
        
      </div>
    )
  }

    
      
    </div>
  );
}

export default Admin;