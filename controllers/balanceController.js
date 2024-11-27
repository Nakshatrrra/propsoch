const db = require('../models'); 
exports.getBalances = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = id; 
    const balances = await db.Balance.findAll({
      where: { userId: userId },
      include: [
        {
          model: db.User, 
          as: 'User',
          attributes: ['id', 'email', 'currency']
        }
      ]
    });

    if (!balances) {
      return res.status(404).json({ message: 'No balances found for this user' });
    }

    const balanceResponse = balances.map(balance => ({
      user: balance.otherUser.id,
      balance: balance.amount 
    }));

    return res.status(200).json({ userId, balances: balanceResponse });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'An error occurred while fetching balances' });
  }
};
