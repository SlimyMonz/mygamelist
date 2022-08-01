import React, { useState, useEffect, useLayoutEffect } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import AllGameSearch from './AllGameSearch';
import { findLastIndex } from 'underscore';
import jwt_decode from "jwt-decode";
import UserListTable from './Tables/UserListTable';
import './MyListUIStyles.css';
import retroVideo from '../retroVid.mp4'
import background from '../backgroundimg.png'
import games from 'rawger/src/games';


var gamesCheck = [];

function MyListUi(props)
{
    //console.log(props.loggedIn);
    
    const rendered = false;
    let navigate = useNavigate();
   
    // //let dynamicGame;
    // const [dynamicGame,setDynamicGame] = useState(<div></div>);
    
    const [gameData, setData] = useState([]);
    const [dataLoaded, setLoad] = useState(false);
    const [list, setList] = useState(<div></div>);
    // const [platforms, setPlat] = useState('');
    // const [genres, setGenres] = useState('');
    // const [image, setImage] = useState('');
    // const [description, setDes] = useState('');
    // const [show, setShow] = useState(false);
    // const [loggedIn, setLog] = useState(false);
    // const [data, setData] = useState({});
    // const [dynamicModal, setModal] = useState(<div></div>);
    
    


    // function goBack()
    // {
    //    navigate("/games");
    // }

    useEffect(() => 
    {
        let isActive = true;
        console.log("useeffect ran");
        //are we logged in?
        //let ud = localStorage.getItem('user');
        //let userId;

        if(props.loggedIn)
        {
            let decoded = jwt_decode(props.loggedIn);
            let userId = decoded.user[0]._id;
            
            if(isActive)
            {
                 //get user list
                (async () => {
                    console.log(props.loggedIn);
                    
                    console.log(decoded);
                    
                    console.log(userId);
                    console.log("we're calling the usergamesearch api");
                    let obj = {_id: userId};
        
                    let js = JSON.stringify(obj);
                    //await new Promise(resolve => setTimeout(resolve, 1000));
                    try
                    {
                        let build = buildPath('api/games/getUserGames');
                        //alert(build);
                        const response = await fetch(buildPath('api/games/getUserGames'),
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + props.loggedIn}});
            
                        if (response.status === 404)
                        {
                            alert('No game found');
                            return;
                        }
                        let txt = await response.text();
                        //console.log(txt);
                        let games = JSON.parse(txt);
                        gamesCheck = games;
                        
                    
                        console.log(games);
                        console.log(games[0]);
                        console.log(games[0]._id);
                        console.log(games[0].name);
                        console.log(games[0].releaseDate);
                        console.log(games[0].image);
                        console.log(games[0].description);
                        console.log(games[0].personalRating);
                        console.log(games[0].platforms);
                        console.log(games[0].genres);
        
                        let sortedGames = games.sort((first, second)=>second.personalRating-first.personalRating);
                        let allGames = [];
                
                        console.log("hello" + sortedGames);
                        if(isActive)
                        {
                            
                            // for( var i=0; i< games.length; i++ )
                            // {
                                
                            //     allGames.push(sortedGames[i]);
                            //     console.log("helooo for sure again");
                            //     console.log(allGames[i].platforms);
                                

                            //     //this doesn't work if not all of our games have a platform/genre array
                            //     allGames[i].platforms = sortedGames[i].platforms.join(', ');
                            //     allGames[i].genre = sortedGames[i].genres.join(', ');
                            //     allGames[i].index = i;

                            //     console.log(allGames[i].name);
                            //     console.log(allGames[i].platforms);
                            //     console.log(allGames[i].genres);
                            //     console.log(allGames[i]._id);
                            //     console.log("index babeeee " + allGames[i].index);
                            // }
                            setData(sortedGames);
                            //setList(<UserListTable data={gameData} load={dataLoaded}/>);
                            setLoad(true);

            
                        }
                    }
                    catch(e)
                    {
                        //alert("error!");
                        //alert(e.toString());
                        console.log("does this happen tokennnn");
                        if(gamesCheck.length === 0)
                        {

                        }
                        else{
                            navigate("/", {state: { message: "token" }});
                        }
                        
                    }
                })();   
            }
    
        }
        else
        {
    
        }
        //clean up dem memory leaks???
        return () => 
        {
            isActive = false;
        };

    }, [setData]);

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
    

    // const goToHome = async event =>
    // {
    //     window.location.href = '/';
    // }
    // const handleBoolean = () => 
    // {
    //     setShow(false);
    // }
    // const handleShow = async () => 
    // {
    //     //alert("are ya winn");
    //     if(!show)
    //     {
    //         setShow(true);
        
    //         setModal(<AddGameModalPage
    //             show={true}
    //             rowData={data}
    //             handleBoolean={handleBoolean}
    //             loggedIn={loggedIn}
    //             handleClose={handleClose}
    //         />);
    //     }
    // }
    // const handleClose = () => 
    // {
        
    //     setShow(false);
    // }


    return(
        <div className='vidList' style={{ backgroundImage: `url(${background})` }}>
            {/* <video autoPlay loop muted id='video'>
                <source src={retroVideo} type='video/mp4'/>

            </video> */}
            

            <div className='contentList'>
                
                <div className='text-wrapperList'>
                    <div className='imglogo'>
                        {/* <h1>My List {'('} {gameData.length} games {')'}</h1> */}
                        <h1>My List</h1>
                        
                    </div>
                    <div className='listtable'> 
                        <UserListTable data={gameData} load={dataLoaded}/>
                    </div> 

                </div>
            </div>
        </div>
    );

}

//     <div>
    //     {/* <Button variant="dark" class="buttons"
    //                     onClick={()=> goBack()}>Back</Button> */}
    //     <br/>
    //     <br/>
    //     <br/>
    //     <br/>
    //     <br/>
    //     <br/>
    //     <UserListTable data={gameData} load={dataLoaded}/>
     /* {!dataLoaded ? 
        <div></div>
        :
        <div>{list}</div>
        } */
        
    //    </div>
 

export default MyListUi

