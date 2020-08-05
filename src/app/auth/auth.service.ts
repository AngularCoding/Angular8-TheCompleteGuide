import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { AuthLogout } from './store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _tokenExirationTimer: any;

  constructor(private _store: Store<AppState>) {}

  setLogoutTimer(exiratonDuration: number) {
    console.log(exiratonDuration);
    this._tokenExirationTimer = setTimeout(() => {
      this._store.dispatch(new AuthLogout());
    }, exiratonDuration);
  }

  clearLogoutTimer() {
    if (this._tokenExirationTimer) {
      clearTimeout(this._tokenExirationTimer);
      this._tokenExirationTimer = null;
    }
  }
}
