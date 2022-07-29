
import React, {Component} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import AllGamesTable from './Tables/AllGamesTable';
import './AllGameSearchStyles.css';

let ud = localStorage.getItem('user');

class AllGameSearch extends Component 
{
    _isMounted = false;
    testArray = [];

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
            testArray: [],
            

            //platforms
            PCCheck: false,
            PS4Check: false,
            XOneCheck: false,
            XSeriesCheck: false,
            PS5Check: false,
            SwitchCheck: false,

            genres: []
        }
    }

    async componentDidMount()
    {
        this._isMounted = true;
        this.state.test = 'TEST';
        let queryParams = new URLSearchParams(window.location.search);
        let platformURL = queryParams.get('platform');
        await this.getAllGenres();

        this.state.testArray.forEach((genre) => 
        {
            this.state.genres[genre + 'Check'] = false;
        })

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

    getAllGenres = async () =>
    {
        let response = await fetch(this.buildPath('api/games/getAllGenres'),
        {method:'GET', headers:{'authorization': 'Bearer ' + ud}});

        let txt = await response.text();
        let res = JSON.parse(txt);
        
        this.setState({testArray: res});
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
        console.log(this.state.genres);

        if (this.state.genres.some((genre) => genre === true))
        {
            console.log('TRUE');
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
                //console.log(resultGames[i].platforms);

                //this doesn't work if not all of our games have a platform/genre array
                resultGames[i].platforms = searchList[i].platforms.join(', ');
                resultGames[i].genre = searchList[i].genres.join(', ');

                //console.log(resultGames[i].name);
                //console.log(resultGames[i].platforms);
                //console.log(resultGames[i].genres);
                //console.log(resultGames[i]._id);

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

    renderGenres() {
        var toPrint = [];
        this.state.testArray.forEach((genre) => 
        {
            toPrint.push(<Form.Check type="checkbox" id = {genre + 'Check'} label={genre}
            onChange ={e => {
                    let tmp = [...this.state.genres];
                    console.log(tmp);

                    tmp[genre + 'Check'] = e.target.checked;
                    this.setState({tmp});
                }
            }
            checked={this.state.genres[genre + 'Check']}
            />);
        })
        return toPrint;
    };


    render()
    {
        return(

            <div className="form-container">
                <form>
                    <label for="Name">Name</label>
                    <input class="form-control" type="text" id="Name" placeholder="Name" value ={this.state.gameName} autoFocus
                                                        onChange ={e => this.setState({ gameName: e.target.value})}
                                                        onKeyDown={this.onkeyPress}/>
                    <Button variant="secondary" id="AllGamesSearch" onClick={() => this.onSubmit()}>Search</Button>

                    <Container className="checkBoxes">
                        <Row xxl={4}>
                            <Col>Platform</Col>
                            <Col>Genre</Col>
                            
                        </Row>

                        <Row xxl={4}>
                            <Col xs lg="9"> 
                                <div id="checkboxPlatforms">
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
                                <div id="checkboxGenres">
                                    <Form.Group className="mb-3 w-50" controlId="formGenreCheckbox">
                                        {this.renderGenres()}

                                        
                            
                                        
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                                 {this.state.message}
                                <div id="gameFormat">{this.state.gameListString} </div>
                                
                    </Container>
                </form>
        

                <AllGamesTable payload = {this.state.gameList}/>
            </div>
        )
    };

}


export default AllGameSearch;
