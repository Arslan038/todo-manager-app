import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const TodoRepository = RepositoryFactory.get('todo_repository')

const state = {
    count: null,
    todos: [],
    todo: null,
}

const getters = {
    getTodos: state => state.todos,
    getTodoCount: state => state.count,
    getTodo: state => state.todo
}

const actions = {
    // Fetch User Todos
    async fetchUserTodos({commit}, payload) {
        try {
            const resp = await TodoRepository.fetchUserTodos(payload)
            if(resp.data.success) {
                commit('setTodos', {data: resp.data.data, count: resp.data.count})
                return 1
            }
            else {
                commit('setToast', {
                    message: resp.data.message,
                    color: 'red',
                    show: true,
                  });
                return 0
            }
        }
        catch(err) {
            commit('setToast', {
                message: err.message,
                color: 'red',
                show: true,
              });
            return 0;
        }
    },

    // Fetch Single Todo
    async fetchTodo({commit}, payload) {
        try {
            commit('setTodo', null)
            const resp = await TodoRepository.fetchTodo(payload)
            console.log(resp)
            if(resp.data.success) {
                commit('setTodo', resp.data.data)
                return 1
            }
            else {
                commit('setToast', {
                    message: resp.data.message,
                    color: 'red',
                    show: true,
                  });
                return 0
            }
        }
        catch(err) {
            commit('setToast', {
                message: err.response.data.message ? err.response.data.message : err.message,
                color: 'red',
                show: true,
              });
            return 0;
        }
    },

    // Create New Todo
    async createTodo({commit}, payload) {
        try {
            const resp = await TodoRepository.createTodo(payload)
            if(resp.data.success) {
                commit('setToast', {
                    message: resp.data.message,
                    color: 'success',
                    show: true,
                  });
                return 1
            }
            else {
                commit('setToast', {
                    message: resp.data.message,
                    color: 'red',
                    show: true,
                  });
                return 0
            }
        }
        catch(err) {
            commit('setToast', {
                message: err.message,
                color: 'red',
                show: true,
              });
            return 0;
        }
    },

    // Update Todo
    async updateTodo({commit}, payload) {
        try {
            const resp = await TodoRepository.updateTodo(payload)
            if(resp.data.success) {
                commit('setToast', {
                    message: resp.data.message,
                    color: 'success',
                    show: true,
                  });
                return 1
            }
            else {
                commit('setToast', {
                    message: resp.data.message,
                    color: 'red',
                    show: true,
                  });
                return 0
            }
        }
        catch(err) {
            commit('setToast', {
                message: err.response.data.message ? err.response.data.message : err.message,
                color: 'red',
                show: true,
              });
            return 0;
        }
    },

    // Delete Todo
    async deleteTodo({commit}, id) {
        try {
            const resp = await TodoRepository.deleteTodo(id)
            if(resp.data.success) {
                commit('removeTodo', id)
                commit('setToast', {
                    message: resp.data.message,
                    color: 'success',
                    show: true,
                  });
                return 1
            }
            else {
                commit('setToast', {
                    message: resp.data.message,
                    color: 'red',
                    show: true,
                  });
                return 0
            }
        }
        catch(err) {
            commit('setToast', {
                message: err.response.data.message ? err.response.data.message : err.message,
                color: 'red',
                show: true,
              });
            return 0;
        }
    }
}

const mutations = {
    setTodos: (state, payload) => {
        state.todos = state.todos.concat(payload.data);
        state.count = payload.count
    },

    setTodo: (state, payload) => {
        state.todo = payload
    },

    removeTodo: (state, id) => {
        state.count--;
        state.todos = state.todos.filter(todo => todo.id != id);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}