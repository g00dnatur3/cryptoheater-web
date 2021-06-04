import {NextFunction, Request, Response} from 'express';
import getLog from '../../../utils/log';

const log = getLog(__filename);

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status: number = parseInt(err.status) || 500;
  const _err = { error: err.message, stack: undefined };
  if (err.stack) {
    _err.stack = err.stack;
    log.error(new Array(20).join('----'));
    log.error(_err.stack);
    log.error(new Array(20).join('----'));
  }
  res.status(status).send(_err);
};

export default errorHandler;
