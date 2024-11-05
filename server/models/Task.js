import { pool } from '../helpers/db.js';

const selectAllTasks = async() => {
    return await pool.query('SELECT * FROM task');
}

const insertTask = async(description) => {
    return await pool.query('INSERT INTO task(description) VALUES ($1) returning *',[description]);
}

export { selectAllTasks, insertTask };

