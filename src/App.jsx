import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addListTC, loadListsTC} from "./todoListReducer";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.loadLists();
    };

    addList = (newTitle) => {           //add new list (props for header)
        this.props.addList(newTitle)
    };

    render = () => {
        const lists = this.props.lists.map((list, index) => <TodoList key={index} listId={list.id} title={list.title}
                                                                      filterValue={list.filterValue}
                                                                      tasks={list.tasks}/>);
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
        addList(newTitle) {
            dispatch(addListTC(newTitle))
        },
        loadLists() {
            dispatch(loadListsTC());
        },
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;


