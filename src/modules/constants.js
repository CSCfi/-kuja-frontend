// NETWORKING
export const HOST_BASE_URL = window.location.origin
export const API_BASE_URL = `${HOST_BASE_URL}/api`
export const CAS_LOGIN_REDIRECT_URL = `${API_BASE_URL}/auth/login?redirect=${HOST_BASE_URL}/cas-ready`
export const CAS_LOGIN_READY = `${HOST_BASE_URL}/cas-ready`
export const CAS_BASE_URL = 'https://testi.virkailija.opintopolku.fi'
export const CAS_LOGOUT_URL = `${CAS_BASE_URL}/cas/logout?service=${HOST_BASE_URL}`

// USERS & ROLES
export const ROLE_APPLICATION = 'APP_KOUTE'
export const ROLE_YLLAPITAJA = 'APP_KOUTE_YLLAPITAJA'
export const ROLE_ESITTELIJA = 'APP_KOUTE_ESITTELIJA'
export const ROLE_KAYTTAJA = 'APP_KOUTE_KAYTTAJA'