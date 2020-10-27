import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { skinCodes } from '../../constants/typeCodes';
import Preview from './Preview';
class Education extends Component {
    state = {
        contactSection: {
            'FNAM': 'Aaditya',
            'LNAM': 'Mahindru',
            'PSRU': 'hii',
            'EMAI': 'aaditya2069@gmail.com',
            'PHON': '9540111282',
            'PROF': 'SDE',
            'STRT': 'Vikaspuri',
            'CITY': 'New Delhi',
            'STAT': 'Delhi',
            'CNTY': 'India',
            'ZIPC': '110018',
            'Scho': "",
            'DGRE': "",
            "GRCG": "",
            "GRDT": "",
            "GRYR": ""
        }
    }
    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        let contactSection = this.state.contactSection
        this.setState({ contactSection: { ...contactSection, [key]: value } })
    }
    onSubmit = () => {
        console.log(this.state);
    }
    render() {
        return (
            <div className="container med education">
                <div className="section funnel-section">
                    <div className="form-card">
                        <h2 className="form-heading center">Educational Details</h2>
                        <div className="form-section">
                            <div className="input-group"><label>College Name</label>
                                <div className="effect"><input type="text" name="SCHO" onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Degree</label>
                                <div className="effect"><input type="text" name="DGRE" onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>CGPA</label>
                                <div className="effect"><input type="text" name="GRCG" onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>City/State</label>
                                <div className="effect"><input type="text" name="CITY" onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Graduation Month</label>
                                <div className="effect"><input type="text" name="GRDT" onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Graduation Year</label>
                                <div className="effect"><input type="text" name="GRYR" onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="form-buttons">
                                <button className="btn hvr-float-shadow" type='button'>Next</button>
                                <NavLink to='/contact' className="center">Back</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="preview-card">
                        <Preview contactSection={this.state.contactSection} skinCode={skinCodes}></Preview>
                    </div>
                </div>
            </div>
        );
    }
}

export default Education;