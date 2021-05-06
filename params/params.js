// const { Product } = require("../models/product.model")
// const { Cart } = require("../models/cart.model")

// const excludefields = {
//   "products._id":0,
//   "__v":0
// }
// const populateOptions = {
//   path:'products.details',
//   select:"_id name price discount effectivePrice image"
// }

// exports.getProductById = async(req, res, next,id) =>{
//   try{
//     const product = await Product.findById(id)

//     if(!product){
//       return res.status(400).json({success:false, message:"Error getting the product"})
//     }
//     req.product = product;
//     next();
//   }catch{
//     res.status(400).json({success:false, message:"Error while retrieving the product"})
//   }
// }

// exports.getUserCart = async(req, res, next)=>{
//   try{
//     const {user} = req
//     const cart = await Cart.findById(user._id).populate(populateOptions)
//     req.cart = cart;
//     next();
//   }catch(err){
//     res.status(503).json({ success:false, error:err.message })
//   }
// }
// exports.getCategoryById = async(req, res, next, id)=>{
//   try{
//     const category = await Category.findById(id)
//     if(!category){
//       throw Error("No such category Found");
//     }
//     console.log(category)
//     req.category = category
//     next() 
//   }catch (err){
//     res.status(503).json({ success:false, error:err.message })
//   }
// }