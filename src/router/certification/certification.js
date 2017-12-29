const Certification = (resolve) => {
  import('@/components/certification/certification').then((module) => {
    resolve(module)
  })
}

const certification = [{
  path: 'home/certification',
  component: Certification,
  name: 'certification',
  meta: { title: '帮助文档' }
}]

export default certification
