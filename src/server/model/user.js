let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let reviewSchema = new Schema({
  restaurantName: String,
  reviewerName: String,
  creationDate: Date,
  bathroom: Number,
  staff: Number,
  clean: Number,
  drive: Number,
  delivery: Number,
  food: Number,
  average: Number,
  photos: [String]
});

let userProfileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  location: {
    description: String,
    location: {
      lat: Number,
      lng: Number
    }
  },
  photo: {
    name: String,
    file_type: String,
    base64: String
  },
  reviews: [reviewSchema]
}, { versionKey: false })
module.exports = mongoose.model('UserModel', userProfileSchema);
  // module.exports = mongoose.model('ReviewsModel', reviewSchema);
