const {check, validationResult} = require('express-validator');

//Auth Validation
exports.register =[
check("email").isEmail().withMessage("please fill all the fields").notEmpty(),
check("name").isLength({min:3}).withMessage("minimum 3 character required").notEmpty(),
check("password").isLength({min:8}).withMessage('minimum 8 character required').notEmpty(),
check("phone").isLength({min:10}).notEmpty().withMessage("Enter the Phone Number"),
check("address").notEmpty().withMessage("Address is Required"),
check("answer").notEmpty().withMessage("Answer is Required"),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]

exports.login = [
  check("email").isEmail().withMessage("please fill all the fields").notEmpty(),
  check("password").isLength({min:8}).withMessage('minimum 8 character required').notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]


//Product Validation

exports.createProductValidation =[
    check("name").notEmpty().withMessage("name is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("price").notEmpty().withMessage("price is required"),
    check("category").notEmpty().withMessage("category is required"),
    check("quantity").notEmpty().withMessage("quantity is required"),
 
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
]