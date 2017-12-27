const market = (resolve) => {
  import('@/components/marketMsg/market').then((module) => {
    resolve(module)
  })
}
const marketEffect = (resolve) => {
  import('@/components/marketMsg/marketEffect').then((module) => {
    resolve(module)
  })
}

const marketMsg = [{
  path: 'home/market',
  component: market,
  name: 'market',
  meta: { title: '营销短信' }
}, {
  path: 'home/marketEffect',
  component: marketEffect,
  name: 'marketEffect',
  meta: { title: '效果追踪短信' }
}]

export default marketMsg
