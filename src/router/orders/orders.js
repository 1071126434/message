const Orders = (resolve) => {
  import('@/components/orders/orders').then((module) => {
    resolve(module)
  })
}

const orders = [{
  path: 'home/orders',
  component: Orders,
  name: 'orders',
  meta: { title: '月账单' }
}]

export default orders
