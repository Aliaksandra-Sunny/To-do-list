export const ADD_LIST = "todoListReducer/ADD-LIST";
export const ADD_TASK = "todoListReducer/ADD-TASK";
export const DELETE_TASK = "todoListReducer/DELETE-TASK";
export const CHANGE_TASK = "todoListReducer/CHANGE-TASK";
export const DELETE_LIST = "todoListReducer/DELETE-LIST";
export const CHANGE_FILTER = "todoListReducer/CHANGE-FILTER";


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
        case ADD_LIST:
            return {
                ...state, lists: [...state.lists, action.newList]
            };
        case ADD_TASK:
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.listId) {
                        return {...list, tasks: [...list.tasks, action.newTask]}
                    } else return list;
                })
            };
        case CHANGE_TASK:
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
        case DELETE_TASK:
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.listId) {
                        return {
                            ...list, tasks: list.tasks.filter(task => task.id !== action.taskId)
                        }
                    } else return list;
                }),
            };
        case DELETE_LIST:
            return {
                ...state, lists: state.lists.filter(list => list.id !== action.listId),
            };
        case CHANGE_FILTER:
            return {
                ...state, lists: state.lists.map(list => {
            if (list.id === action.listId) {
                return {
                    ...list, filterValue: action.newFilter
                }
            } else return list;
        })
            };
    }
    return state;
};

export const addListAC = (newList) => {
    return {type: ADD_LIST, newList};
};
export const addTaskAC = (newTask, listId) => {
    return {type: ADD_TASK, newTask, listId};
};
export const changeTaskAC = (listId, taskId, obj) => {
    return {type: CHANGE_TASK, listId, taskId, obj};
};
export const deleteListkAC = (listId) => {
    return {type: DELETE_LIST, listId};
};
export const deleteTaskAC = (taskId, listId) => {
    return {type: DELETE_TASK, taskId, listId};
};
export const changeFilterAC = (newFilter, listId) => {
    return {type: CHANGE_FILTER, newFilter, listId};
};

export default reducer;