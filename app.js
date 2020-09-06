const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/protectRoute');

const app = express();

//  static folder middleware
app.use(express.static('public'));

// body parser
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// cookie middleware
app.use(cookieParser());

// database connection
const dbURI =
  'mongodb+srv://ninja333:ninja333@ninja-jwt.lsnn8.mongodb.net/jwt-tut?retryWrites=true&w=majority';
mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  console.log('Connected to db')
);

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoute);

// cookie
// app.get('/get-cookies', (req, res) => {
//   res.cookie('newUser', true);
//   res.cookie('isEmployee', false, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   res.send('you got the cookie');
// });
// app.get('/read-cookies', (req, res) => {
//   const cookie = req.cookie;
//   // res.json(cookie);
//   res.json(cookie.newUser);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running at port : ${PORT}`));
