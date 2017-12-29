const Index = (resolve) => {
  import('@/components/index/index').then((module) => {
    resolve(module)
  })
}
const Fee = (resolve) => {
  import('@/components/index/fee').then((module) => {
    resolve(module)
  })
}
const Recharge = (resolve) => {
  import('@/components/index/recharge').then((module) => {
    resolve(module)
  })
}

const index = [{
  path: 'home/index',
  component: Index,
  name: 'index',
  meta: { title: '首页' }
}, {
  path: 'home/index/fee',
  component: Fee,
  name: 'fee',
  meta: { title: '收费标准' }
}, {
  path: 'home/index/recharge',
  component: Recharge,
  name: 'recharge',
  meta: { title: '充值' }
}]

export default index
