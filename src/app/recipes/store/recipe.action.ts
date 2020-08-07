import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  SetRecipe = '[Recipes] Set Recipes',
  FetchRecipes = '[Recipes] Fetch Recipes',
  AddRecipe = '[Recipes] Add Recipe',
  UpdateRecipe = '[Recipes] Update Recipe',
  DeleteRecipe = '[Recipes] Delete Recipe',
  StoreRecipes = '[Recipes] Store Recipe',
}

export class SetRecipes implements Action {
  readonly type = RecipeActionTypes.SetRecipe;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = RecipeActionTypes.FetchRecipes;
}

export class AddRecipe implements Action {
  readonly type = RecipeActionTypes.AddRecipe;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeActionTypes.UpdateRecipe;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeActionTypes.DeleteRecipe;
  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = RecipeActionTypes.StoreRecipes;
}

export type RecipeActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
