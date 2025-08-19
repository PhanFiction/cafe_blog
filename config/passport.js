const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = rows[0];
      if (!user) return done(null, false, { message: 'No user found' });

      // Verify password manually or with bcrypt
      if (password !== user.password) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});
