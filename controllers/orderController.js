const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ msg: 'Cart is empty' });
  }

  let totalAmount = 0;
  const items = cart.items.map(item => {
    totalAmount += item.quantity * item.product.price;
    return {
      product: item.product._id,
      quantity: item.quantity
    };
  });

  const order = new Order({
    user: userId,
    items,
    totalAmount
  });

  await order.save();

  // clear user's cart
  cart.items = [];
  await cart.save();

  res.status(201).json({ msg: 'Order placed successfully', order });
};

exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;

  const orders = await Order.find({ user: userId }).populate('items.product');
  res.json(orders);
};
