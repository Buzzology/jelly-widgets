import IPayload from "../../@types/Payload";
import { ACTIONS_PAYLOAD } from "./types";


export const receivePayloads = (payloads: IPayload[]) => {

    var byIdObjectToDispatch: { [key: string]: IPayload } = {};

    for (var i = 0; i < payloads.length; i++) {
        byIdObjectToDispatch[payloads[i].payloadId] = payloads[i];
    }

    return {
        type: ACTIONS_PAYLOAD.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const requestDeletePayload = (payload: IPayload) => ({
    type: ACTIONS_PAYLOAD.DELETE,
    byId: { [payload.payloadId]: payload }
});