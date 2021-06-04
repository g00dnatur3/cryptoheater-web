import axios from 'axios';

export const isValidEthAddress = async (address: string) => {
  console.log('ApiHelper.isValidEthAddress', address)
  const res = await axios.post('/api/isvalid_eth_address', {address})
  return res ? res.data : res;
}

export const isValidBtgAddress = async (address: string) => {
  console.log('ApiHelper.isValidBtgAddress', address)
  const res = await axios.post('/api/isvalid_btg_address', {address})
  return res ? res.data : res;
}

export const saveSettings = async (walletAddress: string, coin: string) => {
  console.log('ApiHelper.saveSettings', walletAddress)
  const res = await axios.post('/api/save', {walletAddress, coin})
  return res ? res.data : res;
}


export const loadSettings = async () => {
  console.log('ApiHelper.loadSettings')
  const res = await axios.get('/api/load')
  return res ? res.data : res;
}

