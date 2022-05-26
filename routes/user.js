const express = require('express');
const isAuth = require('../middlewares/is-auth');
const router = express.Router();

const {
  loginController,
  signupController,
  getUserById,
  getUsers,
} = require('../controllers/user');

router.post('/login', loginController);

router.post('/signup', signupController);

router.get('/:userId', isAuth, getUserById);

router.get('/', isAuth, getUsers);

module.exports = router;
