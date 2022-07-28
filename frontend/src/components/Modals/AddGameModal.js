import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import withRouter from '../withRouter';
import AddGame from '../AddGame';
import jwt_decode from "jwt-decode";




class GameAddModal extends Component
{

    _isMounted = false;

    constructor(props)
    {
        super(props);
        this.state =
        {
            show: this.props.show,
            rating: 0,
            dynamicRating: 0
        };
    }
    componentDidMount()
    {
        this._isMounted = true;
        console.log("modal mounted");
        console.log("our props say: " + this.props.loggedIn);
        if(this.props.loggedIn)
        {
            this.calculateValue(this.props.rowData);
            
        }
           
    }
    componentWillUnmount()
    {
        console.log("modal unmounted");
        this._isMounted = false;
    }

    app_name = 'my-game-list-front'

    buildPath(route)
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


    //Add games to a user's games list
    addUserGames = async (userId, gameIds, token) =>
    {
        let js = JSON.stringify({_id: userId, gameIds: gameIds});
       
        try
        {    
            let build = this.buildPath('api/games/addUserGames');
            //alert(build);
            //alert(ud);
            console.log("user id is: " + userId);
            console.log("game id is: " + gameIds);
            console.log("the token is: " + token)
            const response = await fetch(this.buildPath('api/games/addUserGames'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + token}});
            

            if (response.status === 401)
            {
                console.log("did it wait fail?");
                alert(await response.text());
                return;
            }

            console.log("did it wait?");
            alert(await response.text());
            return response;
            //let res = JSON.parse(await response.text());

        }
        catch(e)
        {
            alert(e.toString());
        }    
       
    }


    handleShow = () =>{

        console.log(this.loggedIn);
        this.setState({
            show: true,
        });
        
    };

    handleClose = () => {
        
        this.setState({
            show: false
        });
        // this.setState(() => {
        //     // Important: read `state` instead of `this.state` when updating.
        //     return {show: false}
        //   });

        console.log("from modal " + this.state.show);
        this.props.handleBoolean();

    };
    onkeyPress = (data, e) =>{

        if(e.keyCode === 13) 
        {
           console.log("first " + e.target.value);
           this.handleGameAdd(data, e);
        }
    }
    calculateValue = (data) => {
        
        
        console.log("Value-name: " + data.name + " value-rating: " + this.state.dynamicRating);

        if (this._isMounted)
        {

            //if found game:
            //console.log("did this happen");
            //this.setState({dynamicRating: 5});
            //else:
            this.setState({dynamicRating: 10});
            
        }

    };

    handleGamePage = (data, e) => {
        
        this.setState({
            show: false
        });
        console.log("name: " + data.name + " rating: " + this.state.rating);
        this.props.handleBoolean();
        //alert(data.id);
        //window.location.href = '/games/' + data.name;
        //this.props.router.navigate('/games/' + data.name, {state: {data: data}});
        //console.log(this.props.router.location);
        

    };
    //when not logged in
    handleGameAdd = async (data, e) => {
        
        let rating = 0;
        //console.log("name: " + data.name + " dynamicrating: " + this.state.dynamicRating + "rating: " + this.state.rating + "id: " + data._id);
        if(this.state.rating !== 0)
        {
            //use state rating
            console.log(this.state.rating);
            rating = this.state.rating;
        }
        else
        {
            //use dynamic
            console.log(this.state.dynamicRating);
            rating = this.state.dynamicRating;
        }
        //await AddGame(data._id);
        let ud = localStorage.getItem('user');
    
        let firstName;
        let lastName;
        let userId;
        let gameIdArray = [{id: data._id, rating: rating}];
    
        
    
        if(ud)
        {
            let decoded = jwt_decode(ud);
            userId = decoded.user[0]._id;
    
        }
        else
        {
    
        }
        //alert(ud);
        console.log(userId);
        console.log(gameIdArray[0].id + " " + gameIdArray[0].rating);
        await this.addUserGames(userId, gameIdArray, ud);


        console.log("last thing: are we waiting");
        this.setState({
            show: false
        });
        this.props.handleBoolean();
        //alert(data.id);
        //window.location.href = '/games/' + data.name;
        //this.props.router.navigate('/games/' + data.name, {state: {data: data}});
        //console.log(this.props.router.location);
        

    };

    render()
    {
        
        return(
            <div>
                {this.state.dynamicRating !== 0 ? //we are logged in
                    <div><Modal show={this.state.show} onHide={() => {this.handleClose()}}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {this.props.rowData.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className ="mb-3" controlid="ratingSelectLogged">
                                    <Form.Label>Your Score</Form.Label>
                                        <Form.Select aria-label="Adding a game to your list and rating it" 
                                        onKeyDown={(e) => this.onkeyPress(this.props.rowData, e)} 
                                        onChange={(e) => {this.setState({rating: e.target.value})}}
                                        defaultValue={this.state.dynamicRating}
                                        >
                                        <option value="10">10 (Masterpiece)</option>
                                        <option value="9">9 (Great)</option>
                                        <option value="8">8 (Very Good)</option>
                                        <option value="7">7 (Good)</option>
                                        <option value="6">6 (Fine)</option>
                                        <option value="5">5 (Ehhh)</option>
                                        <option value="4">4 (Bad)</option>
                                        <option value="3">3 (Very Bad)</option>
                                        <option value="2">2 (Horrible)</option>
                                        <option value="1">1 (Mastertrash)</option>
                                        </Form.Select>
                                </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {this.handleClose()}}>Close</Button>
                            <Button variant="primary" onClick={() => {this.handleGameAdd(this.props.rowData)}}>Game Page</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                :
                    //we are not logged in
                    <Modal show={this.state.show} onHide={() => {this.handleClose()}}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        Login or Register to add games to your personal list!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.handleClose()}}>Close</Button>
                        {/* <Button variant="primary" onClick={() => {this.handleGameAdd(this.props.rowData)}}>Add Game</Button> */}
                    </Modal.Footer>
                </Modal> 
                }
                 
            </div>
        );
    }
}

export default withRouter(GameAddModal);