import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/position/list',
    method: 'get',
    params: query
  })
}

export function add(data) {
  return request({
    url: '/position/add',
    method: 'POST',
    data
  })
}

export function edit(data) {
  return request({
    url: '/position/update',
    method: 'POST',
    data
  })
}
