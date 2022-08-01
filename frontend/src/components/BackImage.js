import React, { Component } from 'react'
import './BackImageStyles.css'

// use this component on every page to make the site look consistent throughout

class BackImage extends Component {

    render() {
        return(
            <div className='back-img'>
                <div className='heading'>
                    <h1>{this.props.heading}</h1>
                    <p>{this.props.text}</p>
                </div>

            </div>
        )
    }
}

export default BackImage