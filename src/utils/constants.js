export const API_BASE_URL = 'https://68f103630b966ad500351b08.mockapi.io/api/';

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

export const MOCK_USERS = [
  { email: 'admin@test.com', password: 'admin123', role: USER_ROLES.ADMIN, name: 'Admin User' },
  { email: 'manager@test.com', password: 'manager123', role: USER_ROLES.MANAGER, name: 'Manager User' },
  { email: 'user@test.com', password: 'user123', role: USER_ROLES.USER, name: 'Normal User' }
];

export const ROUTE_PERMISSIONS = {
  '/dashboard': [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.USER],
  '/users': [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
  '/projects': [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
  '/profile': [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.USER]
};

export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ON_HOLD: 'on-hold'
};