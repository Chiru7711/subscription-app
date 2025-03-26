import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Referral from '../models/Referral.js';
import mongoose from 'mongoose';

// Existing createUser function
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

// NEW: Get all users function
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 }) // Newest first
      .select('-__v'); // Exclude version key
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
};

// Add this after getAllUsers in your userController.js

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ID format (optional but recommended)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(userId)
      .select('-__v') // Exclude version key
      .lean(); // Convert to plain JS object

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Optional: Get user's subscriptions
    const subscriptions = await Subscription.find({ user: userId })
      .select('packageType price startDate endDate isActive');

    res.status(200).json({
      ...user,
      subscriptions // Include subscriptions in response
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Server error while fetching user',
      details: error.message 
    });
  }
};