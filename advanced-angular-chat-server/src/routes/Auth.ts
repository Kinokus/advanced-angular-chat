import {Request, Response, Router} from 'express';
import UserDao from '@daos/User/UserDao.mock';
import {BAD_REQUEST, CREATED, OK, UNAUTHORIZED} from 'http-status-codes';
import {paramMissingError} from '@shared/constants';
import User, {IUser} from '@entities/User';
import logger from "@shared/Logger";

const router = Router();
const userDao = new UserDao();

router.post('/login', async (req: Request, res: Response) => {
    logger.info(`~~${req.body}`);
    const {login} = req.body;
    if (!login) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const dbUser: IUser | null = await userDao.getOne(login.email);
    if (login.email === dbUser?.email) {
        return res.status(OK).json({status: 'logged'});
    } else {
        return res.status(UNAUTHORIZED).json({status: 'access denied'});
    }
    // await userDao.addMessage(message);
    // return res.status(CREATED).end();
});

export default router;