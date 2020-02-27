import Mock from 'mockjs'
import loginAPI from './login'
// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock('/webresources/login/privilege/SysField/find', 'post', loginAPI.ts)



export default Mock
