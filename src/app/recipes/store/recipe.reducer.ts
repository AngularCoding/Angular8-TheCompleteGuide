import { Recipe } from '../recipe.model';
import { RecipeActions, RecipeActionTypes } from './recipe.action';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case RecipeActionTypes.SetRecipe:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActionTypes.AddRecipe:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActionTypes.UpdateRecipe:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
      case RecipeActionTypes.DeleteRecipe:
        return {
          ...state,
          recipes: state.recipes.filter((recipe, index) => {
            return index !== action.payload;
          })
        };
    default:
      return state;
  }
}
