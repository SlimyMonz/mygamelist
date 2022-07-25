import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useParams } from 'react-router-dom';
import GameUI from '../components/GameUI';
import MainLogin from '../components/MainLogin';


const GamePage = (props) =>

{

    let {gameName} = useParams();
    //alert(gameName);

    return(
        <div>
            <MainLogin/>
            <GameUI gameName={gameName}/>
        </div>
    );


}

export default GamePage;