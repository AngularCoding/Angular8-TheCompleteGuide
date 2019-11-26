import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is test only', 'https://cdn.pixabay.com/photo/2018/09/14/11/13/food-3676808_1280.jpg'),
    new Recipe('Test Recipe', 'This is test only', 'https://cdn.pixabay.com/photo/2018/09/14/11/13/food-3676808_1280.jpg')
  ]

  constructor() { }

  ngOnInit() {
  }

}
