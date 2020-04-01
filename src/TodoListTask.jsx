import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class TodoListTask extends React.Component {

    state = {
        editMore: false,
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

    activateEditMore = () => {
        this.setState({
            editMore: true,
        })
    };

    deactivateEditMore = () => {
        this.setState({
            editMore: false,
        })
    };

    changeTitle=(e)=>{
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    render = () => {
        return (
            <div className={this.props.task.isDone ? "todoList-task done" : "todoList-task"}>
                <input type="checkbox" onChange={this.onIsDoneChanged} checked={this.props.task.isDone}/>
                {this.state.editMore
                    ? <input onBlur={this.deactivateEditMore} autoFocus={true} onChange={this.changeTitle} value={this.props.task.title}/>
                    : <span onClick={this.activateEditMore}>{this.props.task.id} - {this.props.task.title}</span>
                }, priority: {this.props.task.priority}
                <button onClick={()=>{this.props.deleteTask(this.props.task.id, this.props.listId)}}>X</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId, listId) => {
            const action = {type: "DELETE-TASK", taskId: taskId, listId: listId};
            dispatch(action);
        }
    }
};

const ConnectedTodoListTask = connect(null, mapDispatchToProps)(TodoListTask);
export default ConnectedTodoListTask;

TodoListTask.propTypes = {
    isDone: PropTypes.bool,
    priority: PropTypes.string
}