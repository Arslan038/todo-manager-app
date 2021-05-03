import Repository from './Repository';

const todos = 'todos';
const todo = 'todo';
const create_todo = 'create_todo';
const delete_todo = 'todo'
const update_todo = 'todo'

export default {
    // Fetch Todos
    fetchUserTodos(payload) {
        return Repository.get(`${todos}/${payload.id}?offset=${payload.offset}`)
    },

    // Create Todo
    createTodo(payload) {
        return Repository.post(`${create_todo}`, payload)
    },

    // Fetch Todo
    fetchTodo(payload) {
        return Repository.get(`${todo}/${payload.id}?userId=${payload.userId}`)
    },

    // Update Todo
    updateTodo(payload) {
        return Repository.put(`${update_todo}/${payload.id}`, payload.data)
    },

    // Delete Todo
    deleteTodo(id) {
        return Repository.delete(`${delete_todo}/${id}`)
    }
}