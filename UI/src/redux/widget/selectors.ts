import { RootState } from "..";
import IWidget from "../../@types/Widget";


export function selectorGetWidgets(state: RootState) : IWidget[] {

    if (!state.widgets || !state.widgets.byId) return [];

    return sortWidgetsByNameAscending(Object.values(state.widgets.byId));
}

export function selectorGetWidgetById(state: RootState, widgetId: string) : IWidget | undefined {

    if (!state.widgets || !state.widgets.byId) return undefined;

    return state.widgets.byId[widgetId];
}


function sortWidgetsByNameAscending(widgets: IWidget[]) {
    return widgets.sort();
}