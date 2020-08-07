import { Actions, Effect, ofType } from '@ngrx/effects';
import { RecipeActionTypes, SetRecipes, StoreRecipes } from './recipe.action';
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from "../../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes$ = this.actions$.pipe(
    ofType(RecipeActionTypes.FetchRecipes),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://ng-course-recipebook-aa791.firebaseio.com/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActionTypes.StoreRecipes),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipeState]) => {
      return this.http
        .put(
          'https://ng-course-recipebook-aa791.firebaseio.com/recipes.json',
          recipeState.recipes
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>) {}
}
