import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Referral from '../models/Referral.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, phno, referralId } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { phno }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, phno });

    if (referralId) {
      const referrerSubscription = await Subscription.findOne({ referralId });
      
      if (!referrerSubscription || !referrerSubscription.isActive) {
        return res.status(400).json({ error: 'Invalid or expired referral ID' });
      }

      const subscription = await Subscription.create({
        user: user._id,
        packageType: referrerSubscription.packageType,
        price: referrerSubscription.price
      });

      await Referral.create({
        referrer: referrerSubscription._id,
        referredUser: user._id
      });

      return res.status(201).json({ user, subscription });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};