import React from 'react';
import PropTypes from "prop-types";
import TodoListTasks from "./TodoListTasks";

class TodoListHeader extends React.Component {
    render = (props) => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input ref={this.props.titleRef} type="text" placeholder="New task name"/>
                    <button onClick={this.props.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

TodoListHeader.propTypes={
    titleRef: PropTypes.object,
    onAddTaskClick: PropTypes.func
}