import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Validate from './Validate';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

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
            dynamicMessagePass: '',
            dynamicMessageEmail: '',
            dynamicMessageFname: '',
            dynamicMessageLname: '',
            dynamicMessageUsername: '',
            dynamicFailurePass: false,
            dynamicFailureEmail: false,
            dynamicFailureFname: false,
            dynamicFailureLname: false,
            dynamicFailureUsername: false,
            buttonDisabled: false,
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

    doRegister = async () => 
    {
        //event.preventDefault();
        //alert("user: " + this.state.userName + " pass: " + this.state.password);
        let obj = 
        {   //to do, remove trailing whitespaces? Specifically from login and password
            firstName:this.state.firstName, 
            lastName:this.state.lastName, 
            email:this.state.eMail,  
            userName:this.state.userName, 
            password:this.state.password
        };

        let js = JSON.stringify(obj);
        //alert(js);

        try
        {    
            //let build = this.buildPath('api/register');
            //alert(build);
            
            const response = await fetch(this.buildPath('api/users/register'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            if (response.status === 409)
            {
                alert(await response.text());
                return;
            }
            else if (response.status === 200)
            {
                const regRes = await response.json();
    
                let emailBody = JSON.stringify({email: regRes.email, id:regRes.userId, firstName:regRes.firstName});
    
                const emailRes = await fetch(this.buildPath('api/email/sendVerification'),
                {method:'POST',body:emailBody,headers:{'Content-Type': 'application/json'}});
                
                if (emailRes.status === 404)
                {
                    alert(await emailRes.text());
                    
                }
    
                //let res = JSON.parse(await response.text());
    
                //alert(res.id);
                //alert("res status: " + res.status);
                if (emailRes.status === 200)
                {
                
                    this.setState({toastMsg: "You've regisered! An email has been sent to verify your account!"});
                    this.setState({toastShow: true});
                    
                }
                
                this.state.success = true;
            }

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
            if(this.state.firstName.trim().length !==0 && this.state.lastName.trim().length !==0 && this.state.eMail.trim().length !==0 && this.state.password.trim().length !==0 && this.state.userName.trim().length !==0)
            {
                //alert("we past the trimmy");
                await this.doRegister();
            }
            else
            {
                this.setMessage("please fill out all forms!"); 
            }
        }
        else
        {
            this.setMessage("please fill out all forms!");
        }

        
        if(this.state.success)
        {
            //todo: turn this into a toast?
            //alert("you registered!");
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
                message: '',
                dynamicFailureUsername: false,
                dynamicFailurePass: false,
                dynamicFailureEmail: false,
                dynamicFailureFname: false,
                dynamicFailureLname: false,
                dynamicMessageUsername: "",
                dynamicMessagePass: "",
                dynamicMessageEmail: "",
                dynamicMessageFname: "",
                dynamicMessageLname: "",
                buttonDisabled: false
                
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
            
            
            switch(inputType)
            {
                case "userName":
                    this.setState({dynamicFailureUsername: false});
                    this.setState({dynamicMessageUsername: ""});
                    this.setMessage("");
                    break;
                case "password":
                    this.setState({dynamicFailurePass: false});
                    this.setState({dynamicMessagePass: ""});
                    this.setMessage("");
                    break;
                case "firstName":
                    this.setState({dynamicFailureFname: false});
                    this.setState({dynamicMessageFname: ""});
                    this.setMessage("");
                    break;
                case "lastName":
                    this.setState({dynamicFailureLname: false});
                    this.setState({dynamicMessageLname: ""});
                    this.setMessage("");
                    break;
                case "eMail":
                    this.setState({dynamicFailureEmail: false});
                    this.setState({dynamicMessageEmail: ""});
                    this.setMessage("");
                    break;
            }
            this.setState({buttonDisabled: false});
        }
        else
        {
            
            switch(inputType)
            {
                case "userName":
                    if(e === '')
                    {
                        this.setState({dynamicFailureUsername: false});
                        this.setState({dynamicMessageUsername: ""});
                    }
                    else
                    {
                        this.setState({dynamicFailureUsername: true});
                        this.setState({dynamicMessageUsername: "username invalid!"});
                    }
                    break;
                case "password":
                    if(e === '')
                    {
                        this.setState({dynamicFailurePass: false});
                        this.setState({dynamicMessagePass: ""});
                    }
                    else
                    {
                        this.setState({dynamicFailurePass: true});
                        this.setState({dynamicMessagePass: "password invalid!"});
                    }
                    break;
                case "firstName":
                    if(e === '')
                    {
                        this.setState({dynamicFailureFname: false});
                        this.setState({dynamicMessageFname: ""});
                    }
                    else
                    {
                        this.setState({dynamicFailureFname: true});
                        this.setState({dynamicMessageFname: "first name invalid!"});
                    }
                    break;
                case "lastName":
                    if(e === '')
                    {
                        this.setState({dynamicFailureLname: false});
                        this.setState({dynamicMessageLname: ""});
                    }
                    else
                    {
                        this.setState({dynamicFailureLname: true});
                        this.setState({dynamicMessageLname: "last name invalid!"});
                    }
                    break;
                case "eMail":
                    if(e === '')
                    {
                        this.setState({dynamicFailureEmail: false});
                        this.setState({dynamicMessageEmail: ""});
                    }
                    else
                    {
                        this.setState({dynamicFailureEmail: true});
                        this.setState({dynamicMessageEmail: "email invalid!"});
                    }
                    break;
                
            }
            
            //this.setState({dynamicMessage: "you don goofed"});
            this.setState({buttonDisabled: true});
            
        }
        
        if(this.state.dynamicFailureUsername || this.state.dynamicFailurePass)
        {
            this.setState({buttonDisabled: true});
        }
        else
        {

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
                                                  isInvalid={this.state.dynamicFailureFname}
                                    />
                                    <Form.Text id="fnameHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                    {this.state.dynamicMessageFname}   
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="lastInput">
                                <FloatingLabel label = "Last Name">
                                    <Form.Control type = "text" placeholder="lastName" value ={this.state.lastName}
                                                  onChange ={e => {this.setState({ lastName: e.target.value});this.handleDynamicError(e.target.value, 'lastName');}}
                                                  isInvalid={this.state.dynamicFailureLname}
                                    />
                                    <Form.Text id="lnameHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                    {this.state.dynamicMessageLname}   
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="mailInput">
                                <FloatingLabel label = "E-mail">
                                    <Form.Control type = "text" placeholder="eMail" value ={this.state.eMail}
                                                  onChange ={e => {this.setState({ eMail: e.target.value});this.handleDynamicError(e.target.value, 'eMail');}}
                                                  isInvalid={this.state.dynamicFailureEmail}
                                    />
                                    <Form.Text id="mailHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                    {this.state.dynamicMessageEmail}   
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="userInput">
                                <FloatingLabel label = "Username">
                                    <Form.Control type = "text" placeholder="userName" value ={this.state.userName}
                                                  onChange ={e => {this.setState({ userName: e.target.value});this.handleDynamicError(e.target.value, 'userName');}}
                                                  isInvalid={this.state.dynamicFailureUsername}
                                    />
                                    <Form.Text id="userHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                    {this.state.dynamicMessageUsername}   
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="passInput">
                                <FloatingLabel label = "Password">
                                    <Form.Control type = "password" placeholder="password" value ={this.state.password}
                                                  onChange ={e => {this.setState({ password: e.target.value});this.handleDynamicError(e.target.value, 'password');}}
                                                  onKeyDown={this.onkeyPress} isInvalid={this.state.dynamicFailurePass}
                                    />
                                    <Form.Text id="passwordHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                    {this.state.dynamicMessagePass}   
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.message}
                        <Button variant="secondary" onClick={() => {this.onHide();}}>Close</Button>
                        <Button variant="primary" disabled={this.state.buttonDisabled} onClick={() => {this.onSubmit();}}>Submit</Button>
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
        );
    }
} 

export default RegisterModal;

