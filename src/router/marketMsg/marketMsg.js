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
const SendInfo = (resolve) => {
  import('@/components/marketMsg/sendInfo').then((module) => {
    resolve(module)
  })
}
const MarketEffectDetail = (resolve) => {
  import('@/components/marketMsg/marketEffectDetail').then((module) => {
    resolve(module)
  })
}
const MarketEffectSend = (resolve) => {
  import('@/components/marketMsg/marketEffectSend').then((module) => {
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
  meta: { title: '效果追踪短信列表' }
}, {
  path: 'home/market/sendInfo',
  component: SendInfo,
  name: 'sendInfo',
  meta: { title: '发送营销短信' }
}, {
  path: 'home/marketEffect/marketEffectDetail',
  component: MarketEffectDetail,
  name: 'marketEffectDetail',
  meta: { title: '发送营销短信' }
}, {
  path: 'home/marketEffect/marketEffectSend',
  component: MarketEffectSend,
  name: 'marketEffectSend',
  meta: { title: '发送效果追踪短信' }
}]

export default marketMsg
