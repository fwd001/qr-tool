import { request } from '@/request';
import { RequestEnum } from '@/enums/httpEnum';

enum Api {
  LogoutUrl = '/account/logoutUrl',
}

/**
 * @description: user logouturl api
 */
export function logoutUrlApi(params = {}) {
  return request({
    method: RequestEnum.GET,
    url: Api.LogoutUrl,
    params: params,
  });
}
