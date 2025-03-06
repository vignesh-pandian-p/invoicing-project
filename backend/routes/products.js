const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', (req, res) => {
    const { productName, productId, price } = req.body;
    const sql = 'INSERT INTO products (productName, productId, price) VALUES (?, ?, ?)';
    db.query(sql, [productName, productId, price], (err, result) => {
        if (err) throw err;
        res.send('Product added');
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
