const { Schema, model } = require('mongoose')
const difficulty = require('../utils/difficultyValues')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: difficulty,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    duration: {
      type: Number,
      min: 0,
    },
    instructions: {
      type: [String],
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
