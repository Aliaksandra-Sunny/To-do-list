import axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "ed9ff87e-25ab-4b75-a8a6-d22424d524be"}
});

export const api = {
    addTask(newTitle, listId) {
        return instance.post(`/${listId}/tasks`,
            {title: newTitle})
    },
    setLists() {
        return instance.get("")
    },
    addList(newTitle) {
        return instance.post("",
            {title: newTitle})
    },
    setTasks(listId){
       return instance.get(`/${listId}/tasks`)
    },
    deleteList(listId){
        return instance.delete(`/${listId}`)
    },
    updateTask(task){
        return instance.put(`/${task.todoListId}/tasks/${task.id}`,
            {...task})
    },
    deleteTask(taskId, listId){
        return instance.delete(`/${listId}/tasks/${taskId}`)
    }
};