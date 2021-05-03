const db = require('../models');
const Todo = db.Todos;

exports.create_todo = async (req, res) => {
    try {
        const { title, description, userId } = req.body

        if(title && description && userId) {
            let todo = {
                title: req.body.title,
                description: req.body.description,
                userId: req.body.userId
            }

            const createdTodo = await Todo.create(todo);
            res.status(200).json({
                success: true,
                message: "Todo Created Successfully",
                data: createdTodo
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: "Title and Description is Required."
            })
        }
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong while creating the Todo."
        })
    }
}

// Find All Todos
exports.find_todos = async (req, res) => {
    try {
        await Todo.findAndCountAll({
            limit: 8,
            offset: req.query.offset ? Number(req.query.offset) : 0,
            where: {
                userId: req.params.id
            },
            include:[
                {
                    model: db.User
                }
            ]
        }).then(result => {
            res.status(200).json({
                success: true,
                count: result.count,
                data: result.rows
            })
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while Fetching the Todos."
            })
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong while Fetching the Todos."
        })
    }
}

// Find One Todo
exports.find_todo = async (req, res) => {
    try {
        await Todo.findOne({
            where:
                {
                    id: req.params.id,
                    userId: req.query.userId
                },
            include: [
                {
                    model: db.User
                }
            ]
        }).then(result => {
            if(result) {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Todo Not Found"
                })
            }
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while Fetching the Todo."
            })
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong while Fetching the Todo."
        })
    }
}

// Delete Todo
exports.destroy_todo = async (req, res) => {
    let todo = await Todo.destroy({where: {id: req.params.id}})
    if(todo && todo == 1) {
        res.status(200).json({
            success: true,
            message: "Todo Deleted Successfully"
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: "Todo Not Found"
        })
    }
}

// Update Todo
exports.update_todo = async (req, res) => {
    let todoToUpdate = req.body
    // Find Todo from Todos
    const todo = await Todo.findOne({where: {id: req.params.id}});
    if(todo) {
        await Todo.update(todoToUpdate, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            Todo.findOne({where: {id:req.params.id}}).then(todo => {
                res.status(200).json({
                    success: true,
                    message: "Todo Updated Successfully.",
                    data: todo
                })
            })
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong."
            })
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: "No Todo Found."
        })
    }
}