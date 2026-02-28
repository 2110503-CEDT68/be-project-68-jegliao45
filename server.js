const { setServers } = require("node:dns/promises");
setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// โหลด env ก่อน
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');

const auth = require('./routes/auth');
const providers = require('./routes/providers');
const bookings = require('./routes/bookings');

// ค่อย connect DB
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/providers', providers);
app.use('/api/v1/bookings', bookings);

app.set('query parser', 'extended');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});