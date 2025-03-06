// script.js

document.addEventListener("DOMContentLoaded", () => {
    const addCustomerForm = document.getElementById("add-customer-form");
    const generateInvoiceForm = document.getElementById("generate-invoice-form");
    const addProductForm = document.getElementById("add-product-form");
    const customerSelect = document.getElementById("customer");
    const productSelect = document.getElementById("product");
    const invoicesList = document.getElementById("invoices-list");
    const customerList = document.getElementById("customer-list");
    const productList = document.getElementById("product-list");

    // Fetch customers and products on page load
    fetchCustomers();
    fetchProducts();

    addCustomerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("customer-name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const customerId = document.getElementById("customer-id").value;

        const customer = { name, phone, address, customerId };

        fetch('http://localhost:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchCustomers();
            addCustomerForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    generateInvoiceForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const customerId = customerSelect.value;
        const productId = productSelect.value;
        const quantity = document.getElementById("quantity").value;
        const cost = document.getElementById("cost").value;
        
        const invoice = { customerId, productId, quantity, cost };

        fetch('http://localhost:3000/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoice)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchInvoices();
            generateInvoiceForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    addProductForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const productName = document.getElementById("product-name").value;
        const productId = document.getElementById("product-id").value;
        const price = document.getElementById("price").value;

        const product = { productName, productId, price };

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchProducts();
            addProductForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    function fetchCustomers() {
        fetch('http://localhost:3000/customers')
        .then(response => response.json())
        .then(data => {
            updateCustomerSelect(data);
            updateCustomerList(data);
        })
        .catch(error => console.error('Error:', error));
    }

    function fetchInvoices() {
        fetch('http://localhost:3000/invoices')
        .then(response => response.json())
        .then(data => {
            updateInvoicesList(data);
        })
        .catch(error => console.error('Error:', error));
    }

    function fetchProducts() {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            updateProductSelect(data);
            updateProductList(data);
        })
        .catch(error => console.error('Error:', error));
    }

    function updateCustomerSelect(customers) {
        customerSelect.innerHTML = customers.map(c => 
            `<option value="${c.customerId}">${c.name}</option>`
        ).join('');
    }

    function updateProductSelect(products) {
        productSelect.innerHTML = products.map(p => 
            `<option value="${p.productId}">${p.productName}</option>`
        ).join('');
    }

    function updateCustomerList(customers) {
        customerList.innerHTML = customers.map(c => 
            `<p>ID: ${c.customerId}, Name: ${c.name}, Phone: ${c.phone}, Address: ${c.address}</p>`
        ).join('');
    }

    function updateInvoicesList(invoices) {
        invoicesList.innerHTML = invoices.map(i => 
            `<div class="invoice">
                <h3>Invoice</h3>
                <p>Date: ${i.date}</p>
                <p>Customer ID: ${i.customerId}</p>
                <p>Product ID: ${i.productId}</p>
                <p>Quantity: ${i.quantity}</p>
                <p>Cost: $${i.cost}</p>
                <p>Total: $${i.total}</p>
            </div>`
        ).join('');
    }

    function updateProductList(products) {
        productList.innerHTML = products.map(p => 
            `<p>ID: ${p.productId}, Name: ${p.productName}, Price: $${p.price}</p>`
        ).join('');
    }
});

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}
