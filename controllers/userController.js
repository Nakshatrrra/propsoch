const { User } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const { email, password, currency } = req.body;
    const user = await User.create({ email, password, currency });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, currency } = req.body;
    const { id } = req.params; 
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.email = email || user.email;
    user.currency = currency || user.currency;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
