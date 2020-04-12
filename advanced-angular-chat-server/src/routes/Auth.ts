import {Request, Response, Router} from 'express';
import UserDao from '@daos/User/UserDao.mock';
import {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED} from 'http-status-codes';
import {paramMissingError} from '@shared/constants';
import User, {IUser} from '@entities/User';
import logger from '@shared/Logger';

const router = Router();
const userDao = new UserDao();

class LoginResponse {
    status?: boolean;
    reason?: string;
    user?: User;
}

router.post('/login', async (req: Request, res: Response) => {
    const login = req.body;
    if (!login) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const dbUser: IUser | null = await userDao.getOne(login.email);


    // reasons : ENUM
    // return once

    const response: LoginResponse = {
        status: false,
    };
    let status = INTERNAL_SERVER_ERROR;

    if (login.email === dbUser?.email) {
        if (login.password === dbUser?.password) {
            status = OK;
            response.user = dbUser || undefined;
            response.status = true;
            // return res.status(OK).json({status: true, user: dbUser});
        } else {
            status = UNAUTHORIZED;
            response.status = false;
            response.reason = 'password incorrect'
            // return res.status(UNAUTHORIZED).json({status: false, reason: 'password incorrect'});
        }
    } else {
        status = UNAUTHORIZED;
        response.status = false;
        response.reason = 'user not found'
        // return res.status(UNAUTHORIZED).json({status: false, reason: 'something else'});
    }

    // await userDao.addMessage(message);
    return res.status(status).json(response);
});

export default router;