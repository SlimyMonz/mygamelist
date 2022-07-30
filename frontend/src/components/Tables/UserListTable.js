import React, { useState, useEffect } from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import GameShowModal from '../Modals/GameShowModal';
import {useLocation, useNavigate} from 'react-router-dom';
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import './UserListTableStyles.css';
import e from 'cors';
import jwt_decode from "jwt-decode";


let rendered = false;

const UserListTable = (props) =>
{       
        
        
        const [gameData, setData] = useState(props.data);
        const [renderSave, setRender] = useState(<div>a</div>);
        const [dataLoaded, setLoad] = useState(false);
        useEffect(() => 
        {
           console.log("data: " + props.data.name + props.load);  
          

        }, [rendered]);

        let navigate = useNavigate();

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

        const deleteGame = async (userId, gameId, token, rating) =>
        {
                let js = JSON.stringify({_id: userId, id: gameId});
        
                try
                {    
                let build = buildPath('api/games/deleteGame');
                alert(build);
                //alert(ud);
                console.log("user id is: " + userId);
                console.log("game id is: " + gameId);
                //console.log("rating is: " + rating);
                console.log("the token is: " + token);
                const response = await fetch(buildPath('api/games/deleteGame'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + token}});
                

                if (response.status === 404)
                {
                        console.log("did it wait fail?");
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

        const handleActionImage = (rowData) =>
        {
                console.log(rowData.name);
                //setData(props.data);
                //setLoad(true);
           



                navigate('/games/' + rowData.name);
        }
        const sortRating = (rowData) =>
        {
                let rating = props.data.sort((first, second)=>second.personalRating-first.personalRating);
                setData(rating);
                

                //navigate('/games/' + rowData.name);
        }
        const handleActionDelete = async (rowData, dataKey) =>
        {
                let userId;
                let ud = localStorage.getItem('user');
                if(ud)
                {
                        let decoded = jwt_decode(ud);
                        userId = decoded.user[0]._id;
                
                }
                else
                {
                        return;
                }
                if (window.confirm("Are you sure you want to remove this game from your list?") == true) 
                {
                        console.log("are we waiting");
                        if(dataLoaded)
                        {
                                alert(rowData._id);
                                console.log("old array: ");
                                console.log(gameData);
                                //const indexOfObject = props.data.findIndex(id => {return id._id == rowData._id});
                                //alert(indexOfObject);
                                //alert(gameData.indexOf(rowData));
                                //console.log(gameData[gameData.indexOf(rowData)]);

                                let newArry = gameData.filter(object => { return object._id !== rowData._id});
                                console.log("new array: ");
                                console.log(newArry);

                                await deleteGame(userId, rowData._id, ud);

                                setData(newArry);
                                setLoad(true);
                        }
                        else
                        {
                                alert(rowData._id);
                                console.log("old array: ");
                                console.log(props.data);
                                //const indexOfObject = props.data.findIndex(id => {return id._id == rowData._id});
                                //alert(indexOfObject);
                                //alert(props.data.indexOf(rowData));
                                console.log(props.data[props.data.indexOf(rowData)]);

                                let newArry = props.data.filter(object => { return object._id !== rowData._id});
                                console.log("new array: ");
                                console.log(newArry);

                                await deleteGame(userId, rowData._id, ud);

                                setData(newArry);
                                setLoad(true);
                                //alert("gimmie gimmie" + rowData[dataKey]);
                        }
                }
                else
                {
                        let text = "canceled";
                        return;
                }  
        }


        const ImageCell = React.memo(({ rowData, dataKey, ...props }) => (
                //console.log("rendering " + rowData.name),
                <Cell {...props} style={{ padding: 0 }}>
                <div
                style={{
                width: 40,
                height: 40,
                background: '#f5f5f5',
                borderRadius: 10,
                marginTop: 10,
                overflow: 'hidden',
                display: 'inline-block',
                cursor: 'pointer'
                }}
                >
                <img src={rowData.image} onClick={() => handleActionImage(rowData)} width="40" />
                </div>
                </Cell>
        ));
        //this.handleActionImage(rowData)
        const DeleteGameCell = React.memo(({rowData, dataKey, ...props}) => 
        {
          console.log("rendering " + rowData.name);
          return(
            <Cell {...props} className="link-group">
                <FaTrashAlt className='trash' onClick={() => handleActionDelete(rowData, dataKey)}/> 
            </Cell>
          )
        });
        //this.handleActionAdd(rowData)

        return(
            <div>
                {dataLoaded? <Table 
                height={401}
                autoHeight= {false}
                fillHeight= {false}
                wordWrap="break-word"
                align = 'right'
                bordered
                cellBordered
                data={gameData}>
                        <Column width={80}  flexGrow= {1} align="center" verticalAlign='middle'>
                                <HeaderCell>2ndGame Page</HeaderCell>
                                <ImageCell dataKey="image" />
                        </Column>

                        {/* <Column width={100} align='center'>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="_id" />
                        </Column> */}

                        <Column width={100} height={50} flexGrow= {2} align='center' verticalAlign='middle'>
                                <HeaderCell>Name</HeaderCell>
                                <Cell dataKey="name" />
                        </Column>

                        <Column width={100} flexGrow= {2} align='center' verticalAlign='middle'>
                                <HeaderCell>Rating</HeaderCell>
                                <Cell dataKey='personalRating'/>
                        </Column>

                        <Column width={80} flexGrow = {0} align="center" verticalAlign='middle'>
                                <HeaderCell>Delete</HeaderCell>
                                <DeleteGameCell dataKey="_id"/>
                        </Column> 

                        
                </Table>
                :
                <Table 
                height={401}
                autoHeight= {false}
                fillHeight= {false}
                wordWrap="break-word"
                align = 'right'
                bordered
                cellBordered
                data={props.data}>
                        <Column width={80}  flexGrow= {1} align="center" verticalAlign='middle'>
                        <HeaderCell>1stGame Page</HeaderCell>
                        <ImageCell dataKey="image" />
                        </Column>

                        {/* <Column width={100} align='center'>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="_id" />
                        </Column> */}

                        <Column width={100} height={50} flexGrow= {2} align='center' verticalAlign='middle'>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                        </Column>

                        <Column width={100} flexGrow= {2} align='center' verticalAlign='middle'>
                        <HeaderCell>Rating</HeaderCell>
                        <Cell dataKey='personalRating'/>
                        </Column>

                        <Column width={80} flexGrow = {0} align="center" verticalAlign='middle'>
                                <HeaderCell>Delete</HeaderCell>
                                <DeleteGameCell dataKey='_id'/>
                        </Column>          
                </Table>}
            </div>
        )
}

export default React.memo(UserListTable);