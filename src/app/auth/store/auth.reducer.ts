import { User } from '../user.model';
import { AuthAction, AuthActionsTypes } from './auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthAction) {
  console.log(state);
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
        authError: null,
        user,
        loading: false
      };
    case AuthActionsTypes.Logout:
      return {
        ...state,
        user: null,
      };
    case AuthActionsTypes.LoginStart:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActionsTypes.LoginFail:
      return {
        ...state,
        user: null,
        authError: action.paylod,
        loading: false
      };
    default:
      return state;
  }
}
