import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import { createHash } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __dirname = import.meta.dirname;

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, '../todo.sql'), 'utf8');
    pool.query(sql)
}

const insertTestUser = (email, password) => {
    bcrypt.hash(password,10,(error,hashedPassword) => {
        if(error) {
            console.error("Error hashing password:", error);
            return;
        }
        pool.query('INSERT INTO account (email,password) VALUES ($1,$2)', [email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database error:", err);
            } else {
                console.log("User inserted successfully");
            }
        })
    })
}

const getToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY);
}

export { initializeTestDb, insertTestUser, getToken }
