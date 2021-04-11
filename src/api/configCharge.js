import request from '@/utils/request'

export function detail(query) {
  return request({
    url: '/feeConfig/index',
    method: 'get',
    params: query
  })
}

export function edit(data) {
  return request({
    url: '/feeConfig/update',
    method: 'POST',
    data
  })
}
