import React from 'react';
import TodoListTask from "./TodoListTask";
import PropTypes from "prop-types";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements=this.props.tasks.map((task)=>{
            return(
                <TodoListTask changeStatus={this.props.changeStatus} task={task}/>
            )
        });
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

TodoListTasks.propTypes={
    tasks: PropTypes.array
}