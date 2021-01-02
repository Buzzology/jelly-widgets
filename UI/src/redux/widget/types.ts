import IWidget from "../../@types/Widget";

export const ACTIONS_WIDGET = {
    INVALIDATE: 'INVALIDATE_WIDGETS',
    RECEIVE: 'RECEIVE_WIDGETS',
    DELETE: 'DELETE_WIDGET',
    UPDATE: 'UPDATE_WIDGETS',
}

interface ActionWidgetsInvalidate {
    type: typeof ACTIONS_WIDGET.INVALIDATE,
    byId: { [key: string]: IWidget },
}

interface ActionWidgetsReceive {
    type: typeof ACTIONS_WIDGET.RECEIVE
    byId: { [key: string]: IWidget },
}

export interface WidgetState {
    byId: { [key: string]: IWidget },
}

export enum WidgetSearchOrderTypeEnum {
    CreatedDateDesc = 10,
    CreatedDateAsc = 20,
}

export type ActionTypesWidget = ActionWidgetsReceive | ActionWidgetsInvalidate;