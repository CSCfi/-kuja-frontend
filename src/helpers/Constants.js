export const API_BASE_URL = 'http://localhost:8099/api'
export const HTTP_HOST_BASE_URL = 'http://localhost:3000'
export const CAS_LOGIN_REDIRECT_URL = `${API_BASE_URL}/auth/login?redirect=${HTTP_HOST_BASE_URL}/cas-ready`
export const CAS_LOGIN_READY = `${HTTP_HOST_BASE_URL}/cas-ready`
export const APP_WIDTH = 1280
