const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const productRoutes = require('./routes/products');

app.use('/customers', customerRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
