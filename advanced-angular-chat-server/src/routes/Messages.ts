import {Request, Response, Router} from 'express';
import {BAD_REQUEST, CREATED, OK} from 'http-status-codes';
import {ParamsDictionary} from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import {paramMissingError} from '@shared/constants';

// Init shared
const router = Router();
const userDao = new UserDao();


/******************************************************************************
 *                      Get All Users - "GET /api/messages/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const messages = await userDao.getAllMessages();
    return res.status(OK).json(messages);
});

/******************************************************************************
 *                      Get All Users - "GET /api/messages/all"
 ******************************************************************************/

router.get('/latest/:count', async (req: Request, res: Response) => {
    const {count} = req.params as ParamsDictionary;
    const messages = await userDao.getLatestMessages(count);
    return res.status(OK).json(messages);
});


/******************************************************************************
 *                       Add One - "POST /api/messages/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const message = req.body;
    if (!message) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.addMessage(message);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/messages/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const {user} = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/messages/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const {id} = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
