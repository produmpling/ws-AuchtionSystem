import request from '../utils/request'

// 分页查询拍品订单表
export function fetchAuctionOrderList(query) {
  return request({
    url: '/auctionOrder/pageSelectAuctionOrderList',
    method: 'post',
    data: query,
  })
}
// 更新或新增

export function updateAuctionOrderMes(query) {
  return request({
    url: '/auctionOrder/updateAuctionOrderMes',
    method: 'post',
    data: query,
  })
}
//删除
export function deleteAuctionOrderMes(query) {
  return request({
    url: '/auctionOrder/deleteAuctionOrderMes',
    method: 'post',
    data: query,
  })
}
