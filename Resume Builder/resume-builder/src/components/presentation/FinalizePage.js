import React from 'react';
import Preview from './Preview';
import { skinCodes } from '../../constants/typeCodes';
import { connect } from 'react-redux';

class FinalizePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      educationSection: this.props.educationSection,
      contactSection: this.props.contactSection,
      skinCd: this.props.skinCd ? this.props.skinCd : 'skin1'
    };
  }
  render() {
    let { contactSection, educationSection, skinCd } = this.state;
    return (
      <div className="container mid full-height finalize-page">
        <div className="funnel-section">
          <div className="finalize-preview-card">
            <Preview contactSection={contactSection} educationSection={educationSection} skinCd={skinCd}></Preview>
          </div>
          <div className="finalize-settings">
            <div className="section">
              <h1 className=" center">
                Select a resume template to get started</h1>
              <p className=" center">
                You’ll be able to edit and change this template later!
                    </p>
              <div className="styleTemplate ">
                {
                  skinCodes.map((value, index) => {
                    return (<div className="template-card rounded-border">

                      <i className={this.state.skinCd == value ? 'fa fa-check-circle selected' : 'hide'} aria-hidden="true"></i>
                      <img className={this.state.skinCd == value ? 'active' : ''} src={'/images/' + value + '.svg'} />
                      <button type='button'>USE TEMPLATE</button>

                    </div>);

                  })
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state, ownProps) => {
  return state;
}

export default connect(mapStateToProps, null)(FinalizePage)