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


export function selectorFilterWidgetsBySearchString(store: RootState, searchString: string){
    
    if(!store.widgets?.byId) return [];
    
    return Object.values(store.widgets.byId).filter(x => x.name.toLowerCase().indexOf(searchString) >= 0 || x.description.toLowerCase().indexOf(searchString) >= 0);
}