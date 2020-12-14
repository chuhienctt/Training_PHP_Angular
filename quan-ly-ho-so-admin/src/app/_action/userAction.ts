import { Action } from '@ngrx/store';
import { User } from '../_models/user';

export const ActionTypes = {
  CHECK_LOGIN: 'CHECK LOGIN',
  LOGOUT: 'LOGOUT',
};

export class CheckLoginAction implements Action {
  type = ActionTypes.CHECK_LOGIN;
  constructor(public playload: User) {}
}
export class LogoutLoginAction implements Action {
  type = ActionTypes.LOGOUT;
  constructor() {}
}
export type Actions = CheckLoginAction;
