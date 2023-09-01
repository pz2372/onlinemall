const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    categories: [String],
    createdAt: Date,
    modifiedAt: Date,
})

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand