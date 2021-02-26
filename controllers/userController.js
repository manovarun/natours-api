const expressAsyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = expressAsyncHandler(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.updateMe = expressAsyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updatePassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new AppError('Unable to update details, please try again.', 400)
    );
  }

  res.status(200).json({ status: 'success', data: { user } });
});

exports.deleteMe = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  if (!user) {
    return next(new AppError('Unable to delete, please try again.', 400));
  }

  res.status(204).json({ status: 'success', data: null });
});

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = factory.createOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
