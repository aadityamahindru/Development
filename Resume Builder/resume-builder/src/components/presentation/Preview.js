import React from 'react'

function Preview(props) {
    let { contactSection } = props;
    return (
        <div className='resume-preview'>
            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.FNAM}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.LNAM}</p>
                </div>
            </div>

            <div className='input-group full'>
                <div className='effect'>
                    <p>{contactSection.PRSU}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.EMAI}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.PHON}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.PROF}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.STRT}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.CITY}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.STAT}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.CNTY}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.ZIPC}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.SCHO}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.DGRE}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.GRCG}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.GRDT}</p>
                </div>
            </div>

            <div className='input-group'>
                <div className='effect'>
                    <p>{contactSection.GRYR}</p>
                </div>
            </div>
        </div>
    )
}

export default Preview
