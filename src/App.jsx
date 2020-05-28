import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addListAC, setListsAC} from "./todoListReducer";
import {api} from "./api";

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
       api.setLists()
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
       api.addList(newTitle).then(res => {
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


