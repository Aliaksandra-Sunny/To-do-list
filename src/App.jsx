import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {

    state={
        lists:[
        ]
    };
    newListId = 0;

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("lists" , stateAsString);
    };

    restoreState = () => {
        let state = {
            lists: [],
        };
        let stateAsString = localStorage.getItem("lists");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.lists.forEach(list=> {
                if (list.id >= this.newListId) {
                    this.newListId = list.id + 1;
                }
            });
        });
    };

    addLists= (newTitle) => {           //add new list (props for header)
        let newList = {
            id: this.newListId,
            title: newTitle,
        };
        this.newListId++;
        let newLists = [...this.state.lists, newList];
        this.setState({
                lists: newLists,
            },
            ()=>{ this.saveState()}
        );
    };

    render = () => {
        const lists=this.state.lists.map(list=><TodoList id={list.id} title={list.title}/>)
        return (
            <div className="App">
                <AddNewItemForm addItem={this.addLists}/>
                <div className="lists">
                    {lists}
                </div>
            </div>
        );
    }
}

export default App;

