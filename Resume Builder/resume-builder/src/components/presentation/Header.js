import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../static/images/logo.png'
function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <div className="logo-container full-height">
                    <NavLink to='/'>
                        <img className="logo" src={logo} alt='logo'></img>
                    </NavLink>
                </div>
                <div className="header-link-container full-height">
                    <ul>
                        <li className='signup btn-1'>
                            <NavLink to="/register">
                                Register
                            </NavLink>
                        </li>
                        <li className='signin'>
                            <NavLink to="/login" className='text-blue btn-1'>
                                Sign In
                                </NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink to="/resume-templates" className='btn-1'>
                                Resume Templates
                                </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about-us" className='btn-1'>
                                About Us
                                </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;