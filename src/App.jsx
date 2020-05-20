import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addListAC, setListsAC} from "./todoListReducer";
import axios from "axios";

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
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setLists(res.data);
                console.log(res.data);
            });
    };

    ___restoreState = () => {
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

    addList = (newTitle) => {           //add new list (props for header)
        axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title: newTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "ed9ff87e-25ab-4b75-a8a6-d22424d524be"}
            }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.addList(res.data.data.item);
            }
        });
    };

    render = () => {
        const lists = this.props.lists.map((list, index) => <TodoList key={index} listId={list.id} title={list.title}
                                                             filterValue={list.filterValue} tasks={list.tasks}/>);
        return (
            <div className="App">
                <AddNewItemForm addItem={this.addList}/>
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
        setLists: lists => {
            const action = setListsAC(lists);
            dispatch(action);
        },
        addList: (newList) => {
            const action = addListAC(newList);
            dispatch(action);
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;


