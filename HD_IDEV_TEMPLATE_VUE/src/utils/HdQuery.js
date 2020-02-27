export default (st, pageRows, queryMethod) => {//st页面this对象,pageRows,每页显示行数,queryMethod如果默认查询不是doQuery需要指定字符串
  let _thisst = st
  let query = {}
  let page = 1
  let rows = 20
  if (pageRows) {
    rows = pageRows
  }
  let q = ''
  let sort = ''
  let order = 'desc'
  let selObj = []//checkbox勾选的对象
  let doQueryMethod = queryMethod ? '_thisst.' + queryMethod + '()' : '_thisst.doQuery()'

  let outObj = {

    query, page, rows, q, sort, order, selObj, doQueryMethod,

    add:
      (key, value) => {//没啥用
        query[key] = value
      },
    setThis(st) {
      _thisst = st
    },
    doSizeChg(val) {//显示行数切换
      outObj.rows = val
      return eval(doQueryMethod)

      //st.doQuery()
    },
    doCurPageChange(val) {//页码切换
      outObj.page = val

      return eval(doQueryMethod)
    },
    doSort(val, noQuery) {
      outObj.sort = val.prop
      if (val.order == 'ascending') {
        outObj.order = 'asc'
      } else if (val.order == 'descending') {
        outObj.order = 'desc'
      } else {
        outObj.sort = ''
        outObj.order = ''
      }
      if (!noQuery) {//true 不查询,适合列表一加载时
        return eval(doQueryMethod)
      }
    }
  }
  return outObj
}

