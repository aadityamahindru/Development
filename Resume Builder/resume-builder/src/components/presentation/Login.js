import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { fieldCd } from '../../constants/typeCodes';
import logo from '../../static/images/logo.png'

class Login extends Component {
    state = {}
    render() {
        return (
            <div className="container mid full-height login">
                <div className='login-container'>
                    <NavLink to='/'>
                        <img className="login__logo" src={logo} alt='logo'></img>
                    </NavLink>
                    <h2 className='form-heading center'>Sign-in</h2>
                    <div className='form-section'>
                        <div className='input-group full'>
                            <label>Email-Id</label>
                            <div className='effect'>
                                <input type='text' name={fieldCd.FirstName} onChange={this.onChange} /><span></span>
                            </div>
                            <div className='error'></div>
                        </div>

                        <div className='input-group full'>
                            <label>Password</label>
                            <div className='effect'>
                                <input type='text' name={fieldCd.LastName} onChange={this.onChange} /><span></span>
                            </div>
                            <div className='error'></div>
                        </div>
                        <div className='form-buttons'>
                            <button className='btn' onClick={this.onSubmit}>Sign In</button>
                            {/* <NavLink to='/getting-started' className='center back-btn'>Back</NavLink> */}
                        </div>
                        <div class="form-buttons no-account">
                            <p> If you don't already have an account please
                               <NavLink to='/register'><span class="open-register-form"> register</span></NavLink>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
