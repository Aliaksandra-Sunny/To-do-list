import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.newTaskTitleRef = React.createRef();
    // }

    state = {
        tasks: [
            {title: "CSS", isDone: true, priority: "low"},
            {title: "JS", isDone: false, priority: "medium"},
            {title: "ReactJS", isDone: true, priority: "high"},
            {title: "Patterns", isDone: true, priority: "medium"}
        ],
        filterValue: "All",
    }

    addTask = (newTitle) => {
        let newTask = {
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
                tasks: newTasks,
            }
        )
    }

    changeFilter = (newFilterValue) => {
        this.setState({
                filterValue: newFilterValue,
            }
        )
    }

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t !== task)
                return t;
            else
                return {...t, isDone: isDone};
        })

        this.setState({
                tasks: newTasks,
            }
        )
    }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} titleRef={this.newTaskTitleRef}/>
                    <TodoListTasks changeStatus={this.changeStatus} tasks={this.state.tasks.filter(t => {
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

