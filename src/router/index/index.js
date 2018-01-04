const Index = () =>
  import(/* webpackChunkName: "Index" */ '@/components/index/index')
const Fee = () =>
  import(/* webpackChunkName: "Fee" */ '@/components/index/fee')
const Recharge = () =>
  import(/* webpackChunkName: "Recharge" */ '@/components/index/recharge')

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
