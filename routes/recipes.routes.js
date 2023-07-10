const express = require('express')
const Recipe = require('../models/Recipe.model')
const difficulty = require('../utils/difficultyValues')
const router = express.Router()

// /recipes added in front of all routes because of how we registered it in app.js

/* GET all recipes page */
router.get('/', async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find()
    res.render('recipes/all', { allRecipes })
  } catch (error) {
    console.log(error)
  }
})

/* GET new recipe page */
router.get('/new', (req, res, next) => {
  console.log(req)
  res.render('recipes/new', { difficulty })
})

/* POST new recipe data */
router.post('/new', async (req, res, next) => {
  // Get the data
  console.log(req.body)
  const data = req.body
  try {
    // Create a new document with the data
    const newRecipe = await Recipe.create(data)
    console.log(newRecipe)
    // Redirect to some page
    res.redirect(`/recipes/${newRecipe._id}`)
  } catch (error) {
    console.log(error)
  }
})

/* GET update recipe page */
router.get('/:recipeId/update', async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render('recipes/update', { recipe, difficulty })
})

/* POST updated recipe data */
router.post('/:recipeId/update', async (req, res, next) => {
  console.log(req.body, req.params)
  try {
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body)
    res.redirect(`/recipes/${req.params.recipeId}`)
  } catch (error) {
    console.log(error)
  }
})

/* GET one recipe page */
router.get('/:recipeId', async (req, res, next) => {
  console.log(req.params.recipeId)
  const recipeId = req.params.recipeId

  try {
    const recipe = await Recipe.findById(recipeId)
    console.log(recipe)
    // TODO: Show new view with the recipe
    res.render('recipes/one', { recipe })
  } catch (error) {
    console.log(error)
  }
})

/* POST delete recipe */
router.post('/:recipeId/delete', async (req, res, next) => {
  console.log(req.params)
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.redirect('/recipes')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
