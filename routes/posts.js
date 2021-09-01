const router = require('express').Router();
const verify = require('./verifyToken');
const User= require('../model/User');

router.get('/', verify, async (req,res)=>{
  const user = await User.findOne({_id: req.user._id});
  res.send(user); // Sends back the respecitive user of the given auth-token from DB 

});

module.exports = router;