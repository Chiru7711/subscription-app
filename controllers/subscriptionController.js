import Subscription from '../models/Subscription.js';

const packagePrices = {
  Silver: 99,
  Gold: 499,
  Platinum: 999,
  Diamond: 9999
};

export const createSubscription = async (req, res) => {
  try {
    const { userId, packageType } = req.body;
    
    if (!packagePrices[packageType]) {
      return res.status(400).json({ error: 'Invalid package type' });
    }

    const subscription = await Subscription.create({
      user: userId,
      packageType,
      price: packagePrices[packageType]
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.params.userId })
      .populate('user')
      .sort('-startDate');
      
    res.json(subscriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};