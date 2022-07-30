import React, { useEffect } from 'react';
import MainLogin from '../components/MainLogin';
import BackImage from '../components/BackImage';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import MyListUi from '../components/MyListUI';

const MyListPage = () =>
{
    let ud = localStorage.getItem('user');
    let navigate = useNavigate();
    const rendered = false;
    
    let firstName;
    let lastName;
    let userId;

    useEffect(() => 
    {
        if(ud)
        {
            let decoded = jwt_decode(ud);
            userId = decoded.user[0]._id;


        }
        else
        {
            navigate("/", {state: { email: "hello, I'm an email" }});
        }

    }, [rendered]);

    
    return(
        <div>
            <MainLogin/>
            {/* <BackImage heading=" My List " text='Here are all the games on your list!'/> */}
            <MyListUi loggedIn={ud}/>
          
        </div>
    );
}

export default MyListPage;
