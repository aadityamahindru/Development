import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { fieldCd } from '../../constants/typeCodes';
import logo from '../../static/images/logo.png'

class Register extends Component {
    state = {}
    render() {
        return (
            <div className="container mid full-height register">
                <div className='register-container'>
                    <NavLink to='/'>
                        <img className="register__logo" src={logo} alt='logo'></img>
                    </NavLink>
                    <h2 className='form-heading center'>Create An Account</h2>
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
                            <button className='btn' onClick={this.onSubmit}>Create An Account</button>
                            {/* <NavLink to='/getting-started' className='center back-btn'>Back</NavLink> */}
                        </div>
                        <div class="form-buttons no-account">
                            <p> If you already have an account then please
                               <NavLink to='/login'><span class="open-register-form"> Signin</span></NavLink>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
