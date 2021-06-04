
const axios = require('axios')


const isValidBtgAddress = async (address) => {

  const url = 'https://bitcoinhomie.com/api/isvalid_btg_address'
  

  const res = await axios.post(url, {address})
  console.log(res.data)

}

const isValidEthAddress = () => {

}


const btgAddress = 'btg1qkhe386460vz63g75j2twkp928303e3tup99qft'

isValidBtgAddress(btgAddress).catch(err => console.log(err))
