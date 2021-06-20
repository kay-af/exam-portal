import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import config from '../../config.json';

const adminAuthenticator = (req, res, next) => {
    const token = req.cookies.adminToken;

    if(!token) return res.sendStatus(401);

    jwt.verify(token, config.adminTokenSecret, (err, decoded) => {
        if(err) {
            console.log(err.message);
            return res.sendStatus(401);
        }

        if(decoded.adminAllowAccess === 1)
            next();
        else
            res.sendStatus(401);
    });
};

export { adminAuthenticator };