const axios = require('axios')
const keccak256 = require('js-sha3').keccak256;

export const isValidBtgAddress = async (address) => {
  // const url = 'https://bitcoinhomie.com/api/isvalid_btg_address'
  // const res = await axios.post(url, {address})
  // return res.data.isvalid || false
  return true;
}

//https://minerstat.com/wallet-address-validator/beam

export const isValidBeamAddress = async (address) => {

  // const formData = new FormData();
  // formData.append('check', address);
  // const config = {
  //   method: 'post',
  //   url: 'https://minerstat.com/wallet-address-validator/beam',
  //   data: formData,
  //   headers: { "Content-Type": "multipart/form-data" },
  // }
  // const res = await axios.post(config)
  // return res.data.isvalid || false

  return true
}

export const isValidRvnAddress = async (address) => {
  //console.log('isValidRvnAddress:', address)
  const url = `https://ravencoin.network/api/addr/${address}/?noTxList=1`
  try {
    //console.log('url:', url)
    await axios.get(url)
    //console.log('return true')
    return true
  } catch (err) {
    //console.log(err)
    return false
  }
}

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isEthAddress = function (address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // check if it has the basic requirements of an address
      return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      // If it's all small caps or all all caps, return true
      return true;
  } else {
      // Otherwise check each case
      return isChecksumAddress(address);
  }
};

/**
* Checks if the given string is a checksummed address
*
* @method isChecksumAddress
* @param {String} address the given HEX adress
* @return {Boolean}
*/
var isChecksumAddress = function (address) {
  // Check each case
  address = address.replace('0x','');
  var addressHash = keccak256(address.toLowerCase());
  for (var i = 0; i < 40; i++ ) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
          return false;
      }
  }
  return true;
};

export const isValidEthAddress = async (address) => {
  return Promise.resolve(isEthAddress(address))
}


export default {
  isValidBtgAddress,
  isValidEthAddress
}
