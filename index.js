const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB=require('./config/config');

dotenv.config();

connectDB();


const app = express();
app.use(cors());
app.use(express.json());

const expensesRoutes = require('./routes/expenses');
const settlementsRoutes = require('./routes/settlements');

app.use('/expenses', expensesRoutes);
app.use('/', settlementsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));