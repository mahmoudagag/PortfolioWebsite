import express from 'express'
const router = express.Router()
import {getAllInformation, getInfo, createInfo, updateInfo, deleteInfo } from '../controllers/information.js'

router.route('').get(getAllInformation).post(createInfo)
router.route('/:id').get(getInfo).patch(updateInfo).delete(deleteInfo)

export default router