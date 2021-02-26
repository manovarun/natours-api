const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/TourModel');
const User = require('../../models/UserModel');
const Review = require('../../models/ReviewModel');

dotenv.config({ path: './config.env' });

const connectDB = require('../../db');

connectDB();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log('Data successfully loaded!.');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deletData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data successfully deleted!.');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deletData();
}
