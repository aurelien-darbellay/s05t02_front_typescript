export const ApiPaths = {
  BACK_ORIGIN: 'http://localhost:8080',
  FRONT_ORIGIN: 'http://localhost:5173',

  BASE_PATH: '/api',
  PROTECTED_BASE_PATH: '/api/protected',
  AUTHENTICATION_CHECK_PATH: '/api/protected/me',

  // User paths
  USER_BASE_PATH: '/api/protected/users',
  USER_DASHBOARD_REL: '/dashboard',
  USER_DASHBOARD_PATH: '/api/protected/users/dashboard',
  USER_DELETE_REL: '/delete',
  USER_DELETE_PATH: '/api/protected/users/delete',
  USER_GENERATE_PDF_PATH: '/api/protected/users/pdf',

  // Document paths
  DOC_REL: '/doc',
  DOC_PATH: '/api/protected/users/doc',
  DOC_ID_REL: '/{docId}',
  DOC_ID_PATH: '/api/protected/users/doc/{docId}',
  DELETE_DOC_REL: '/delete',
  DELETE_DOC_PATH: '/api/protected/users/doc/{docId}/delete',

  // Public view
  PVs_PATH: '/api/protected/users/public-view',
  PV_PATH: '/api/protected/users/public-view/{pvId}',
  PV_DELETE_PATH: '/api/protected/users/public-view/delete/{pvId}',

  // Entry paths
  ENTRY_BASE_PATH: '/api/protected/users/doc/{docId}/entry',
  ENTRY_ADD_REL: '/add',
  ENTRY_DELETE_REL: '/delete',
  ENTRY_UPDATE_REL: '/update',

  // Cloud storage
  CLOUD_STORAGE_PATH: '/api/protected/users/cloud-storage',
  CLOUD_SIGNATURE_PATH: '/api/protected/users/cloud-storage/signature',
  CLOUD_DELETE_PATH: '/api/protected/users/cloud-storage/delete',

  // Admin
  ADMIN_BASE_PATH: '/api/protected/admin',

  // Unprotected paths
  LOGIN_PATH: '/api/login',
  LOGOUT_PATH: '/api/logout',
  REGISTER_PATH: '/api/register',
  PUBLIC_VIEWS_PATH: '/api/public-views', // + ?id={pv_id}
  CSRF_TOKEN_PATH: '/api/csrf',
  TYPES_CONFIG_PATH: '/api/config',
};
