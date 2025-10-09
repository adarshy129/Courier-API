const express = require('express')
const router = express.Router()

const {
  getAllCouriers,
  createCourier,
  getCourier,
  updateCourier,
  deleteCourier,
} = require('../controllers/couriers')

router.route('/').get(getAllCouriers).post(createCourier)
router.route('/:id').get(getCourier).patch(updateCourier).delete(deleteCourier)

module.exports = router