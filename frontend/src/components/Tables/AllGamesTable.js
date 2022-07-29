import React, {Component} from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
//import 'rsuite-table/dist/css/rsuite-table.css';
import 'rsuite-table/lib/less/index.less';
import Button from 'react-bootstrap/Button';
import GameShowModal from '../Modals/GameShowModal';
import AddGameModal from '../Modals/AddGameModal';
import { FaIcons, FaPlus } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


// const NameCell = ({ rowData, dataKey, ...props }) => {
  

//   return (
//     <Cell {...props}>
      
//     </Cell>
//   );
// };

let showModal = false;


// const ImageCell = React.useMemo(({ rowData, dataKey, ...props }) => (
//   console.log("rendering " + rowData.name),
//   <Cell {...props} style={{ padding: 0 }}>
//     <div
//       style={{
//         width: 40,
//         height: 40,
//         background: '#f5f5f5',
//         borderRadius: 20,
//         marginTop: 2,
//         overflow: 'hidden',
//         display: 'inline-block'
//       }}
//     >
//       <img src={rowData.cover} width="40" />
//     </div>
//   </Cell>
// ));



class AllGamesTable extends Component 
{
    
    constructor(props)
    {
        super(props);

        this.state = 
        {
            sortType: 'desc',
            sortColumn: '',
            variable: <div></div>,
            variable2: <div></div>,
            showModal: false
        }
    }


    AddGameCell = React.memo(({rowData, dataKey, ...props}) => 
    {
      //console.log("rendering " + rowData.name);
      return(
        <Cell {...props} className="link-group">
            <FaPlus onClick={() => this.handleActionAdd(rowData)}/> 
        </Cell>
      )
    });

    ImageCell = React.memo(({ rowData, dataKey, ...props }) => (
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
          <img src={rowData.image} onClick={() => this.handleActionImage(rowData)} width="40" />
        </div>
      </Cell>
    ));
   

    
    getData = () => 
    {
      
      //alert("hello");
      if (this.state.sortColumn && this.state.sortType) {
        return this.props.payload.sort((a, b) => {
          let x = a[this.state.sortColumn];
          let y = b[this.state.sortColumn];
          if (typeof x === 'string') {
            x = x.charCodeAt();
          }
          if (typeof y === 'string') {
            y = y.charCodeAt();
          }
          if (this.state.sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        });
      }
      return this.props.payload;
    };

    handleSortColumn = (sortColumnn, sortTypee) => 
    {
        //alert("do you re-render");
        //alert(this.props.payload);
        //alert(this.dataList);   

        this.setState({ sortColumn: sortColumnn});
        this.setState({ sortType: sortTypee});  
        //alert(this.state.sortColumn);
        //alert(this.state.sortType);
    };
    handleRowClick = (rowData, e) => 
    {
        //alert(rowData.name);
        console.log("bayyyyy");
        //when double clicking on a row
        if(e.detail === 2)
        {
          
          //alert(typeof(rowData));
          //this.setState({showModal: true});
          //alert(this.state.showModal);
          showModal = true;
          //alert(showModal);
          console.log("then this runs" + showModal);
          this.setState(
            { 
              variable:  
                        <div><GameShowModal
                          show={showModal}
                          rowData={rowData}
                          handleBoolean={this.handleBoolean}

                        /></div>
            }
          );
        }
        else
        {
          console.log("runs this first" + showModal);
          //this.state.showModal = false;
          //alert(this.state.showModal);
          this.setState(
            {
              variable:  
                        <div>
                          
                        </div>
            
            }
          );
          
        }
    };
    handleBoolean = () =>{


      this.setState({
          showModal: false,
      });
      
    };
    handleActionImage = (rowData) => 
    {
      //console.log(this.state.showModal);
      
      if(!this.state.showModal)
      {
        this.setState({showModal: true})
        this.setState(
          { 
            
            variable2:  
                      <div><GameShowModal
                        show={true}
                        rowData={rowData}
                        handleBoolean={this.handleBoolean}
                      /></div>
          }
        )
      }
      else
      {

      }
          
      //console.log("image");
    }
    handleActionAdd = (rowData) => 
    {
      console.log(this.state.showModal);
      let ud = localStorage.getItem('user');
      let loggedIn = false;
      if(ud)
      {
        loggedIn = true;
      }
      else
      {
        loggedIn = false;
      }
      
      
      if(!this.state.showModal)
      {
        this.setState({showModal: true})
        this.setState(
          { 
            
            variable2:  
                      <div><AddGameModal
                        show={true}
                        rowData={rowData}
                        handleBoolean={this.handleBoolean}
                        loggedIn={loggedIn}
                      /></div>
          }
        )
      }
      else
      {
        
      }
          
      console.log("add");
    }
    render()
    {
        return(
            <div id='allGamesTable'>
            {this.state.variable}
            {this.state.showModal && this.state.variable2}
    
            <Table 
            virtualized = {true}
            height={700}
            wordWrap="break-word"
            autoHeight= {false}
            fillHeight= {false}
            align = 'right'
            bordered
            cellBordered
            sortColumn={this.state.sortColumn}
            sortType={this.state.sortType}
            onSortColumn={this.handleSortColumn}
            onRowClick={(this.handleRowClick)}
            data={this.getData()}
            >
                {/* <Column width={100} align='center' verticalAlign='middle'>
                  <HeaderCell></HeaderCell>
                  <Cell >
                    {rowData =>{return(console.log("rendering " + rowData.name), <FaPlus onClick={() => this.handleAction(rowData)}/>)}}
                  </Cell>                
                </Column> */}

                <Column width={80}>
                  <HeaderCell></HeaderCell>
                  <this.AddGameCell dataKey="_id" align="center" verticalAlign='middle'/>
                </Column> 

                {/* <Column width={80}>
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="_id" verticalAlign='middle'/>
                </Column>  */}

                <Column width={100} flexGrow= {1} align="center" verticalAlign='middle'>
                  <HeaderCell>Game Page</HeaderCell>
                  <this.ImageCell dataKey="image" />
                </Column> 

                <Column width={100} height={50} flexGrow= {2} align='center' verticalAlign='middle' sortable>
                  <HeaderCell>Name</HeaderCell>
                  <Cell dataKey='name'/>           
                </Column> 

                <Column width={100} flexGrow= {2} align='center' verticalAlign='middle'>
                  <HeaderCell>Platforms</HeaderCell>
                  <Cell dataKey='platforms'/>
                </Column>

                <Column width={100} flexGrow= {2} align='center' verticalAlign='middle'>
                  <HeaderCell>Genres</HeaderCell>
                  <Cell dataKey='genre'/>
                </Column>
        </Table>
        </div>
        )
    };

}

export default AllGamesTable;