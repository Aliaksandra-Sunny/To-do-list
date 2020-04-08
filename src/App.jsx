import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_LIST, addListAC} from "./todoListReducer";

class App extends React.Component {

    state = {
        lists: []
    };
    newListId = 0;

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("lists", stateAsString);
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
            this.state.lists.forEach(list => {
                if (list.id >= this.newListId) {
                    this.newListId = list.id + 1;
                }
            });
        });
    };

    addLists = (newTitle) => {           //add new list (props for header)
        let maxId = this.props.lists.length === 0 ? -1 : this.props.lists[this.props.lists.length - 1].id;
        let newList = {
            id: maxId + 1,
            title: newTitle,
            tasks:[],
        };
        this.props.addList(newList);
        // let newLists = [...this.state.lists, newList];
        // this.setState({
        //         lists: newLists,
        //     },
        //     () => {
        //         this.saveState()
        //     }
        // );
    };

    render = () => {
        const lists = this.props.lists.map(list => <TodoList listId={list.id} title={list.title} filterValue={list.filterValue} tasks={list.tasks}/>);
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

const mapStateToProps = (state) => {
    return {
        lists: state.lists,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addList: (newList) => {
            const action = addListAC(newList);
            dispatch(action);
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;


