const privilege = {// {0}是动态的
  '字符长度不能小于x个字符': '字符长度不能小于{0}个字符',
  '字符长度不能大于x个字符': '字符长度不能大于{0}个字符',
  "第{page}页,第{index}条":"第{page}页,第{index}条",
  "您有{total}条未读消息":"您有{total}条未读消息",
  "刷新完成，共{num}条数据":"刷新完成，共{num}条数据",
}
export default {
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有',
    openNew: '新窗口打开'
  },
  ...privilege
}
