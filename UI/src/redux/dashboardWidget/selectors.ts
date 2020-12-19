import { RootState } from "..";
import IDashboardWidget from "../../@types/DashboardWidget";

export function selectorGetDashboardWidgetsByDashboardId(state: RootState, dashboardId: string): IDashboardWidget[] {

    if (!state.dashboardWidgets || !state.dashboardWidgets.byId) return [];

    return sortDashboardWidgetsByOrderNumberDescending(Object.values(state.dashboardWidgets.byId).filter(x => x.dashboardId === dashboardId));
}


export function selectorGetDashboardWidgetById(state: RootState, dashboardWidgetId: string): IDashboardWidget | undefined {

    if (!state.dashboardWidgets || !state.dashboardWidgets.byId) return undefined;

    return state.dashboardWidgets.byId[dashboardWidgetId];
}


function sortDashboardWidgetsByOrderNumberDescending(dashboardWidgets: IDashboardWidget[]) {
    return dashboardWidgets.sort((a, b) => b.orderNumber - a.orderNumber);
}

