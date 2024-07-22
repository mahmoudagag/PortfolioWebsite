const express = require('express')
const router = express.Router()
const {getRecipe, getUserProfile} = require('../controllers/recipe')


router.route('/recipe').get(getRecipe)
router.route('/nutrition').get(getUserProfile)

module.exports = router
