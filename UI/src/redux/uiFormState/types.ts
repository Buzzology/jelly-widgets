import { IUiFormState, UiFormStateIdEnum } from "../../@types/UiFormState";

export const ACTIONS_UI_FORM_STATE = {
    INVALIDATE: 'INVALIDATE_UI_FORM_STATES',
    RECEIVE: 'RECEIVE_UI_FORM_STATES',
    DELETE: 'DELETE_UI_FORM_STATE',
    UPDATE: 'UPDATE_UI_FORM_STATES',
}

interface ActionUiFormStatesInvalidate {
    type: typeof ACTIONS_UI_FORM_STATE.INVALIDATE,
    byId: { [key in keyof typeof UiFormStateIdEnum]?: IUiFormState },
}

interface ActionUiFormStatesReceive {
    type: typeof ACTIONS_UI_FORM_STATE.RECEIVE
    byId: { [key in keyof typeof UiFormStateIdEnum]?: IUiFormState },
}

export interface UiFormStateState {
    byId: { [key in keyof typeof UiFormStateIdEnum]?: IUiFormState },
}


export type ActionTypesUiFormState = ActionUiFormStatesReceive | ActionUiFormStatesInvalidate;