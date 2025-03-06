const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', (req, res) => {
    const { customerId, product, quantity, cost } = req.body;
    const total = quantity * cost;
    const date = new Date().toLocaleDateString();
    const sql = 'INSERT INTO invoices (customerId, product, quantity, cost, total, date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [customerId, product, quantity, cost, total, date], (err, result) => {
        if (err) throw err;
        res.send('Invoice generated');
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM invoices';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
