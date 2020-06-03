const protocol = window.location.protocol
const opapiHost=`${protocol}//pinjaman-api-test1.xiaoxinfen.com`//测试环境
let LoginUrl = `${protocol}/login` //登录页
// const opapiHost=`${protocol}//101.201.238.13:9001` //老环境

export default{
    opapiHost,
    LoginUrl
}