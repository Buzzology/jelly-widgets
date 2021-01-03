import IPayload from "../../@types/Payload";


export const ACTIONS_PAYLOAD = {
    INVALIDATE: 'INVALIDATE_PAYLOADS',
    RECEIVE: 'RECEIVE_PAYLOADS',
    DELETE: 'DELETE_PAYLOAD',
    UPDATE: 'UPDATE_PAYLOADS',
}

interface ActionPayloadsInvalidate {
    type: typeof ACTIONS_PAYLOAD.INVALIDATE,
    byId: { [key: string]: IPayload },
}

interface ActionPayloadsReceive {
    type: typeof ACTIONS_PAYLOAD.RECEIVE
    byId: { [key: string]: IPayload },
}

export interface PayloadState {
    byId: { [key: string]: IPayload },
}

export enum PayloadSearchOrderTypeEnum {
    CreatedDateDesc = 10,
    CreatedDateAsc = 20,
}

export type ActionTypesPayload = ActionPayloadsReceive | ActionPayloadsInvalidate;