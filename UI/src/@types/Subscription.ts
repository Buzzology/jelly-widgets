import { Time } from "./Generic";

export default interface ISubscription {
    subscriptionId: string,
    userDetailId: string,
    expires: Time,
}