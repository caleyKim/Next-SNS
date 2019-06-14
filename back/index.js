const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const cookieparser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport')

const passportConfig = require('./passport')
const db = require('./models');

const userApiRouter = require('./routes/user');
const postApiRouter = require('./routes/post');
const postsApiRouter = require('./routes/posts');
const hashtagApiRouter = require('./routes/hashtag');

dotenv.config();
const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}));
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
  },
  name: 'rnbck',
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userApiRouter);
app.use('/api/post', postApiRouter);
app.use('/api/posts', postsApiRouter);
app.use('/api/hashtag', hashtagApiRouter);



app.listen(6060, () => {
  console.log('server is running on http://localhost:/6060');
})