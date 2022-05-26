const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`Could not find user related by this email: ${email}`);
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new Error('Email or password did not matched.');
    }
    const generateToken = jwt.sign(
      { email: user.email, id: user._id.toString(), role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token: generateToken,
      user: {
        email: user.email,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.signupController = async (req, res, next) => {
  try {
    const { email, password, username, role } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email: email,
      password: cryptedPassword,
      username: username,
      role: role,
    });

    await newUser.save();
    res.status(200).json({
      message: 'User created.',
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error(`User id not found`);
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User not found related by id:${userId}`);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      throw new Error('Users not found!');
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};
