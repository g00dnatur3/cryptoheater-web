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

