const Cart = require('../models/cart');

// Add or update item in cart
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // create a new cart
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity }]
    });
  } else {
    const itemIndex = cart.items.findIndex(item => item.product == productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity; // update quantity
    } else {
      cart.items.push({ product: productId, quantity }); // add new item
    }
  }

  await cart.save();
  res.json(cart);
};

// Get user's cart
exports.getCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) return res.json({ items: [] });
  res.json(cart);
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ msg: 'Cart not found' });

  cart.items = cart.items.filter(item => item.product != productId);
  await cart.save();

  res.json(cart);
};
