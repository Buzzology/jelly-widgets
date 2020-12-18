export interface IUiFormState {
    uiFormStateId: UiFormStateIdEnum,
    open: boolean,
    topicId?: string,
    params?: any,
}


    export enum UiFormStateIdEnum {
    TopicCreate = 10,
    TopicUpdate = 15,
    PostCreate = 20,
    PostUpdate = 25,
    SubjectCreate = 30,
    SubjectUpdate = 40,
    CommentCreate = 50,
    CommentUpdate = 60,
}