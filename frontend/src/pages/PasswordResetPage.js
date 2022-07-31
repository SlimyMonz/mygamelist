import React, { useEffect, useState } from 'react';
import MainLogin from '../components/MainLogin';
import Footer from '../components/Footer';


const PasswordResetPage = () =>
{

    
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    console.log(currentUrl);
    console.log(currentPath);
    
    let renderCheck = false;

    const [stuff, setStuff] = useState('hellooooooo');

    useEffect(() => 
    {
      const urlParams = new URLSearchParams(window.location.search);
      
      //Checks the url for the userId parameter. If it exists,
      //assume the user has arrived via verification link and
      //call the verify API
      if(urlParams.has('userId'))
      {
          const verifyId = urlParams.get('userId');
          const js = JSON.stringify({verifyId:verifyId});
          try
          {
            fetch(buildPath('api/users/passwordReset'),
                 {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}
            )
            .then(response => response.json()
            .then(json => {
              alert(json.message);
            }));
            console.log("renderrrrr worked");
          }
          catch(e)
          {
            alert(e.toString());
          }
      }
      else
      {
        console.log("renderrrrr nooooo");
      }

      
    }, [renderCheck]);

    const app_name = 'my-game-list-front'

    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production')
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5000/' + route;
        }
    }


    function change()
    { console.log("workingggg");
      setStuff('yooooo');
    }


    return(
      
      <div>
       
          
            
         
          <Footer/>
       
      </div>
    );
};

export default PasswordResetPage;



