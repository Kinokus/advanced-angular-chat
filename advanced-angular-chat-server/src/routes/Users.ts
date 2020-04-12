import {Request, Response, Router} from 'express';
import {BAD_REQUEST, CREATED, IM_A_TEAPOT, OK} from 'http-status-codes';
import {ParamsDictionary} from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import {paramMissingError, userExist} from '@shared/constants';
import User from "@entities/User";
import logger from "@shared/Logger";

// Init shared
const router = Router();
const userDao = new UserDao();


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    // const users = await userDao.getAll();
    const users = await userDao.getAll();
    return res.status(OK).json(users);
    // return res.status(OK).json({users});
});


/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const user: User = req.body;

    const currentUser = await userDao.getOne(user.email);

    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    if (!!currentUser) {
        return res.status(IM_A_TEAPOT).json({
            status: false,
            error: userExist
        });
    }

    await userDao.add(user);
    return res.status(CREATED).json({
        status: true,
        user
    }).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
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
 *                    Delete - "DELETE /api/users/delete/:id"
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
