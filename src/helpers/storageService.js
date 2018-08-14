import CryptoJS from 'crypto-js'
const secret = 'xxxxxx'

export default {
  set (name, value) {
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secret)
    localStorage.setItem(name, encrypted)
  },
  get (name) {
    let encrypted = localStorage.getItem(name)
    if (!encrypted) {
      return ''
    }
    let bytes = CryptoJS.AES.decrypt(encrypted.toString(), secret)
    let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decrypted
  },
  delete (name) {
    localStorage.removeItem(name)
  },
  deleteAll () {
    localStorage.clear()
  }
}
