import React from 'react';
import PropTypes from "prop-types";

class TodoListHeader extends React.Component {

    newTaskTitleRef=React.createRef();
    onAddTaskClick = () => {
        if (this.newTaskTitleRef.current.value !== "") {
            let newText = this.newTaskTitleRef.current.value;
            this.newTaskTitleRef.current.value = "";
            this.props.addTask(newText);
        } else alert("Введите заголовок!");
    }

    render = (props) => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                    <button onClick={this.onAddTaskClick}>Add</button>
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