const Help = (resolve) => {
  import('@/components/help/help').then((module) => {
    resolve(module)
  })
}

const help = [{
  path: 'home/help',
  component: Help,
  name: 'help',
  meta: { title: '帮助文档' }
}]

export default help
