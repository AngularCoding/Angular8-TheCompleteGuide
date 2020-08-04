import { User } from "../user.model";
import { AuthActions, AuthActionsTypes } from "./auth.actions";

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthActionsTypes.Login:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
      };
    case AuthActionsTypes.Logout:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
