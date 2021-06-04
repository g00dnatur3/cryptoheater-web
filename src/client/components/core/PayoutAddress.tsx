import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import BaseStyle from '../style/BaseStyle';
import CoinImages from '../images/CoinImages';
import {isValidBtgAddress, isValidEthAddress} from '../../helpers/ApiHelper'

interface Props {
  style?: React.CSSProperties
  coin: string,
  onChange: (isvalid: boolean) => void
}

const style = new BaseStyle();

export const PayoutAddress: FC<Props> = (props) => {

  const coinImage = CoinImages[props.coin].small

  const [pristine, setPristine] = useState(true)
  const [isValidAddress, _setIsValidAddress] = useState(false)
  const [address, setAddress] = useState('')

  const setIsValidAddress = (isvalid) => {

    console.log('setIsValidAddress:', isvalid)

    _setIsValidAddress(isvalid)
    props.onChange(isvalid)
  }

  console.log('isValidAddress:', isValidAddress)
  console.log('pristine:', pristine)

  let helperText = '';
  const error = !pristine && !isValidAddress
  if (error) {
    helperText = `invalid ${props.coin} address`
  }

  const itemStyle = {
    //border: '1px solid BLACK',
    height: 120,
    width: '100%',
    justifyContent: 'center',
  }

  return (
    <Grid container item xs={12} sm={12} style={itemStyle}>

      <div style={{
        ...style.centerRow,
        border: '1px solid BLACK',
        borderRadius: 10,
        width: '100%',
        // marginLeft: '4%',
        // marginRight: '4%',
        // marginBottom: '2%',
        justifyContent: 'flex-start',
        maxWidth: 520
      }}>

        <div style={{
          ...style.centerRow,
          // paddingLeft: 15,
          //border: '1px solid RED',
          width: '100%',
          paddingLeft: '5%'
        }}>

        <img style={{
          width: 32, 
          height: 32,
          // border: '1px solid RED',
          marginTop: 14,
          marginRight: 5
        }} src={coinImage}/>

        <TextField
          error={error}
          style={{width: '90%', paddingRight: 30}}
          inputProps={{style: {fontSize: screen.width > 600 ? 28 : 22, border: '0px solid RED', height: 35}}}
          InputLabelProps={{style: {fontSize: screen.width > 600 ? 22 : 22}}}
          label={`${props.coin} Wallet Address`}
          margin="none"
          value={address}
          onChange={e => {
            const value = e.target.value ? e.target.value.trim() : ''
            ;(async () => {
              try {
                console.log('setAddress')
                setAddress(value)
                if (value.length > 25) {
                  if (props.coin === "BTG") {
                    const {isvalid} = await isValidBtgAddress(value)
                    console.log('isValidBtgAddress:', isvalid)
                    setIsValidAddress(isvalid)
                  }
                  else if (props.coin === "ETH") {
                    const {isvalid} = await isValidEthAddress(value)
                    console.log('isValidEthAddress:', isvalid)
                    setIsValidAddress(isvalid)
                  } else {
                    setIsValidAddress(false)
                  }
                  setPristine(false)
                } else {
                  if (value.length > 0) {
                    setIsValidAddress(false)
                  }
                  setPristine(value.length === 0)
                }
              } catch (err) {
                console.log(err)
              }
            })()
              .catch(err => console.log(err))
          }}
          helperText={helperText}
        />
        </div>

      </div>

    </Grid>
  )

}

export default PayoutAddress