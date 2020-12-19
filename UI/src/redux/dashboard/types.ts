import IDashboard from "../../@types/Dashboard";

export const ACTIONS_DASHBOARD = {
    INVALIDATE: 'INVALIDATE_DASHBOARDS',
    RECEIVE: 'RECEIVE_DASHBOARDS',
    DELETE: 'DELETE_DASHBOARD',
    UPDATE: 'UPDATE_DASHBOARDS',
}

interface ActionDashboardsInvalidate {
    type: typeof ACTIONS_DASHBOARD.INVALIDATE,
    byId: { [key: string]: IDashboard },
}

interface ActionDashboardsReceive {
    type: typeof ACTIONS_DASHBOARD.RECEIVE
    byId: { [key: string]: IDashboard },
}

export interface DashboardState {
    byId: { [key: string]: IDashboard },
}

export enum DashboardSearchOrderTypeEnum {
    CreatedDateDesc = 10,
    CreatedDateAsc = 20,
}

export type ActionTypesDashboard = ActionDashboardsReceive | ActionDashboardsInvalidate;