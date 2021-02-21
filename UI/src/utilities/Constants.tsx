export const Configuration = {
    TEST: process.env.NODE_ENV,
    BASE_HOST: process.env.REACT_APP_BASE_HOST,
    BASE_URL: process.env.REACT_APP_BASE_URL,
    REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL: process.env.REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL,
    REACT_APP_BASE_USER_MANAGEMENT_API_URL: process.env.REACT_APP_BASE_USER_MANAGEMENT_API_URL,
    REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL: process.env.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL,
    NO_IMAGE_URL: process.env.REACT_APP_NO_IMAGE_URL,
    COGNITO_ENDPOINT: process.env.REACT_APP_COGNITO_ENDPOINT,
    COGNITO_ENDPOINT_LOGOUT: process.env.REACT_APP_COGNITO_ENDPOINT_LOGOUT,
}


export const ProductIds = {
    SUBSCRIPTION_MONTHLY_PRICE_ID: 'price_1IARejB2aL3Fzkly4cVdakx8',
    SUBSCRIPTION_ANNUAL_PRICE_ID: 'price_1IARejB2aL3FzklymW0uRgIU',
}


export const MessageTypes = {
    ERROR: 0,
    SUCCESS: 1,
    INFORMATION: 2,
    WARNING: 3
}


export const StorageKeys = {
    ACCESS_TOKEN: 'internal',
    USERNAME: 'username',
    EXPIRES_AT: 'expires_at',
    USER_ID: 'userId'
}


export const WidgetIds = {
    TFN_GENERATOR: 'gBE8YMxlnEa9BFv3DAItgT',
    TFN_VALIDATOR: 'gBE8YMxlnEa9BFv3DAItgV',
    ABN_GENERATOR: 'gBE8YMxlnEa9BFv3DAItgA',
    ABN_VALIDATOR: 'gBE8YMxlnEa9BFv3DAItgB',
}


export const Generic = {
    DAILY_FREE_EXECUTIONS: 25,
}