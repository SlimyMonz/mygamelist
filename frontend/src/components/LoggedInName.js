import React from 'react';
import jwt_decode from "jwt-decode";
import { Button } from 'react-bootstrap';



function LoggedInName()
{
	
    let userInfo = localStorage.getItem('user');
   //let decoded = jwt_decode(localStorage.getItem('user'));
    //alert("we can get: " + JSON.stringify(decoded, null, 4));
    //alert("we can even get: " + JSON.stringify(decoded.user[0].userName, null, 4));
    //alert(decoded.user[0]._id);
    
    let dynamicLogged;

    //to do: use states to not have to re-render everything on logout?
    const doLogout = event => 
    {
      const currentPath = window.location.pathname;
	    event.preventDefault();

        localStorage.removeItem("user")
        window.location.href = currentPath;

    };   

    
    
    if(userInfo)
    {

        let decoded = jwt_decode(localStorage.getItem('user'));
        dynamicLogged = 

        <div id="loggedInDiv">
          {/* <h4 id="userName">{decoded.user[0].userName}</h4><br /> */}
         
            <Button variant="secondary" id="logoutButton" onClick={doLogout}>Log Out</Button>
        </div>


    }
    else
    {
      
        dynamicLogged = 

        <div id="loggedInDiv">
        </div>
       
    }

  return(
   <div>
      {dynamicLogged}
   </div>
  );

};

export default LoggedInName;
