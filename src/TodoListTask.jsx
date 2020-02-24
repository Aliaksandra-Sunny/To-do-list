import React from 'react';
import PropTypes from "prop-types";

class TodoListTask extends React.Component {

    onIsDoneChanged=(e)=>{
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };

    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" onChange={this.onIsDoneChanged} checked={this.props.task.isDone}/>
                <span>{this.props.task.title}, priority: {this.props.task.priority}</span>
            </div>
        );
    }
}

export default TodoListTask;

TodoListTask.propTypes = {
    isDone: PropTypes.bool,
    priority: PropTypes.string
}