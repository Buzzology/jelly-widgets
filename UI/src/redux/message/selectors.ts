import { RootState } from "..";import IMessage from "../../@types/Message";



export function selectorGetMessageNewest(state: RootState) {

    if (!state.messages || !state.messages.byId) return null;

    var messages = sortMessagesByCreatedDescending(Object.values(state.messages.byId));
    if(!messages || !messages.length) return null;

    return messages[messages.length - 1];
}


function sortMessagesByCreatedDescending(messages: IMessage[]) {
    return messages.sort((a, b) => a.created.getTime() - b.created.getTime());
}