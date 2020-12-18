import IMessage from "../../@types/Message"


export const ACTIONS_MESSAGE = {
    INVALIDATE: 'INVALIDATE_MESSAGES',
    RECEIVE: 'RECEIVE_MESSAGES',
    REQUEST: 'REQUEST_MESSAGES',
    REQUEST_FAILURE: 'REQUEST_MESSAGES_FAILURE',
    REQUEST_SUCCESS: 'REQUEST_MESSAGES_SUCCESS',
    REQUEST_UPDATE: 'REQUEST_MESSAGES_UPDATE',
    REQUEST_UPDATE_SUCCESS: 'REQUEST_MESSAGES_UPDATE_SUCCESS',
    REQUEST_UPDATE_FAILURE: 'REQUEST_MESSAGES_UPDATE_FAILURE',
    REQUEST_CREATE: 'REQUEST_MESSAGES_CREATE',
    REQUEST_CREATE_SUCCESS: 'REQUEST_MESSAGES_CREATE_SUCCESS',
    REQUEST_CREATE_FAILURE: 'REQUEST_MESSAGES_CREATE_FAILURE',
    REQUEST_DELETE: 'REQUEST_MESSAGES_DELETE',
}


interface ActionMessagesInvalidate {
    type: typeof ACTIONS_MESSAGE.INVALIDATE,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesReceive {
    type: typeof ACTIONS_MESSAGE.RECEIVE,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequest {
    type: typeof ACTIONS_MESSAGE.REQUEST,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestFailure {
    type: typeof ACTIONS_MESSAGE.REQUEST_FAILURE,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestSuccess {
    type: typeof ACTIONS_MESSAGE.REQUEST_SUCCESS,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestUpdate {
    type: typeof ACTIONS_MESSAGE.REQUEST_UPDATE,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestUpdateSuccess {
    type: typeof ACTIONS_MESSAGE.REQUEST_UPDATE_SUCCESS,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestUpdateFailure {
    type: typeof ACTIONS_MESSAGE.REQUEST_UPDATE_FAILURE,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestCreate {
    type: typeof ACTIONS_MESSAGE.REQUEST_CREATE,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestCreateSuccess {
    type: typeof ACTIONS_MESSAGE.REQUEST_CREATE_SUCCESS,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestCreateFailure {
    type: typeof ACTIONS_MESSAGE.REQUEST_CREATE_FAILURE,
    byId: { [key: string]: IMessage },
}

interface ActionMessagesRequestDelete {
    type: typeof ACTIONS_MESSAGE.REQUEST_DELETE,
    byId: { [key: string]: IMessage },
}

export interface MessageState {
    byId: { [key: string]: IMessage },
}

export type ActionTypesMessage = ActionMessagesInvalidate | ActionMessagesReceive | ActionMessagesRequest | ActionMessagesRequestFailure | ActionMessagesRequestSuccess | ActionMessagesRequestUpdate | ActionMessagesRequestUpdateSuccess | ActionMessagesRequestUpdateFailure | ActionMessagesRequestCreate | ActionMessagesRequestCreateSuccess | ActionMessagesRequestCreateFailure | ActionMessagesRequestDelete