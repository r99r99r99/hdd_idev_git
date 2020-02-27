// module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
module.exports = (file, _vue) => () => {
  let vvv = import('@/views/' + file + '.vue')
  vvv.then((ccc) => {//没有name的组件会根据url增加一个name
    if (!ccc.default.name)
      ccc.default.name = file.replace(/\//g, "-") //因为路径有 /
  })
  return vvv
} //wxl避免菜单不存在报错
