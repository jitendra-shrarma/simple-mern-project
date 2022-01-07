module.exports = app => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();

    // Create a new user
    router.post("/", user.create);

    // Retrieve a single user with id
    router.get("/:id", user.findOne);

    // Update a user with id
    router.put("/:id", user.update);

    // Delete a user with id
    router.delete("/:id", user.delete);

    // Retrieve all users
    router.get("/", user.findAll);

    // Delete all users
    router.delete("/", user.deleteAll);
  
    app.use('/api/user', router);
};