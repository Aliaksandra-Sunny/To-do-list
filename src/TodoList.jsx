import React from 'react';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskAC,
    changeFilterAC,
    changeTaskAC,
    deleteListAC, loadTasksTC,
} from "./todoListReducer";
import {api} from "./api";

class TodoList extends React.Component {

    state = {
        tasks: [],
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.loadTasks(this.props.listId);
    };


    addTask = (newTitle) => {           //add new task (props for header)
            api.createTask(newTitle,this.props.listId).then(res => {
            if (res.data.resultCode === 0) {
                this.props.addTask(res.data.data.item);
            }
        });
    };

    changeFilter = (newFilterValue) => {        //change what tasks to show (props for footer)
        this.setState({
                filterValue: newFilterValue,
            },
        )
    };

    deleteList = () => {
       api.deleteList(this.props.listId).then(res => {
            if (res.data.resultCode === 0)
                this.props.deleteList(this.props.listId)
        });
    };

    changeTitle = (task, newTitle) => {       //edit title by click on ToDoListTasks(props)
        this.changeTask(task, {title: newTitle});
    };

    changeStatus = (task, status) => {        //change checkbox of task (props for ToDoListTasks)
        this.changeTask(task, {status: status});
    };

    changeTask = (task, obj) => {
        api.updateTask({...task, ...obj}).then(res => {
                if (res.data.resultCode === 0)
                    this.props.changeTask(res.data.data.item)
            }
        );
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoListHeader">
                    <TodoListTitle deleteList={this.deleteList} title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks listId={this.props.listId} changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               tasks={tasks.filter(t => {
                                       switch (this.props.filterValue) {
                                           case "Completed":
                                               return t.status === 2;
                                           case "Active":
                                               return t.status === 0;
                                           default:
                                               return true;
                                       }
                                   }
                               )
                               }/>
                <TodoListFooter listId={this.props.listId} changeFilter={this.props.changeFilter}
                                filterValue={this.props.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask) => {
            const action = addTaskAC(newTask);
            dispatch(action);
        },
        changeTask: (task) => {
            const action = changeTaskAC(task);
            dispatch(action);
        },
        deleteList: (listId) => {
            const action = deleteListAC(listId);
            dispatch(action);
        },
        changeFilter: (newFilter, listId) => {
            const action = changeFilterAC(newFilter, listId);
            dispatch(action);
        },
        loadTasks (listId) {
            dispatch(loadTasksTC(listId))
        }
    }
};

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;