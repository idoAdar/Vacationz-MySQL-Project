const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const authRoutes = require('./controller/authRoutes');
const userRoutes = require('./controller/userRoutes');
const adminRoutes = require('./controller/adminRoutes');

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Error Middleware:
app.use((error, req, res, next) => {
    throw new Error(`Error ${error.code || 500}: ${error.message || 'An unknown error occurred'}`);
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));