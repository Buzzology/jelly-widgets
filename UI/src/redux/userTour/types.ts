import { IUserTour } from "../../@types/UserTour";

export const ACTIONS_USER_TOUR = {
    INVALIDATE: 'INVALIDATE_USER_TOURS',
    RECEIVE: 'RECEIVE_USER_TOURS',
    DELETE: 'DELETE_USER_TOUR',
    UPDATE: 'UPDATE_USER_TOURS',
}

interface ActionUserToursInvalidate {
    type: typeof ACTIONS_USER_TOUR.INVALIDATE,
    byId: { [key: string]: IUserTour },
}

interface ActionUserToursReceive {
    type: typeof ACTIONS_USER_TOUR.RECEIVE
    byId: { [key: string]: IUserTour },
}

export interface UserTourState {
    byId: { [key: string]: IUserTour },
}

export enum UserTourSearchOrderTypeEnum {
    CreatedDateDesc = 10,
    CreatedDateAsc = 20,
}

export type ActionTypesUserTour = ActionUserToursReceive | ActionUserToursInvalidate;