import request from '@src/utils/request';

/**
 * 用户注册
 * @param {Object} params
 * @author Jessie
 * @date 2021-05-31
 * @returns
 */
export const postUser = (params: object) => {
  return request({
    url: `/users/register`,
    method: 'POST',
    data: params,
  });
};
