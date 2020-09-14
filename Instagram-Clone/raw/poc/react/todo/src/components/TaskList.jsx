//imr
import React from 'react';
//sfc
const TaskList = (props) => {
    let { list, rTask } = props
    return (
        <React.Fragment>
            {
                list.map((task) => {
                    return (
                        <div className="task">
                            <span className="mr-4">
                                {task.name}
                            </span>
                            <button className="btn btn-danger" onClick={() => { rTask(task.id) }}>X</button>
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
}
export default TaskList;
