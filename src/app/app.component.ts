import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { AuthActionsTypes, AutoLogin } from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AutoLogin());
  }
}
