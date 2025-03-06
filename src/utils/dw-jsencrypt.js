import {JSEncrypt} from 'jsencrypt'

// 公钥
const dwRsaPublicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZa8JYF1Fqq+k8Jti522Xdc9hWZYwM/8N5wjpgshC4CQvsj9r+w7A6XDGrcqvNzmYckM7H' +
  'kBeqZn03Yr9cMWglnyYZbU5Z4HdFfjWI5wuE+7PVDgadVtbR5IR5fiorPh3SW8lDedMBP/3ucHgOWFHgx8v54vzXtEbM6PklKfF+EwIDAQAB'

// 私钥
const dwRsaPrivateKey = ''

export default {
  // 加密用公钥
  dwGetCode (password) {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(dwRsaPublicKey)
    const data = encrypt.encrypt(password)
    return data
  },
  // 解密用私钥
  dwDecryptCode (password) {
    const encrypt = new JSEncrypt()
    encrypt.setPrivateKey(dwRsaPrivateKey)
    const data = encrypt.decrypt(password)
    return data
  }
}
