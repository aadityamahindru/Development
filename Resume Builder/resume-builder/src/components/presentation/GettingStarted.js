import React from 'react'
import { NavLink } from 'react-router-dom'
import {skinCodes} from '../../constants/typeCodes'
function GettingStarted() {
    return (
        <div className="container mid gettingStarted">
            <h1 className=" center">
                Select a resume template to get started
            </h1>
            <p className=" center">
                You’ll be able to edit and change this template later!
            </p>
            <div className='styleTemplate'>
                {
                    skinCodes.map((value)=>{
                        return(
                            <div className="template-card rounded-border">
                                <img src={`/images/${value}.svg`} alt='template'/>
                                <NavLink to='/contact'>
                                    <button type="button" className='btn-template'>USE TEMPLATE</button>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GettingStarted
