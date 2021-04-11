import request from '@/utils/request'

export function chargeList(query) {
  return request({
    url: '/wallet/rechargeInfo',
    method: 'get',
    params: query
  })
}
