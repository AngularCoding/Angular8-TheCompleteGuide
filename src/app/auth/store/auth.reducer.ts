import { User } from '../user.model';
import { AuthAction, AuthActionsTypes } from './auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(state = initialState, action: AuthAction) {
  console.log(state);
  switch (action.type) {
    case AuthActionsTypes.AuthenticateSuccess:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user,
        loading: false,
      };
    case AuthActionsTypes.Logout:
      return {
        ...state,
        user: null,
      };
    case AuthActionsTypes.LoginStart:
    case AuthActionsTypes.SignupStart:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActionsTypes.AuthenticateFail:
      return {
        ...state,
        user: null,
        authError: action.paylod,
        loading: false,
      };
      case AuthActionsTypes.ClearError:
        return {
          ...state,
          authError: null
        };
    default:
      return state;
  }
}
