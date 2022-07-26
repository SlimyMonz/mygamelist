import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import GameSearchUI from '../components/GameSearchUI';
import MainLogin from '../components/MainLogin';

const GamesPage = () =>
{
    return(
        <div>
            <MainLogin/>
            <GameSearchUI />
        </div>
    );
}

export default GamesPage;
