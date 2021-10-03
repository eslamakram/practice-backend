
'use strict';
const mongoose = require("mongoose");

class Fruits {

  constructor(data) {
    this.name = data.name,
      this.img = data.image,
      this.price = data.price

  }

}

const fruitSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  email: String

});

const fruitModel = mongoose.model('fruits', fruitSchema);

let seedFruit = () => {
  let fruitOne = new fruitModel({
    name: "Apple",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
    price: '35',
    email: 'test@test.com'

  });

  fruitOne.save();

}

module.exports = {
  Fruits,
  fruitSchema,
  fruitModel,
  seedFruit
}


