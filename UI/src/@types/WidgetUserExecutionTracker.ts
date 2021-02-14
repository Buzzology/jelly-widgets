import { Time } from "./Generic";

export default interface IWidgetUserExecutionTracker {
    widgetUserExecutionTrackerId: string,
    userDetailId: string,
    created: Time,
    archived: number,
    totalExecutions: number,
    dailyExecutions: number,
    dailyExecutionsReset: Time,
    widgetIdExecutions: { [key: string]: number },
}