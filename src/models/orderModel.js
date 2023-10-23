const db = require("../../db/config");

const orderModel = {};

orderModel.getAll = (callback) => {
  db.all('SELECT * FROM orders JOIN menu ON menu.id = orders.menu_id JOIN customer ON customer.id = orders.customer_id', (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

orderModel.create = (data, callback) => {
  db.run(
    `INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
    [data.customerId, data.menuId, data.qty],
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};


orderModel.getCustomerOrders = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        customer.name AS customerName,
        menu.item AS menu,
        menu.price AS price,
        orders.qty AS qty,
        SUM(menu.price * orders.qty) AS totalOrder, -- Menghitung total_order
        MAX(orders.order_date) AS orderDate -- Mengambil tanggal pesanan terbaru
      FROM orders
      INNER JOIN customer ON orders.customer_id = customer.id
      INNER JOIN menu ON orders.menu_id = menu.id
      GROUP BY customerName, menu
      ORDER BY customerName, orderDate DESC;
    `;

    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const customerOrders = [];
        let currentCustomer = null;

        for (const row of rows) {
          if (currentCustomer === null || currentCustomer.customerName !== row.customerName) {
            if (currentCustomer !== null) {
              customerOrders.push(currentCustomer);
            }

            currentCustomer = {
              customerName: row.customerName,
              orders: [],
              totalOrder: row.totalOrder, // Menambahkan total_order
              orderDate: row.orderDate, // Menambahkan order_date
            };
          }

          currentCustomer.orders.push({
            menu: row.menu,
            price: row.price,
            qty: row.qty,
          });
        }

        if (currentCustomer !== null) {
          customerOrders.push(currentCustomer);
        }

        resolve(customerOrders);
      }
    });
  });
};


module.exports = orderModel;
