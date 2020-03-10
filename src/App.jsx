import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
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
        localStorage.setItem("our-state", stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All",
        };
        let stateAsString = localStorage.getItem("our-state");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(task=> {
                if (task.id > this.newTaskId) {
                    this.newTaskId = task.id++;
                }
            });
        });
    };


    addTask = (newTitle) => {           //add new task (props for header)
        let newTask = {
            id: this.newTaskId,
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        this.newTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
                tasks: newTasks,
            },
            ()=>{  this.saveState()}
        );
    };

    changeFilter = (newFilterValue) => {        //change what tasks to show (props for footer)
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

    changeTask = (id, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== id)
                return t;
            else
                return {...t, ...obj};
        });
        this.setState({
            tasks: newTasks,
        } ,
        ()=>{  this.saveState()})
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} titleRef={this.newTaskTitleRef}/>
                    <TodoListTasks changeStatus={this.changeStatus} changeTitle={this.changeTitle}
                                   tasks={this.state.tasks.filter(t => {
                                           switch (this.state.filterValue) {
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
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

