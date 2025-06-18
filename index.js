const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/config');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Routes
const expensesRoutes = require('./routes/expenses');
const settlementsRoutes = require('./routes/settlements');

app.use('/expenses', expensesRoutes); // Routes for expense CRUD
app.use('/', settlementsRoutes);      // Routes for people, balances, settlements

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
