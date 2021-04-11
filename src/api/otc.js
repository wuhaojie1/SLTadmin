import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/otc/manager/listFreeBuySell',
    method: 'get',
    params: query
  })
}

