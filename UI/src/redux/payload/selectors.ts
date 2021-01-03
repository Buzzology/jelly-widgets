import { RootState } from "..";
import IPayload from "../../@types/Payload";


export function selectorGetPayloads(state: RootState) : IPayload[] {

    if (!state.payloads || !state.payloads.byId) return [];

    return sortPayloadsByGeneratedDescending(Object.values(state.payloads.byId));
}


export function selectorGetPayloadById(state: RootState, payloadId: string) : IPayload | undefined {

    if (!state.payloads || !state.payloads.byId) return undefined;

    return state.payloads.byId[payloadId];
}


export function selectorGetPayloadsByDashboardWidgetId(state: RootState, dashboardWidgetId: string) : IPayload[] {

    if (!state.payloads || !state.payloads.byId) return [];

    return sortPayloadsByGeneratedDescending(Object.values(state.payloads.byId).filter(x => x.dashboardWidgetId === dashboardWidgetId));
}


export function selectorGetLatestPayloadByDashboardWidgetId(state: RootState, dashboardWidgetId: string) : IPayload | undefined {

    if (!state.payloads || !state.payloads.byId) return undefined;

    var payloadResponses = sortPayloadsByGeneratedDescending(Object.values(state.payloads.byId).filter(x => x.dashboardWidgetId === dashboardWidgetId));
    if(!payloadResponses.length) return undefined;
    
    return payloadResponses[payloadResponses.length - 1];
}


function sortPayloadsByGeneratedDescending(payloads: IPayload[]) {
    return payloads.sort((a, b) => new Date(b.generated.seconds * 1000).getTime() - new Date(a.generated.seconds * 1000).getTime());
}
