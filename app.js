/* imports */
require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const mongoose=require('mongoose');

/* constants */
const PORT=process.env.PORT || 3000;
const app=express();


/* Connect to DB */
mongoose.connect(process.env.MONGO_URL,
  {useNewUrlParser: true},
  ()=>{console.log('Connected to Database')}
  )


/* middlewares */
app.use(express.json()); // Just for actual json data(Bidy Parser for form and other post data)
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);


/* general conifg */
app.listen(PORT, ()=>{console.log('Server Up and running on http://localhost:'+PORT)})
