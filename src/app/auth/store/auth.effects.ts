import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthAction,
  AuthActionsTypes,
  AuthLogin, LoginFail,
  LoginStart
} from "./auth.action";
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthResponseData } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from "rxjs";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType<LoginStart>(AuthActionsTypes.LoginStart),
    switchMap((authData: LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4EVTQlPa9cthJgD9ba4hpiwbsP60yHEc',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthLogin({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate,
            });
          }),
          catchError(errorRes => {
            let errorMessage = 'An unknown error occured!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new LoginFail(errorMessage));
            }
            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage =
                  'The email address is already in use by another account.';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email doesnt exist';
                break;
              case 'INVALID_PASSWORD':
                errorMessage =
                  ' The password is invalid or the user does not have a password.';
                break;
            }
            return of(new LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType<AuthLogin>(AuthActionsTypes.Login),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
