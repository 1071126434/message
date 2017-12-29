import index from '../index/index'
import marketMsg from '../marketMsg/marketMsg'
import model from '../model/model'
import manger from '../manger/manger'
import search from '../search/search'
import orders from '../orders/orders'
import help from '../help/help'
import certification from '../certification/certification'
const Home = (resolve) => {
  import('@/components/home/home').then((module) => {
    resolve(module)
  })
}
const defaultHome = [{
  path: '/home',
  redirect: {
    name: 'index'
  }
}]
const home = [{
  path: '/',
  component: Home,
  name: 'home',
  children: [...defaultHome, ...index, ...marketMsg, ...model, ...manger, ...search, ...orders, ...help, ...certification]
}]
export default home
