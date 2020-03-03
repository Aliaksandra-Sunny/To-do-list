import React from 'react';
import PropTypes from "prop-types";

class TodoListHeader extends React.Component {

    state = {
        error: true,
        title: "",
    };

    changeInput = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value,
        });
    }

    onEnterPress = (e) => {
        if (e.key === "Enter")
            this.onAddTaskClick();
    }

    onAddTaskClick = () => {
        if (this.state.title !== "") {
            let newText = this.state.title;
            this.setState({
                error: true,
                title: "",
            })
            this.props.addTask(newText);
        } else {
            this.setState({
                error: false,
            });
        }
    };

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn?</h3>
                <div className="todoList-newTaskForm">
                    <input onKeyPress={this.onEnterPress} onChange={this.changeInput}
                           className={this.state.error === true ? "error" : ""}
                           value={this.state.title}
                           type="text" placeholder="New task name"/>
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
};

export default TodoListHeader;

TodoListHeader.propTypes = {
    titleRef: PropTypes.object,
    onAddTaskClick: PropTypes.func
}