export const Configuration = {
    TEST: process.env.NODE_ENV,
    BASE_HOST: process.env.REACT_APP_BASE_HOST,
    BASE_URL: process.env.REACT_APP_BASE_URL,
    BASE_API_URL: process.env.REACT_APP_BASE_API_URL,
    BASE_CONTENT_MANAGEMENT_API_URL: process.env.REACT_APP_BASE_CONTENT_MANAGEMENT_API_URL,
    NO_IMAGE_URL: process.env.REACT_APP_NO_IMAGE_URL,
    COGNITO_ENDPOINT: process.env.REACT_APP_COGNITO_ENDPOINT,
    COGNITO_ENDPOINT_LOGOUT: process.env.REACT_APP_COGNITO_ENDPOINT_LOGOUT,
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