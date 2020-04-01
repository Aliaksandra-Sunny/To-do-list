import {createStore} from "redux";

const initialState = {
    lists: [
        {
            id: 0, title: "what to learn ", tasks: [
                {id: 0, title: "english", isDone: false, priority: "low"},
                {id: 1, title: "polish", isDone: false, priority: "low"}
            ],
            filterValue: "All"
        },
        {
            id: 1,
            title: "react tasks",
            tasks: [{id: 0, title: "actionCreator", isDone: false, priority: "low"}],
            filterValue: "Active"
        },
        {
            id: 2, title: "everyday tasks", tasks: [
                {id: 0, title: "do sports", isDone: false, priority: "low"},
                {id: 1, title: "homework", isDone: false, priority: "low"}
            ],
            filterValue: "All"
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-LIST":
            return {
                ...state, lists: [...state.lists, action.newList]
            };
        case "ADD-TASK":
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.listId) {
                        return {...list, tasks: [...list.tasks, action.newTask]}
                    } else return list;
                })
            };
        case "CHANGE-TASK":
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.listId) {
                        return {
                            ...list, tasks: list.tasks.map(t => {
                                if (t.id !== action.taskId)
                                    return t;
                                else
                                    return {...t, ...action.obj};
                            })
                        }
                    } else return list;
                })
            };
        case "DELETE-TASK":
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.listId) {
                        return {
                            ...list, tasks: list.tasks.filter(task => task.id !== action.taskId)
                        }
                    } else return list;
                }),
            };
        case "DELETE-LIST":
            return {
                ...state, lists: state.lists.filter(list => list.id !== action.listId),
            }
    }

    return state;
};

const store = createStore(reducer);
export default store;