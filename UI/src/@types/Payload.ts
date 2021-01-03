import { Time } from "./Generic";

export default interface IPayload {
    payloadId: string,
    widget: string,
    dashboardWidgetId: string,
    payloadResponses: { [key: string]: string },
    generated: Time,
}