import VeeValidate from 'vee-validate'
import Vue from 'vue'
// 引入中文提示信息
import zh from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh.messages,
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: { // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})
// 自定义校验规则
// 定义协议必须打勾同意
// 自定义规则名字叫agree
VeeValidate.Validator.extend('tongyi', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})
