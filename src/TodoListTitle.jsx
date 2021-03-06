import React from 'react';
import PropTypes from "prop-types";

class TodoListTitle extends React.Component {
    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <button onClick={this.props.deleteList}>X</button>
            </div>
        );
    }
};

export default TodoListTitle;

TodoListTitle.propTypes = {
    onAddTaskClick: PropTypes.func
}