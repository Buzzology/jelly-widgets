import IDashboardWidget from "../../@types/DashboardWidget";

export const ACTIONS_DASHBOARD_WIDGET = {
    INVALIDATE: 'INVALIDATE_DASHBOARD_WIDGETS',
    RECEIVE: 'RECEIVE_DASHBOARD_WIDGETS',
    DELETE: 'DELETE_DASHBOARD_WIDGET',
    UPDATE: 'UPDATE_DASHBOARD_WIDGETS',
}

interface ActionDashboardWidgetsInvalidate {
    type: typeof ACTIONS_DASHBOARD_WIDGET.INVALIDATE,
    byId: { [key: string]: IDashboardWidget },
}

interface ActionDashboardWidgetsReceive {
    type: typeof ACTIONS_DASHBOARD_WIDGET.RECEIVE
    byId: { [key: string]: IDashboardWidget },
}

export interface DashboardWidgetState {
    byId: { [key: string]: IDashboardWidget },
}

export enum DashboardWidgetSearchOrderTypeEnum {
    CreatedDateDesc = 10,
    CreatedDateAsc = 20,
}

export type ActionTypesDashboardWidget = ActionDashboardWidgetsReceive | ActionDashboardWidgetsInvalidate;