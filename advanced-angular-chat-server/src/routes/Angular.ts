import {Request, Response, Router} from 'express';
import {BAD_REQUEST, CREATED, OK} from 'http-status-codes';
import {ParamsDictionary} from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import {paramMissingError} from '@shared/constants';

// Init shared
const router = Router();

router.get('/', async () => {
    return ''
});
router.get('', async () => {
    return '';
});

export default router;