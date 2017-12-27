const Manger = (resolve) => {
  import('@/components/manger/manger').then((module) => {
    resolve(module)
  })
}

const manger = [{
  path: 'home/manger',
  component: Manger,
  name: 'manger',
  meta: { title: '签名管理' }
}]

export default manger
