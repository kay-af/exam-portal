import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config.json';
import { StudentModel } from '../models/studentModel'

const studentAuthController = {
    login: (req, res) => {

        const { email, password } = req.body;

        StudentModel.findOne({
            email: email
        }).then((doc) => {
            if (doc === null) return res.status(404).json({
                'error': 'UNKNOWN_USER'
            });

            const passwordHash = doc.password;

            bcrypt.compare(password, passwordHash, (err, same) => {
                if (err) {
                    console.log(err.message);
                    return res.sendStatus(500);
                }

                if (!same) return res.status(401).json({
                    'error': 'PASSWORD_MISMATCH'
                });

                const token = jwt.sign({
                    userId: doc._id
                }, config.accessTokenSecret, {
                    expiresIn: '7d'
                });

                const oneWeek = 7 * 24 * 3600 * 1000;
                return res.status(200).cookie("accessToken", token, {
                    expires: new Date(Date.now() + oneWeek)
                }).end();
            });
        }).catch((err) => {
            console.log(err.message);
            return res.sendStatus(500);
        })
    },
    createAccount: (req, res) => {

        const { firstName, lastName, email, password } = req.body;

        bcrypt.hash(password, 10, (err, encrypted) => {
            if (err) return res.sendStatus(500);

            StudentModel.create({
                name: {
                    firstName: firstName,
                    lastName: lastName,
                },
                email: email,
                password: encrypted
            }, (err, _) => {
                if (err) {
                    if (err.code === 11000) {
                        return res.status(400).json({
                            'error': 'DUPLICATE',
                            'elements': Object.keys(err.keyPattern)
                        });
                    }
                    return res.sendStatus(500);
                }

                return res.sendStatus(201);
            });
        });
    }
}

export { studentAuthController }