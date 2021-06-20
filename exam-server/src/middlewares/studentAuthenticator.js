import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import config from '../../config.json';

const studentAuthenticator = (req, res, next) => {
    const token = req.cookies.accessToken;

    if(!token) return res.sendStatus(401);

    jwt.verify(token, config.accessTokenSecret, (err, decoded) => {
        if(err) {
            console.log(err.message);
            return res.status(401);
        }

        req.auth = { userId: decoded.userId }
        next();
    });
};

export { studentAuthenticator };