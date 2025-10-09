const Courier = require('../models/couriers')

const getAllCouriers = async (req, res) => {
  const couriers = await Courier.find({})
  res.status(200).json({ couriers })
}

const createCourier = async (req, res) => {
  const courier = await Courier.create(req.body)
  res.status(201).json({ courier })
}

const getCourier = async (req, res, next) => {
  const { id: courierID } = req.params
  const courier = await Courier.findOne({ _id: courierID })

  res.status(200).json({ courier })
}

const deleteCourier = async (req, res, next) => {
  const { id: courierID } = req.params
  const courier = await Courier.findOneAndDelete({ _id: courierID })

  res.status(200).json({ courier })
}

const updateCourier = async (req, res, next) => {
  const { id: courierID } = req.params

  const courier = await Courier.findOneAndUpdate({ _id: courierID }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ courier })
}

module.exports = {
  getAllCouriers,
  createCourier,
  getCourier,
  updateCourier,
  deleteCourier,
}
