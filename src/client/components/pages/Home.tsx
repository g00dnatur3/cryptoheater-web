import React, { FC, useState, useEffect, useRef } from 'react';
import { headerStyle, contentStyle } from '../styles'
import { Alert, Spinner, Button } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {PayoutAddress} from '../core/PayoutAddress'
import {loadSettings, saveSettings} from '../../helpers/ApiHelper'

// tslint:disable-next-line: variable-name
export const Home: FC<{}> = () => {

  const [loading, setLoading] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState('BTG')
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [existingSettings, setExistingSettings] = useState(undefined)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [address, setAddress] = useState('')
  const payoutAddressRef = useRef();

  const getFavicon = () => {
    var favicon = undefined;
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++)
    {
        if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
        {
            favicon = nodeList[i].getAttribute("href");
        }
    }
    return favicon;        
}

  useEffect(() => {

    const favicon = getFavicon()
    console.log('favicon:', favicon)

    if (!existingSettings) {
      setLoading(true)
      loadSettings().then(val => {
        if (val) {
          if (val.walletAddress && val.coin) {
            setExistingSettings(val)
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

  const dropDown = () => (
    <div style={{marginTop: 20, textAlign: 'center'}}>
      <InputLabel style={{
        fontSize: screen.width > 600 ? 28 : 22,
        //border: '1px solid RED', 
        marginBottom: 10,
      }}
      >Choose Coin to Mine</InputLabel>
      <FormControl>
        <Select
          style={{
            //border: '1px solid RED',
            fontSize: screen.width > 600 ? 28 : 22
          }}
          native
          value={selectedCoin}
          onChange={(e) => {
            const newCoin = e.target.value.toString().trim()
            if (newCoin !== selectedCoin) {
              setSelectedCoin(newCoin)
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
        </Select>
      </FormControl>
    </div>
  )

  const settingsForm = () => {
    const onSaveClick = async () => {
      await saveSettings(address, selectedCoin)
      setSaveSuccess(true)
    }
    return (
      <div style={{
        //border: '1px solid RED',
      }}>
        {dropDown()}
        {selectedCoin ? 
        <div style={{marginTop: 20, textAlign: 'center'}}>
          <PayoutAddress ref={payoutAddressRef} onChange={(isvalid, address) => {
            setShowSaveButton(isvalid)
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
      //border: '1px solid GREEN',
      fontSize: 34,
      alignItems: 'center',
      justifyContent: 'center',
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
    paddingRight: '2.2%'
  }}>

    <div style={headerStyle}>
      <div style={{fontSize: screen.width > 600 ? 34 : 30}}><b>Crypto Settings</b></div>
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
        <div style={{ fontSize: 14, color: 'grey' }}>C R Y P T O H E A T E R</div>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>v1.0.0</div>
    </div>

  </div>)
}