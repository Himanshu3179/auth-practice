require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const todoRouter = require('./routes/todoRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
connectDB();

app.get('/', (req, res) => {
    res.json({ message: 'API running...' });
});
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


