module.exports = (app) => {
    const checkAuth = require('../services/auth');
    const TodoController = require('../controllers/todo.controller');
    
    // CREATE NEW TODO
    app.post('/api/create_todo', checkAuth, TodoController.create_todo);

    // Fetch ALL TODOS
    app.get('/api/todos/:id', checkAuth, TodoController.find_todos);

    // FIND SINGLE TODO
    app.get('/api/todo/:id', checkAuth, TodoController.find_todo);

    // DELETE TODO
    app.delete('/api/todo/:id', checkAuth, TodoController.destroy_todo);

    // UPDATE TODO
    app.put('/api/todo/:id', checkAuth, TodoController.update_todo);
}