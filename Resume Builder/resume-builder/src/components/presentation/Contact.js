import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Preview from './Preview';
class Contact extends Component {
    state = {}
    render() {
        return (
            <div className='container mid contact full-height'>
                <div className='section'>
                    <div className='form-card'>
                        <h2 className='form-heading center'>Personal Details</h2>
                        <div className='form-section'>
                            <div className='input-group'>
                                <label>First Name</label>
                                <div className='effect'>
                                    <input type='text' name='FNAM' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Last Name</label>
                                <div className='effect'>
                                    <input type='text' name='LNAM' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group full'>
                                <label>Professional Summary</label>
                                <div className='effect'>
                                    <input type='text' name='PRSU' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Email</label>
                                <div className='effect'>
                                    <input type='text' name='EMAI' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Phone</label>
                                <div className='effect'>
                                    <input type='text' name='PHON' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Profession</label>
                                <div className='effect'>
                                    <input type='text' name='PROF' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Street</label>
                                <div className='effect'>
                                    <input type='text' name='STRT' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>City</label>
                                <div className='effect'>
                                    <input type='text' name='CITY' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>State</label>
                                <div className='effect'>
                                    <input type='text' name='STAT' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Country</label>
                                <div className='effect'>
                                    <input type='text' name='CNTY' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Pin Code</label>
                                <div className='effect'>
                                    <input type='text' name='ZIPC' /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='form-buttons'>
                                <button className='btn'>Next</button>
                                <NavLink to='/education' className='center back-btn'>Back</NavLink>
                            </div>

                        </div>
                    </div>
                    <div className='preview-card'>
                        <Preview></Preview>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
