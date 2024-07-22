const express = require('express')
const router = express.Router()
const {getAllinformation, getInfo, createInfo, updateInfo, deleteinfo } = require('../controllers/information')


router.route('').get(getAllinformation).post(createInfo)
router.route('/:id').get(getInfo).patch(updateInfo).delete(deleteinfo)

module.exports = router
