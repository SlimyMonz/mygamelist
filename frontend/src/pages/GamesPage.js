import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import GameSearchUI from '../components/GameSearchUI';
import MainLogin from '../components/MainLogin';
import BackImage from '../components/BackImage';

const GamesPage = () =>
{
    return(
        <div>
            <MainLogin/>
            <BackImage heading="Let's find some games!" text=''/>
            <GameSearchUI />
        </div>
    );
}

export default GamesPage;
