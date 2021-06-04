import React, { FC, useState, useEffect } from 'react';
import { headerStyle, contentStyle } from '../styles'
import { Alert, Spinner, Button } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {PayoutAddress} from '../core/PayoutAddress'

// tslint:disable-next-line: variable-name
export const Home: FC<{}> = () => {

  const [loading, setLoading] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState('BTG')
  const [showSaveButton, setShowSaveButton] = useState(false)

  useEffect(() => {

  }, [])

  const loadingDiv = () => (
    <Spinner color="primary" style={{ width: '5rem', height: '5rem' }} type="grow" />
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
            setSelectedCoin(e.target.value.toString().trim())
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
    return (
      <div style={{
        //border: '1px solid RED',
      }}>
        {dropDown()}
        {selectedCoin ? 
        <div style={{marginTop: 20, textAlign: 'center'}}>
          <PayoutAddress onChange={isvalid => setShowSaveButton(isvalid)} coin={selectedCoin} />
          <Button disabled={!showSaveButton} style={{marginTop: 25}} size="lg" color="primary">Save</Button>
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
      {
        !loading ? settingsForm() : loadingDiv()
      }
    </div>
  )

  return (<div style={{
    paddingLeft: '2.2%',
    paddingRight: '2.2%'
  }}>

    <div style={headerStyle}>
      <div style={{fontSize: screen.width > 600 ? 34 : 30}}><b>Crypto Settings</b></div>
    </div>

    {contentDiv()}

    <div style={{
      //border: '1px solid BLUE',
      height: screen.height * 0.1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ fontSize: 14, color: 'grey' }}>C R Y P T O H E A T E R</div>
      <div style={{ fontSize: 14, color: 'grey' }}>v1.0.0</div>
    </div>

  </div>)
}