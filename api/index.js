const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('../config/index');
const { Client } = require('pg');
const authRoutes = require('../routes/authRoutes');
const blogRoutes = require('../routes/blogRoutes');

app.use(cookieParser());

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true, // included credentials as true
};

// set core options
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit:'50mb' })); // set limit to 50mb for body 
app.use(bodyParser.urlencoded({ extended:true, limit:'50mb' }));

// connect to database
const dbClient = new Client({
  connectionString: config.databaseURL,
});

dbClient.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error', err.stack));

app.use(express.json()); // parse JSON bodies

// routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.get('/', (req, res) => {
  res.send('Cafe Blog API');
});

module.exports = app;