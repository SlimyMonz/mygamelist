import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import withRouter from '../withRouter';


class GameShowModal extends Component
{

    constructor(props)
    {
        super(props);
        this.state =
        {
            show: this.props.show,
        };
    }
    componentDidMount()
    {
        console.log("modal mounted");
    }
    componentWillUnmount()
    {
        console.log("modal unmounted");
    }

    handleShow = () =>{


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

    handleGamePage = (data) => {
        
        this.setState({
            show: false
        });
        //alert(data.id);
        //window.location.href = '/games/' + data.name;
        this.props.router.navigate('/games/' + data.name, {state: {data: data}});
        //console.log(this.props.router.location);
        

    };
    

    render()
    {
        
        return(
            <div>
                 <Modal show={this.state.show} onHide={() => {this.handleClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.rowData.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className ="mb-3" controlid="formPlatforms">
                                platforms: {this.props.rowData.platforms}
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="formGenres">
                                genres: {this.props.rowData.genre}
                            </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.handleClose()}}>Close</Button>
                        <Button variant="primary" onClick={() => {this.handleGamePage(this.props.rowData)}}>Game Page</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(GameShowModal);