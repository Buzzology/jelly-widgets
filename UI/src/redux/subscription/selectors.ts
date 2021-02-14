import { RootState } from "..";
import ISubscription from "../../@types/Subscription";


export function selectorGetSubscriptions(state: RootState) : ISubscription[] {

    if (!state.subscriptions || !state.subscriptions.byId) return [];

    return Object.values(state.subscriptions.byId);
}

export function selectorGetSubscriptionById(state: RootState, subscriptionId: string) : ISubscription | undefined {

    if (!state.subscriptions?.byId) return undefined;

    return state.subscriptions.byId[subscriptionId];
}


export function selectorGetFirstActiveSubscription(state: RootState, userDetailId: string){
    return selectorGetSubscriptions(state).filter(x => x.userDetailId === userDetailId)?.[0];
}