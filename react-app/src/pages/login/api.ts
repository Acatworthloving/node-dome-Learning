import request from '@src/utils/request';

/**
 * 登录
 * @param {Object} params
 * @author Jessie
 * @date 2021-05-31
 * @returns
 */
export const postLogin = (params: object) => {
  return request({
    url: `/users/login`,
    method: 'POST',
    data: params,
  });
};
