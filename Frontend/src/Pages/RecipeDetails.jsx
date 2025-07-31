import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Profile from '../assets/image.png'

export default function RecipeDetails() {
    const recipe = useLoaderData()
    console.log(recipe)
  return (
    <>
    <div>
        <div>
            <img src={Profile} alt="" />
            <h5>{recipe.email}</h5>
        </div>
        <div>
            <h3>{recipe.title}</h3>
            <img src={`https://platepal-sxnu.onrender.com/Images/${recipe.coverImage}`} alt="" />
            <div>
                <div><h4>Ingredients</h4><ul>{recipe.ingredients.map(item=>(<li>{item}</li>))}</ul></div>
                <div><h4>Instructions</h4><span>{recipe.instructions}</span></div>
            </div>
        </div>
    </div>
    </>
  )
}
