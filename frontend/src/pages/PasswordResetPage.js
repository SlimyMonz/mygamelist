import React, { useEffect, useState } from 'react';
import MainLogin from '../components/MainLogin';
import Footer from '../components/Footer';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


let verifyId = '0';

const PasswordResetPage = () =>
{

    
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
   
  
    console.log(verifyId);
    
    let renderCheck = false;
    

    const [stuff, setStuff] = useState('hellooooooo');
    const [messageReset, setMessage] = useState('');
    const [pass, setPass] = useState('');
    const [resetShow, setShow] = useState(false);
    const [toastShow, setToast] = useState(false);
    const [toastMsg, setMsg] = useState('');
    

    useEffect(() => 
    {
      const urlParams = new URLSearchParams(window.location.search);
      
      //Checks the url for the userId parameter. If it exists,
      //assume the user has arrived via verification link and
      //call the verify API
      if(urlParams.has('userId'))
      {
          verifyId = urlParams.get('userId');
          //alert(( "yo" + verifyId));
          setShow(true);

          // const js = JSON.stringify({userId:verifyId, password: password});
          // try
          // {
          //   fetch(buildPath('api/users/passwordReset'),
          //        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}
          //   )
          //   .then(response => response.json()
          //   .then(json => {
          //     alert(json.message);
          //   }));
          //   console.log("renderrrrr worked");
          // }
          // catch(e)
          // {
          //   alert(e.toString());
          // }
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
    const doReset = async () => 
    {
        //event.preventDefault();
        //alert("user: " + this.state.userName + " pass: " + this.state.password);
        let obj = {userId:verifyId, password: pass};
        let js = JSON.stringify(obj);

        try
        {    
            let build = buildPath('api/users/passwordReset');
            //alert(build);
            //alert(pass);
            //alert(verifyId);

            const resetRes = await fetch(buildPath('api/users/passwordReset'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                //alert("past the fetch");
                
            if (resetRes.status === 404)
            {
                //alert("404");
                //alert(await resetRes.text());
                
                return;
            }

            if (resetRes.status !== 200 )
            {
                
                //alert(await response.text());
                //alert("not 200");
                return;
            }
            if (resetRes.status === 200)
            {
                
                //alert(await resetRes.text());
                setMsg("Your password was reset! Redirecting you shortly...");
                setToast(true);
                return;
            }

        
            //let res = JSON.parse(await emailRes.text());

            
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
        //alert("why u refreshing");
    };

    const onHideReset = () =>{
        
      setPass('');
      setShow(false);

    }

  
    const onkeyPressReset = (e) =>{

      //e.preventDefault();
      if(e.keyCode === 13) 
      {
         handleReset();
         e.preventDefault();
      }
    
    }
    const handleReset = async () =>{
      //alert("start");
      console.log(pass);
      //call password reset api
      await doReset();
      //alert("did we reset yet?");
      onHideReset();
      //this.setState({resetShow: false});
    }

    const handleToast = () =>{
      //alert("start");
      setToast(false);
      window.location.href = '/';
    }


    function change()
    { console.log("workingggg");
      setStuff('yooooo');
    }


    return(
      
      <div>
       
          
            
        {/* password reset modal */}
        <Modal show={resetShow} onHide={() => {onHideReset();console.log("ayy");}}>
              <Modal.Header closeButton>
                  <Modal.Title>
                      Enter New Password
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group className ="mb-3" controlid="passInput">
                          <FloatingLabel label = "Password">
                              <Form.Control type = "password" placeholder="email" value ={pass}
                                          onChange ={e => {setPass(e.target.value)}}
                                          onKeyDown={onkeyPressReset}
                              />
                              <Form.Text id="passwordHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                  {messageReset}
                              </Form.Text>
                          </FloatingLabel>
                      </Form.Group>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  {/* <FloatingLabel className='alert'>Forgot Password?</FloatingLabel> */}
                  <Button variant="secondary" onClick={() => {onHideReset();}}>Close</Button>
                  <Button variant="primary" onClick={() => {handleReset();}}>Submit</Button>
              </Modal.Footer>
        </Modal>

        <ToastContainer className="p-3" position='middle-start'>
                    <Toast onClose={() => handleToast()} show={toastShow} delay={5000} autohide>
                        <Toast.Header>
                        <strong className="me-auto">Alert!</strong>
                        <small></small>
                        </Toast.Header>
                        <Toast.Body>{toastMsg}</Toast.Body>
                    </Toast>
                </ToastContainer>

        <Footer/>
       
      </div>
    );
};

export default PasswordResetPage;



