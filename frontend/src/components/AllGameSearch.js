
import React, {Component} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import AllGamesTable from './Tables/AllGamesTable';
import './AllGameSearchStyles.css';
import GameSearchUI from './GameSearchUI';

class AllGameSearch extends Component 
{
    _isMounted = false;

    constructor(props)
    {
        super(props);

        this.state = 
        {
            message: '',
            gameName: '',
            gameListString: '',
            gameList: [],
            success: false,
         
            

            //platforms
            PCCheck: false,
            PS4Check: false,
            XOneCheck: false,
            XSeriesCheck: false,
            PS5Check: false,
            SwitchCheck: false,

           //genres
            RPGCheck: false,
            ActionCheck: false,
            FPSCheck: false,

            IndieCheck: false, 
            AdventureCheck: false, 
            CasualCheck: false, 
            PuzzleCheck: false, 
            RacingCheck: false, 
            SimulationCheck: false, 
            SportsCheck: false, 
            StrategyCheck: false, 
            TableTopCheck: false,
            ActionRPGCheck: false, 
            ActionAdventureCheck: false, 
            ArcadeCheck: false, 
            AutoBattlerCheck: false,
            AutomobileSimCheck: false, 
            BaseBuildingCheck: false, 
            BaseballCheck: false, 
            BasketballCheck: false, 
            BattleRoyaleCheck: false, 
            BMXCheck: false,
            BoardGameCheck: false, 
            BowlingCheck: false, 
            BuildingCheck: false, 
            CardGameCheck: false, 
            CharacterActionGameCheck: false, 
            ChessCheck: false, 
            ClickerCheck: false, 
            CyclingCheck: false, 
            DiplomacyCheck: false, 
            eSportsCheck: false, 
            ExperimentalCheck: false, 
            ExplorationCheck: false, 
            FarmingSimCheck: false, 
            CharacterActionGame: false, 
            FightingCheck: false, 
            FootballCheck: false, 
            GodGameCheck: false,
            GolfCheck: false, 
            HackingCheck: false, 
            HiddenObjectCheck: false, 
            HockeyCheck: false, 
            IdlerCheck: false, 
            InteractiveFictionCheck: false, 
            ManagementCheck: false, 
            Match3Check: false, 
            MedicalSimCheck: false, 
            MiniGolfCheck: false, 
            MiningCheck: false, 
            MMORPGCheck: false, 
            MotocrossCheck: false, 
            OpenWorldCheck: false, 
            OutbreakSimCheck: false, 
            PartyBasedRPGCheck: false, 
            PinballCheck: false, 
            PlatformerCheck: false, 
            PointClickCheck: false, 
            RhythmCheck: false, 
            RoguelikeCheck: false, 
            RTSCheck: false,
            SandboxCheck: false, 
            ShooterCheck: false, 
            SkateboardingCheck: false, 
            SkatingCheck: false, 
            SkiingCheck: false,  
            SnowboardingCheck: false, 
            SoccerCheck: false, 
            SpaceSimCheck: false, 
            StealthCheck: false, 
            StrategyRPGCheck: false, 
            SurvivalCheck: false, 
            TennisCheck: false, 
            TowerDefenseCheck: false, 
            TriviaCheck: false, 
            TurnBasedStrategyCheck: false, 
            VisualNovelCheck: false, 
            WalkingSimulatorCheck: false, 
            WordGameCheck: false, 
            WrestlingCheck: false,


        }
    }

    async componentDidMount()
    {
        this._isMounted = true;
        let queryParams = new URLSearchParams(window.location.search);
        let platformURL = queryParams.get('platform');
        //alert(queryParams);
        //alert(platformURL);
        if(platformURL === null){
            // do nothing
            //alert("nothing");
        }
        else if(platformURL === 'PlayStation4'){
            let platform = ['PlayStation 4'];
            await this.searchGame(undefined, platform);
            
        }
        else if(platformURL === 'PlayStation5'){
            let platform = ['PlayStation 5'];
            await this.searchGame(undefined, platform);
        }
        else if(platformURL === 'XboxOne'){
            let platform = ['Xbox One'];
            await this.searchGame(undefined, platform);
        }
        else if(platformURL === 'XboxX'){
            let platform = ['Xbox Series X'];
            await this.searchGame(undefined, platform);
        }
        else if(platformURL === 'NintendoSwitch'){
            let platform = ['Nintendo Switch'];
            await this.searchGame(undefined, platform);
        }
        else if(platformURL === 'PC'){
            let platform = ['PC (Microsoft Windows)'];
            await this.searchGame(undefined, platform);
        }
        

        
        
    }
    componentWillUnmount()
    {
        this._isMounted = false;
    }

    app_name = 'my-game-list-front';

    buildPath = (route) =>
    {
        if (process.env.NODE_ENV === 'production')
        {
            return 'https://' + this.app_name +  '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5000/' + route;
        }
    }

    setMessage = (msg) =>
    {
        this.setState({ message: msg})
    }
   

