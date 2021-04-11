import request from '@/utils/request'

export function rechargeList(query) {
  return request({
    url: '/wallet/rechargeInfo',
    method: 'get',
    params: query
  })
}
export function drawList(query) {
  return request({
    url: '/draw/list',
    method: 'get',
    params: query
  })
}

export function moneyStatistic(query) {
  return request({
    url: '/moneyStatistic/index',
    method: 'get',
    params: query
  })
}

export function drawUpdate(data) {
  return request({
    url: '/draw/update',
    method: 'post',
    data
  })
}
