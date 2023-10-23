const customerModel = require("../models/customerModel");
const menuModel = require("../models/menuModel");
const orderModel = require("../models/orderModel");

const orderController = {};

orderController.getAll = (req, res) => {
  const data = orderModel.getAll((err, rows) => {
    if (err) {
      res.status(500).json({
        status: "ERROR",
        data: err
      });
    } else {
      res.status(200).json({
        status: "SUCCESS",
        data: rows
      });
    }
  });
};

orderController.create = async (req, res) => {
  const { customerId, items } = req.body;

  // Memeriksa apakah pelanggan dengan customerId ada
  const findCustomer = customerModel.findById(customerId, (err, customer) => {
    if (err) {
      return res.status(500).json({
        status: "ERROR",
        message: err.message
      });
    }

    // Mengumpulkan pesanan-pesanan dalam array
    const orders = [];
    let totalOrder = 0;

    // Iterasi melalui setiap item dalam request
    for (const item of items) {
      const menuName = item.menu;
      const qty = item.qty;

      // Cari harga menu berdasarkan nama
      menuModel.findByName(menuName, (err, menu) => {
        if (err) {
          return res.status(500).json({
            status: "ERROR",
            message: err.message
          });
        }

        if (menu.length > 0) {
          const price = menu[0].price;
          totalOrder += price * qty;

          // Menambahkan pesanan ke dalam array
          orders.push({
            menu: menuName,
            price,
            qty
          });

          // Menyimpan pesanan ke database
          orderModel.create({
            customerId,
            menuId: menu[0].id,
            qty
          }, (err, result) => {
            if (err) {
              return res.status(500).json({
                status: "ERROR",
                message: err.message
              });
            }
          });
        } else {
          return res.status(400).json({
            status: "ERROR",
            message: `Menu '${menuName}' tidak ditemukan`
          });
        }

        // Jika semua pesanan telah diproses, kirimkan respons
        if (orders.length === items.length) {
          res.status(201).json({
            status: "OK",
            message: "Data Berhasil Ditambahkan!",
            orders,
            totalOrder,
            orderDate: new Date().toISOString().split("T")[0]
          });
        }
      });
    }
  });
};

orderController.getCustomerOrders = async (req, res) => {
  try {
    const customerOrders = await orderModel.getCustomerOrders();

    if (customerOrders.length === 0) {
      return res.status(404).json({
        status: "OK",
        data: [],
      });
    }

    const result = [];

    for (const customer of customerOrders) {
      const customerName = customer.customerName;
      const orders = [];

      for (const order of customer.orders) {
        const menu = order.menu;
        const price = order.price;
        const qty = order.qty;

        orders.push({
          menu,
          price,
          qty,
        });
      }

      const totalOrder = customer.totalOrder;
      const orderDate = customer.orderDate;

      result.push({
        customerName,
        orders,
        totalOrder, // Menambahkan total_order ke respons
        orderDate, // Menambahkan order_date ke respons
      });
    }

    return res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
};



module.exports = orderController;
