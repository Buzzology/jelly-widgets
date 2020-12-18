import { RootState } from "..";
import { IUiFormState, UiFormStateIdEnum } from "../../@types/UiFormState";


export function selectorGetUiFormStates(state: RootState) : (IUiFormState | undefined)[] {

    if (!state.uiFormStates || !state.uiFormStates.byId) return [];

    return Object.values(state.uiFormStates.byId);
}


export function selectorGetUiFormStateById(state: RootState, uiFormTypeId: UiFormStateIdEnum) : IUiFormState | undefined {

    if (!state.uiFormStates || !state.uiFormStates.byId) return undefined;

    return state.uiFormStates.byId[uiFormTypeId];
}
