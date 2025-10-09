const mongoose = require('mongoose')

const CourierSchema = new mongoose.Schema({
  courierName: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  packageId:{
    type: String,
    required: [true, 'courier must have a pacakage Id']
  },
  pickupLocation: {
    type: String,
    require: [true, 'must provide a pickup location'],
    trim: true,
  },
  deliveryLocation: {
    type: String,
    require: [true, 'must provide a delivery location'],
    trim: true,
  },
  deliveryStatus: {
    type: String
  },
  estimatedDelivery: {
    type: Date
  },
})

module.exports = mongoose.model('Courier', CourierSchema)