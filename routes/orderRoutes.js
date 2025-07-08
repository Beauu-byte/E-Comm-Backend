const express = require('express');
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/place', auth, placeOrder);      // Place an order
router.get('/my', auth, getMyOrders);         // View user's orders

module.exports = router;
