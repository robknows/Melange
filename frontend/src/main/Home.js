// React
import React, {Component} from "react";
import { Link } from 'react-router-dom'

// Resources
import globe from '../images/globe.svg'
import '../styles/Home.css'

export default class Home extends Component {
    render() {
        return (
            <header className="Home-header">
                <img src={globe} className="Home-logo" alt="logo"/>
                <h1 className="Home-title">Melange</h1>
                <h2 className="Home-description">Step-by-step language lessons in the browser</h2>
                <Link id="courses-link" to="courses" className="Call-to-action-btn">Get Started</Link>
            </header>
        )
    }
}