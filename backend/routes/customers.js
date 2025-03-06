const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', (req, res) => {
    const { name, phone, address, customerId } = req.body;
    const sql = 'INSERT INTO customers (name, phone, address, customerId) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, phone, address, customerId], (err, result) => {
        if (err) throw err;
        res.send('Customer added');
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM customers';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
