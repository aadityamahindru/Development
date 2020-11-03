import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fieldCd } from '../../constants/typeCodes';

class Preview extends Component {
    state = {
        skinCode:this.props.skinCd,
    }
    render() {
        let { contactSection, educationSection } = this.props;
        let name = contactSection[fieldCd.FirstName] + ' ' + contactSection[fieldCd.LastName];
        return (
            // <div className={'resume-preview ' + this.props.skinCode}></div>
            <div className={'resume-preview skin1'}>
                <div className={'name-section'}>
                    <p className={'center contact-name text-upper'}> {name} </p>
                    <p className={'center address margin-small'}>{contactSection[fieldCd.Street] + ', ' + contactSection[fieldCd.SchoolCity] + ', ' + contactSection[fieldCd.State] + ', ' + contactSection[fieldCd.Country] + ', ' + contactSection[fieldCd.ZipCode]}</p>
                    <p className={'center margin-small'}>{contactSection[fieldCd.Email]}</p>
                    <p className={'center margin-small'}>{contactSection[fieldCd.Phone]}</p>
                </div>
                <div className={'professionalSection'}>
                    <p className="heading bold uppercase">Professional Summary</p>
                    <div className={'divider'}></div>
                    <p> {contactSection[fieldCd.ProfSummary]}</p>
                </div>
                <div className={'educationSection'}>
                    <p className="heading bold uppercase">EDUCATIONAL DETAILS</p>
                    <div className={'divider'}></div>
                    <p> {educationSection[fieldCd.SchoolName]+" , "+educationSection[fieldCd.SchoolCity]}</p>
                    <p className='grad_info'>{educationSection[fieldCd.Degree]+"  "+"CGPA : "+educationSection[fieldCd.GraduationCGPA]}</p>
                    <p className="grad_year">{educationSection[fieldCd.GraduationDate]+"  "+educationSection[fieldCd.GraduationYear]}</p>
                </div>

            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return {skinCd:state.document.skinCd}
}
export default connect(mapStateToProps,null)(Preview);
