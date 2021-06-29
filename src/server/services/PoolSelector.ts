const util = require('util');
const _exec = util.promisify(require('child_process').exec);

export const exec = async (cmd: any) => {
  console.log(' > exec:', cmd)
  const { stdout, stderr } = await _exec(cmd)
  if (stderr && stderr.trim().length) {
    throw Error(stderr)
  }
  return stdout
}

const POOLS: any = {

  BTG_miningfool: [
    'btg.miningfool.com:3857'
  ],

  BTG_2miners: [
    'btg.2miners.com:4040',
    'us-btg.2miners.com:4040',
    'asia-btg.2miners.com:4040'
  ],

  BTG_coinfoundry: [
    'pool.coinfoundry.org:3064'
  ],

  ETH_2miners: [
    'eth.2miners.com:2020',
    'us-eth.2miners.com:2020',
    'asia-eth.2miners.com:2020'
  ],

  ETC_2miners: [
    'etc.2miners.com:1010',
    'us-etc.2miners.com:1010',
    'asia-etc.2miners.com:1010'
  ],

  ETH_ethermine: [
    'asia1.ethermine.org:4444',
    'eu1.ethermine.org:4444',
    'us1.ethermine.org:4444',
    'us2.ethermine.org:4444'
  ],

  ETC_ethermine: [
    'asia1-etc.ethermine.org:4444',
    'eu1-etc.ethermine.org:4444',
    'us1-etc.ethermine.org:4444'
  ],

  RVN_2miners: [
    'rvn.2miners.com:6160',
    'us-rvn.2miners.com:6060',
    'asia-rvn.2miners.com:6060'
  ],

  RVN_flypool: [
    'stratum-ravencoin.flypool.org:3333'
  ],

  ETC_nanopool: [
    'etc-eu1.nanopool.org:19999',
    'etc-eu2.nanopool.org:19999',
    'etc-us-east1.nanopool.org:19999',
    'etc-us-west1.nanopool.org:19999',
    'etc-asia1.nanopool.org:19999',
    'etc-jp1.nanopool.org:19999',
    'etc-au1.nanopool.org:19999'   
  ],

  ETH_nanopool: [
    'eth-eu1.nanopool.org:9999',
    'eth-eu2.nanopool.org:9999',
    'eth-us-east1.nanopool.org:9999',
    'eth-us-west1.nanopool.org:9999',
    'eth-asia1.nanopool.org:9999',
    'eth-jp1.nanopool.org:9999',
    'eth-au1.nanopool.org:9999'   
  ],

  RVN_nanopool: [
    'rvn-eu1.nanopool.org:12222',
    'rvn-eu2.nanopool.org:12222',
    'rvn-us-east1.nanopool.org:12222',
    'rvn-us-west1.nanopool.org:12222',
    'rvn-asia1.nanopool.org:12222',
    'rvn-jp1.nanopool.org:12222',
    'rvn-au1.nanopool.org:12222'   
  ],

  // BEAM_2miners: [
  //   'beam.2miners.com:5252',
  //   'us-beam.2miners.com:5252',
  //   'asia-beam.2miners.com:5252'
  // ],

  // BEAM_leafpool: [
  //   'beam-us.leafpool.com:4444',
  //   'beam-eu.leafpool.com:4444',
  //   'beam-asia.leafpool.com:4444'
  // ]

}

// type Key = 'ETC_nanopool' 
//   | 'RVN_flypool' 
//   | 'RVN_2miners' 
//   | 'ETC_ethermine' 
//   | 'ETC_2miners' 
//   | 'ETH_2miners' 
//   | 'BTG_2miners' 
//   | 'BTG_miningfool'

function reverseString(str) {
  return str.split("").reverse().join("");
}

class PoolSelector {

  static async _select(key: any) {
    const pools = POOLS[key]

    if (!pools) {
      console.log(`ERROR: POOLS[${key}] not found`)
      return null
    }

    if (pools.length === 1) {
      return pools[0]
    }

    let result;
    for (const pool of pools) {
      const server = pool.split(':')[0]
      const ping = await exec(`ping -c1 ${server}`)
      if (ping.includes('time=')) {
        const idx = ping.indexOf('time=')
        const blah = ping.substring(idx)
        const value = parseInt(blah.split(' ')[0].replace('time=', ''))
        if (result) {
          if (value < result.value) {
            result = {value, pool}
          }
        } else {
          result = {value, pool}
        }
      }
    }
    if (!result) {
      return pools[0]
    } else {
      return result.pool
    }
  }

  static async selectPool(settings: any) {
    const {pool, coin} = settings
    const host = pool.split(':')[0]
    const name = reverseString(reverseString(host).split('.')[1])
    const key = `${coin}_${name}`
    return await PoolSelector._select(key)
  }

}

export const selectPool = PoolSelector.selectPool

export default PoolSelector
