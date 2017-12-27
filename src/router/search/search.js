const Search = (resolve) => {
  import('@/components/search/search').then((module) => {
    resolve(module)
  })
}

const search = [{
  path: 'home/search',
  component: Search,
  name: 'search',
  meta: { title: '短信查询' }
}]

export default search
