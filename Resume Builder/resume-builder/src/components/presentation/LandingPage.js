import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../static/images/resume.png'
function LandingPage() {
    return (
        <div className="container lp-page center">
            <div>
                <h1>Create a resume that stands out</h1>
                <p >Create a Resume that perfectally describes your skils and match job profile.</p>
                <br></br>
                <div >
                    <NavLink to="/getting-started" className='btn'><span>Get Started for Free</span>
                    </NavLink>
                </div>
                <img src={logo} className="lp-resume" alt="logo" />
            </div>
        </div>
    )
}

export default LandingPage
