const produceIntro = (resolve) => {
  import('@/components/help/produceIntro').then((module) => {
    resolve(module)
  })
}
const msgDocGuider = (resolve) => {
  import('@/components/help/msgDocGuider').then((module) => {
    resolve(module)
  })
}
const userGuider = (resolve) => {
  import('@/components/help/userGuider').then((module) => {
    resolve(module)
  })
}
const developGuider = (resolve) => {
  import('@/components/help/developGuider').then((module) => {
    resolve(module)
  })
}

const help = [{
  path: 'home/produceIntro',
  component: produceIntro,
  name: 'produceIntro',
  meta: { title: '帮助文档-产品介绍' }
}, {
  path: 'home/msgDocGuider',
  component: msgDocGuider,
  name: 'msgDocGuider',
  meta: { title: '帮助文档-短信文档使用指引' }
}, {
  path: 'home/userGuider',
  component: userGuider,
  name: 'userGuider',
  meta: { title: '帮助文档-用户指南' }
}, {
  path: 'home/developGuider',
  component: developGuider,
  name: 'developGuider',
  meta: { title: '帮助文档-开发指南' }
}]

export default help
