export default {
    noPermission: () => {
        try {
            // console.log('noPermission');
            window.webkit.messageHandlers.iOSNOtoken.postMessage("")
        } catch (error) {
            // console.log('noPermission');
            androidCallback.pandaLogin()
        }
    },
    //安卓页面跳转回调
    //1: 跳到基础信息页
    //2：跳到工作信息页面
    //3: 跳到OCR



    toOCR: (param) => {
        //window.webkit.messageHandlers.iOSGetOrderId.postMessage(param)
        try {
            window.webkit.messageHandlers.iOSGotoDokumen.postMessage(param)
        } catch (error) {
            androidCallback.goOCRActivity(param)
        }
    },
    //第四不通讯录授权
    authCallBook: (param) => {
        try {
            window.webkit.messageHandlers.iOSGetContacts.postMessage("")
        } catch (error) {
            androidCallback.upContact()
        }
    }
}