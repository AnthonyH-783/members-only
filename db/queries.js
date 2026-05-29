const pool = require("./pool");



exports.getUserByUsername = async(username) => {

    const query = "SELECT * FROM users WHERE username = $1";
    const {rows} = await pool.query(query, [username]);
    const user = rows[0];
    return user;
}

exports.getUserById = async(id) => {
    const query = "SELECT * FROM users WHERE id = $1";
    const {rows} = await pool.query(query, [id]);
    const user = rows[0];
    return user;
}

exports.addUser = async(username, password) => {
    const query = `INSERT INTO users (username, password)
                    VALUES ($1, $2) `;
    await pool.query(query, [username, password]);
}