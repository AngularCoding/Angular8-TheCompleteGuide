import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private _userSubscription: Subscription;

  constructor(
    private _dataStorageService: DataStorageService,
    private _authService: AuthService,
    private _store: Store<AppState>
  ) {}

  onSaveData() {
    this._dataStorageService.storeRecipes();
  }

  onFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this._authService.logout();
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
