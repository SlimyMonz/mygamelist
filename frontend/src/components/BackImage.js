import React, { Component } from 'react'
import './BackImageStyles.css'
import background from '../backgroundimg.png';

// use this component on every page to make the site look consistent throughout

class BackImage extends Component {

    render() {
        return(
        //     <div className='vidList' style={{ backgroundImage: `url(${background})` }}>
        //     {/* <video autoPlay loop muted id='video'>
        //         <source src={retroVideo} type='video/mp4'/>

        //     </video> */}
            

        //     <div className='contentList'>
                
        //         <div className='text-wrapperList'>
        //             <div className='imglogo'>
        //                 {/* <h1>My List {'('} {gameData.length} games {')'}</h1> */}
        //                 <h1>My List</h1>
                        
        //             </div>
        //             <div className='listtable'> 
        //                 <UserListTable data={gameData} load={dataLoaded}/>
        //             </div> 

        //         </div>
        //     </div>
        // </div>
            <div className='back-img' style={{ backgroundImage: `url(${background})` }}>
                <div className='heading'>
                    <div className='backimg-background'>
                        <h1>{this.props.heading}</h1>
                        <p>{this.props.text}</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default BackImage