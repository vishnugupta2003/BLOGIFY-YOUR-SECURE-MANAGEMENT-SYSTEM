const express = require('express');
const cors = require('cors');
const { dbconnect } = require('./src/configDatabase/db');
const { authRouter } = require('./src/router');
const { blogRouter } = require('./src/router/blog');

const app = express();
app.use(cors()); // we also pass the specific port no. for in form of object like 'app.use(cors({port no.})').
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);
app.listen(4000, () => {
  console.log('server start at port:http://localhost:4000');
  dbconnect();
});

// const express = require('express');
// const { dbconnect } = require('./src/configDatabase/db');
// const { User } = require('./src/model/user');

// const app = express();
// // console.log(express());
// // const tester = async () => {
// // const newUser = await User.create({
// //   username: 'viassqffnu gupta',
// //   password: 'hi',
// //   email: 'jerfqjs',
// //   first_name: 'vishnu',
// //   last_name: 'gupta',
// // });
// //   const newUser = await User.findById('66ee2b693c7fda08dd262fa8');
// //   console.log(newUser.toJSON());
// //   // console.log(newUser.authentication('hi'));
// // };
// // tester();

// // // User.authentication('vishnu');
// app.listen(4000, () => {
//   console.log('server start at port:http://localhost:4000');
//   dbconnect();
// });
