import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from 'rxjs/operators';
import { AuthLogout } from '../auth/store/auth.action';
import { FetchRecipes, StoreRecipes } from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private _userSubscription: Subscription;

  constructor(private _store: Store<AppState>) {}

  onSaveData() {
    // this._dataStorageService.storeRecipes();
    this._store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    // this._dataStorageService.fetchRecipes().subscribe();
    this._store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this._store.dispatch(new AuthLogout());
  }

  ngOnInit(): void {
    console.log('init header');
    this._userSubscription = this._store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log('!!user', !!user);
      });
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }
}
