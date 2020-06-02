import {api} from "./api";

export const ADD_LIST = "todoListReducer/ADD-LIST";
export const ADD_TASK = "todoListReducer/ADD-TASK";
export const DELETE_TASK = "todoListReducer/DELETE-TASK";
export const CHANGE_TASK = "todoListReducer/CHANGE-TASK";
export const DELETE_LIST = "todoListReducer/DELETE-LIST";
export const CHANGE_FILTER = "todoListReducer/CHANGE-FILTER";
export const SET_LISTS = "todoListReducer/SET-LISTS";
export const SET_TASKS = "todoListReducer/SET-TASKS";

const initialState = {
    lists: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state, lists: action.lists.map(list => ({...list, tasks: []}))
            };
        case SET_TASKS:
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.listId) {
                        return {
                            ...list, tasks: action.tasks
                        }
                    } else return list;
                })
            };
        case ADD_LIST:
            return {
                ...state, lists: [...state.lists, {...action.newList, tasks: []}]
            };
        case ADD_TASK:
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.newTask.todoListId) {
                        return {...list, tasks: [...list.tasks, action.newTask]}
                    } else return list;
                })
            };
        case CHANGE_TASK:
            return {
                ...state, lists: state.lists.map(list => {
                    if (list.id === action.task.todoListId) {
                        return {
                            ...list, tasks: list.tasks.map(t => {
                                if (t.id !== action.task.id)
                                    return t;
                                else
                                    return {...action.task};
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


export const changeFilterAC = (newFilter, listId) => {
    return {type: CHANGE_FILTER, newFilter, listId};
};
const addListAC = (newList) => {
    return {type: ADD_LIST, newList};
};
const setListsAC = (lists) => {
    return {type: SET_LISTS, lists};
};
const addTaskAC = (newTask) => {
    return {type: ADD_TASK, newTask};
};
const changeTaskAC = (task) => {
    return {type: CHANGE_TASK, task};
};
const deleteListAC = (listId) => {
    return {type: DELETE_LIST, listId};
};
const deleteTaskAC = (taskId, listId) => {
    return {type: DELETE_TASK, taskId, listId};
};
const setTasksAC = (tasks, listId) => {
    return {type: SET_TASKS, tasks, listId}
};
export const loadTasksTC = (listId) => {
    return (dispatch) => {
        api.setTasks(listId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, listId));
            });
    }
};
export const loadListsTC = () => {
    return (dispatch) => {
        api.setLists()
            .then(res => {
                dispatch(setListsAC(res.data));
            });
    }
};
export const addListTC = (newTitle) => {
    return (dispatch) => {
        api.addList(newTitle).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addListAC(res.data.data.item))
            }
        });
    }
};
export const addTaskTC = (newTitle, listId) => {
    return (dispatch) => {
        api.addTask(newTitle, listId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
            }
        });
    }
};
export const changeTaskTC = (task, obj) => {
    return (dispatch) => {
        api.updateTask({...task, ...obj}).then(res => {
                if (res.data.resultCode === 0)
                    dispatch(changeTaskAC(res.data.data.item));
            }
        );
    }
};
export const deleteListTC = (listId) => {
    return (dispatch) => {
        api.deleteList(listId).then(res => {
            if (res.data.resultCode === 0)
                dispatch(deleteListAC(listId))
        });
    }
};
export const deleteTaskTC = (taskId, listId) => {
    return (dispatch) => {
        api.deleteTask(taskId, listId).then(res => {
                if (res.data.resultCode === 0)
                   dispatch(deleteTaskAC(taskId, listId));
            }
        );
    }
};

export default reducer;