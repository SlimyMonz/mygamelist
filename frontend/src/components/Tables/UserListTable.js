import React, { useState, useEffect } from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import GameShowModal from '../Modals/GameShowModal';
import {useLocation, useNavigate} from 'react-router-dom';



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

        const handleActionImage = (rowData) =>
        {
                console.log(rowData.name);
                //setData(props.data);
                //setLoad(true);
                //sortRating();



                navigate('/games/' + rowData.name);
        }
        const sortRating = (rowData) =>
        {
                let rating = props.data.sort((first, second)=>second.personalRating-first.personalRating);
                setData(rating);
                

                //navigate('/games/' + rowData.name);
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
                display: 'inline-block'
                }}
                >
                <img src={rowData.image} onClick={() => handleActionImage(rowData)} width="40" />
                </div>
                </Cell>
        ));
        //this.handleActionImage(rowData)


        return(
            <div>
                {dataLoaded? <Table 
                height={600}
                autoHeight= {false}
                fillHeight= {false}
                wordWrap="break-word"
                align = 'right'
                bordered
                cellBordered
                data={gameData}>
                        <Column width={80}  flexGrow= {1} align="center" verticalAlign='middle'>
                        <HeaderCell>Gamee Page</HeaderCell>
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

                        
                </Table>
                :
                <Table 
                height={600}
                autoHeight= {false}
                fillHeight= {false}
                wordWrap="break-word"
                align = 'right'
                bordered
                cellBordered
                data={props.data}>
                        <Column width={80}  flexGrow= {1} align="center" verticalAlign='middle'>
                        <HeaderCell>Game Page</HeaderCell>
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

                        
                </Table>}
            </div>
        )
}

export default UserListTable;