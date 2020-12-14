import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as userLogins from '../_action/userAction';
import { User } from '../_models/user';

export interface UserState {
  entities: Array<User>;
}
const initialState: UserState = {
  entities: [],
};
export function userReducer(
  state = initialState,
  action: userLogins.Actions
): UserState {
  switch (action.type) {
    case userLogins.ActionTypes.CHECK_LOGIN: {
      const user: User = action.playload;
      return {
        entities: [...state.entities, user],
      };
    }
    case userLogins.ActionTypes.LOGOUT: {
      return {
        ...state,
        entities: [],
      };
    }
    default: {
      return state;
    }
  }
}
