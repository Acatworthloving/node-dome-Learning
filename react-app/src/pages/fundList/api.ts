import request from '@src/utils/request';

/**
 * 获取资金列表
 * @param {Object} params
 * @author Jessie
 * @date 2021-05-31
 * @returns
 */
export const getFundList = (params: object) => {
  return request({
    url: `/profiles`,
    method: 'GET',
    data: params,
  });
};
