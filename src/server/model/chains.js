let mongoose = require('mongoose')
let Schema = mongoose.Schema


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

let chainsSchema = new Schema({
  name: String,
  location: {
    description: String,
    location: {
      lat: Number,
      lng: Number
    }
  },
  average: Number,
  reviews: [reviewSchema]
})


module.exports = mongoose.model('ChainsModel', chainsSchema)