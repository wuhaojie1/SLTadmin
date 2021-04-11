import request from '@/utils/request'

export function messageDetail(query) {
  return request({
    url: '/userNotice/list',
    method: 'get',
    params: query
  })
}

export function updateMessage(data) {
  return request({
    url: '/userNotice/add',
    method: 'post',
    data
  })
}
