import { Router } from 'express';
import { AdminModel } from '../models/adminModel';
import jwt from 'jsonwebtoken';
import config from '../../config.json';
import bcrypt from 'bcrypt';

const adminAuthRouter = Router();

adminAuthRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    AdminModel.findOne({
        username: username
    }).then((doc) => {
        if(!doc) {
            return res.sendStatus(403);
        }

        bcrypt.compare(password, doc.password, (err, same) => {
            if(err) return res.sendStatus(500);
            if(!same) return res.sendStatus(403);

            const token = jwt.sign({
                adminAllowAccess: 1
            }, config.adminTokenSecret, {
                expiresIn: '7d'
            });

            const oneWeek = 7 * 24 * 3600 * 1000;
            return res.status(200).cookie("adminToken", token, {
                expires: new Date(Date.now() + oneWeek)
            }).end();
        });
    }).catch((err) => {
        console.log(err.message);
        return res.sendStatus(500);
    });
});

export { adminAuthRouter };