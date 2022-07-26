import React, {Component} from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
//import 'rsuite-table/dist/css/rsuite-table.css';
import 'rsuite-table/lib/less/index.less';
import Button from 'react-bootstrap/Button';
import GameShowModal from '../Modals/GameShowModal';
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

const AddGameCell = React.memo(({rowData, dataKey, ...props}) => 
{
  console.log("rendering " + rowData.name);
  function handleAction(){
    alert(rowData.id);
  }
  return(
    <Cell {...props} className="link-group">
        <FaPlus onClick={handleAction}/> 
        
    </Cell>
  )
});

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
            showModal: false
        }
    }


    //dataList = this.props.payload;

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
          <img src={rowData.cover} width="40" />
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
        //alert(e.detail);
        //when double clicking on a row
        if(e.detail === 2)
        {
          console.log("yayyyy");
          //alert(typeof(rowData));
          //this.setState({showModal: true});
          //alert(this.state.showModal);
          showModal = true;
          this.setState(
            { 
              variable:  
                        <div><GameShowModal
                          show={showModal}
                          rowData={rowData}
                        /></div>
            }
          )
        }
        else
        {
          //this.state.showModal = false;
          //alert(this.state.showModal);
          this.setState(
            {
              variable:  
                        <div>
                           {/* <img src={rowData.cover} alt="game cover picture" /> */}
                        </div>
            
            }
          )
        }
    };
    handleAction = (rowData) => 
    {
      alert(rowData.id);
    }
   
    render()
    {
        return(
            <div id='allGamesTable'>
            {this.state.variable}
    
            <Table 
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
                  <AddGameCell dataKey="id" />
                </Column> 

                <Column width={80} align="center" verticalAlign='middle'>
                  <HeaderCell></HeaderCell>
                  <this.ImageCell dataKey="cover" />
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