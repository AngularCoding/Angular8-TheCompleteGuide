import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
  LoginStart = '[Auth] Login Start',
  AuthenticateSuccess = '[Auth] Authenticate Success',
  AuthenticateFail = '[Auth] Authenticate Fail',
  SignupStart = '[Auth] Signup Start',
  Logout = '[Auth] Logout',
  ClearError = '[Auth] Clear Errors',
  AutoLogin = '[Auth] Auto Login',
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionsTypes.AuthenticateSuccess;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class AuthLogout implements Action {
  readonly type = AuthActionsTypes.Logout;
}

export class LoginStart implements Action {
  readonly type = AuthActionsTypes.LoginStart;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AuthActionsTypes.AuthenticateFail;
  constructor(public paylod: string) {}
}

export class SignupStart implements Action {
  readonly type = AuthActionsTypes.SignupStart;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = AuthActionsTypes.ClearError;
}

export class AutoLogin implements Action {
  readonly type = AuthActionsTypes.AutoLogin;
}

export type AuthAction =
  | AuthenticateSuccess
  | AuthLogout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin;
