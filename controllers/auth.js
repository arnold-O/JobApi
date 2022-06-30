const asyncWrapper = require("../middlewares/asyncWrapper");
const AppError = require("../middlewares/errorHandler");
const User = require("../models/userModel");

exports.registerUser = asyncWrapper(async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!email || !password) {
    return next(new AppError("please enter credentials", 401));
  }

  const newUser = await User.create({ name, email, password });

  const token = newUser.createJWT();
 

  res.status(201).json({
    message: "success register user",
    user: { name: newUser.name },
    token,
  });
});





exports.loginUser = asyncWrapper(async (req, res, next) => {


    const {email, password} = req.body

    if(!email || !password){
        return next(new AppError('please provide credentials', 401))
    }
    const user = await User.findOne({email})

    if(!user){
        return next(new AppError('user does not exit', 401))
    }

    const IsPasswordCorrect = await user.comparePassword(password)

    if(!IsPasswordCorrect){
          return next (new AppError('credentials not correct', 400))
    }
    

    const token = user.createJWT()

  res.status(200).json({
    message: "success",
    token,
    user: {name:user.name}
  });
});
