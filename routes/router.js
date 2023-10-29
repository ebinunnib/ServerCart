const express = require('express')


const { login, addProduct, getAllProducts, editProduct, deleteProduct, getsingleProduct, userSignup, userLogin, addCart, cartCount, cartItem } = require('../controlls/logic')

//router object
const router = new express.Router()


//login
router.post('/cartadmin/login', login)


router.post('/cartadmin/addproduct', addProduct)

router.get('/getallpoducts', getAllProducts)

router.put('/editProduct/:id', editProduct)

router.delete('/delete/:id', deleteProduct)

router.get('/getoneproduct/:id', getsingleProduct)

router.post('/userSignup', userSignup)

router.post('/user-login', userLogin)

router.post('/addtocart', addCart)

router.get('/cartcount/:userId', cartCount)

router.get('/cartItem/:userid', cartItem)




router.get('')


// 652634e5e810e8fd27e88c0c
module.exports = router