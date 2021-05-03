module.exports = (app) => {
    require('./user.route')(app);
    require('./todo.route')(app);
}