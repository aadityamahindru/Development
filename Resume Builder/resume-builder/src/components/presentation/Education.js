import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fieldCd,skinCodes } from '../../constants/typeCodes';
import Preview from './Preview';
class Education extends Component {
    state = {
        contactSection:this.props.contactSection,
        educationSection: this.props.educationSection,
    }
    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        let educationSection = this.state.educationSection
        this.setState({ educationSection: { ...educationSection, [key]: value } })
    }
    onSubmit = () => {
        console.log(this.state);
        this.props.history.push('/finalize');
        this.props.addEducation(this.state.educationSection);
    }
    render() {
        return (
            <div className="container med education">
                <div className="section funnel-section">
                    <div className="form-card">
                        <h2 className="form-heading center">Educational Details</h2>
                        <div className="form-section">
                            <div className="input-group"><label>College Name</label>
                                <div className="effect"><input type="text" name={fieldCd.SchoolName} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Degree</label>
                                <div className="effect"><input type="text" name={fieldCd.Degree} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>CGPA</label>
                                <div className="effect"><input type="text" name={fieldCd.GraduationCGPA} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>City/State</label>
                                <div className="effect"><input type="text" name={fieldCd.City} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Graduation Month</label>
                                <div className="effect"><input type="text" name={fieldCd.GraduationDate} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Graduation Year</label>
                                <div className="effect"><input type="text" name={fieldCd.GraduationYear} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="form-buttons">
                                <button className="btn hvr-float-shadow" type='button' onClick={this.onSubmit}>Next</button>
                                <NavLink to='/contact' className="center">Back</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="preview-card">
                        <Preview contactSection={this.state.contactSection} skinCode={"skin1"} educationSection={this.state.educationSection}></Preview>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state,ownProps)=>{
    return state;
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addEducation:(educationSection)=>{dispatch({type:'ADD_EDUCATION',educationSection:educationSection})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Education);