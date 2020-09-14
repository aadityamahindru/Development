import React, { Component } from 'react';
class InputBox extends Component {
    state = { cVal:"" }
    setValue=(e)=>{
        let input=e.currentTarget;
        this.setState({
            cVal:input.value
        })
    }
    submitTask=()=>{
        this.props.addTask(this.state.cVal);
        this.setState({cVal:""})
    }
    render() { 
        return ( 
            <React.Fragment>
                <input type="text" value={this.state.cVal} onChange={this.setValue}/>
                <button onClick={this.submitTask}>Add</button>
            </React.Fragment>
         );
    }
}
 
export default InputBox;