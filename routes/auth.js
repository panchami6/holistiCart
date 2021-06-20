const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {registerValidation, loginValidation} = require("./validation");

router.get('/', async (req, res) => {
    const user = await User.find();
    res.json({ success: "true", user });
  })

router.post('/register', async(req,res) => {
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).send("Email already Exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    car: [],
    wishlist: []
  });
  console.log(user._id)
   try{
    const savedUser = await user.save();
    // console.log({savedUser})
    res.json({success: true, user: savedUser})
   }
  catch(err){
    res.status(400).send(err);
  }
});

router.post("/login", async (req,res) => {
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email })
  if(!user) return res.status(400).send("Email or Password is wrong");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send("Email or Password is wrong")

  const TOKEN_SECRET = process.env['TOKEN_SECRET'];

  const token = jwt.sign({_id: user._id}, TOKEN_SECRET);
  console.log("logged in")
  res.json({user, token})
})


module.exports = router;