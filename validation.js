const Joi = require("@hapi/joi")

// Validation Schema
const registerValidation = (body)=>{
  const schema = Joi.object({ 
    name: Joi.string() .min(6) .required(),
    email: Joi.string() .min(6) .required() .email(),
    password: Joi.string() .min(8) .required() 
    });
    const {error} = schema.validate(body);
    if(error) {
      return error.details[0].message;
    }else{
      return null;
    }
};

const loginValidation = (body)=>{
  const schema = Joi.object({ 
    email: Joi.string() .min(6) .required() .email(),
    password: Joi.string() .min(8) .required() 
    });
    const {error} = schema.validate(body);
    if(error) {
      return error.details[0].message;
    }else{
      return null;
    }
};

module.exports = {registerValidation, loginValidation}