    onkeyPress = (e) =>{

        if(e.keyCode === 13) 
        {
            e.preventDefault();
            //alert("we got here");
           this.onSubmit();
        }
    }
    onSubmit = async () =>{
        //console.log(this.state.userName + " " + this.state.password);
        
        let genre;
        let platform;

        //genre check

        if(this.state.RPGCheck || this.state.FPSCheck || this.state.ActionCheck || this.state.IndieCheck || this.state.AdventureCheck || this.state.CasualCheck || this.state.ExperimentalCheck || this.state.PuzzleCheck || 
            this.state.RacingCheck||
            this.state.SimulationCheck ||
            this.state.SportsCheck ||
            this.state.StrategyCheck ||
            this.state.TableTopCheck ||
            this.state.ActionRPGCheck ||
            this.state.ActionAdventureCheck ||
            this.state.ArcadeCheck ||
            this.state.AutoBattlerCheck ||
            this.state.AutomobileSimCheck ||
            this.state.BaseBuildingCheck ||
            this.state.BaseballCheck ||
            this.state.BasketballCheck ||
            this.state.BattleRoyaleCheck ||
            this.state.BMXCheck ||
            this.state.BoardGameCheck  ||
            this.state.BowlingCheck ||
            this.state.BuildingCheck ||
            this.state.CardGameCheck ||
            this.state.CharacterActionGameCheck ||
            this.state.ChessCheck ||
            this.state.ClickerCheck ||
            this.state.CyclingCheck ||
            this.state.DiplomacyCheck ||
            this.state.eSportsCheck  ||
            this.state.ExperimentalCheck ||
            this.state.ExplorationCheck ||
            this.state.FarmingSimCheck ||
            this.state.CharacterActionGame ||
            this.state.FightingCheck ||
            this.state.FootballCheck ||
            this.state.GodGameCheck ||
            this.state.GolfCheck ||
            this.state.HackingCheck ||
            this.state.HiddenObjectCheck ||
            this.state.HockeyCheck ||
            this.state.IdlerCheck ||
            this.state.InteractiveFictionCheck ||
            this.state.ManagementCheck ||
            this.state.Match3Check ||
            this.state.MedicalSimCheck ||
            this.state.MiniGolfCheck ||
            this.state.MiningCheck ||
            this.state.MMORPGCheck ||
            this.state.MotocrossCheck ||
            this.state.OpenWorldCheck ||
            this.state.OutbreakSimCheck ||
            this.state.PartyBasedRPGCheck ||
            this.state.PinballCheck ||
            this.state.PlatformerCheck ||
            this.state.PointClickCheck ||
            this.state.RhythmCheck  ||
            this.state.RoguelikeCheck  ||
            this.state.RTSCheck ||
            this.state.SandboxCheck ||
            this.state.ShooterCheck ||
            this.state.SkateboardingCheck ||
            this.state.SkatingCheck ||
            this.state.SkiingCheck ||
            this.state.SnowboardingCheck ||
            this.state.SoccerCheck || 
            this.state.SpaceSimCheck ||
            this.state.StealthCheck ||
            this.state.StrategyRPGCheck ||
            this.state.SurvivalCheck ||
            this.state.TennisCheck ||
            this.state.TowerDefenseCheck || 
            this.state.TriviaCheck ||
            this.state.TurnBasedStrategyCheck ||
            this.state.VisualNovelCheck ||
            this.state.WalkingSimulatorCheck || 
            this.state.WordGameCheck ||
            this.state.WrestlingCheck
)

        {
            let genreArray = [];
            if(this.state.RPGCheck)
            {

                genreArray.push("Role Playing Game");

            }
            if(this.state.FPSCheck)
            {
                genreArray.push("First Person Shooter");
                
            }
            if(this.state.ActionCheck)
            {
                genreArray.push("Action");
                
            }
            if(this.state.IndieCheck)
            {
                genreArray.push("Indie");

            }
            if(this.state.AdventureCheck )
            {
                genreArray.push("Adventure");
                
            }
            if(this.state.CasualCheck)
            {
                genreArray.push("Casual");
            }  
            if(this.state.ExperimentalCheck)
            {
                genreArray.push("Experimental");
            } 
            if(this.state.PuzzleCheck) 
            {
                genreArray.push("Puzzle");
            } 
            if(this.state.RacingCheck)
            {
                genreArray.push("Racing");
            }
            if(this.state.SimulationCheck)
            {
                genreArray.push("Simulation");
            } 
            if(this.state.SportsCheck)
            {
                genreArray.push("Sports");
            } 
            if(this.state.StrategyCheck)
            {
                genreArray.push("Strategy");
            }
            if(this.state.TableTopCheck)
            {
                genreArray.push("Table Top");
            } 
            if(this.state.ActionRPGCheck)
            {
                genreArray.push("Action Role Playing Game");
            } 
            if(this.state.ActionAdventureCheck)
            {
                genreArray.push("Action Adventure");
            } 
            if(this.state.ArcadeCheck)
            {
                genreArray.push("Arcade");
            }
            if(this.state.AutoBattlerCheck)
            {
                genreArray.push("Auto Battler");
            }
            if(this.state.AutomobileSimCheck)
            {
                genreArray.push("Automobile Sim");
            }
            if(this.state.BaseBuildingCheck)
            {
                genreArray.push("Base Building");
            }
            if(this.state.BaseballCheck)
            {
                genreArray.push("Baseball");
            }
            if(this.state.BasketballCheck)
            {
                genreArray.push("Basketball");
            } 
            if(this.state.BattleRoyaleCheck)
            {
                genreArray.push("Battle Royale");
            }
            if(this.state.BMXCheck)
            {
                genreArray.push("BMX");
            } 
            if(this.state.BoardGameCheck)
            {
                genreArray.push("Board Game");
            }
            if(this.state.BowlingCheck)
            {
                genreArray.push("Bowling");
            } 
            if(this.state.BuildingCheck)
            {
                genreArray.push("Building");
            }
            if(this.state.CardGameCheck)
            {
                genreArray.push("Card Game");
            } 
            if(this.state.CharacterActionGameCheck) 
            {
                genreArray.push("Character Action Game");
            }
            if(this.state.ChessCheck)
            {
                genreArray.push("Chess");
            }
            if(this.state.ClickerCheck) 
            {
                genreArray.push("Clicker");
            }
            if(this.state.CyclingCheck )
            {
                genreArray.push("Cycling");
            }
            if(this.state.DiplomacyCheck)
            {
                genreArray.push("Diplomacy");
            } 
            if(this.state.eSportsCheck  )
            {
                genreArray.push("eSports");
            }
            if(this.state.ExperimentalCheck) 
            {
                genreArray.push("Experimental");
            }
            if(this.state.ExplorationCheck )
            {
                genreArray.push("Exploration");
            }
            if(this.state.FarmingSimCheck )
            {
                genreArray.push("Farming");
            }
            if(this.state.CharacterActionGameCheck) 
            {
                genreArray.push("Character Action Game");
            }
            if(this.state.FightingCheck )
            {
                genreArray.push("Fighting");
            }
            if(this.state.FootballCheck )
            {
                genreArray.push("Football");
            }
            if(this.state.GodGameCheck )
            {
                genreArray.push("God Game");
            }
            if(this.state.GolfCheck )
            {
                genreArray.push("Golf");
            }
            if(this.state.HackingCheck)
            {
                genreArray.push("Hacking");
            } 
            if(this.state.HiddenObjectCheck)
            {
                genreArray.push("Hidden Object");
            } 
            if(this.state.HockeyCheck )
            {
                genreArray.push("Hockey");
            }
            if(this.state.IdlerCheck )
            {
                genreArray.push("Idler");
            }
            if(this.state.InteractiveFictionCheck)
            {
                genreArray.push("Interactive Fiction");
            } 
            if(this.state.ManagementCheck )
            {
                genreArray.push("Management");
            }
            if(this.state.Match3Check )
            {
                genreArray.push("Match 3");
            }
            if(this.state.MedicalSimCheck) 
            {
                genreArray.push("Medical Sim");
            }
            if(this.state.MiniGolfCheck )
            {
                genreArray.push("Mini Golf");
            }
            if(this.state.MiningCheck )
            {
                genreArray.push("Mining");
            }
            if(this.state.MMORPGCheck )
            {
                genreArray.push("MMORPG");
            }
            if(this.state.MotocrossCheck)
            {
                genreArray.push("Motocross");
            } 
            if(this.state.OpenWorldCheck )
            {
                genreArray.push("Open World");
            }
            if(this.state.OutbreakSimCheck)
            {
                genreArray.push("Outbreak Sim");
            } 
            if(this.state.PartyBasedRPGCheck)
            {
                genreArray.push("Party based RPG");
            } 
            if(this.state.PinballCheck )
            {
                genreArray.push("Pinball");
            }
            if(this.state.PlatformerCheck)
            {
                genreArray.push("Platformer");
            }
            if(this.state.PointClickCheck )
            {
                genreArray.push("Point & Click");
            }
            if(this.state.RhythmCheck  )
            {
                genreArray.push("Rhythm");
            }
            if(this.state.RoguelikeCheck)
            {
                genreArray.push("Roguelike");
            }  
            if(this.state.RTSCheck )
            {
                genreArray.push("RTS");
            }
            if(this.state.SandboxCheck)
            {
                genreArray.push("Sandbox");
            } 
            if(this.state.ShooterCheck )
            {
                genreArray.push("Shooter");
            }
            if(this.state.SkateboardingCheck)
            {
                genreArray.push("Skateboard");
            } 
            if(this.state.SkatingCheck )
            {
                genreArray.push("Skating");
            }
            if(this.state.SkiingCheck )
            {
                genreArray.push("Skiing");
            }
            if(this.state.SnowboardingCheck)
            {
                genreArray.push("Snowboarding");
            } 
            if(this.state.SoccerCheck )
            {
                genreArray.push("Soccer");
            }
            if(this.state.SpaceSimCheck){
                genreArray.push("Space Sim");
            } 
            if(this.state.StealthCheck )
            {
                genreArray.push("Stealth");
            }
            if(this.state.StrategyRPGCheck)
            {
                genreArray.push("Strategy RPG");
            } 
            if(this.state.SurvivalCheck )
            {
                genreArray.push("Survival");
            }
            if(this.state.TennisCheck )
            {
                genreArray.push("Tennis");
            }
            if(this.state.TowerDefenseCheck)
            {
                genreArray.push("Tower Defense");
            } 
            if(this.state.TriviaCheck )
            {
                genreArray.push("Trivia");
            }
            if(this.state.TurnBasedStrategyCheck)
            {
                genreArray.push("Turn Based Strategy");
            } 
            if(this.state.VisualNovelCheck )
            {
                genreArray.push("Visual Novel");
            }
            if(this.state.WalkingSimulatorCheck)
            {
                genreArray.push("Walking Simulator");
            } 
            if(this.state.WordGameCheck )
            {
                genreArray.push("Word Game");
            }
            if(this.state.WrestlingCheck)
            {
                genreArray.push("Wrestling");
            }

            //need to add:  Indie, Adventure, Casual, Experimental, Puzzle, Racing, Simulation, Sports, Strategy, TableTop
            //Action RPG, Action-Adventure, Arcade, Auto Battler,Automobile Sim, Base Building, Baseball, Basketball, Battle Royale, BMX,
            //Board Game, Bowling, Building, Card Game, Character Action Game, Chess, Clicker, Cycling, Diplomacy, eSports, Experimental, Exploration, Farming Sim, Character Action Game, Fighting, Football, God Game,
            // Golf, Hacking, Hidden Object, Hockey, Idler, Interactive Fiction, Management, Match 3, Medical sim, Mini Golf, Mining, MMORPG, Motocross, Open World, Outbreak Sim, Party Based RPG, Pinball, Platformer, Point & Click, Rhythm, Roguelike, RTS,
            //Sandbox, Shooter, Skateboarding, Skating, Skiing,  Snowboarding, Soccer, Space Sim, Stealth, Strategy RPG, Survival, Tennis, Tower Defense, Trivia, Turn-Based Strategy, Visual Novel, Walking Simulator, Word Game, Wrestling


            
            genre = [...genreArray];
            //alert("this is genre, not genrearray " + genre);
        
        }
        else
        {
            genre = undefined;
        }
        //platforms check
        if(this.state.PCCheck || this.state.PS4Check || this.state.PS5Check || this.state.XOneCheck || this.state.XSeriesCheck || this.state.SwitchCheck)
        {
            let platformArray = [];
            if(this.state.PCCheck)
            {

                platformArray.push("PC");
            
            }
            if(this.state.PS4Check)
            {

                platformArray.push("PlayStation 4");
            
            }
            if(this.state.PS5Check)
            {
                platformArray.push("PlayStation 5");
               
            }
            if(this.state.XOneCheck)
            {
                platformArray.push("Xbox One");
    
            }
            if(this.state.XSeriesCheck)
            {
                platformArray.push("Xbox Series X");
            }
            if(this.state.SwitchCheck)
            {
                platformArray.push("Nintendo Switch");
            }
            platform = [...platformArray];
            //alert("this is platform, not platarray " + platform);
        }
        else
        {
            platform = undefined;   
        }
       
       
        this._isMounted = true;
        await this.searchGame(genre, platform);

    
        if(this.state.success)
        {
            
            console.log("we refactored the search all games!");
            this.setState({success: false});
          
        }
        else
        {

            
        }
    }

