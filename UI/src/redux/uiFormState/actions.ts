import { IUiFormState, UiFormStateIdEnum } from "../../@types/UiFormState";
import { ACTIONS_UI_FORM_STATE } from "./types";
import { Dispatch } from "@reduxjs/toolkit";


export const receiveUiFormStates = (uiFormStates: IUiFormState[]) => {

    var byIdObjectToDispatch: { [key in keyof typeof UiFormStateIdEnum]?: IUiFormState } = {};

    for (var i = 0; i < uiFormStates.length; i++) {
        byIdObjectToDispatch[uiFormStates[i].uiFormStateId] = uiFormStates[i];
    }

    return {
        type: ACTIONS_UI_FORM_STATE.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const setFormOpenState = (formId: UiFormStateIdEnum, open: boolean, params?: any) => async ( dispatch: Dispatch) => {
    
    var newFormState: IUiFormState = {
        uiFormStateId: formId,
        open,
        params,
    }
    
    return dispatch(receiveUiFormStates([newFormState]));
}