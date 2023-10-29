//craete model
//import mongoose
const mongoose = require('mongoose')

//schema 
//::feilds and values of model(collection)
const adminSchema = new mongoose.Schema({

    uname: String,
    psw: String,

})
//model same us collection name in mongo
const admin = new mongoose.model("admin", adminSchema)

const userSchema = new mongoose.Schema({
    uname: String,
    email: String,
    psw: String
})
const user = mongoose.model("users", userSchema);

//export model -to import in another files

const productSchema = new mongoose.Schema({
    pname: String,
    price: Number,
    discription: String,
    rating: Number,
    image: String,
    count: Number,


})
//model
const product = mongoose.model("product", productSchema)


const cartSchema = new mongoose.Schema({
    userId: String,
    pId: String,
    pname: String,
    price: Number,
    discription: String,
    rating: Number,
    image: String,
    count: Number,
    quantity: Number,
    totalPrice: Number
})
//model
const carts=  mongoose.model("cartings",cartSchema)
module.exports = { admin, product, user, carts }