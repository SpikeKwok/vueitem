import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，每次执行绝不发生变化，游客身份持久存储
export const getUUID = () => {
  // 先从本地获取一下uuid，看看是否有
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  // 若没有则生成一个
  if (!uuidToken) {
    // 生成游客临时身份,存到浏览器
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}
