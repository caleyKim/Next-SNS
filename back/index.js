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

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie : {
    httpOnly : true,
    secure : false, // https 를 쓸때 true 로
  }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userApiRouter);
app.use('/api/post', postApiRouter);
app.use('/api/posts', postsApiRouter);



app.listen(6060, () => {
  console.log('server is running on http://localhost:/6060');
})