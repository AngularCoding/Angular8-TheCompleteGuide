import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4EVTQlPa9cthJgD9ba4hpiwbsP60yHEc',
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
     return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4EVTQlPa9cthJgD9ba4hpiwbsP60yHEc',
        {
          email,
          password,
          returnSecureToken: true
        }
    )
       .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doesnt exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = ' The password is invalid or the user does not have a password.';
        break;
    }
    return throwError(errorMessage);
  }
}
