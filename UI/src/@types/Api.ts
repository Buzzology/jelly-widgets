import IMessage from "./Message";

export interface IApiResponse {
    messages: IMessage[],
    data: any,
    success: boolean,
    userId: string,
    username: string,
}