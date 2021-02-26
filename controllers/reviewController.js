const Review = require('../models/ReviewModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  req.body.tour = req.body.tour ? req.body.tour : req.params.tourId;
  req.body.user = req.body.user ? req.body.user : req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
