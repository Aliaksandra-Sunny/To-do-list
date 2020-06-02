import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteTaskTC} from "./todoListReducer";
import {api} from "./api";

class TodoListTask extends React.Component {

    state = {
        editMore: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked ? 2 : 0);
    };

    activateEditMore = () => {
        this.setState({
            editMore: true,
        })
    };

    deactivateEditMore = () => {
        this.setState({
            editMore: false,
        });
        this.props.changeTitle(this.props.task, this.state.title);
    };

    changeTitle = (e) => {
        this.setState({title: e.currentTarget.value});
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id, this.props.listId)
    };

    render = () => {
        return (
            <div className={this.props.task.status === 2 ? "todoList-task done" : "todoList-task"}>
                <input type="checkbox" onChange={this.onIsDoneChanged} checked={this.props.task.status === 2}/>
                {this.state.editMore
                    ? <input onBlur={this.deactivateEditMore} autoFocus={true} onChange={this.changeTitle}
                             value={this.state.title}/>
                    : <span onClick={this.activateEditMore}>{this.props.task.id} - {this.props.task.title}</span>
                }, priority: {this.props.task.priority}
                <button onClick={this.deleteTask}>X
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId, listId) => {
            dispatch(deleteTaskTC(taskId, listId));
        }
    }
};

const ConnectedTodoListTask = connect(null, mapDispatchToProps)(TodoListTask);
export default ConnectedTodoListTask;

TodoListTask.propTypes = {
    status: PropTypes.number,
    priority: PropTypes.string
};