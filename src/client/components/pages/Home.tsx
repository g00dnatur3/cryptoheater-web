import React, { FC, useState, useEffect, useRef } from 'react';
import { headerStyle, contentStyle } from '../styles'
import { Alert, Spinner, Button } from 'reactstrap';
import {loadSettings, saveSettings} from '../../helpers/ApiHelper'
import { Pool } from '@material-ui/icons';

// tslint:disable-next-line: variable-name
export const Home: FC<{}> = () => {

  const [loading, setLoading] = useState(false)
  const [existingSettings, setExistingSettings] = useState(undefined)

  const LINKS = {
    BTG_miningfool: 'https://btg.miningfool.com/miner/@walletAddress',
    BTG_2miners: 'https://btg.2miners.com/account/@walletAddress',
    ETH_2miners: 'https://eth.2miners.com/account/@walletAddress',
    ETC_2miners: 'https://etc.2miners.com/account/@walletAddress',
    ETH_ethermine: 'https://ethermine.org/miners/@walletAddress/dashboard',
    ETC_ethermine: 'https://etc.ethermine.org/miners/@walletAddress/dashboard',
    RVN_2miners: 'https://rvn.2miners.com/account/@walletAddress',
    RVN_flypool: 'https://ravencoin.flypool.org/miners/@walletAddress/dashboard',
    ETC_nanopool: 'https://etc.nanopool.org/account/@walletAddress'
  }

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  const getMiningStatsLink = (settings) => {
    const {pool, coin, walletAddress} = settings
    const host = pool.split(':')[0]
    const name = reverseString(reverseString(host).split('.')[1])
    const key = `${coin}_${name}`
    if (LINKS[key]) {
      return LINKS[key].replace('@walletAddress', walletAddress)
    }
  }

  useEffect(() => {
    if (!existingSettings) {
      setLoading(true)
      loadSettings().then(val => {
        console.log('loaded-settings:', val)
        if (val) {
          if (val.walletAddress && val.coin) {
            setExistingSettings(val)
          } else {
            window.location.href = '/crypto-settings'
          }
        } else {
          window.location.href = '/crypto-settings'
        }
        setLoading(false)
      }).catch(err => {
        setExistingSettings({})
        setLoading(false)
        console.log(err)
        window.location.href = '/crypto-settings'
      })
    }
  }, [])

  const loadingDiv = () => (
    <div style={contentStyle}>
      <Spinner color="primary" style={{ width: '5rem', height: '5rem' }} type="grow" />
    </div>
  )

  const contentDiv = () => (
    <div style={{
      ...contentStyle,
      flexDirection: 'column',
      //border: '1px solid GREEN',
      fontSize: 40,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 550
    }}>

      <div style={{
        border: '0px solid black',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        textAlign: 'center'
      }}>
        <Button 
          onClick={() => {
            window.location.href = '/crypto-settings'
          }}
          style={{padding: 15, width: 250, height: 80}} color="primary" size="lg">Edit Crypto Settings</Button>
      </div>


      <div style={{
        padding: 15,
        borderRadius: 10,
        border: '0px solid black',
        marginBottom: 20,
        textAlign: 'center'
      }}>
        <Button 
          onClick={() => window.location.href = getMiningStatsLink(existingSettings)}
          disabled={!existingSettings} style={{padding: 15, width: 250, height: 80}} color="primary" size="lg">See Mining Stats</Button>
      </div>


    </div>
  )

  return (<div style={{
    paddingLeft: '2.2%',
    paddingRight: '2.2%',
    backgroundColor: 'IVORY'
  }}>

    <div style={headerStyle}>
      <div style={{fontSize: screen.width > 600 ? 34 : 30}}><b>Crypto Info</b></div>
    </div>

    {loading ? loadingDiv() : contentDiv()}

    <div style={{
      //border: '1px solid BLUE',
      height: screen.height * 0.1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <img src="/favicon.ico" style={{paddingRight: 2, width: 20, height: 20, marginBottom: 5}} />
        <div style={{ fontSize: 14, color: 'grey' }}>C R Y P T O H E A T E R . I O</div>
      </div>
      <div style={{ fontSize: 12, color: 'grey' }}>v1.0.0</div>
    </div>

  </div>)
}