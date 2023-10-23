const express = require("express")
const exampleController = require("../controllers/ExampleController")
const menuController = require("../controllers/MenuController")
const customerController = require("../controllers/CustomerController")
const categoriesController = require("../controllers/categoriesController")
const orderController = require("../controllers/orderController")
const router = express.Router()

// menu routers
router.get('/menus',menuController.getAll)
router.get('/menu/:id',menuController.getById)
router.post('/menu/create',menuController.create)
router.put('/menu/update/:id',menuController.update)
router.delete('/menu/delete/:id',menuController.delete)

// customer routers
router.get('/customers',customerController.getAll)
router.get('/customer/:id',customerController.getById)
router.post('/customer/create',customerController.create)
router.put('/customer/update/:id',customerController.update)
router.delete('/customer/delete/:id',customerController.delete)

// categories routers
router.get('/categories',categoriesController.getAll)
router.get('/category/:id',categoriesController.getById)
router.post('/category/create',categoriesController.create)
router.put('/category/update/:id',categoriesController.update)
router.delete('/category/delete/:id',categoriesController.delete)

// order routers
router.get('/orders',orderController.getAll)
router.post('/order/create',orderController.create)

//history router
router.get("/customer-orders", orderController.getCustomerOrders);

module.exports = router
