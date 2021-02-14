import { combineReducers, Action, compose, createStore, applyMiddleware } from "redux";
import { ThunkAction } from 'redux-thunk';
import thunk from "redux-thunk"
import { createLogger } from "redux-logger";
import { messagesReducer } from "./message/reducers";
import { uiFormStatesReducer } from "./uiFormState/reducers";
import { userDetailsReducer } from "./userDetail/reducers";
import { dashboardsReducer } from "./dashboard/reducers";
import { dashboardWidgetsReducer } from "./dashboardWidget/reducers";
import { widgetsReducer } from "./widget/reducers";
import { payloadsReducer } from "./payload/reducers";
import { widgetUserExecutionTrackersReducer } from "./widgetUserExecutionTracker/reducers";
import { subscriptionsReducer } from "./subscription/reducers"


const rootReducer = combineReducers({
    dashboards: dashboardsReducer,
    dashboardWidgets: dashboardWidgetsReducer,
    messages: messagesReducer,
    payloads: payloadsReducer,
    subscriptions: subscriptionsReducer,
    uiFormStates: uiFormStatesReducer,
    userDetails: userDetailsReducer,
    widgets: widgetsReducer,
    widgetUserExecutionTrackers: widgetUserExecutionTrackersReducer,
});


const middleware: any = [thunk]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}


export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/* Retrieve persisted state if applicable: https://stackoverflow.com/a/37690899/522859 */
// const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState') || '') : {};

const store = createStore(
	rootReducer,
	// { cartProducts: persistedState.cartProducts, carts: persistedState.carts },
	composeEnhancers(
		applyMiddleware(...middleware)
	),
);

/* Save the state: we do this so that we can rehydrate on refresh etc */
// store.subscribe(() => {
// 	localStorage.setItem('reduxState', JSON.stringify(store.getState()))
// });

export { store as default };

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export type RootState = ReturnType<typeof rootReducer>