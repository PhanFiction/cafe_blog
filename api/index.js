const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('../config/index');
const { Client } = require('pg');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const authRoutes = require('../routes/authRoutes');
const blogRoutes = require('../routes/blogRoutes');
const recipeRoutes = require('../routes/recipeRoutes');
require('../config/passport'); // Ensure passport config is loaded

app.use(cookieParser());

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true, // included credentials as true
};

// set core options
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit:'50mb' })); // set limit to 50mb for body 
app.use(bodyParser.urlencoded({ extended:true, limit:'50mb' }));

// Create new database client
const dbClient = new Client({
  connectionString: config.databaseURL
});

// Connect to database
dbClient.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error', err.stack));

app.use(express.json()); // parse JSON bodies

app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true only if HTTPS
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(flash());


// routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/recipes', recipeRoutes);
app.get('/', (_, res) => {
  res.send('Cafe Blog API');
});

module.exports = app;