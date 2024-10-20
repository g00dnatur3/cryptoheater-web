import React, { FC, useState, useEffect, useRef } from 'react';
import { headerStyle, contentStyle } from '../styles'
import { Alert, Spinner, Button } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {PayoutAddress} from '../core/PayoutAddress'
import {loadSettings, saveSettings} from '../../helpers/ApiHelper'

const MINING_POOLS = {
  BTG: [
    {name: 'zhash.pro', value: 'us1.zhash.pro:5059'},
    {name: '2miners.com', value: 'us-btg.2miners.com:4040'},
  ],
  ETH: [
    {name: '2miners.com', value: 'us-eth.2miners.com:2020'},
    {name: 'Ethermine.org', value: 'us2.ethermine.org:4444'},
    {name: 'Nanopool.org', value: 'eth-us-west1.nanopool.org:9999'},
  ],
  ETC: [
    {name: 'Ethermine.org', value: 'us1-etc.ethermine.org:4444'},
    {name: 'Nanopool.org', value: 'etc-us-west1.nanopool.org:19999'},
    {name: '2miners.com', value: 'us-etc.2miners.com:1010'},
  ],
  RVN: [
    {name: '2miners.com', value: 'us-rvn.2miners.com:6060'},
    {name: 'Flypool.org', value: 'stratum-ravencoin.flypool.org:3333'},
    {name: 'Nanopool.org', value: 'rvn-us-west1.nanopool.org:12222'},
  ],
  BEAM: [
    {name: 'beam.leafpool.com', value: 'beam-us.leafpool.com:4444'},
    {name: '2miners.com', value: 'us-beam.2miners.com:5252'},
    {name: 'Flypool.org', value: 'us1-beam.flypool.org:3333'},
  ]
}

// tslint:disable-next-line: variable-name
export const CryptoSettings: FC<{}> = () => {

  const [loading, setLoading] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState('BTG')
  const [selectedPool, setSelectedPool] = useState(MINING_POOLS['BTG'][0].value)
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [existingSettings, setExistingSettings] = useState(undefined)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [address, setAddress] = useState('')
  const payoutAddressRef = useRef();

  useEffect(() => {
    if (!existingSettings) {
      setLoading(true)
      loadSettings().then(val => {
        console.log('loaded settings:', val)
        if (val) {
          if (val.walletAddress && val.coin && val.pool) {
            console.log('GOT HERE :)')
            setExistingSettings(val)
            setSelectedCoin(val.coin)
            setAddress(val.walletAddress)
            setSelectedPool(val.pool)
            setShowSaveButton(true)
          }
        } else {
          setExistingSettings({})
        }
        setLoading(false)
      }).catch(err => {
        setExistingSettings({})
        setLoading(false)
        console.log(err)
      })
    }
  }, [])

  const loadingDiv = () => (
    <div style={contentStyle}>
      <Spinner color="primary" style={{ width: '5rem', height: '5rem' }} type="grow" />
    </div>
  )

  const getMiningPoolOptions = (coin) => (
    <React.Fragment>
      {MINING_POOLS[coin].map(opt => <option key={opt.name} value={opt.value}>{opt.name}</option>)}
    </React.Fragment>
  )

  const miningPoolDropDown = () => (
    <div style={{marginTop: 20, textAlign: 'center', border: '0px solid RED'}}>
      <InputLabel style={{
        fontSize: screen.width > 600 ? 26 : 20,
        //border: '1px solid RED', 
        marginBottom: 10,
      }}
      >Choose Mining Pool</InputLabel>
      <FormControl>
        <Select
          style={{
            //border: '1px solid RED',
            fontSize: screen.width > 600 ? 26 : 20
          }}
          native
          value={selectedPool}
          onChange={(e) => {
            const newPool = e.target.value.toString().trim()
            if (selectedPool !== newPool) {
              setSelectedPool(newPool)
            }
          }}
          inputProps={{
            name: 'coin',
            id: 'coin-select',
          }}
        >
          {getMiningPoolOptions(selectedCoin)}
        </Select>
      </FormControl>
    </div>
  )

  const coinDropDown = () => (
    <div style={{marginTop: 10, textAlign: 'center', border: '0px solid RED'}}>
      <InputLabel style={{
        fontSize: screen.width > 600 ? 26 : 20,
        //border: '1px solid RED', 
        marginBottom: 10,
      }}
      >Choose Coin to Mine</InputLabel>
      <FormControl>
        <Select
          style={{
            //border: '1px solid RED',
            fontSize: screen.width > 600 ? 26 : 20
          }}
          native
          value={selectedCoin}
          onChange={(e) => {
            const newCoin = e.target.value.toString().trim()
            if (newCoin !== selectedCoin) {
              setSelectedCoin(newCoin)
              setSelectedPool(MINING_POOLS[newCoin][0].value)
              setAddress('')
              setShowSaveButton(false)
              payoutAddressRef.current.clearAddress()
            }
          }}
          inputProps={{
            name: 'coin',
            id: 'coin-select',
          }}
        >
          <option value="BTG">BTG (BitcoinGold)</option>
          <option value="ETH">ETH (Ethereum)</option>
          <option value="ETC">ETC (Ethereum Classic)</option>
          <option value="RVN">RVN (Ravencoin)</option>
          <option value="BEAM">BEAM (Beam)</option>
        </Select>
      </FormControl>
    </div>
  )

  const settingsForm = () => {
    const onSaveClick = async () => {
      await saveSettings(address, selectedCoin, selectedPool)
      setSaveSuccess(true)
      setTimeout(() => {
        window.location.href = '/home'
      }, 2000)
    }
    return (
      <div style={{
        //border: '1px solid RED',
      }}>
        {coinDropDown()}
        {miningPoolDropDown()}
        {selectedCoin ? 
        <div style={{marginTop: 20, textAlign: 'center'}}>
          <PayoutAddress existingAddress={existingSettings ? existingSettings.walletAddress : ' '} ref={payoutAddressRef} onChange={(isvalid, address) => {
            setShowSaveButton(true)
            setAddress(address)
          }} coin={selectedCoin} />
          <Button onClick={onSaveClick} disabled={!showSaveButton} style={{marginTop: 25}} size="lg" color="primary">Save</Button>
        </div>
        : null}
      </div>
    )
  }

  const contentDiv = () => (
    <div style={{
      ...contentStyle,
      flexDirection: 'column',
      //border: '3px solid GREEN',
      fontSize: 34,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 420
    }}>
      {settingsForm()}
    </div>
  )

  const successDiv = () => (
    <div style={contentStyle}>
      <Alert style={{fontSize: screen.width > 600 ? 22 : 18}} color="success">Crypto Settings Saved &nbsp; ✅</Alert>
    </div>
  )

  return (<div style={{
    paddingLeft: '2.2%',
    paddingRight: '2.2%',
    backgroundColor: 'IVORY'
  }}>

    <div style={headerStyle}>
      <div style={{fontSize: screen.width > 600 ? 38 : 32}}><b>Crypto Settings</b></div>
    </div>

    {saveSuccess ? successDiv() : loading ? loadingDiv() : contentDiv()}

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