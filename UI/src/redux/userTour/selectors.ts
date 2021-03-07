import { RootState } from "..";
import { IUserTour } from "../../@types/UserTour";
import { GetUserId } from "../../utilities/ApiUtils";

export function selectorGetUserTourById(state: RootState, tourId: string): IUserTour | undefined {

    if (!state.userTours || !state.userTours.byId) return undefined;
  
    return Object.values(state.userTours.byId).find(x => x.tourId === tourId);
}


export function selectorGetUserToursByUserId(state: RootState, userId: string = GetUserId()): IUserTour[] {

    if (!state.userTours || !state.userTours.byId) return [];

    return Object.values(state.userTours.byId).filter(x => x.userDetailId === userId);
}