const ErrorHandler = require('../middlewares/ErrorHandler');
const catchasyncerror = require('../middlewares/AsyncError');
const User = require('../Models/UserModel');
const sendtoken = require('../utils/JWTtoken');
const sendEmail = require('../utils/SendEmail.js');




exports.RegisterUser = catchasyncerror(async (req, res, next) => {
    const { FirstName,SecondName, email, password,gender } = req.body;
    const user = await User.create({
      FirstName,
      SecondName,
      email,
      password,
      gender,
    });
    sendtoken(user, 201, res);
  });
  

//login user

exports.LoginUser = catchasyncerror(async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next({message: 'Please Enter Email And Password', statusCode: 400})
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next({message: 'Invalid Email or Password', statusCode: 401})
    }
    const passwordmatched = await user.comparepassword(password);
    if(!passwordmatched){
        return next({message: 'Invalid Email or Password', statusCode: 404})
    }
    
     
    sendtoken(user,200,res);
   /* const token = user.getjwtToken();

    res.status(200).json({success:true,token});*/


});

//logout
exports.logout = catchasyncerror(async (req,res,next)=>{
   
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
     } );
     
    

    res.status(200).json({success:true,message:"logged out"});
});


//get userDetails

exports.userDetail = catchasyncerror(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    });
})

// Update user details
exports.updateUser = catchasyncerror(async (req, res, next) => {
    const { id } = req.params;
    const { currentPassword, newPassword, ...updateFields } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(id).select('+password');
  
      if (!user) {
        return next({ message: 'User not found', statusCode: 404 });
      }
  
      // Verify the current password if provided
      if (currentPassword) {
        const passwordMatched = await user.comparepassword(currentPassword);
        if (!passwordMatched) {
          return next({ message: 'Invalid current password', statusCode: 401 });
        }
      }
  
      // Update user fields
      Object.assign(user, updateFields);
  
      // Update password if a new password is provided
      if (newPassword) {
        if(newPassword===currentPassword){
            return next({message:'NewPassword Cannot Be Same As Old Password',statusCode:401})
        }
        user.password = newPassword;
      }
  
      // Save the updated user
    const updatedUser =  await user.save();
  
      res.status(200).json({ success: true, message: 'User updated successfully' ,updatedUser});
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  //Forgot Password 
  exports.ForgotPassword = catchasyncerror(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
      return next({message:'No User Found With This Email',statusCode:404});
    }

    //Get ResetToken
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetLink = `${req.protocol}://${req.get("host")}/api/users/password/reset/${resetToken}`;
    const Message = `Your Password Reset Token is :- \n\n ${resetLink} \n\n if You Have Not Requested This Email Then, Please Ignore It`;


    try {
      await sendEmail({
          email:user.email,
          subject:`ShopPlaza Password Recovery`,
          message:Message
      });

      res.status(200).json({
        success:true,
        message: `Email sent To ${user.email} Successfully`,
      });
    } catch (error) {
      user.resetpasswordtoken = undefined;
      user.resetpasswordexpired = undefined;
     await user.save({validateBeforeSave:false});

     return next({message:error.message,statusCode:500});
    }

  });
