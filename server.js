const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const UserRoute = require('./routes/User')
const ProductRoute = require('./routes/Product')
const AuthRegisterRoute = require('./routes/Auth')
const CartRoute = require('./routes/Cart')
const OrderRoute = require('./routes/Order')
const StripeRoute = require("./routes/Stripe")
const cors = require('cors')

const port= process.env.PORT || 9000

app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_URL).
then(()=>{console.log("DB connection")}).
catch((err)=>{console.log(err)});


app.get('/' , (req,res)=>{
    res.send("iam server")
})
app.use("/api/user" , UserRoute);
app.use("/api/auth" , AuthRegisterRoute);
app.use("/api/products" , ProductRoute);
app.use("/api/cart" , CartRoute);
app.use("/api/order" , OrderRoute);
app.use("/api/checkout" , StripeRoute);

app.listen(port,console.log(`server is running on: ${port}`))