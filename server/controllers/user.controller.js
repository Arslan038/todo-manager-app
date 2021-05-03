require('dotenv').config();
const db = require('../models');
const User = db.User;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Email = require('../services/email');

// Create New User
exports.create_user = async (req,res) => {    
    try {
        if(!req.body.email) {
            res.status(500).json({
                success: false,
                message: "Please Provide Email."
            })
        }

        const isEmailExists = await User.findAll({
            where: {
              email: req.body.email,
            },
          });
          if (isEmailExists.length) {
            res.status(500).json({
                success: false,
                message: 'User already exists with same Email',
            });
            return;
          }

        let user = {
            email: req.body.email,
            password: req.body.password,
        };

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message:
                    err.message || 'Something went wrong while creating the User.',
                });
            }

            user.password = hash;

            await User.create(user).then(async (result) => {
                // Generate Some Random Code
                const verificationCode = Math.random().toString(36).substring(2,8);
                
                if(verificationCode) {
                    // await Email.sendEmail({email: user.email, code: verificationCode})
                    
                    await User.update({verification_code: verificationCode}, {
                        where: {
                            email: user.email
                        }
                    }).then(() => {
                        res.status(200).json({
                            success: true,
                            message: "Registration Successfull. Please check your email for verification code. Don't forget to look into spam.",
                            data: result
                        })
                    })
                }
            }).catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message || "Something went wrong while creating the User."
                });
            });
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong while creating the User."
        })
    }    
}

// Verify User
exports.verify_user = async (req, res) => {
    const email = req.body.email;
    const verification_code = req.body.code;
    let isUserExists = await User.findOne({
        where: {
            email,
            verification_code
        }
    });

    if(isUserExists) {
        await User.update({verified: 1}, {
            where: {
                email
            }
        }).then(() => {
            res.status(200).json({
                success: true,
                message: "Your account has been verified. Please Login to continue."
            })
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while creating the User."
            })
        })
    }
    else {
        res.status(500).json({
            success: false,
            message: "Email or Code is incorrect."
        })
    }
}

// Login USER
exports.login = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      let isUserExists = await User.findOne({
        where: {
          email: email,
        },
        include: [{
            model: db.Todos
        }]
      });

      if (isUserExists && isUserExists.password) {
        let user = isUserExists;
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(404).json({
                success: false,
                message: 'Invalid Password.',
            });
            return
          }

        //   if(!user.verified || user.verified != 1) {
        //     res.status(403).json({
        //         success: false,
        //         message: 'Your account is not verified.',
        //     });
        //     return
        //   }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                Todos: user.Todos
              },
              process.env.ACCESS_TOKEN_SECRET
            );
            res.status(200).json({
                success: true,
                message: 'Login Successfull',
                user: user,
                token: token,
            });
            return
          } else {
            res.status(403).json({
                success: false,
                message: 'Invalid Password.',
            });
          }
        });
      } else {
        console.log("ERROR...")
        res.status(404).json({
            success: false,
            message: 'Invalid Email or Password.',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong while Login.',
      });
    }
  };

// Find All User
exports.find_users = async (req, res) => {
    try {
        await User.findAll({
            include:[{
                model: db.Todos
            }]
        }).then(result => {
            res.status(200).json({
                success: true,
                data: result
            })
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while Fetching the Users."
            })
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong while Fetching the Users."
        })
    }
}

// Find One User
exports.find_user = async (req, res) => {
    try {
        await User.findOne({
            where:
                {
                    id: req.params.id
                },
                include:[{
                    model: db.Todos
                }]
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
                    message: "User Not Found"
                })
            }
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while Fetching the User."
            })
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong while Fetching the User."
        })
    }
}

// Delete User
exports.destroy_user = async (req, res) => {
    let user = await User.destroy({where: {id: req.params.id}, include: [{
        model: db.Todos
    }]})
    if(user && user == 1) {
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
}

// Update User
exports.update_user = async (req, res) => {
    let userToUpdate = req.body
    // Find User from User
    const user = await User.findOne({where: {id: req.params.id}});
    if(user) {
        await User.update(userToUpdate, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            User.findOne({where: {id:req.params.id}}).then(user => {
                res.status(200).json({
                    success: true,
                    message: "User Updated Successfully.",
                    data: user
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
            message: "No User Found."
        })
    }
}