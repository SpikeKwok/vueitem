import Mock from 'mockjs'
// json数据文件没有对外暴露但可以引入，为什么？
// webpack默认对外暴露图片，json文件
import Floor from './floor.json'
import Banner from './banner.json'

// Mock.mock( rurl, rtype, template|function( options ) )都是可选项
// rurl:表示需要拦截的 URL
// rtype:表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
// template:表示数据模板，可以是对象或字符串。
// function( options ):表示用于生成响应数据的函数。
Mock.mock('/mock/floor', { code: 200, data: Floor })
Mock.mock('/mock/banner', { code: 200, data: Banner })
