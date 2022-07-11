import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Validate from './Validate';

class RegisterModal extends Component
{

    constructor(props)
    {
        super(props);

        this.state = 
        {
        
            firstName: '',
            lastName: '',
            eMail: '',
            userName: '',
            password: '',
            message: '',
            success: false,
            dynamicMessage: '',
            dynamicFailurePass: false,
            dynamicFailureEmail: false,
            dynamicFailureFname: false,
            dynamicFailureLname: false,
            dynamicFailureUsername: false
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

    doRegister = async () => 
    {
        //event.preventDefault();
        //alert("user: " + this.state.userName + " pass: " + this.state.password);
        let obj = 
        {   //to do, remove trailing whitespaces? Specifically from login and password
            firstName:this.state.firstName, 
            lastName:this.state.lastName, 
            email:this.state.eMail,  
            login:this.state.userName, 
            password:this.state.password
        };

        let js = JSON.stringify(obj);

        //alert(js);

        try
        {    
            let build = this.buildPath('api/register');
            //alert(build);
            const response = await fetch(this.buildPath('api/register'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            //alert("we arrived past the api!");

            let res = JSON.parse(await response.text());

            //alert(res.id);
            //alert("res status: " + res.status);
            this.setMessage('');
            this.state.success = true;
        }
        catch(e)
        {
            //alert("we here");
            alert(e.toString());
            this.setMessage("Couldn't register!");
        }    
    };

    setMessage = (msg) =>{
        this.setState({ message: msg})
    }

    onSubmit = async () =>{
        //console.log(this.state.userName + " " + this.state.password);
        
        //alert(this.state.userName + " " + this.state.eMail + " " + this.state.firstName + " " + this.state.lastName);
        //check if valid stuff
        //to do: check for valid email format
        //password reverification
        //email verification
        if(this.state.firstName && this.state.lastName && this.state.eMail && this.state.password && this.state.userName)
        {
            //alert("we got past the truthy");
            if(this.state.firstName.trim().length !=0 && this.state.lastName.trim().length !=0 && this.state.eMail.trim().length !=0 && this.state.password.trim().length !=0 && this.state.userName.trim().length !=0)
            {
                //alert("we past the trimmy");
                await this.doRegister();
            }
            else
            {
                this.setMessage("plz input a valid value!"); 
            }
        }
        else
        {
            this.setMessage("plz input a valid value!");
        }

        
        if(this.state.success)
        {
            //todo: turn this into a toast?
            alert("you registered homie!");
            this.state.success = false;
            this.props.onClick({msg: 'Modal Sumbitted'}); //dis hides da modal
            this.setState(
                {
                    firstName: '',
                    lastName: '',
                    eMail: '',
                    userName: '',
                    password: '',
                }
            )

            
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
                firstName: '',
                lastName: '',
                eMail: '',
                userName: '',
                password: '',
            }
        )
        console.log(this.state.userName + " " + this.state.eMail + " " + this.state.firstName + " " + this.state.lastName);
        this.setMessage('');

    }

    onkeyPress = (e) =>{

        if(e.keyCode === 13) 
        {
           this.onSubmit();
        }
    }
    handleDynamicError(e, inputType)
    {

        console.log("what we working with here: " + e + " " + inputType);
        if(Validate(e, inputType))
        {
            this.setState({dynamicMessage: ""});
            this.setState({dynamicFailure: false});
        }
        else
        {
            
            switch(inputType)
            {
                case "userName":

                    break;
                case "password":
                
                    break;
                case "firstName":
                
                    break;
                case "lastName":
                
                    break;
                case "eMail":
                    //alert(inputType);
                    this.setState({dynamicFailureEmail: true});
                    break;
                
            }
            this.setState({dynamicMessage: "you don goofed"});
            
        }
        

    }

    render()
    {
        return(
        
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
                            <Form.Group className ="mb-3" controlid="firstInput">
                                <FloatingLabel label = "First Name">
                                    <Form.Control type = "text" placeholder="firstName" value ={this.state.firstName} autoFocus 
                                                  onChange ={e => {this.setState({ firstName: e.target.value});this.handleDynamicError(e.target.value, 'firstName');}}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="lastInput">
                                <FloatingLabel label = "Last Name">
                                    <Form.Control type = "text" placeholder="lastName" value ={this.state.lastName}
                                                  onChange ={e => {this.setState({ lastName: e.target.value});this.handleDynamicError(e.target.value, 'lastName');}}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="mailInput">
                                <FloatingLabel label = "E-mail">
                                    <Form.Control type = "text" placeholder="eMail" value ={this.state.eMail}
                                                  onChange ={e => {this.setState({ eMail: e.target.value});this.handleDynamicError(e.target.value, 'eMail');}}
                                                  isInvalid={this.state.dynamicFailureEmail}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="userInput">
                                <FloatingLabel label = "Username">
                                    <Form.Control type = "text" placeholder="userName" value ={this.state.userName}
                                                  onChange ={e => {this.setState({ userName: e.target.value});this.handleDynamicError(e.target.value, 'userName');}}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="passInput">
                                <FloatingLabel label = "Password">
                                    <Form.Control type = "password" placeholder="password" value ={this.state.password}
                                                  onChange ={e => {this.setState({ password: e.target.value});this.handleDynamicError(e.target.value, 'password');}}
                                                  onKeyDown={this.onkeyPress}
                                    />
                                    <Form.Text id="passwordHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                    {this.state.dynamicMessage}   
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.onHide();}}>Close</Button>
                        <Button variant="primary" onClick={() => {this.onSubmit();}}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
} 

export default RegisterModal;

