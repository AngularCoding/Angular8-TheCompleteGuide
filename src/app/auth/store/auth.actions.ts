import { Action } from "@ngrx/store";

export enum AuthActionsTypes {
  Login = "[Auth] Login",
  Logout = "[Auth] Logout",
}

export class Login implements Action {
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

export class Logout implements Action {
  readonly type = AuthActionsTypes.Logout;
}

export type AuthActions = Login | Logout;