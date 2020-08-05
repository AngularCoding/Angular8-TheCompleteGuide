import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginStart = '[Auth] Login Start',
  LoginFail = '[Auth] Login Fail'
}

export class AuthLogin implements Action {
  readonly type = AuthActionsTypes.Login;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class AuthLogout implements Action {
  readonly type = AuthActionsTypes.Logout;
}

export class LoginStart implements Action {
  readonly type = AuthActionsTypes.LoginStart;
  constructor(public payload: {email: string, password: string}) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionsTypes.LoginFail;
  constructor(public paylod: string) {}

}

export type AuthAction = AuthLogin | AuthLogout | LoginStart | LoginFail;
