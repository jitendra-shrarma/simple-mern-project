const db = require("../models");
const User = db.user;


// create user function
exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        joining_date: req.body.joining_date,
    });
    user
        .save(user)
        .then(data => {
            res.send(data.toJSON());
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        }
    );
};


// find user by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Not found User with id: ${id}`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving User with id: ${id}`
            });
        }
    );
};


// update user by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({ 
                    message: "User was updated successfully." 
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating User with id: ${id}`
            });
        }
    );
};


// delete user by id
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id: ${id}. Maybe user was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        }
    );
};


// findall users
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        }
    );    
};


// delete all users
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users."
            });
        }
    );
};