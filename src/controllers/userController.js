const user = require("../models/user");

const getUsers = (req, res) => {
    user.getAllUsers((error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to fetch users",
                error: error.message
            });
        }

        res.json(results);
    });
};

const getUser = (req, res) => {
    const { id } = req.params;

    user.getUserById(id, (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to fetch user",
                error: error.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(results[0]);
    });
};

const createUser = (req, res) => {
    const { name, address, mobile } = req.body;

    user.createUser(
        { name, address, mobile },
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    message: "Failed to create user",
                    error: error.message
                });
            }

            res.status(201).json({
                message: "User created successfully",
                id: result.insertId
            });
        }
    );
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, address, mobile } = req.body;

    user.updateUser(
        id,
        { name, address, mobile },
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    message: "Failed to update user",
                    error: error.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.json({
                message: "User updated successfully"
            });
        }
    );
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    user.deleteUser(id, (error, result) => {

        if (error) {
            return res.status(500).json({
                message: "Failed to delete user",
                error: error.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });
    });
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};