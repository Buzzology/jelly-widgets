import IMessage, { MessageTypeEnum } from "../../@types/Message";import { Guid } from "../../utilities/Helpers";import { ACTIONS_MESSAGE } from "./types";import { AppThunk } from "..";


export const receiveMessages = (messages: IMessage[]) => {

    var byIdObjectToDispatch: { [key: string]: IMessage } = {};

    for (var i = 0; i < messages.length; i++) {

        // Generate an id if one isn't provided
        if (!messages[i].messageId) messages[i].messageId = Guid();

        byIdObjectToDispatch[messages[i].messageId] = messages[i];
    }

    return {
        type: ACTIONS_MESSAGE.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const deleteAllMessages = (messages: IMessage[]) => {

    var byIdObjectToDispatch: { [key: string]: IMessage } = {};

    for (var i = 0; i < messages.length; i++) {

        // Generate an id if one isn't provided
        if (!messages[i].messageId) messages[i].messageId = Guid();

        byIdObjectToDispatch[messages[i].messageId] = messages[i];
    }

    return {
        type: ACTIONS_MESSAGE.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const createMessage = (text: string, type: MessageTypeEnum, duration: number = 15000, autoClose: boolean = true): AppThunk<Promise<IMessage>> => async dispatch => {

    var message = {
        messageId: Guid(),
        type: type,
        text: text,
        duration: duration,
        autoClose: autoClose,
        created: new Date(),
    };

    await dispatch(receiveMessages([message]));
    
    return message;
}


export const updateMessage = (message: IMessage): AppThunk<Promise<IMessage>> => async dispatch => {
    await dispatch(receiveMessages([message]));
    return message;
}


export const requestMessageDelete = (message: IMessage) => ({
    type: ACTIONS_MESSAGE.REQUEST_DELETE,
    byId: { [message.messageId]: message }
});


export const requestMessageInvalidateAll = () => ({
    type: ACTIONS_MESSAGE.INVALIDATE,
    byId: { }
});