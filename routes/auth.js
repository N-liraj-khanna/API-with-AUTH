const router=require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res)=>{
  
  // Validate
  const validatedData=registerValidation(req.body);
  if(validatedData){
    return res.status(400).send(validatedData);
  }

  // Check if exists
  const emailExist = await User.findOne({email: req.body.email});

  if(emailExist){
    return res.status(400).send("Email already exists");
  }

  const salt= await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try{
    const savedUser = await user.save();
    return res.send({user: savedUser.id}); 
  }catch(err){
    console.log(err);
    return res.status(400).send(err);
  }
});

router.post('/login', async (req, res)=>{
  
  // Validate
  const validatedData=loginValidation(req.body);
  if(validatedData){
    return res.status(400).send(validatedData);
  }

  // Check if exists
  const user = await User.findOne({email: req.body.email});
  if(!user){
    return res.status(400).send("Email does not exist");
  }

  // Check passsword matches
  const validPassword = await bcrypt.compare(req.body.password,user.password);
  if(!validPassword){
    return res.status(400).send("Invalid Password");
  }
  
  // Create JWT token
  const token = jwt.sign({_id:user._id}, process.env.SECRET_TOKEN)
  
  return res.header("auth-token", token).send(token);
});


module.exports = router;