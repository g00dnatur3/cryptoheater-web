import axios from 'axios';
import hash from 'hash.js';
import assert from 'assert';

export const search = async (text: string, webSocketId: string) => {
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.search', text, webSocketId)
  const res = await axios.post('/api/video/search', {text, webSocketId})
  return res ? res.data : res;
}

export const abort = async (webSocketId: string) => {
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.abort')
  const res = await axios.post('/api/video/abort', {webSocketId})
  return res ? res.data : res;
}

export const createAccount = async (data:{mobile?: string, email?: string, password: string}) => {
  data.password = hash.sha256().update(data.password).digest('hex')
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.createAccount', data)
  const res = await axios.post('/api/user/create-account', data)
  return res ? res.data : res;
}

export const updatePassword = async (data:{userId: number, isEmail: boolean, isMobile: boolean, password: string, code: string}) => {
  data.password = hash.sha256().update(data.password).digest('hex')
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.updatePassword', data)
  const res = await axios.post('/api/user/update-password', data)
  return res ? res.data : res;
}

export const getUser = async (data: {userId?: number, email?: string, mobile?: string}) => {
  const {email, mobile, userId} = data
  assert(email || mobile || userId, 'must provide mobile or email or userId')
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.getUser', data)
  const res = await axios.post('/api/user/get-user', data)
  return res ? res.data : res;
}

export const sendVerification = async (data: {userId: number, isMobile: boolean, isEmail: boolean, template?: 'create-account' | 'reset-password'}) => {
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.sendVerification', data)
  const res = await axios.post('/api/user/send-verification', data)
  return res ? res.data : res;
}

export const verifyCode = async (data: {userId: number, code: string, isMobile: boolean, isEmail: boolean}) => {
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.verifyCode', data)
  const res = await axios.post('/api/user/verify-code', data)
  return res ? res.data : res;
}

export const signIn = async (data: {email, mobile, password}) => {
  data.password = hash.sha256().update(data.password).digest('hex')
  // tslint:disable-next-line:no-console
  console.log('ApiHelper.signIn', data)
  const res = await axios.post('/api/user/signin', data)
  return res ? res.data : res;
}

// export const getDownloadUrl = (id: String, clientId) => `/api/download?id=${id}&clientId=${clientId}`
