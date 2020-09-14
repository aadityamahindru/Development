// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './components/TaskList';
//imrc
import React, { Component } from 'react';
import TaskList from './components/TaskList';
import InputBox from './components/InputBox'
//
class App extends Component {
  state = {
    tasks: [{
      id: "1",
      name: "learn js"
    }, {
      id: "2",
      name: "learn react"
    }, {
      id: "3",
      name: "learn rest api"
    }]
  }
  removeTask = (toBeRemovedId) => {
    let { tasks } = this.state;
    let updatedTasks = tasks.filter((task) => {
      return task.id != toBeRemovedId;
    })
    this.setState({
      tasks: updatedTasks
    })
  }
  addTask=(taskName)=>{
    let{tasks}=this.state;
    tasks.push({id:tasks.length+1,name:taskName})
    this.setState({tasks:tasks});
  }
  render() {
    let { tasks } = this.state;
    return (
      <React.Fragment>
      <InputBox addTask={this.addTask}></InputBox>
        <TaskList list={tasks} rTask={this.removeTask}></TaskList>
      </React.Fragment>
    );
  }
}

export default App;

