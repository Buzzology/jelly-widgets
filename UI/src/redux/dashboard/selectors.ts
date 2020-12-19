import { RootState } from "..";
import IDashboard from "../../@types/Dashboard";


export function selectorGetDashboards(state: RootState) : IDashboard[] {
    
    if (!state.dashboards || !state.dashboards.byId) return [];

    return sortDashboardsByOrderNumberDescending(Object.values(state.dashboards.byId));
}

export function selectorGetDashboardById(state: RootState, dashboardId: string): IDashboard | undefined {

    if (!state.dashboards || !state.dashboards.byId) return undefined;

    return state.dashboards.byId[dashboardId];
}


function sortDashboardsByOrderNumberDescending(dashboards: IDashboard[]) {
    return dashboards.sort((a, b) => b.orderNumber - a.orderNumber);
}

