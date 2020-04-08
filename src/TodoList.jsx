import React from 'react';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    ADD_TASK,
    addTaskAC,
    CHANGE_TASK,
    changeFilterAC,
    changeTaskAC,
    DELETE_LIST,
    deleteListkAC
} from "./todoListReducer";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    newTaskId = 0;
    state = {
        tasks: [],
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All",
        };
        let stateAsString = localStorage.getItem("our-state"+ this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(task=> {
                if (task.id >= this.newTaskId) {
                    this.newTaskId = task.id + 1;
                }
            });
        });
    };

    addTask = (newTitle) => {           //add new task (props for header)
        let maxId = this.props.tasks.length === 0 ? -1 : this.props.tasks[this.props.tasks.length - 1].id;
        let newTask = {
            id: maxId+1,
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        this.props.addTask(newTask, this.props.listId);
        // let newTasks = [...this.state.tasks, newTask];
        // this.setState({
        //         tasks: newTasks,
        //     },
        //     ()=>{ this.saveState()}
        // );
    };

    changeFilter = (newFilterValue) => {        //change what tasks to show (props for footer)
        debugger
        this.setState({
                filterValue: newFilterValue,
            } ,
            ()=>{  this.saveState()}
        )
    };

    changeTitle = (id, newTitle) => {       //edit title by click on ToDoListTasks(props)
        this.changeTask(id, {title: newTitle});
    };

    changeStatus = (id, isDone) => {        //change checkbox of task (props for ToDoListTasks)
        this.changeTask(id, {isDone: isDone});
    };

    deleteList=()=>{
        this.props.deleteList(this.props.listId)
    };

    changeTask = (id, obj) => {
        this.props.changeTask(this.props.listId, id, obj)
        // let newTasks = this.state.tasks.map(t => {
        //     if (t.id !== id)
        //         return t;
        //     else
        //         return {...t, ...obj};
        // });
        // this.setState({
        //     tasks: newTasks,
        // } ,
        // ()=>{  this.saveState()})
    };

    render = () => {
        return (
                <div className="todoList">
                    <div className="todoListHeader">
                        <TodoListTitle deleteList={this.deleteList} title={this.props.title}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks listId={this.props.listId} changeStatus={this.changeStatus} changeTitle={this.changeTitle}
                                   tasks={this.props.tasks.filter(t => {
                                           switch (this.props.filterValue) {
                                               case "Completed":
                                                   return t.isDone === true;
                                               case "Active":
                                                   return t.isDone === false;
                                               default:
                                                   return true;
                                           }
                                       }
                                   )
                                   }/>
                    <TodoListFooter listId={this.props.listId}  changeFilter={this.props.changeFilter} filterValue={this.props.filterValue}/>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, listId) => {
            const action = addTaskAC(newTask, listId);
            dispatch(action);
        },
        changeTask: (listId, taskId, obj)=>{
            const action = changeTaskAC(listId, taskId, obj);
            dispatch(action);
        },
        deleteList: (listId)=>{
            const action = deleteListkAC(listId);
            dispatch(action);
        },
        changeFilter: (newFilter, listId)=>{
            const action = changeFilterAC(newFilter, listId);
            dispatch(action);
        }
    }
};

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;