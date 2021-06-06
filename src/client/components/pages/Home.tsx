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
  const [existingSettings, setExistingSettings] = useState(undefined)

  useEffect(() => {
    if (!existingSettings) {
      setLoading(true)
      loadSettings().then(val => {
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
        <Button style={{padding: 15, width: 250, height: 80}} color="primary" size="lg">See Mining Stats</Button>
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
        <div style={{ fontSize: 14, color: 'grey' }}>C R Y P T O H E A T E R</div>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>v1.0.0</div>
    </div>

  </div>)
}