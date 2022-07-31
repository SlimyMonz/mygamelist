//import { useState } from 'react';

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import jwt_decode from "jwt-decode";
import './LoginModalStyles.css';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


class LoginModal extends Component 
{

    constructor(props)
    {
        super(props);

        this.state = 
        {
        
            userName: '',
            password: '',
            message: '',
            messageReset: '',
            success: false,
            resetShow: false,
            email: '',
            toastShow: false,
            toastMsg: ""
        }
    }

    app_name = 'my-game-list-front';

    buildPath = (route) =>
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + this.app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
        
    }

    doLogin = async () => 
    {
        //event.preventDefault();
        //alert("user: " + this.state.userName + " pass: " + this.state.password);
        let obj = {userName:this.state.userName, password:this.state.password};
        let js = JSON.stringify(obj);

        try
        {    
            //let build = this.buildPath('api/login');
            const response = await fetch(this.buildPath('api/users/login'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            if (response.status !== 200 )
            {
                
                //alert(await response.text());
                if (response.status === 401)
                {
                    this.setMessage('Your account is not verified');
                }
                else
                {
                    this.setMessage('Invalid User/Password combination');
                }
                
                return;
            }

        
            let res = JSON.parse(await response.text());

            //alert(res.token);
            if(!res.token)
            {
                //this.setMessage('User/Password combination incorrect');
                //alert("local storage is: " + localStorage.getItem('user_data'));
            }
            else
            {
                
                //let user = {firstName:res.firstName,lastName:res.lastName,id:res.id, userName:res.userName}
                // localStorage.setItem('user_data', JSON.stringify(user));
                localStorage.setItem('user', res.token);
                console.log("local storage is: " + localStorage.getItem('user'));
                //let decoded = jwt_decode(localStorage.getItem('user'));
                //alert("we can get: " + JSON.stringify(decoded, null, 4));
                //alert("we can even get: " + JSON.stringify(decoded.user[0].userName, null, 4));
                //alert(decoded.user[0]._id);

                //session storage makes it so it clears storage upon refresh/closing the browser
                //sessionStorage.setItem('user', res.token);
                //alert("session storage is: " + sessionStorage.getItem('user'));

                //let gimmie = localStorage.getItem('user_data');
                //let gimmieMoar = JSON.parse(gimmie);
                //alert("parsed local storage is: " + gimmieMoar);
                
                
                //alert("hello: " + gimmieMoar.id + " " + gimmieMoar.firstName);
                //fine for string but need to convert locastorage.getitem using stringify or parse

                this.setMessage('');
                this.state.success = true;
            }
        }
        catch(e)
        {
            alert(e.toString());
        }    
    };
    doReset = async () => 
    {
        //event.preventDefault();
        //alert("user: " + this.state.userName + " pass: " + this.state.password);
        let obj = {email:this.state.email};
        let emailBody = JSON.stringify(obj);

        try
        {    
            let build = this.buildPath('api/email/passwordReset');
            //alert(build);
            //alert(this.state.email);

            const emailRes = await fetch(this.buildPath('api/email/passwordReset'),
                {method:'POST',body:emailBody,headers:{'Content-Type': 'application/json'}});

                //alert("past the fetch");
                
            if (emailRes.status === 404)
            {
                //alert("404");
                //alert(await emailRes.text());
                this.setState({toastMsg: "We're sorry but your email was not found"});
                this.setState({toastShow: true});
                return;
            }

            if (emailRes.status !== 200 )
            {
                
                //alert(await response.text());
                //alert("not 200");
                return;
            }
            if (emailRes.status === 200)
            {
                this.setState({toastMsg: "We've sent a password reset email to " + this.state.email});
                this.setState({toastShow: true});
                //alert(await emailRes.text());
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


    

    setMessage = (msg) =>{
        this.setState({ message: msg})
    }

    onSubmit = async () =>{
        //console.log(this.state.userName + " " + this.state.password);
        
 
        await this.doLogin();

        if(this.state.success)
        {
            this.props.onClick({msg: 'Modal Sumbitted'}); //dis hides da modal
            //to do: change this to homepage, we have no way to get to games so leaving it for now
            //const currentPath = window.location.pathname;
            //window.location.href = currentPath; 
            //alert(window.location.href);
            window.location.href = '/games';
        }
        else
        {

            
        }
    }

    onHide = () =>{
        console.log(this.state.userName + " " + this.state.password);
        this.props.onHide({msg: 'we exited da modal'});
        this.setState(
            {
                userName: '',
                password: ''
            }
        )
        console.log(this.state.userName + " " + this.state.password);
        this.setMessage('');

    }
    onHideReset = () =>{
        
        this.setState({email: ''});
        this.setState({resetShow: false});

    }

    onkeyPress = (e) =>{

        if(e.keyCode === 13) 
        {
           this.onSubmit();
        }

    }
    onkeyPressReset = (e) =>{

        //e.preventDefault();
        if(e.keyCode === 13) 
        {
           this.handleReset();
           e.preventDefault();
        }
        

    }
    handleReset = async () =>{
        //alert("start");
        console.log(this.state.email);
        //call password reset api
        await this.doReset();
        //alert("did we reset yet?");
        this.onHideReset();
        //this.setState({resetShow: false});
    }
    handleResetShow = () =>{
        //alert("hello");
        this.onHide();
        this.setState({resetShow: true});
        console.log("does this happen");
    }

    render()
    {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => {this.onHide();console.log("ayy");}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.body}
                        <Form>
                            <Form.Group className ="mb-3" controlid="topInput">
                                <FloatingLabel label = "Username">
                                    <Form.Control type = "text" placeholder="username" value ={this.state.userName} autoFocus
                                                onChange ={e => this.setState({ userName: e.target.value})}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="bottomInput">
                                <FloatingLabel label = "Password">
                                    <Form.Control type = "password" placeholder="password" value ={this.state.password}
                                                onChange ={e => this.setState({ password: e.target.value})}
                                                onKeyDown={this.onkeyPress}
                                    />
                                    <Form.Text id="passwordHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                        {this.state.message}
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                        </Form>
                        Forgot Password? <a class="tooltip-test" onClick={() => {this.handleResetShow();}} title="Clicky" className='pw'>Reset Here</a>  
                        
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <FloatingLabel className='alert'>Forgot Password?</FloatingLabel> */}
                        <Button variant="secondary" onClick={() => {this.onHide();}}>Close</Button>
                        <Button variant="primary" onClick={() => {this.onSubmit();}}>Submit</Button>
                    </Modal.Footer>
                </Modal>

                {/* password reset modal */}
                <Modal show={this.state.resetShow} onHide={() => {this.onHideReset();console.log("ayy");}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            PasswordReset
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className ="mb-3" controlid="emailInput">
                                <FloatingLabel label = "Email">
                                    <Form.Control type = "text" placeholder="email" value ={this.state.email}
                                                onChange ={e => this.setState({ email: e.target.value})}
                                                onKeyDown={this.onkeyPressReset}
                                    />
                                    <Form.Text id="passwordHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                        {this.state.messageReset}
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <FloatingLabel className='alert'>Forgot Password?</FloatingLabel> */}
                        <Button variant="secondary" onClick={() => {this.onHideReset();}}>Close</Button>
                        <Button variant="primary" onClick={() => {this.handleReset();}}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer className="p-3" position='middle-start'>
                    <Toast onClose={() => this.setState({toastShow: false})} show={this.state.toastShow} delay={5000} autohide>
                        <Toast.Header>
                        <strong className="me-auto">Alert!</strong>
                        <small></small>
                        </Toast.Header>
                        <Toast.Body>{this.state.toastMsg}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        )
    };
}

export default LoginModal;