    searchGame = async (genre, platform) =>
    {
        
        //IMPORTANT: to test a certain game search parameter, change "name" to one of the other parameters not in there, 
        //like "userCount"

        let obj = {name: this.state.gameName, genre: genre, platform: platform};

        let js = JSON.stringify(obj);
        //alert(js);
        try
        {
            const response = await fetch(this.buildPath('api/games/searchAllGames'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
 
            if (response.status === 404)
            {
                alert('No game found');
                return;
            }

            let txt = await response.text();
            let searchList = JSON.parse(txt); 
            let resultText = '';      
            let resultGames = [];     
            //console.log("searchlist: " + searchList[0].platforms[0]);
            //The response is an array of objects, so you need to
            //iterate through them to get the desired data
            for( var i=0; i<searchList.length; i++ )
            {
                //console.log(searchList[i].platforms);
                //console.log(searchList[i].platforms[0]);
                resultText += searchList[i].name;
                resultText += " \n platforms: "+ searchList[i].platforms + "\n";
                resultText += " genre: "+ searchList[i].genres + "\n";
                resultText += " release: "+ searchList[i].release + "\n";

                //platform string conversion
                //platformArray.join(', ');
                //console.log(typeof(searchList[i].genre))
                //console.log("joined " + searchList[i].genre.join(', '));

                resultGames.push(searchList[i]);
                console.log(resultGames[i].platforms);

                //this doesn't work if not all of our games have a platform/genre array
                resultGames[i].platforms = searchList[i].platforms.join(', ');
                resultGames[i].genre = searchList[i].genres.join(', ');

                console.log(resultGames[i].name);
                console.log(resultGames[i].platforms);
                console.log(resultGames[i].genres);
                console.log(resultGames[i]._id);

                //console.log("our boi: " + resultGames[i].platforms[0]);

                if( i < searchList.length - 1)
                {
                    resultText += '\n';
                }

            }
           
            if(this._isMounted) //clean up memory leak?
            {
                this.setMessage('Game(s) have been retrieved\n');
                //this.setState({gameListString: resultText});
                this.setState({gameList: resultGames});
                
                //setgameListString(resultText);
                //alert(this.state.gameList);
                //this is dangerous
                this.state.success = true;
            }

            

            
        }
        catch(e)
        {
            alert(e.toString());
            this.setMessage(e.toString());
        }
        //alert("done");
    };

    render()
    {
        return(

            <div className="form-container">
                <form>
                    <div className='gameSearchBox'>
                        <label for="Name"></label>
                        <input className="form-control" type="text" id="Name" placeholder="Name" value ={this.state.gameName} autoFocus
                                                            onChange ={e => this.setState({ gameName: e.target.value})}
                                                            onKeyDown={this.onkeyPress}/>
                        <Button variant="primary" id="AllGamesSearch" onClick={() => this.onSubmit()}>Search</Button>


                        <Container className="checkBoxes">
                            <Row xxl={4}>
                                <Col>Platform</Col>
                                <Col>Genre</Col>
                                
                            </Row>

                            <Row xxl={4}>
                                <Col xs lg="9"> 
                                    <div className='checkboxPlat' id="checkboxPlatforms">
                                        <Form.Group className="mb-3 w-50" controlId="formPlatformCheckbox">

                                            <Form.Check type="checkbox" id="PCCheck" label="PC" 
                                                        onChange ={e => {this.setState({PCCheck: e.target.checked});}}
                                                        checked={this.state.PCCheck}
                                            />
                                            <Form.Check type="checkbox" id="PS4Check" label="PlayStation 4" 
                                                        onChange ={e => {this.setState({PS4Check: e.target.checked}); console.log(this.state.PS4Check);}}
                                                        checked={this.state.PS4Check}
                                            />
                                            <Form.Check type="checkbox" id="PS5Check" label="PlayStation 5"
                                                        onChange ={e => {this.setState({PS5Check: e.target.checked});}}
                                                        checked={this.state.PS5Check}
                                                        
                                            />
                                            <Form.Check type="checkbox" id = "XOneCheck" label="Xbox One"
                                                        onChange ={e => {this.setState({XOneCheck: e.target.checked});}}
                                                        checked={this.state.XOneCheck}
                                            />
                                            <Form.Check type="checkbox" id = "XSeriesCheck" label="Xbox Series X"
                                                        onChange ={e => {this.setState({XSeriesCheck: e.target.checked});}}
                                                        checked={this.state.XSeriesCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SwitchCheck" label="Nintendo Switch"
                                                        onChange ={e => {this.setState({SwitchCheck: e.target.checked});}}
                                                        checked={this.state.SwitchCheck}
                                            />
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col xs lg="9"> 
                                    <div className='checkboxGen' id="checkboxGenres">
                                        <Form.Group className="mb-3 w-50" controlId="formGenreCheckbox">
                                            <Form.Check type="checkbox" id = "RPGCheck" label="RPG"
                                                        onChange ={e => {this.setState({RPGCheck: e.target.checked});}}
                                                        checked={this.state.RPGCheck}
                                            />
                                            <Form.Check type="checkbox" id = "FPSCheck" label="FPS"
                                                        onChange ={e => {this.setState({FPSCheck: e.target.checked});}}
                                                        checked={this.state.FPSCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ActionCheck" label="Action"
                                                        onChange ={e => {this.setState({ActionCheck: e.target.checked});}}
                                                        checked={this.state.ActionCheck}
                                            />

                                            <Form.Check type="checkbox" id = "IndieCheck" label="Indie"
                                                        onChange ={e => {this.setState({IndieCheck: e.target.checked});}}
                                                        checked={this.state.IndieCheck}
                                            />
                                            <Form.Check type="checkbox" id = "AdventureCheck" label="Adventure"
                                                        onChange ={e => {this.setState({AdventureCheck: e.target.checked});}}
                                                        checked={this.state.AdventureCheck}
                                            />
                                            <Form.Check type="checkbox" id = "CasualCheck" label="Casual"
                                                        onChange ={e => {this.setState({CasualCheck: e.target.checked});}}
                                                        checked={this.state.CasualCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ExperimentalCheck" label="Experimental"
                                                        onChange ={e => {this.setState({ExperimentalCheck: e.target.checked});}}
                                                        checked={this.state.ExperimentalCheck}
                                            />
                                            <Form.Check type="checkbox" id = "PuzzleCheck" label="Puzzle"
                                                        onChange ={e => {this.setState({PuzzleCheck: e.target.checked});}}
                                                        checked={this.state.PuzzleCheck}
                                            />
                                            <Form.Check type="checkbox" id = "RacingCheck" label="Racing"
                                                        onChange ={e => {this.setState({RacingCheck: e.target.checked});}}
                                                        checked={this.state.RacingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SimulationCheck" label="Simulation"
                                                        onChange ={e => {this.setState({SimulationCheck: e.target.checked});}}
                                                        checked={this.state.SimulationCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SportsCheck" label="Sports"
                                                        onChange ={e => {this.setState({SportsCheck: e.target.checked});}}
                                                        checked={this.state.SportsCheck}
                                            />
                                            <Form.Check type="checkbox" id = "StrategyCheck" label="Strategy"
                                                        onChange ={e => {this.setState({StrategyCheck: e.target.checked});}}
                                                        checked={this.state.StrategyCheck}
                                            />
                                            <Form.Check type="checkbox" id = "TableTopCheck" label="Table Top"
                                                        onChange ={e => {this.setState({TableTopCheck: e.target.checked});}}
                                                        checked={this.state.TableTopCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ActionRPGCheck" label="Action Role Playing Game"
                                                        onChange ={e => {this.setState({ActionRPGCheck: e.target.checked});}}
                                                        checked={this.state.ActionRPGCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ActionAdventureCheck" label="Action Adventure"
                                                        onChange ={e => {this.setState({ActionAdventureCheck: e.target.checked});}}
                                                        checked={this.state.ActionAdventureCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ArcadeCheck" label="Arcade"
                                                        onChange ={e => {this.setState({ArcadeCheck: e.target.checked});}}
                                                        checked={this.state.ArcadeCheck}
                                            />
                                            <Form.Check type="checkbox" id = "AutoBattlerCheck" label="Auto Battler"
                                                        onChange ={e => {this.setState({AutoBattlerCheck: e.target.checked});}}
                                                        checked={this.state.AutoBattlerCheck}
                                            />
                                            <Form.Check type="checkbox" id = "AutomobileSimCheck" label="Automobile Sim"
                                                        onChange ={e => {this.setState({AutomobileSimCheck: e.target.checked});}}
                                                        checked={this.state.AutomobileSimCheck}
                                            />
                                            <Form.Check type="checkbox" id = "BaseBuildingCheck" label="Base Building"
                                                        onChange ={e => {this.setState({BaseBuildingCheck: e.target.checked});}}
                                                        checked={this.state.BaseBuildingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "BaseballCheck" label="Baseball"
                                                        onChange ={e => {this.setState({BaseballCheck: e.target.checked});}}
                                                        checked={this.state.BaseballCheck}
                                            />
                                            <Form.Check type="checkbox" id = "BasketballCheck" label="Basketball"
                                                        onChange ={e => {this.setState({BasketballCheck: e.target.checked});}}
                                                        checked={this.state.BasketballCheck}
                                            />
                                            <Form.Check type="checkbox" id = "BattleRoyaleCheck" label="Battle Royale"
                                                        onChange ={e => {this.setState({BattleRoyaleCheck: e.target.checked});}}
                                                        checked={this.state.BattleRoyaleCheck}
                                            />
                                            <Form.Check type="checkbox" id = "BMXCheck" label="BMX"
                                                        onChange ={e => {this.setState({BMXCheck: e.target.checked});}}
                                                        checked={this.state.BMXCheck}
                                            /><Form.Check type="checkbox" id = "BoardGameCheck" label="Board Game"
                                                        onChange ={e => {this.setState({BoardGameCheck: e.target.checked});}}
                                                        checked={this.state.BoardGameCheck}
                                            />
                                            <Form.Check type="checkbox" id = "BowlingCheck" label="Bowling"
                                                        onChange ={e => {this.setState({BowlingCheck: e.target.checked});}}
                                                        checked={this.state.BowlingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "BuildingCheck" label="Building"
                                                        onChange ={e => {this.setState({BuildingCheck: e.target.checked});}}
                                                        checked={this.state.BuildingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "CardGameCheck" label="Card Game"
                                                        onChange ={e => {this.setState({CardGameCheck: e.target.checked});}}
                                                        checked={this.state.CardGameCheck}
                                            />
                                            <Form.Check type="checkbox" id = "CharacterActionGameCheck" label="Character Action Game"
                                                        onChange ={e => {this.setState({CharacterActionGameCheck: e.target.checked});}}
                                                        checked={this.state.CharacterActionGameCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ChessCheck" label="Chess"
                                                        onChange ={e => {this.setState({ChessCheck: e.target.checked});}}
                                                        checked={this.state.ChessCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ClickerCheck" label="Clicker"
                                                        onChange ={e => {this.setState({ClickerCheck: e.target.checked});}}
                                                        checked={this.state.ClickerCheck}
                                            />
                                            <Form.Check type="checkbox" id = "CyclingCheck" label="Cycling"
                                                        onChange ={e => {this.setState({CyclingCheck: e.target.checked});}}
                                                        checked={this.state.CyclingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "DiplomacyCheck" label="Diplomacy"
                                                        onChange ={e => {this.setState({DiplomacyCheck: e.target.checked});}}
                                                        checked={this.state.DiplomacyCheck}
                                            />
                                            <Form.Check type="checkbox" id = "eSportsCheck" label="eSports"
                                                        onChange ={e => {this.setState({eSportsCheck: e.target.checked});}}
                                                        checked={this.state.eSportsCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ExperimentalCheck" label="Experimental"
                                                        onChange ={e => {this.setState({ExperimentalCheck: e.target.checked});}}
                                                        checked={this.state.ExperimentalCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ExplorationCheck" label="Exploration"
                                                        onChange ={e => {this.setState({ExplorationCheck: e.target.checked});}}
                                                        checked={this.state.ExplorationCheck}
                                            />
                                            <Form.Check type="checkbox" id = "FarmingSimCheck" label="Farming Sim"
                                                        onChange ={e => {this.setState({FarmingSimCheck: e.target.checked});}}
                                                        checked={this.state.FarmingSimCheck}
                                            />
                                            <Form.Check type="checkbox" id = "CharacterActionGameCheck" label="Character Action Game"
                                                        onChange ={e => {this.setState({CharacterActionGameCheck: e.target.checked});}}
                                                        checked={this.state.CharacterActionGameCheck}
                                            />
                                            <Form.Check type="checkbox" id = "FightingCheck" label="Fighting"
                                                        onChange ={e => {this.setState({FightingCheck: e.target.checked});}}
                                                        checked={this.state.FightingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "FootballCheck" label="Football"
                                                        onChange ={e => {this.setState({FootballCheck: e.target.checked});}}
                                                        checked={this.state.FootballCheck}
                                            />
                                            <Form.Check type="checkbox" id = "GodGameCheck" label="God Game"
                                                        onChange ={e => {this.setState({GodGameCheck: e.target.checked});}}
                                                        checked={this.state.GodGameCheck}
                                            />
                                            <Form.Check type="checkbox" id = "GolfCheck" label="Golf"
                                                        onChange ={e => {this.setState({GolfCheck: e.target.checked});}}
                                                        checked={this.state.GolfCheck}
                                            />
                                            <Form.Check type="checkbox" id = "HackingCheck" label="Hacking"
                                                        onChange ={e => {this.setState({HackingCheck: e.target.checked});}}
                                                        checked={this.state.HackingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "HiddenObjectCheck" label="Hidden Object"
                                                        onChange ={e => {this.setState({HiddenObjectCheck: e.target.checked});}}
                                                        checked={this.state.HiddenObjectCheck}
                                            />
                                            <Form.Check type="checkbox" id = "HockeyCheck" label="Hockey"
                                                        onChange ={e => {this.setState({HockeyCheck: e.target.checked});}}
                                                        checked={this.state.HockeyCheck}
                                            />
                                            <Form.Check type="checkbox" id = "IdlerCheck" label="Idler"
                                                        onChange ={e => {this.setState({IdlerCheck: e.target.checked});}}
                                                        checked={this.state.IdlerCheck}
                                            />
                                            <Form.Check type="checkbox" id = "InteractiveFictionCheck" label="Interactive Fiction"
                                                        onChange ={e => {this.setState({InteractiveFictionCheck: e.target.checked});}}
                                                        checked={this.state.InteractiveFictionCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ManagementCheck" label="Management"
                                                        onChange ={e => {this.setState({ManagementCheck: e.target.checked});}}
                                                        checked={this.state.ManagementCheck}
                                            />
                                            <Form.Check type="checkbox" id = "Match3Check" label="Match 3"
                                                        onChange ={e => {this.setState({Match3Check: e.target.checked});}}
                                                        checked={this.state.Match3Check}
                                            />
                                            <Form.Check type="checkbox" id = "MedicalSimCheck" label="Medical Sim"
                                                        onChange ={e => {this.setState({MedicalSimCheck: e.target.checked});}}
                                                        checked={this.state.MedicalSimCheck}
                                            />
                                            <Form.Check type="checkbox" id = "MiniGolfCheck" label="Mini Golf"
                                                        onChange ={e => {this.setState({MiniGolfCheck: e.target.checked});}}
                                                        checked={this.state.MiniGolfCheck}
                                            />
                                            <Form.Check type="checkbox" id = "MiningCheck" label="Mining"
                                                        onChange ={e => {this.setState({MiningCheck: e.target.checked});}}
                                                        checked={this.state.MiningCheck}
                                            />
                                            <Form.Check type="checkbox" id = "MMORPGCheck" label="MMORPG"
                                                        onChange ={e => {this.setState({MMORPGCheck: e.target.checked});}}
                                                        checked={this.state.MMORPGCheck}
                                            />
                                            <Form.Check type="checkbox" id = "MotocrossCheck" label="Motocross"
                                                        onChange ={e => {this.setState({MotocrossCheck: e.target.checked});}}
                                                        checked={this.state.MotocrossCheck}
                                            />
                                            <Form.Check type="checkbox" id = "OpenWorldCheck" label="Open World"
                                                        onChange ={e => {this.setState({OpenWorldCheck: e.target.checked});}}
                                                        checked={this.state.OpenWorldCheck}
                                            />
                                            <Form.Check type="checkbox" id = "OutbreakSimCheck" label="Outbreak Sim"
                                                        onChange ={e => {this.setState({OutbreakSimCheck: e.target.checked});}}
                                                        checked={this.state.OutbreakSimCheck}
                                            />
                                            <Form.Check type="checkbox" id = "PartyBasedRPGCheck" label="Party Based RPG"
                                                        onChange ={e => {this.setState({PartyBasedRPGCheck: e.target.checked});}}
                                                        checked={this.state.PartyBasedRPGCheck}
                                            />
                                            <Form.Check type="checkbox" id = "PinballCheck" label="Pinball"
                                                        onChange ={e => {this.setState({PinballCheck: e.target.checked});}}
                                                        checked={this.state.PinballCheck}
                                            />
                                            <Form.Check type="checkbox" id = "PlatformerCheck" label="Platformer"
                                                        onChange ={e => {this.setState({PlatformerCheck: e.target.checked});}}
                                                        checked={this.state.PlatformerCheck}
                                            />
                                            <Form.Check type="checkbox" id = "PointClickCheck" label="Point and Click"
                                                        onChange ={e => {this.setState({PointClickCheck: e.target.checked});}}
                                                        checked={this.state.PointClickCheck}
                                            />
                                            <Form.Check type="checkbox" id = "RhythmCheck" label="Rhythm"
                                                        onChange ={e => {this.setState({RhythmCheck: e.target.checked});}}
                                                        checked={this.state.RhythmCheck}
                                            />
                                            <Form.Check type="checkbox" id = "RoguelikeCheck" label="Roguelike"
                                                        onChange ={e => {this.setState({RoguelikeCheck: e.target.checked});}}
                                                        checked={this.state.RoguelikeCheck}
                                            />
                                            <Form.Check type="checkbox" id = "RTSCheck" label="RTS"
                                                        onChange ={e => {this.setState({RTSCheck: e.target.checked});}}
                                                        checked={this.state.RTSCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SandboxCheck" label="Sandbox"
                                                        onChange ={e => {this.setState({SandboxCheck: e.target.checked});}}
                                                        checked={this.state.SandboxCheck}
                                            />
                                            <Form.Check type="checkbox" id = "ShooterCheck" label="Shooter"
                                                        onChange ={e => {this.setState({ShooterCheck: e.target.checked});}}
                                                        checked={this.state.ShooterCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SkateboardingCheck" label="Skateboarding"
                                                        onChange ={e => {this.setState({SkateboardingCheck: e.target.checked});}}
                                                        checked={this.state.SkateboardingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SkatingCheck" label="Skating"
                                                        onChange ={e => {this.setState({SkatingCheck: e.target.checked});}}
                                                        checked={this.state.SkatingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SkiingCheck" label="Skiing"
                                                        onChange ={e => {this.setState({SkiingCheck: e.target.checked});}}
                                                        checked={this.state.SkiingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SnowboardingCheck" label="Snowboarding"
                                                        onChange ={e => {this.setState({SnowboardingCheck: e.target.checked});}}
                                                        checked={this.state.SnowboardingCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SoccerCheck" label="Soccer"
                                                        onChange ={e => {this.setState({SoccergCheck: e.target.checked});}}
                                                        checked={this.state.SoccerCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SpaceSimCheck" label="Space Sim"
                                                        onChange ={e => {this.setState({SpaceSimCheck: e.target.checked});}}
                                                        checked={this.state.SpaceSimCheck}
                                            />
                                            <Form.Check type="checkbox" id = "StealthCheck" label="Stealth"
                                                        onChange ={e => {this.setState({StealthCheck: e.target.checked});}}
                                                        checked={this.state.StealthCheck}
                                            />
                                            <Form.Check type="checkbox" id = "StrategyRPGCheck" label="Strategy RPG"
                                                        onChange ={e => {this.setState({StrategyRPGCheck: e.target.checked});}}
                                                        checked={this.state.StrategyRPGCheck}
                                            />
                                            <Form.Check type="checkbox" id = "SurvivalCheck" label="Survival"
                                                        onChange ={e => {this.setState({SurvivalCheck: e.target.checked});}}
                                                        checked={this.state.SurvivalCheck}
                                            />
                                            <Form.Check type="checkbox" id = "TennisCheck" label="Tennis"
                                                        onChange ={e => {this.setState({TennisCheck: e.target.checked});}}
                                                        checked={this.state.TennisCheck}
                                            />
                                            <Form.Check type="checkbox" id = "TowerDefenseCheck" label="Tower Defense"
                                                        onChange ={e => {this.setState({TowerDefenseCheck: e.target.checked});}}
                                                        checked={this.state.TowerDefenseCheck}
                                            />
                                            <Form.Check type="checkbox" id = "TriviaCheck" label="Trivia"
                                                        onChange ={e => {this.setState({TriviaCheck: e.target.checked});}}
                                                        checked={this.state.TriviaCheck}
                                            />
                                            <Form.Check type="checkbox" id = "TurnBasedStrategyCheck" label="Turn Based Strategy"
                                                        onChange ={e => {this.setState({TurnBasedStrategyCheck: e.target.checked});}}
                                                        checked={this.state.TurnBasedStrategyCheck}
                                            />
                                            <Form.Check type="checkbox" id = "VisualNovelCheck" label="Visual Novel"
                                                        onChange ={e => {this.setState({VisualNovelCheck: e.target.checked});}}
                                                        checked={this.state.VisualNovelCheck}
                                            />
                                            <Form.Check type="checkbox" id = "WalkingSimulatorCheck" label="Walking Simulator"
                                                        onChange ={e => {this.setState({WalkingSimulatorCheck: e.target.checked});}}
                                                        checked={this.state.WalkingSimulatorCheck}
                                            />
                                            <Form.Check type="checkbox" id = "WordGameCheck" label="Word Game"
                                                        onChange ={e => {this.setState({WordGameCheck: e.target.checked});}}
                                                        checked={this.state.WordGameCheck}
                                            />
                                            <Form.Check type="checkbox" id = "WrestlingCheck" label="Wrestling"
                                                        onChange ={e => {this.setState({WrestlingCheck: e.target.checked});}}
                                                        checked={this.state.WrestlingCheck}
                                            />
                                            
                                        </Form.Group>
                                    </div>
                                </Col>
                            </Row>
                                    {this.state.message}
                                    <div id="gameFormat">{this.state.gameListString} </div>
                                    
                        </Container>
                    </div>
                </form>
        

                <AllGamesTable payload = {this.state.gameList}/>
            </div>
        )
    };

}


export default AllGameSearch;
