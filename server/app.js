const mongoose = require('mongoose');
const dotenv = require("dotenv");
const express = require("express");
const app = express();
app.use(express.json());
mongoose.set('strictQuery', false);
const path = require('path');
dotenv.config({path:'./config.env'})
require('./db/connection');
const cors = require('cors');
const { v4: uuid } = require('uuid');
// const User = require('./model/userSchema');
// const initialDataRoutes = require("./router/admin/initialData");


// link router files to make route easy
app.use(cors(''))
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use(require('./router/auth'));
app.use(require('./router/admin/auth'));
app.use(require('./router/category'))
app.use(require('./router/product'))
app.use(require('./router/cart'))
app.use(require('./router/address'));
app.use(require('./router/order'));
app.use(require('./router/couponCode'));
app.use(require('./router/admin/order.route'))
// app.use("/", initialDataRoutes);
app.use(require('./router/admin/initialData'))
app.use(require('./router/admin/page'))
app.use(require('./router/paymentRoute'))
app.use(require('./router/paytmgateway'))
app.use(require('./router/mail'))
app.use(require('./router/email'))
app.use(require('./router/filter'))
app.use(require('./router/couponRoute'))
app.use(require('./router/attribute'))


const PORT = process.env.PORT;

//Middleware

// const middleware = (req, res, next) => {
//   console.log(`middleware`);
//   next();
// };

// // app.get('/about', (req, res) => {
// //     console.log(`Hello my About`);
// //     res.send(`Hello About world from the server`);
// });
// app.get("/contact", (req, res) => {
//   res.send(`hello contact from server`);
// });
// app.get("/signin", (req, res) => {
//   res.send(`hello sign in from server`);
// });
app.get("/signup", (req, res) => {
  res.send(`hello signup from server`);
});
app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
app.get('/getnitin', (req, res) => {
  res.send('hlo from user data')
})


