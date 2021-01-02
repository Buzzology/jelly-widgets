export interface IUiFormState {
    uiFormStateId: UiFormStateIdEnum,
    open: boolean,
    params?: any,
}


    export enum UiFormStateIdEnum {
    DashboardUpdate = 10,
    DashboardCreate = 20,
    DashboardAddWidget = 30,
}