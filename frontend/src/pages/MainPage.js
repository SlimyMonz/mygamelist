import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import MainLogin from '../components/MainLogin';
import { Container, Row, Col } from 'react-bootstrap';
import ps4 from '../ps4Transparent.png';
import xbox from '../xboxTransparent.png';
import switchPic from '../switchTransparent.png';
import Card from 'react-bootstrap/Card';
import CSS from './MainPage.css';
import {Button} from 'react-bootstrap';
//import {withRouter} from 'react-router-dom';

//this is the main page of the site
//should display multiple clickable consoles that then display popular games
//PageTitle is a component that displays the title of the page

const MainPage = () =>
{

    
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    console.log(currentUrl);
    console.log(currentPath);
    
    let renderCheck = false;

    const [stuff, setStuff] = useState('hellooooooo');

    useEffect(() => 
    {
      const abortCont = new AbortController();
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
            fetch(buildPath('api/users/verify'),
                 {method:'POST',body:js,headers:{'Content-Type': 'application/json'}, signal: abortCont.signal}
            )
            .then(response => response.json()
            .then(json => {
              alert(json.message);
            }));
            console.log("renderrrrr worked");
          }
          catch(e)
          {
            if(e.name === 'AbortError')
            {
              console.log("fetch aborted");
            }
            alert(e.toString());
          }
      }
      else
      {
        console.log("renderrrrr nooooo");
      }

      //clean up dem memory leaks
      return () => {abortCont.abort();}

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

    function buildPlatformPath(platform)
    {
        return 'https://' + app_name +  '.herokuapp.com/games/?platform=' + platform;
    }

    function change()
    { console.log("workingggg");
      setStuff('yooooo');
    }


    return(
      <div>
           
        
        {/*alert("did we get here!")}*/}
        <MainLogin />

          <Container className="gamePics">
          <Row className="rows">
            <Col className="columns">
              <Card 
              bg="light"
              border="secondary"
              key="Primary"
              style={{width:'18rem',
              height:'350px'}}
              className="mb-2"
              
              >
                <a href={buildPlatformPath('PlayStation4')}target="_blank" rel="noreferrer">
                <Card.Img className='consolepics' variant="top" src={ps4}/>
                </a>
                <Card.Body className='consoleText'>
                  <Card.Title> PlayStation 4 Games</Card.Title>
                  <Card.Text>Check out some PlayStation 4 games!</Card.Text>
                </Card.Body>
                
              </Card>
            </Col>

             <Col className="columns">
              <Card
              border="secondary"
              style={{width:'18rem',
              height:'350px'}}
              className="mb-2"
              >
            <a href= {buildPlatformPath('Xbox')} target="_blank" rel="noreferrer">
              <Card.Img className='consolepics' variant='top' src={xbox}/>
            </a>
              <Card.Body className='consoleText'>
                <Card.Title>Xbox One Games</Card.Title>
                <Card.Text>Check out some Xbox One games!</Card.Text>
              </Card.Body>
            
            </Card>
            </Col>  
            
            <Col className="columns">
              <Card
              border="secondary"
              style={{width:'18rem',
              height:'350px'}}
              className="mb-2"
              >
                <a href= {buildPlatformPath('Switch')} target="_blank" rel="noreferrer">
                  <Card.Img className='consolepics' variant='top' src={switchPic}/>
                </a>
                  <Card.Body className='consoleText'>
                    <Card.Title>Nintendo Switch Games</Card.Title>
                    <Card.Text>Check out some Nintendo Switch games!</Card.Text>
                  </Card.Body>
                  
                
              </Card>
            </Col>
            
          </Row> 
        </Container>     
        {/* {stuff};
        <Button onClick={() => {change()}}>press</Button> */}
      </div>
    );
};

export default MainPage;



