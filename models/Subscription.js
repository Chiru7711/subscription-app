import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  packageType: { 
    type: String, 
    enum: ['Silver', 'Gold', 'Platinum', 'Diamond'],
    required: true
  },
  price: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
  referralId: { type: String, default: uuidv4, unique: true }
});

subscriptionSchema.pre('save', function(next) {
  const endDate = new Date(this.startDate);
  endDate.setMonth(endDate.getMonth() + 6);
  this.endDate = endDate;
  next();
});

export default mongoose.model('Subscription', subscriptionSchema);