import { IUserDetail } from "../../@types/UserDetail";

export const ACTIONS_USER_DETAIL = {
    INVALIDATE: 'INVALIDATE_USER_DETAILS',
    RECEIVE: 'RECEIVE_USER_DETAILS',
    UPDATE: 'UPDATE_USER_DETAILS',
}

interface ActionUserDetailsInvalidate {
    type: typeof ACTIONS_USER_DETAIL.INVALIDATE,
    byId: { [key: string]: IUserDetail },
}

interface ActionUserDetailsReceive {
    type: typeof ACTIONS_USER_DETAIL.RECEIVE
    byId: { [key: string]: IUserDetail },
}

interface ActionUserDetailsReceive {
    type: typeof ACTIONS_USER_DETAIL.UPDATE
    byId: { [key: string]: IUserDetail },
}

export interface UserDetailState {
    byId: { [key: string]: IUserDetail },
}

export type ActionTypesUserDetail = ActionUserDetailsReceive | ActionUserDetailsReceive | ActionUserDetailsInvalidate;