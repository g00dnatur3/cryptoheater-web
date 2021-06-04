import assert from 'assert';
import { NextFunction, Request, Response, Router } from 'express';
import getLog from '../../../utils/log';
import HttpError from '../HttpError';

const log = getLog(__filename);
const router: Router = Router();

// router.post('/create-account', async (req: Request, res: Response, next: NextFunction) => {
//   log.info('/create-account', req.body)
//   try {
//     const {email, mobile, password} = req.body
//     assert(email || mobile, 'must provide either mobile or email')
//     assert(password, 'password is missing')
//     if (email) {
//       assert(isEmailValid(email), 'email is not valid')
//     }
//     assert(password.length > 7, 'password must be at least 8 characters')
//     if (mobile) {
//       assert(mobile.length > 10, 'mobile must be at least 11 characters')
//     }
//     const userExists = await KnexDao.userExists({email, mobile})
//     assert(!userExists, 'user already exists')
//     const user = new User()
//     user.email = email || undefined
//     user.mobile = mobile || undefined
//     user.password = password
//     const id = await KnexDao.insert(user)
//     console.log('insertUser.id:', id)
//     res.status(201).send({id})
//   }
//   catch (err) {
//     log.error(err)
//     return next(new HttpError(`Internal error: ${err.message || err}`, 500))
//   }
// })

export default router;
