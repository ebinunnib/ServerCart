const { admin, product, user, carts } = require("../models/collections")


//lgin logic creation
login = (req, res) => {
    //access data from request body
    const { uname, psw } = req.body
    admin.findOne({ uname, psw }).then(user => {
        if (user) {

            res.status(200).json({
                message: "login success",
                status: true,
                statuscode: 200,
                currentUser: user.uname

            })
        } else {
            res.status(404).json({
                message: "User not Fount",
                status: false,
                statuscode: 404
            })
        }
    })
}
const addProduct = (req, res) => {
    const { pname, price, discription, rating, image, count } = req.body
    const newProducts = new product({
        pname,
        price,
        discription,
        rating,
        image,
        count
    })
    newProducts.save()
    res.status(200).json({
        message: "new product added",
        statuscode: 200,
        status: true
    })

}
const getAllProducts = (req, res) => {
    product.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statuscode: 200
            })
        }
    })
}
const editProduct = (req, res) => {
    const { id } = req.params
    const { pname, discription, price, image, rating, count } = req.body
    product.findOne({ _id: id }).then(pdata => {
        if (pdata) {
            pdata.pname = pname
            pdata.discription = discription
            pdata.price = price
            pdata.image = image
            pdata.rating = rating
            pdata.count = count

            pdata.save()
            res.status(200).json({
                message: "product updated",
                status: true,
                statusCode: 200
            })

        }
    })
}
const deleteProduct = (req, res) => {
    const { id } = req.params
    product.deleteOne({ _id: id }).then(data => {
        res.status(200).json({
            message: "product deleted",
            status: true,
            statusCode: 200
        })
    })
}
const getsingleProduct = (req, res) => {
    const { id } = req.params
    product.findOne({ _id: id }).then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        } else {
            res.status(404).json({
                message: "no data",
                status: true,
                statusCode: 404
            })
        }

    })
}

const userSignup = (req, res) => {
    const { uname, email, psw } = req.body
    user.findOne({ email }).then(ur => {
        if (ur) {
            res.status(404).json({
                message: "Already a member",
                status: false,
                statusCode: 404
            })
        } else {
            let newUser = new user({
                uname, email, psw
            })
            newUser.save()
            res.status(201).json({
                message: "Registred Succesfully",
                status: true,
                statusCode: 201
            })
        }
    })
}

const userLogin = async (req, res) => {
    const { email, psw } = req.body;

    try {
        const ur = await user.findOne({ email });

        if (ur) {
            // Compare the provided password with the stored password
            if (ur.psw === psw) {
                res.status(200).json({
                    message: "Login successfully",
                    status: true,
                    statusCode: 200,
                    _id: ur._id
                });
            } else {
                res.status(404).json({
                    message: "Incorrect password",
                    status: false,
                    statusCode: 404
                });
            }
        } else {
            res.status(404).json({
                message: "User not found",
                status: false,
                statusCode: 404
            });
        }
    } catch (error) {
        console.error('Error in userLogin:', error);
        res.status(500).json({
            message: "Internal server error",
            status: false,
            statusCode: 500
        });
    }
}
const addCart = (req, res) => {
    const { userId, pId } = req.body
    carts.findOne({ userId, pId }).then(data => {
        if (data) {
            data.quantity += 1
            data.totalPrice = data.quantity * data.price
            data.save()
            res.status(200).json({
                message: "Prodct added to cart",
                status: true,
                statusCode: 200,
            })

        } else {
            product.findOne({ _id: pId }).then(pdct => {
                if (pdct) {
                    newCart = new carts({
                        userId,
                        pId,
                        pname: pdct.pname,
                        category: pdct.category,
                        price: pdct.price,
                        image: pdct.image,
                        quantity: 1,
                        totalPrice: pdct.price
                    })
                    newCart.save()
                    res.status(200).json({
                        message: "Prodct added to cart",
                        status: true,
                        statusCode: 200,
                    })
                }
            })
        }
    })

}

const cartCount = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products.length,
                status: true,
                statusCode: 200,
            })
        } else {
            res.status(404).json({
                message: 0,
                status: false,
                statusCode: 404
            })
        }
    })
}


const cartItem = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                status: true,
                statusCode: 200,
            })
        }
    })
}


// const cartItem = (req, res) => {
//     const { userId } = req.params;
//     carts.find({ userId }).then(products => {
//         if (products) {
//             res.status(200).json({
//                 message: products,
//                 status: true,
//                 statusCode: 200,
//             });
//         } else {
//             res.status(404).json({
//                 message: "No items in the cart",
//                 status: false,
//                 statusCode: 404,
//             });
//         }
//     })
// };



module.exports = {
    login, addProduct, getAllProducts, editProduct,
    deleteProduct, getsingleProduct, userSignup, userLogin, addCart, cartCount, cartItem
}