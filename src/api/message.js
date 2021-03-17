import request from '@/utils/request'

export function messageDetail(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function updateMessage(id) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { id }
  })
}
