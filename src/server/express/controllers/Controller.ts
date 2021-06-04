import assert from 'assert';
import { NextFunction, Request, Response, Router } from 'express';
import getLog from '../../../utils/log';
import HttpError from '../HttpError';
import {isValidBtgAddress, isValidEthAddress} from '../../services/isValidAddress'
import {
  saveSettings,
  loadSettings
} from '../../services/settings'

const log = getLog(__filename);
const router: Router = Router();

router.post('/isvalid_eth_address', async (req: Request, res: Response, next: NextFunction) => {
  log.info('/isvalid_eth_address body', req.body)
  try {
    assert(req.body.address, 'address is missing')
    const isvalid = await isValidEthAddress(req.body.address)
    res.status(200).send({isvalid})
  }
  catch (err) {
    log.error(err)
    return next(new HttpError(`Internal error: ${err.message || err}`, 500))
  }
})

router.post('/isvalid_btg_address', async (req: Request, res: Response, next: NextFunction) => {
  log.info('/isvalid_btg_address body', req.body)
  try {
    assert(req.body.address, 'address is missing')
    const isvalid = await isValidBtgAddress(req.body.address)
    res.status(200).send({isvalid})
  }
  catch (err) {
    log.error(err)
    return next(new HttpError(`Internal error: ${err.message || err}`, 500))
  }
})

router.get('/load', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await loadSettings()
    res.status(200).send(settings || {})
  }
  catch (err) {
    log.error(err)
    return next(new HttpError(`Internal error: ${err.message || err}`, 500))
  }
})

router.post('/save', async (req: Request, res: Response, next: NextFunction) => {
  log.info('/save body', req.body)
  try {
    const {walletAddress, coin} = req.body
    assert(walletAddress, 'walletAddress is missing')
    assert(coin, 'coin is missing')
    await saveSettings({walletAddress, coin})
    res.status(200).send()
  }
  catch (err) {
    log.error(err)
    return next(new HttpError(`Internal error: ${err.message || err}`, 500))
  }
})

export default router;
