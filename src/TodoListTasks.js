import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements=this.props.tasks.map((item)=>{
            return(
                <TodoListTask title={item.title} isDone={item.isDone} priority={item.priority}/>
            )
        });
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

