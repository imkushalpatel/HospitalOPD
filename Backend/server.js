const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


const sessionMiddleware = require('./middleware/sessionMiddleware');



const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const visitRoutes = require('./routes/visitRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/auth', authRoutes);
// app.use(sessionMiddleware);
app.use('/api/patients', sessionMiddleware, patientRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
