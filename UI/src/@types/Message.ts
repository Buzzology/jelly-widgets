export default interface IMessage {
    messageId: string,
    text: string,
    type: MessageTypeEnum,
    created: Date,
}


export enum MessageTypeEnum {
    Error = 0,
    Success = 1,
    Information = 2,
    Warning = 3,
}