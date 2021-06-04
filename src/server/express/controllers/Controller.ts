import assert from 'assert';
import { NextFunction, Request, Response, Router } from 'express';
import getLog from '../../../utils/log';
import HttpError from '../HttpError';
import {isValidBtgAddress, isValidEthAddress} from '../../services/isValidAddress'

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

export default router;
