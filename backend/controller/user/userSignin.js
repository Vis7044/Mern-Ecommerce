var bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
async function userSinginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error('Please Provide Email');
    }
    if (!password) {
      throw new Error('Please Provide Password');
    }

    const user = await userModel.findOne({ email });
    if (!user) throw new Error('User not found');
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      throw new Error('Wrong Password');
    }
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: 60*60*8,
    });
    const tokenOption = {
      httpOnly: true,
      secure: true,
    };
    res.cookie('token', token, tokenOption).status(200).json({
      message: 'Login successfully',
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSinginController;
