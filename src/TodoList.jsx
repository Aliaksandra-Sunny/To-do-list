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
    deleteListAC, setTasksAC
} from "./todoListReducer";
import axios from "axios";

class TodoList extends React.Component {

    state = {
        tasks: [],
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.listId}/tasks`, {
            withCredentials: true,
            headers: {"API-KEY": "ed9ff87e-25ab-4b75-a8a6-d22424d524be"}
        })
            .then(res => {
                this.props.setTasks(res.data.items, this.props.listId);
            });
    };

    ___restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All",
        };
        let stateAsString = localStorage.getItem("our-state" + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.newTaskId) {
                    this.newTaskId = task.id + 1;
                }
            });
        });
    };

    addTask = (newTitle) => {           //add new task (props for header)
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.listId}/tasks`,
            {title: newTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "ed9ff87e-25ab-4b75-a8a6-d22424d524be"}
            }).then(res => {
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
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.listId}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "ed9ff87e-25ab-4b75-a8a6-d22424d524be"}
            }).then(res => {
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
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.listId}/tasks/${task.id}`,
            {...task, ...obj},
            {
                withCredentials: true,
                headers: {"API-KEY": "ed9ff87e-25ab-4b75-a8a6-d22424d524be"}
            }
        ).then(res => {
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
        setTasks: (tasks, listId) => {
            const action = setTasksAC(tasks, listId);
            dispatch(action);
        }
    }
};

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;