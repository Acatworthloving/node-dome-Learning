import { setStorageKey, getStorageKey } from './index';

/**
 * set access_token to localStorage
 * @param { string } data
 * @returns {function}
 */
export const setTokenAccess = (data) =>
  localStorage.setItem('project_access_token', data);

/**
 * get access_token from localStorage
 * @returns {function}
 */
export const getTokenAccess = () =>
  localStorage.getItem('project_access_token');

/**
 *clear Token And To login page
 */
export const clearTokenAndToLogin = () => {
  window.location.href = `//${window.location.host}/#/login`;
  localStorage.clear();
};

export const setUserInfo = (data) =>
  setStorageKey('project_refresh_UserInfo', data, 'local');
/**
 * get access_token from localStorage
 * @returns {function}
 */
export const getUserInfo = () =>
  getStorageKey('project_refresh_UserInfo', 'local');
