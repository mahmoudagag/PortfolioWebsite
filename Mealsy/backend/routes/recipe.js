import express from 'express'
const router = express.Router()
import {getRecipe, getUserProfile} from '../controllers/recipe.js'

router.route('/recipe').get(getRecipe)
router.route('/nutrition').get(getUserProfile)

export default router

