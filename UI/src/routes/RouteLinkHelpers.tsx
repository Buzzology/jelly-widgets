// Models
// export const GetModelLinkByModel = (model: IModel) => `${GetModelLinkByModelId(model.modelId)}`;
// export const GetModelLinkByModelId = (modelId: string) => `/models/${modelId}`;

import { IUserDetail } from "../@types/UserDetail";
import { Slugify } from "../utilities/Helpers";
import { Configuration } from "../utilities/Constants";

// Dashboards
export const GetDashboardLinkByDashboardIdAndName = (dashboardId: string, name: string) => `/dashboards/${dashboardId}/${name}`;
export const GetDashboardLinkWithHighlightedWidget = (dashboardId: string, name: string, dashboardWidgetId: string) => `${GetDashboardLinkByDashboardIdAndName(dashboardId, name)}/${dashboardWidgetId}`

// Products
export const GetProductsLink = () => `/products`;

// Redirects
// export const GetRedirectLinkByEntityTypeAndId = (entityType: EntityTypeEnum, entityId: string) => `/redirect/${entityType}/${entityId}`;

// Topics
export const GetTopicLinkByTopicName = (topicName: string) => `/topics/${Slugify(topicName)}`;
export const GetTopicsSearch = () => `/topics/search`;

// Users
export const GetUserLinkByUser = (user: IUserDetail) => `${GetUserLinkByUserId(user.userDetailId)}/${Slugify(user.displayName)}`;
export const GetUserLinkByUserId = (userId: string) => `/users/${userId}`;
export const GetLoginUrl = () => `${Configuration.LOGIN_ENDPOINT}`;
export const GetSignUpUrl = () => `${Configuration.LOGOUT_ENDPOINT}`;
export const GetUserAccountConfigurationUrl = () => `/account`;

// Widgets
export const GetWidgetLinkByNameIdAndDashboardId = (widgetId: string, name: string, dashboardId: string) => `/widgets/${widgetId}/${Slugify(name)}/${dashboardId}`;
export const GetWidgetsSearchWithDashboardId = (dashboardId: string, query: string) => `/widgets/search/${dashboardId}/${query}`;