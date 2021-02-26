const express = require('express');
const {
  signup,
  login,
  protect,
  forgetPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('../controllers/authController');

const {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateMe,
  deleteMe,
  updateUser,
  getMe,
} = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.post('/forgetPassword', forgetPassword);

router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.get('/me', getMe, getUser);

router.route('/updatePassword').patch(updatePassword);

router.route('/updateMe').patch(updateMe);

router.route('/deleteMe').patch(deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
