const db = require("../config/db");

const getAllUsers = (callback) => {
    const sql = "SELECT * FROM user";

    db.query(sql, callback);
};

const getUserById = (id, callback) => {
    const sql = "SELECT * FROM user WHERE id = ?";

    db.query(sql, [id], callback);
};

const createUser = (user, callback) => {
    const sql = `
        INSERT INTO user (name, address, mobile)
        VALUES (?, ?, ?)
    `;

    const values = [
        user.name,
        user.address,
        user.mobile
    ];

    db.query(sql, values, callback);
};

const updateUser = (id, user, callback) => {
    const sql = `
        UPDATE user
        SET name = ?, address = ?, mobile = ?
        WHERE id = ?
    `;

    const values = [
        user.name,
        user.address,
        user.mobile,
        id
    ];

    db.query(sql, values, callback);
};

const deleteUser = (id, callback) => {
    const sql = "DELETE FROM user WHERE id = ?";

    db.query(sql, [id], callback);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};