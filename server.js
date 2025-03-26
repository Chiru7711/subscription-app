import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

const app = express();
await connectDB();

app.use(express.json());

//Routes
// app.use('/',(req,res) =>{
//     res.send('API WORKING');
//  });
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));