const Manger = (resolve) => {
  import('@/components/manger/manger').then((module) => {
    resolve(module)
  })
}
const addSign = (resolve) => {
  import('@/components/manger/addSign').then((module) => {
    resolve(module)
  })
}
const Updata = (resolve) => {
  import('@/components/manger/updata').then((module) => {
    resolve(module)
  })
}

const manger = [{
  path: 'home/manger',
  component: Manger,
  name: 'manger',
  meta: { title: '签名管理' }
}, {
  path: 'home/manger/addSign',
  component: addSign,
  name: 'addSign',
  meta: { title: '签名管理-添加签名' }
}, {
  path: 'home/manger/updata',
  component: Updata,
  name: 'updata',
  meta: { title: '签名管理-修改签名' }
}]

export default manger
