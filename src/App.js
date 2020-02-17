import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    constructor(props){
        super(props);
        this.newTaskTitleRef=React.createRef();
    }

    state={
        tasks:[
            {title: "CSS", isDone: true, priority: "low"},
            {title: "JS", isDone: false, priority: "medium"},
            {title: "ReactJS", isDone: true, priority: "high"},
            {title: "Patterns", isDone: true, priority: "medium"}
        ],
        filterValue: "Active",
    }

    onAddTaskClick=()=>{
        if(this.newTaskTitleRef.current.value!==""){
            let newText=this.newTaskTitleRef.current.value;
            this.newTaskTitleRef.current.value="";
            let newTask= {title: newText,
                isDone: true,
                priority: "low"};
            let newTasks=[...this.state.tasks, newTask];
            this.setState({
                    tasks: newTasks,
                }
            )
        }
        else alert("Введите заголовок!");

    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader onAddTaskClick={this.onAddTaskClick} titleRef={this.newTaskTitleRef} />
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

