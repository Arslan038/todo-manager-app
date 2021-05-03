module.exports = (app) => {
    const checkAuth = require('../services/auth');
    const UserController = require('../controllers/user.controller');
    
    // CREATE NEW USER
    app.post('/api/create_user', UserController.create_user);

    // VERIFY USER
    app.post('/api/auth/verify', UserController.verify_user);

    // LOGIN USER
    app.post('/api/auth/login', UserController.login);

    // Fetch ALL USERS
    app.get('/api/users', checkAuth, UserController.find_users);

    // FIND SINGLE USER
    app.get('/api/user/:id', checkAuth, UserController.find_user);

    // DELETE USER
    app.delete('/api/user/:id', checkAuth, UserController.destroy_user);

    // UPDATE USER
    app.put('/api/user/:id', checkAuth, UserController.update_user);
}