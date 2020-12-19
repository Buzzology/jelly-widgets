import IDashboardWidget from "./DashboardWidget";

export default interface IDashboard {
    dashboardId: string,
    dashboardWidgets?: IDashboardWidget[],
    name: string,
    orderNumber: number,
    userId: string,
}