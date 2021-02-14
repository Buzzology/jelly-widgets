import ISubscription from "../../@types/Subscription";

export const ACTIONS_SUBSCRIPTION = {
    INVALIDATE: 'INVALIDATE_SUBSCRIPTIONS',
    RECEIVE: 'RECEIVE_SUBSCRIPTIONS',
    DELETE: 'DELETE_SUBSCRIPTION',
    UPDATE: 'UPDATE_SUBSCRIPTIONS',
}

interface ActionSubscriptionsInvalidate {
    type: typeof ACTIONS_SUBSCRIPTION.INVALIDATE,
    byId: { [key: string]: ISubscription },
}

interface ActionSubscriptionsReceive {
    type: typeof ACTIONS_SUBSCRIPTION.RECEIVE
    byId: { [key: string]: ISubscription },
}

export interface SubscriptionState {
    byId: { [key: string]: ISubscription },
}

export enum SubscriptionSearchOrderTypeEnum {
    CreatedDateDesc = 10,
    CreatedDateAsc = 20,
}

export type ActionTypesSubscription = ActionSubscriptionsReceive | ActionSubscriptionsInvalidate;