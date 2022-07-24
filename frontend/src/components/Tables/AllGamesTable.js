import React, {Component} from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
//import 'rsuite-table/dist/css/rsuite-table.css';
import 'rsuite-table/lib/less/index.less';
import Button from 'react-bootstrap/Button';
import GameShowModal from '../Modals/GameShowModal';


// const NameCell = ({ rowData, dataKey, ...props }) => {
  

//   return (
//     <Cell {...props}>
      
//     </Cell>
//   );
// };

let showModal = false;


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
                {/* <Column width={100} flexGrow= {2} align='center' verticalAlign='middle' sortable>
                  <HeaderCell>Name</HeaderCell>
                  <Cell >
                    {rowData =>{return(<a onClick={(e) => this.handleAction(e, rowData)}>hello</a>)}}
                  </Cell>                
                </Column> */}

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