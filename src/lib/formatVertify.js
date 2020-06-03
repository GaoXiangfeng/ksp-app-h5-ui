import { Toast } from 'vant';

export default {
    //格式验证--手机
    vertifyPhoneFormat(val) {
        if (!(/^[1-9][0-9]{8}$/.test(val))) {
            Toast('Format nomor ponsel salah, silakan masukkan kembali')
            return false
        } else {
            return true
        }
    },
    //格式验证--手机(还款)
    vertifyPhoneRepayFormat(val) {
        if (!(/^[1-9][0-9]{7,12}$/.test(val))) {
            Toast('Format nomor ponsel salah, silakan masukkan kembali')
            return false
        } else {
            return true
        }
    },
    //格式验证--电话
    vertifyTelFormat(val) {
        if (!(/^[1-9][0-9]{8,13}$/.test(val))) {
            Toast('Format nomor ponsel salah, silakan masukkan kembali')
            return false
        } else {
            return true
        }
    },
    //格式验证--电话
    vertifySameTelFormat(val1,val2) {
        if (val1 == val2) {
            Toast('Kedua nomor ponsel itu sama, silakan masukkan kembali')
            return false
        } else {
            return true
        }
    },

    //格式验证--密码
    vertifyPasswordFormat(val) {
        if (!(/^[a-zA-Z0-9]{6,10}$/.test(val))) {
            Toast('Huruf atau angka antara 6-10 karakter')
            return false
        } else {
            return true
        }
    },
    //格式验证--名字
    vertifyNameFormat(val) {
        if ((/[0-9_]+/.test(val))) {
            Toast('Format nama salah. Coba lagi')
            return false
        } else {
            return true
        }
    },
    //格式验证--邮箱
    vertifyEmailFormat(val) {
        if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val))) {
            Toast('Format email salah, silakan masukkan kembali！')
            return false
        } else {
            return true
        }
    },
    //格式验证--发薪日
    vertifyPayDayFormat(val) {
        if (!(/^\d+$/.test(val)) || parseFloat(val) > 31) {
            Toast('Format gajian salah, silakan masukkan kembali')
            return false
        } else {
            return true
        }
    },
    //格式验证--身份证
    vertifyIdFormat(val) {
        if (!(/^(\d{16})$/.test(val))) {
            Toast('Format kartu ID salah, silakan masukkan kembali')
            return false
        } else {
            return true
        }
    },
    //格式验证--银行账号
    vertifyBankAcountNoFormat(val) {
        if (!(/^[0-9]{1,16}$/.test(val))) {
            Toast('Format rekening bank salah, silakan masukkan kembali')
            return false
        } else {
            return true
        }
    },
    //订单id验证
    vertifyOrderIdFormat(val) {
        if (!val) {
            Toast('Harap kembali ke beranda untuk mendapatkan ID pesanan!')
            return false
        } else {
            return true
        }
    },
}