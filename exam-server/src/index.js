import express, { response } from 'express';
import mongoose, { mongo } from 'mongoose';
import { appRouter } from './routers/appRouter';
import config from '../config.json';
import { AdminModel } from './models/adminModel';
import bcrypt from 'bcrypt';

const app = express()
app.use(appRouter)

const defineAdmin = () => {
    return new Promise((resolve, reject) => {
        AdminModel.estimatedDocumentCount().then((docCount) => {
            if (docCount > 0) return resolve(true);
            else {
                console.log("Admin not defined! Defining Admin!");
                bcrypt.hash(config.defaultAdmin.password, 10, (err, encrypted) => {
                    if (err) return reject(err);

                    AdminModel.create({
                        username: config.defaultAdmin.username,
                        password: encrypted
                    }).then(() => {
                        resolve();
                    }).catch(reject);
                });
            }
        }).catch(reject);
    });
}

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {

    if (err) {
        console.log("Could not connect to database");
        return console.log(err.message);
    }

    console.log("Connected to database!");

    defineAdmin().then(() => {
        app.listen(config.port, () => {
            console.log(`Server started at port: ${config.port}`);
        });
    }).catch(err => {
        console.log(err.message);
        mongoose.disconnect();
    });
});