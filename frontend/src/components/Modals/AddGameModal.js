import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import withRouter from '../withRouter';
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
            dynamicRating: 0,
            loggedIn: false,
            button: ''
        };
    }
    async componentDidMount()
    {
        this._isMounted = true;
        console.log("modal mounted");
        console.log("our props say: " + this.props.loggedIn);
        if(this.props.loggedIn)
        {
            if(this._isMounted)
            {
                this.setState({loggedIn: true});
            }
            await this.calculateValue(this.props.rowData);
            
        }
        console.log("waiiiiiiiiiiiit");
           
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
    
    getUserGame = async (userId, gameId, token) =>
    {
        let js = JSON.stringify({_id: userId, gameId: gameId});
       
        try
        {    
            //let build = this.buildPath('api/games/getUserGames');
            //alert(build);
            //alert(ud);
            console.log("user id is: " + userId);
            console.log("game id is: " + gameId);
            console.log("the token is: " + token)
            const response = await fetch(this.buildPath('api/games/getUserGames'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + token}});
            

            if (response.status === 404)
            {
                //console.log("did it wait fail?");
                alert(await response.text());
                return;
            }

            //console.log("did it wait?");
            
            let txt = await response.text();
            //console.log(txt);
            let game = JSON.parse(txt);
            if(game[0] !== undefined)
            {
                console.log("calculate value: " + game[0].personalRating);
            }
            
            return game;
            //let res = JSON.parse(await response.text());
            //let txt = await response.text();
            //let searchList = JSON.parse(txt); 

        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
       
    }
    updateGame = async (userId, gameId, rating, token) =>
    {
        let js = JSON.stringify({_id: userId, id: gameId, rating: rating});
       
        try
        {    
            //let build = this.buildPath('api/games/getUserGames');
            //alert(build);
            //alert(ud);
            console.log("user id is: " + userId);
            console.log("game id is: " + gameId);
            console.log("rating is: " + rating);
            console.log("the token is: " + token)
            const response = await fetch(this.buildPath('api/games/updateGamesList'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + token}});
            

            if (response.status === 404)
            {
                //console.log("did it wait fail?");
                alert(await response.text());
                return;
            }

            //console.log("did it wait?");
            
            let txt = await response.text();
            console.log(txt);
            //let game = JSON.parse(txt);
            // if(game[0] !== undefined)
            // {
            //     console.log("calculate value: " + game[0].personalRating);
            // }
            
            // return game;
            return;
            //let res = JSON.parse(await response.text());
            //let txt = await response.text();
            //let searchList = JSON.parse(txt); 

        }
        catch(e)
        {
            alert(e.toString());
            return;
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
    //calculates personal rating if game is already added, otherwise uses default of 10
    calculateValue = async (data) => {
        
        
        console.log("Value-name: " + data.name + " value-rating: " + this.state.dynamicRating);

        
        if (this._isMounted)
        {
            let ud = localStorage.getItem('user');
    
       
            let userId;
    
            if(ud)
            {
                let decoded = jwt_decode(ud);
                userId = decoded.user[0]._id;
        
            }
            else
            {
        
            }
            //this.setState({dynamicRating: 5});
            let game = await this.getUserGame(userId, data._id, ud);
            
            //console.log(typeof(game));
            //console.log(game);
            //console.log(game[0]);
            if(game[0] !== undefined) //we have found a matching game, call edit
            {
                if(this._isMounted)
                {
                    this.setState({dynamicRating: game[0].personalRating});
                    this.setState({button: 'Edit Game Score'});
                }
                
            }
            else
            {
                //no matching game, call add
                if(this._isMounted)
                {
                    this.setState({dynamicRating: 10});
                    this.setState({button: 'Add Game'});
                }
            }
            
            

            //if found game:
            //console.log("did this happen");
            //this.setState({dynamicRating: 5});
            //else:
            
        }
        console.log("wait for me to finish");
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
    handleGameAddEdit = async (data, e) => {
        
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
        
        
        if(this.state.button === 'Edit Game Score')
        {
            console.log("edit: " + data._id + " " + rating);
            await this.updateGame(userId, data._id, rating, ud);
        }
        else
        {
            console.log("add: " + gameIdArray[0].id + " " + gameIdArray[0].rating);
            await this.addUserGames(userId, gameIdArray, ud);
        }
        


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
                {this.state.loggedIn ? <div>{//we are logged in
                    this.state.dynamicRating ?

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
                                <Button variant="primary" onClick={() => {this.handleGameAddEdit(this.props.rowData)}}>{this.state.button}</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    :
                    <div></div>
                    }
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