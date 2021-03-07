import { Time } from "./Generic";

export interface IUserTour {
    userTourId: string,
    tourId: string,
    userDetailId: string,
    created: Time,
    createdBy: string,
    updated: Time,
    updatedBy: string,
}