// Models
// export const GetModelLinkByModel = (model: IModel) => `${GetModelLinkByModelId(model.modelId)}`;
// export const GetModelLinkByModelId = (modelId: string) => `/models/${modelId}`;
// export const GetModelTemplateDownloadUrlByModelId = (modelId: string) => `${Configuration.BASE_API_URL}/models/template?modelId=${modelId}`;

import { IUserDetail } from "../@types/UserDetail";
import { Slugify } from "../utilities/Helpers";
import { Configuration } from "../utilities/Constants";


// Redirects
// export const GetRedirectLinkByEntityTypeAndId = (entityType: EntityTypeEnum, entityId: string) => `/redirect/${entityType}/${entityId}`;

// Topics
export const GetTopicLinkByTopicName = (topicName: string) => `/topics/${Slugify(topicName)}`;
export const GetTopicsSearch = () => `/topics/search`;

// Users
export const GetUserLinkByUser = (user: IUserDetail) => `${GetUserLinkByUserId(user.userDetailId)}/${Slugify(user.displayName)}`;
export const GetUserLinkByUserId = (userId: string) => `/users/${userId}`;
export const GetLoginUrl = () => `${Configuration.COGNITO_ENDPOINT}`;
export const GetSignUpUrl = () => `${Configuration.COGNITO_ENDPOINT}`;
export const GetUserAccountConfigurationUrl = () => `/account`;